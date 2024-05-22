import "./OperationalDashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { DashboardHeader } from "../components/DashboardHeader/DashboardHeader";
import { PerformanceBoard } from "../components/PerformanceBoard/PerformanceBoard";
import { LatencyAndIops } from "../components/Latency and IOPS/LatencyAndIops";
import { RecommendationBoard } from "../components/RecommendationBoard/RecommendationBoard";
import { Spinner } from "../components/Spinner/Spinner";
import { Error } from "../components/Error/Error.";

export const OperationalDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_API_URL}/timeRangeData`);
    await axios
      .get(process.env.REACT_APP_API_URL)
      .then((res) => {
        // console.log(res.data, "response");
        setData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "err in getting data");
        setError(err);
      });
  };

  return loading ? (
    <Spinner />
  ) : error ? (
    <Error err={error} />
  ) : (
    <>
      <header className="header">Header</header>
      <div className="dashboard-container">
        <DashboardHeader />
        <div className="dashboard-sections">
          <div className="performance-section">
            <PerformanceBoard />
            <div className="second-sections">
              <div className="vm-section">
                <LatencyAndIops vm={data?.vmData} />
              </div>
              {/* <div className="system-section">
                <SystemBoard />
              </div> */}
            </div>
          </div>
          <div className="recommendation-section">
            <RecommendationBoard recommendation={data?.recommendationData} />
          </div>
        </div>
      </div>
    </>
  );
};
