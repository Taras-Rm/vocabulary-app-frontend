import { Select, Spin, Typography } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getCountOfWordsPerTime } from "../../../../api/statistic";
import { formatDate } from "../../../../utils/date";
import { Line } from "react-chartjs-2";
import {
  Chart,
  TimeSeriesScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  CategoryScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(
  TimeSeriesScale,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Title,
  Tooltip
);

function DetailsTab() {
  const [perTime, setPerTime] = useState("day");

  const { data: wordsPerTime, isLoading: isLoadingWordsPerTime } = useQuery(
    ["statistic", "words", "perTime", perTime],
    () => getCountOfWordsPerTime({ time: perTime }),
    {
      select(data) {
        return data.statistic;
      },
    }
  );

  if (isLoadingWordsPerTime) return <Spin spinning />;

  return (
    <div>
      <div style={{display: "flex", marginBottom: 30}}>
        <Typography.Title level={4} style={{ marginRight: 10 }}>
          Words added per:
        </Typography.Title>
        <Select
          value={perTime}
          options={[
            { value: "hour", label: "Hour" },
            { value: "day", label: "Day" },
          ]}
          onChange={(e) => setPerTime(e)}
          style={{ width: 100 }}
        />
      </div>

      <div style={{ width: "100%", height: 400 }}>
        <Line
          options={{
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  display: false,
                },
                type: "timeseries",
                ticks: { source: "labels" },
                time: {
                  displayFormats: {
                    millisecond: "dd MMM yyyy HH:mm",
                    second: "dd MMM yyyy HH:mm",
                    minute: "dd MMM yyyy HH:mm",
                    hour: "dd MMM yyyy HH:mm",
                    day: "dd MMM yyyy",
                    week: "dd MMM yyyy",
                    month: "MMM yyyy",
                    quarter: "MMM yyyy",
                    year: "MMM yyyy",
                  },
                },
              },
            },
          }}
          data={{
            labels: wordsPerTime.map((w) => w.date),
            datasets: [
              {
                label: "Hello",
                data: wordsPerTime.map((w) => w.count),
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default DetailsTab;
