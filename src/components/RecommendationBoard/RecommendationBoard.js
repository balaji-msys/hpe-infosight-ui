import "./RecommendationBoard.css";
import { PieChart } from "@mui/x-charts";

export const RecommendationBoard = ({ recommendation }) => {
  return (
    <div className="recommendation-container">
      <h4>Recommendation Actions</h4>
      {recommendation?.map((value) => {
        return (
          <div className="charts-section" key={value?._id}>
            <h4>Diagnoses Type by Score </h4>
            <PieChart
              margin={{ top: -50, bottom: 50, left: 0, right: 0 }}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  padding: { bottom: -50 },
                  itemMarkWidth: 20,
                  itemMarkHeight: 15,
                },
              }}
              series={[
                {
                  data: value?.recommendationData,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              height={210}
            />
          </div>
        );
      })}   
    </div>
  );
};
