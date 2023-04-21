import { Select, Spin, Tabs } from "antd";
import { statistic } from "antd/es/theme/internal";
import Typography from "antd/es/typography/Typography";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
import SearchTab from "./Tabs/SearchTab/SearchTab";

function StatisticPage() {
  const { t } = useTranslation();
  return (
    <div className={s.statisticPage}>
      <Typography.Title level={2}>{t("statistics.title")}</Typography.Title>
      <Tabs
        centered
        items={[
          {
            key: "general",
            label: t("statistics.tabs.general"),
            children: <GeneralTab />,
          },
          {
            key: "datails",
            label: t("statistics.tabs.details"),
            children: <DetailsTab />,
          },
          {
            key: "search",
            label: t("statistics.tabs.search"),
            children: <SearchTab />,
          },
        ]}
      />
    </div>
  );
}

export default StatisticPage;
