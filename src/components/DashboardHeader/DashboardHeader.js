import "./DashboardHeader.css";
import { FaArrowDown, FaArrowUp, FaHeartbeat, FaServer } from "react-icons/fa";
import { BsGear } from "react-icons/bs";

export const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <h3>Operational Dashboard</h3>
      <div className="details-section">
        <div className="hardware-details">
          <FaServer className="hardware-icon" />
          <span className="hardware-count">76</span>
        </div>
        <div className="heartbeat-details">
          <div className="heartbeat-icon-success">
            <FaHeartbeat className="heartbeat-icon" />

            <span className="hearbeat-success-count">
              67
              <sup>
                <FaArrowUp />
              </sup>
            </span>
          </div>
          <div className="heartbeat-icon-failure">
            <FaHeartbeat className="heartbeat-icon" />
            <span className="hearbeat-failure-count">
              46
              <sub>
                <FaArrowDown />
              </sub>
            </span>
          </div>
        </div>
        <div className="phonecall-details">
          <div className="gear-icon-success">
            <BsGear className="gear-icon" />

            <span className="gear-success-count">
              75
              <sup>
                <FaArrowUp />
              </sup>
            </span>
          </div>
          <div className="gear-icon-failure">
            <BsGear className="gear-icon" />
            <span className="gear-failure-count">
              46
              <sub>
                <FaArrowDown />
              </sub>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
