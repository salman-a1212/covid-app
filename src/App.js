import { React, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import moment from "moment";

function App() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [input, setInput] = useState("");

  const apiCaller = async () => {
    const response = await axios.get(
      "https://corona.lmao.ninja/v2/countries?yesterday&sort=cases"
    );
    console.log("response", response.data);
    setData(response.data);
  };

  // const date = new Date(1646653060913 * 1000);
  // console.log(date);

  useEffect(() => {
    apiCaller();
  }, []);

  const filterHandler = () => {
    setFilterData([]);
    setInput("");
    // data.length > 0 &&
    input.length > 0
      ? data.filter((item) => {
          if (item.country.toLowerCase().includes(input.toLowerCase())) {
            setFilterData([...filterData, item]);
          }
        })
      : setFilterData([]);
  };

  const reset = () => {
    setFilterData([]);
    setInput("");
  };

  // useEffect(() => {
  //   setFilterData([]);
  //   data.filter((item) => {
  //     if (item.country.toLowerCase().includes(input.toLowerCase())) {
  //       setFilterData([filterData, ...filterData, item]);
  //     }
  //   });
  // }, [input]);

  return (
    <div className='App'>
      <h1>Covid-19 Tracker</h1>
      <div className='input-container'>
        <input
          type='text'
          onChange={(e) => setInput(e.target.value)}
          value={input}
          style={{ padding: "5px" }}
        />
        <button
          onClick={filterHandler}
          style={{
            margin: "5px",
            padding: "5px",
            backgroundColor: "#111",
            color: "#eee",
            borderRadius: "5px",
          }}
        >
          <i className='fa-solid fa-magnifying-glass'></i>
        </button>
        <button
          onClick={reset}
          style={{
            padding: "5px",
            backgroundColor: "#111",
            color: "#eee",
            borderRadius: "5px",
          }}
        >
          <i className='fa fa-refresh' aria-hidden='true'></i>
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "25px",
        }}
      >
        <table
          style={{
            border: "1px solid #eee",
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Country</th>
              <th style={{ textAlign: "left" }}>Active</th>
              <th style={{ textAlign: "left" }}>Cases</th>
              <th style={{ textAlign: "left" }}>Deaths</th>
              <th style={{ textAlign: "left" }}>Recovered</th>
              <th style={{ textAlign: "left" }}>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filterData.length > 0
              ? filterData.map((item, index) => (
                  <tr key={index} style={{ textAlign: "left" }}>
                    <td>
                      <img
                        src={item.countryInfo.flag}
                        style={{ width: "20px" }}
                        alt=''
                      />
                      {"\u00A0"}
                      <span>{item.country}</span>
                    </td>
                    <td>{new Intl.NumberFormat().format(item.active)}</td>
                    <td>{new Intl.NumberFormat().format(item.cases)}</td>
                    <td>{new Intl.NumberFormat().format(item.deaths)}</td>
                    <td>{new Intl.NumberFormat().format(item.recovered)}</td>
                    <td>
                      {moment(item.updated).format("MMMM Do YYYY, h:mm:ss a")}
                    </td>
                  </tr>
                ))
              : data.map((item, index) => (
                  <tr key={index} style={{ textAlign: "left" }}>
                    <td>
                      <img
                        src={item.countryInfo.flag}
                        style={{ width: "20px" }}
                        alt=''
                      />
                      {"\u00A0"}
                      <span>{item.country}</span>
                      <span></span>
                    </td>
                    <td>{new Intl.NumberFormat().format(item.active)}</td>
                    <td>{new Intl.NumberFormat().format(item.cases)}</td>
                    <td>{new Intl.NumberFormat().format(item.deaths)}</td>
                    <td>{new Intl.NumberFormat().format(item.recovered)}</td>
                    <td>
                      {moment(item.updated).format("MMMM Do YYYY, h:mm:ss a")}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {/* {data.active} */}
    </div>
  );
}

export default App;
