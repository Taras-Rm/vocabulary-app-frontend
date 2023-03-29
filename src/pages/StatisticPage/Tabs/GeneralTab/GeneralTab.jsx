import { Spin, Typography } from "antd";
import React from "react";
import { useQuery } from "react-query";
import {
  getAllWordsCount,
  getCollections,
  getUsers,
} from "../../../../api/statistic";

function GeneralTab() {
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

  if (isLoadingUsers || isLoadingCollections)
    return <Spin spinning />;

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
        <Typography.Text style={{ marginRight: 20 }}>Users</Typography.Text>
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
          Collections
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
        <Typography.Text style={{ marginRight: 20 }}>Words</Typography.Text>
        <Typography.Text>{wordsCount}</Typography.Text>
      </div>
    </div>
  );
}

export default GeneralTab;
