import { useState, useEffect, useRef } from "react";
import Select, { SingleValue } from "react-select";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface IOptionCompetition {
  value: string;
  label: string;
  load_time: Date;
}

interface IOptionCompetitor {
  value: string;
  label: string;
}

interface ICompetition {
  competition_id: string;
  competition_load_time: string;
  competition_url: string;
  competition_description: string;
}

interface ICompetitor {
  competitor_name: string;
  competitor_country: string;
}

interface IPathElement {
  x: string;
  y: number;
}

interface IResult {
  competitor_name: string;
  competitor_path: IPathElement[];
}

export default function CompetitorPath() {
  const [optionsCompetition, setOptionsCompetition] =
    useState<IOptionCompetition[]>();
  const [optionsCompetitor, setOptionsCompetitor] =
    useState<IOptionCompetitor[]>();
  const [selectedCompetition, setSelectedCompetition] =
    useState<SingleValue<IOptionCompetition>>();
  const [selectedCompetitor, setSelectedCompetitor] =
    useState<SingleValue<IOptionCompetitor>>();
  const [result, setResult] = useState<IResult>();

  const [divWidth, setDivWidth] = useState(0); // Initialize the width as 0
  const myDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/competition/get_all_competitions"
      );
      const results: IOptionCompetition[] = [];
      const sorted_data = data.sort(
        (a: ICompetition, b: ICompetition) =>
          new Date(b.competition_load_time).getTime() -
          new Date(a.competition_load_time).getTime()
      );
      sorted_data.forEach((value: ICompetition) => {
        results.push({
          value: value.competition_id,
          label: value.competition_description,
          load_time: new Date(value.competition_load_time),
        });
      });
      setOptionsCompetition(results);
    }

    const updateDivWidth = () => {
      if (myDivRef.current) {
        const newWidth = myDivRef.current.clientWidth;
        setDivWidth(newWidth);
      }
    };

    fetchData();
    updateDivWidth();

    // Add event listener for window resize
    window.addEventListener("resize", updateDivWidth);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateDivWidth);
    };
  }, []);

  const handleChangeCompetition = (
    selected: SingleValue<IOptionCompetition>
  ) => {
    async function fetchCompetitors(selected: SingleValue<IOptionCompetition>) {
      if (selected) {
        const { data } = await axios.get(
          `http://localhost:8000/competitor/get_competitors_in_competition?competition_id=${selected.value}`
        );
        const results: IOptionCompetitor[] = [];
        const sorted_data = data.sort((a: ICompetitor, b: ICompetitor) =>
          a.competitor_name.localeCompare(b.competitor_name)
        );
        sorted_data.forEach((value: ICompetitor) => {
          results.push({
            value: value.competitor_name,
            label: value.competitor_name,
          });
        });
        setOptionsCompetitor(results);
      }
    }
    setSelectedCompetition(selected);
    fetchCompetitors(selected);
  };

  const handleChangeCompetitor = (selected: SingleValue<IOptionCompetitor>) => {
    async function fetchResults(selected: SingleValue<IOptionCompetitor>) {
      if (selected && selectedCompetition) {
        const { data } = await axios.get(
          `http://localhost:8000/query/position_path_in_competition?competition_id=${selectedCompetition.value}&competitor_name=${selected.value}`
        );
        const result: IResult = {
          competitor_name: selected.value,
          competitor_path: data.competitor_positions.map(
            (value: number, index: number) => ({
              x: `Task ${index + 1}`,
              y: value,
            })
          ),
        };
        setResult(result);
      }
    }
    setSelectedCompetitor(selected);
    fetchResults(selected);
  };

  return (
    <div className="container mt-3">
      <div className="row mt-3">
        <div className="col" ref={myDivRef}>
          <Select
            options={optionsCompetition}
            onChange={handleChangeCompetition}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <Select
            options={optionsCompetitor}
            onChange={handleChangeCompetitor}
          />
        </div>
      </div>
      <div className="row mt-3">
        {selectedCompetition && selectedCompetitor && (
          <h5>
            Competition loaded on{" "}
            {selectedCompetition?.load_time.toString().slice(0, 24)} Results for
            competitor: {selectedCompetitor.label}
          </h5>
        )}
      </div>
      {result && optionsCompetitor && (
        <div className="row mt-3">
          <div className="col">
            <div
              className="container"
              style={{ width: "100%", height: "400px" }}
            >
              <LineChart
                width={divWidth - 40}
                height={Math.max(10 * optionsCompetitor.length, 400)}
                data={result.competitor_path}
              >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="x" />
                <YAxis
                  domain={[1, optionsCompetitor.length]}
                  tickCount={optionsCompetitor.length}
                  reversed={true}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#8884d8"
                  activeDot={{ r: 6 }}
                  name={result.competitor_name}
                />
              </LineChart>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
