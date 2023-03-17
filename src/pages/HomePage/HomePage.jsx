import { Card, Spin, Table, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link, generatePath } from "react-router-dom";
import { getAllCollections } from "../../api/collections";
import { CollectionCard } from "../../components/CollectionCard/CollectionCard";
import s from "./HomePage.module.css";

const HomePage = () => {
  const { t } = useTranslation();

  const { data: collections, isLoading: collectionsLoading } = useQuery(
    ["collections"],
    () => getAllCollections()
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => {
        return (
          <Typography.Link>
            <Link to={generatePath("collection/" + record.id)}>{name}</Link>
          </Typography.Link>
        );
      },
    },
    {
      title: "Count of words",
      dataIndex: "words",
      key: "words",
      render: (words) => words.length,
    },
  ];

  if (collectionsLoading) return <Spin spinning />;
  return (
    <div className={s.homePage}>
      <Typography.Title level={2}>{t('home.collectionsTitle')}</Typography.Title>
      <div className={s.collectionsBox}>
        {collections?.map((c) => (
          <CollectionCard {...c} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
