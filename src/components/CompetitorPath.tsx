import { useState, useEffect } from "react";
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

interface IOptionCountry {
  value: string;
  label: string;
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

interface ICountry {
  competitor_country: string;
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
  const [optionsCountry, setOptionsCountry] = useState<IOptionCountry[]>();
  const [optionsCompetitor, setOptionsCompetitor] =
    useState<IOptionCompetitor[]>();
  const [selectedCompetition, setSelectedCompetition] =
    useState<SingleValue<IOptionCompetition>>();
  const [selectedCompetitor, setSelectedCompetitor] =
    useState<SingleValue<IOptionCompetitor>>();
  const [result, setResult] = useState<IResult>();

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
    fetchData();
  }, []);

  const handleChangeCompetition = (
    selected: SingleValue<IOptionCompetition>
  ) => {
    async function fetchCountries(selected: SingleValue<IOptionCompetition>) {
      if (selected) {
        const { data } = await axios.get(
          `http://localhost:8000/competitor/get_countries_in_competition?competition_id=${selected.value}`
        );
        const results: IOptionCountry[] = [];
        const sorted_data = data.sort((a: ICountry, b: ICountry) =>
          a.competitor_country.localeCompare(b.competitor_country)
        );
        sorted_data.forEach((value: ICountry) => {
          results.push({
            value: value.competitor_country,
            label: value.competitor_country,
          });
        });
        setOptionsCountry(results);
      }
    }
    setSelectedCompetition(selected);
    fetchCountries(selected);
  };

  const handleChangeCountry = (selected: SingleValue<IOptionCountry>) => {
    async function fetchCompetitors(selected: SingleValue<IOptionCountry>) {
      if (selected && selectedCompetition) {
        const { data } = await axios.get(
          `http://localhost:8000/competitor/get_competitors_in_competition_by_country?competition_id=${selectedCompetition.value}&country_name=${selected.value}`
        );
        const results: IOptionCompetitor[] = [];

        data.forEach((value: ICompetitor) => {
          results.push({
            value: value.competitor_name,
            label: value.competitor_name,
          });
        });
        setOptionsCompetitor(results);
      }
    }
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
        console.log(result);
        setResult(result);
      }
    }
    setSelectedCompetitor(selected);
    fetchResults(selected);
  };

  return (
    <div className="container mt-3">
      <div className="row mt-3">
        <div className="col">
          <Select
            options={optionsCompetition}
            onChange={handleChangeCompetition}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <Select options={optionsCountry} onChange={handleChangeCountry} />
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
      {result && (
        <div className="row mt-3">
          <div className="col">
            <div
              className="container"
              style={{ width: "100%", height: "400px" }}
            >
              <LineChart
                width={1300}
                height={400}
                data={result.competitor_path}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis domain={[1, "dataMax"]} reversed={true} />
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
