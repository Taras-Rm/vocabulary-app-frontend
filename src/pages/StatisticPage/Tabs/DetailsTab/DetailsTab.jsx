import { Select, Spin, Typography } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getCountOfWordsPerTime } from "../../../../api/statistic";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

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
import { useTranslation } from "react-i18next";

Chart.register(
  TimeSeriesScale,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  zoomPlugin,
  Title,
  Tooltip
);

function DetailsTab() {
  const { t } = useTranslation();

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
      <div style={{ display: "flex", marginBottom: 30 }}>
        <Typography.Title level={4} style={{ marginRight: 10 }}>
          {t("statistics.detailsTab.wordsAddedPer")}
        </Typography.Title>
        <Select
          value={perTime}
          options={[
            { value: "hour", label: t("statistics.detailsTab.hour") },
            { value: "day", label: t("statistics.detailsTab.day") },
          ]}
          onChange={(e) => setPerTime(e)}
          style={{ width: 100 }}
        />
      </div>

      <div style={{ width: "100%", height: 400 }}>
        <Line
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
              },
              zoom: {
                zoom: {
                  pinch: {
                    enabled: true, // Enable pinch zooming
                  },
                  wheel: {
                    enabled: true, // Enable wheel zooming
                  },
                  mode: "xy",
                },
              },
            },
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
                label: t("statistics.detailsTab.words"),
                data: wordsPerTime.map((w) => w.count),
                backgroundColor: "purple",
                borderColor: "purple",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default DetailsTab;
