import "./PerfomanceBoard.css";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import Loader from "react-js-loader";
import DatePickerFormDialog from "../FormDialog/DatePickerDialog";

export const PerformanceBoard = () => {
  const [data, setData] = useState(null);
  const [active, setActive] = useState(null);
  const [range, setRange] = useState("time");
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  // eslint-disable-next-line
  const [timedata, setTimedata] = useState();
  useEffect(() => {
    if (range === "time") getLast24hrsData();
    // eslint-disable-next-line
  }, []);

  const getLast24hrsData = async () => {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_API_URL}/timeRangeData`);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/last24hrsdata`)
      .then((res) => {
        setData(res.data);
        setCurrentData(res.data.performanceData);
        setLoading(false);
        setActive(null);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleFilterChange = async (value) => {
    setRange(value);
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_API_URL}/timeRangeData`);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/last${value}Data`)
      .then((res) => {
        // console.log(res.data);
        setActive(null);
        setData(res?.data);
        setCurrentData(res.data.performanceData);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "err in getting values");
      });
  };

  const handleFilterDates = async () => {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_API_URL}/timeRangeData`);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/time-range`, {
        startDate,
        endDate: endDate ? endDate : new Date(),
      })
      .then((res) => {
        // console.log(res.data);
        setActive(null);
        setRange("time-range");
        setData(res?.data);
        setCurrentData(res.data.performanceData);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "err");
      });
  };

  const timeFormatter = (value) => {
    if (range === "time") {
      return value.substr(value.lastIndexOf(" ") + 1);
    } else {
      return value.substr(0, value?.indexOf(" "));
    }
  };

  return (
    <div className="perfomance-container">
      <div className="performance-section-header">
        <div className="header-section">
          <div>
            <h4
              onClick={() => {
                setActive(null);
                setCurrentData(data?.performanceData);
              }}
            >
              Performance
            </h4>
          </div>
          <div className="perfomance-section-tabs">
            <h5
              className={active === "network" ? "active" : "nav-link"}
              onClick={() => {
                setActive("network");
                setCurrentData(data?.networkData);
              }}
            >
              Network
            </h5>
            <h5
              className={active === "memory" ? "active" : "nav-link"}
              onClick={() => {
                setActive("memory");
                setCurrentData(data?.memoryData);
              }}
            >
              Memory
            </h5>
          </div>
        </div>
        <div>
          {currentData &&
            `${currentData?.xLabels[0]} -
              ${currentData?.xLabels[currentData?.xLabels.length - 1]}`}
        </div>
        <div className="btn-group">
          <FaFilter
            className="filter-icon ropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul className="dropdown-menu">
            <li>
              <p
                className="dropdown-item"
                onClick={() => {
                  setRange("time");
                  getLast24hrsData();
                }}
              >
                Last 24hrs
              </p>
            </li>
            <li>
              <p
                className="dropdown-item"
                onClick={() => handleFilterChange("Weekly")}
              >
                Weekly
              </p>
            </li>
            <li>
              <p
                className="dropdown-item"
                onClick={() => handleFilterChange("BiWeekly")}
              >
                BiWeekly
              </p>
            </li>
            <li>
              <div className="dropdown-item">
                <DatePickerFormDialog
                  handleFilterDates={handleFilterDates}
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="performance-chart">
        {loading ? (
          <div className="loader-container">
            <Loader
              type="box-rectangular"
              bgColor="blue"
              color="blue"
              size={60}
            />
          </div>
        ) : (
          currentData && (
            <LineChart
              maxWidth={830}
              height={250}
              series={[
                { data: currentData?.uData, label: "uv", color: "red" },
                { data: currentData?.pData, label: "pv" },
              ]}
              xAxisPosition="bottom"
              xAxis={[
                {
                  label: range === "time" ? "time (hrs)" : "date",
                  labelStyle: { transform: "translateY(10px)" },
                  scaleType: "point",
                  data: currentData?.xLabels,
                  valueFormatter: (value) => timeFormatter(value),
                },
              ]}
              tooltip={{ trigger: "axis" }}
              slotProps={{
                axisContent: {
                  axis: {
                    valueFormatter: (value) => `${value}`,
                  },
                },
              }}
            />
          )
        )}
      </div>
    </div>
  );
};
