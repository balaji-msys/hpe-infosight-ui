import "./LatencyAndIops.css";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const LatencyAndIops = ({ vm }) => {
  const [maxSeoulValue, setMaxSeoulValue] = useState(null);
  const [maxTokyoValue, setMaxTokyoValue] = useState(null);

  const getMaxValue = () => {
    if (vm && vm.length > 0) {
      const data = vm?.flatMap((value) => {
        return value.vmData;
      });
      const maxSeoul = Math.max(...data.map((value) => value.seoul));
      const maxTokyo = Math.max(...data.map((value) => value.tokyo));
      setMaxSeoulValue((maxSeoul * 60) / 100);
      setMaxTokyoValue((maxTokyo * 60) / 100);
    }
  };
  useEffect(() => {
    getMaxValue();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            background: "white",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          <h6 className="label">{label}</h6>
          <hr></hr>
          <p
            className="intro"
            style={{
              color: payload[0].value > maxSeoulValue ? "green" : "#66c2a5",
            }}
          >{`${payload[0].name} : ${payload[0].value}`}</p>
          <p
            className="intro"
            style={{
              color: payload[1].value > maxTokyoValue ? "red" : "#fc8d62",
            }}
          >{`${payload[1].name} : ${payload[1].value}`}</p>
        </div>
      );
    }
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="custom-legend">
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  width: "20px",
                  height: "10px",
                  background:
                    payload[index].value === "seoul" ? "#66c2a5" : "#fc8d62",
                }}
              ></div>
              <div
                style={{
                  width: "20px",
                  height: "10px",
                  background:
                    payload[index].value === "seoul" ? "green" : "red",
                }}
              ></div>
            </div>
            <div>
              <span>{entry.value}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="vm-container">
      <h4>VMs Latency and IOPS</h4>
      {vm?.map((value) => {
        return (
          <ResponsiveContainer maxWidth="500" height={515} key={value?._id}>
            <BarChart layout="vertical" data={value?.vmData}>
              <XAxis type="number" />
              <YAxis dataKey="month" type="category" />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              <Bar dataKey="seoul" name="seoul">
                {value?.vmData.map((entry, index) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.seoul > maxSeoulValue ? "green" : "#66c2a5"}
                    />
                  );
                })}
              </Bar>
              <Bar dataKey="tokyo" name="tokyo">
                {value?.vmData.map((entry, index) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.tokyo > maxTokyoValue ? "red" : "#fc8d62"}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      })}
    </div>
  );
};
