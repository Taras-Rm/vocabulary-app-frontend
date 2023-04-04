import { Spin, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import {
  getAllWordsCount,
  getCollections,
  getUsers,
} from "../../../../api/statistic";

function GeneralTab() {
  const { t } = useTranslation();

  const { data: users, isLoading: isLoadingUsers } = useQuery(
    ["statistic", "users"],
    getUsers,
    {
      select(data) {
        return data.users;
      },
    }
  );

  const { data: collections, isLoading: isLoadingCollections } = useQuery(
    ["statistic", "collections"],
    getCollections,
    {
      select(data) {
        return data.collections;
      },
    }
  );

  const { data: wordsCount, isLoading: isLoadingWordsCount } = useQuery(
    ["statistic", "words", "count"],
    getAllWordsCount,
    {
      select(data) {
        return data.count;
      },
    }
  );

  if (isLoadingUsers || isLoadingCollections) return <Spin spinning />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px 40px",
        backgroundColor: "white",
        borderRadius: "10px",
        marginBottom: 30,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Typography.Text style={{ marginRight: 20 }}>
          {t("statistics.generalTab.users")}
        </Typography.Text>
        <Typography.Text>{users.length}</Typography.Text>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Typography.Text style={{ marginRight: 20 }}>
          {t("statistics.generalTab.collections")}
        </Typography.Text>
        <Typography.Text>{collections.length}</Typography.Text>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Text style={{ marginRight: 20 }}>
          {t("statistics.generalTab.words")}
        </Typography.Text>
        <Typography.Text>{wordsCount}</Typography.Text>
      </div>
    </div>
  );
}

export default GeneralTab;
