import { Spin, Tabs, Typography } from "antd";
import s from "./CollectionPage.module.css";
import { useQuery, useQueryClient } from "react-query";
import { getAllWords } from "../../api/words";
import { useParams } from "react-router";
import { getCollection } from "../../api/collections";
import WordsTab from "./Tabs/WordsTab/WordsTab";
import ActionsTab from "./Tabs/ActionsTab/ActionsTab";
import ReactCountryFlag from "react-country-flag";
import { ArrowRightOutlined } from "@ant-design/icons";
import { languageCodeToCountryCode } from "../../utils/collections";
import SearchTab from "./Tabs/SearchTab/SearchTab";
import { useTranslation } from "react-i18next";

function CollectionPage() {
  const { t } = useTranslation();

  const params = useParams();

  const { data: collection, isLoading: collectionLoading } = useQuery(
    ["collection", params.collectionId],
    () => getCollection({ collectionId: params.collectionId })
  );

  const items = [
    {
      key: "words",
      label: t("collection.tabs.words"),
      children: <WordsTab collection={collection} />,
    },
    {
      key: "search",
      label: t("collection.tabs.search"),
      children: <SearchTab collection={collection} />,
    },
    {
      key: "actions",
      label: t("collection.tabs.actions"),
      children: <ActionsTab collection={collection} />,
    },
  ];

  if (collectionLoading) return <Spin spinning />;

  return (
    <div className={s.homePage}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Title level={1}>{collection.name}</Typography.Title>
        <div>
          <ReactCountryFlag
            style={{ fontSize: 40 }}
            countryCode={languageCodeToCountryCode(collection.langFrom)}
          />
          <ArrowRightOutlined style={{ margin: "0 10px" }} />
          <ReactCountryFlag
            style={{ fontSize: 40 }}
            countryCode={languageCodeToCountryCode(collection.langTo)}
          />
        </div>
      </div>
      <Tabs centered items={items} />
    </div>
  );
}

export default CollectionPage;
