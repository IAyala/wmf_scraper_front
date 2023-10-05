import React, {useState, useEffect} from "react";
import Select from "react-select";
import axios from "axios";


export interface IResults {
  key: string;
  value: string;
}

export interface ICompetition {
  competition_id: string;
  competition_load_time: string;
  competition_url: string;
  competition_description: string;
}


export default function CompetitionOveralls() {
  const [options, setOptions] = useState<IResults[]>();
  
  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const { data } = await axios.get("http://localhost:8000/competition/get_all_competitions");
      const results:IResults[] = []
      // Store results in the results array
      data.forEach((value: ICompetition) => {
        results.push({
          key: value.competition_id,
          value: value.competition_description,
        });
      });
      // Update the options state
      setOptions([
        {key: 'Select a company', value: ''}, 
        ...results
      ])
    }

    // Trigger the fetch
    fetchData();
  }, []);
  
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <Select options={options} />
        </div>
      </div>
    </div>
  );
}
