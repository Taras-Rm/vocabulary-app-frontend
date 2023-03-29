import { Select, Spin, Tabs } from "antd";
import { statistic } from "antd/es/theme/internal";
import Typography from "antd/es/typography/Typography";
import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getAllWordsCount,
  getCollections,
  getCountOfWordsPerTime,
  getUsers,
} from "../../api/statistic";
import { formatDate } from "../../utils/date";
import s from "./StatisticPage.module.css";
import DetailsTab from "./Tabs/DetailsTab/DetailsTab";
import GeneralTab from "./Tabs/GeneralTab/GeneralTab";

function StatisticPage() {
  return (
    <div className={s.statisticPage}>
      <Typography.Title level={2}>Statistic</Typography.Title>
      <Tabs
        centered
        items={[
          {
            key: "general",
            label: "General",
            children: <GeneralTab />,
          },
          {
            key: "datails",
            label: "Details",
            children: <DetailsTab />,
          },
          {
            key: "search",
            label: "Search",
            // children: <ActionsTab collection={collection} />,
          },
        ]}
      />
    </div>
  );
}

export default StatisticPage;
