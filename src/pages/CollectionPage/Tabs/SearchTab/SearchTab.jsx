import { Divider, Input, DatePicker, Select, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import { searchWordsInCollection } from "../../../../api/collections";
import {
  getPartsOfSpeechOptionsTrans,
} from "../../../../utils/collections";
import { FindedWord } from "./FindedWord";

const SearchTab = () => {
  const { t } = useTranslation();

  const params = useParams();

  const [findedWords, setFindedWords] = useState([]);

  const [textForSearching, setTextForSearching] = useState("");
  const [searchBy, setSearchBy] = useState("word");
  const [partsOfSpeech, setPartsOfSpeech] = useState(["noune"]);
  const [date, setDate] = useState(null);

  useQuery(
    [
      "words",
      params.collectionId,
      "text",
      textForSearching,
      "searchBy",
      searchBy,
      "partsOfSpeech",
      partsOfSpeech,
      "date",
      date,
    ],
    () =>
      searchWordsInCollection({
        collectionId: params.collectionId,
        text: textForSearching,
        searchBy: searchBy,
        partsOfSpeech: partsOfSpeech,
        startDate: date?.start,
        endDate: date?.end,
      }),
    {
      onSuccess: (data) => {
        setFindedWords(data);
      },
    }
  );

  return (
    <div style={{ padding: "5px 0px", display: "flex", height: "100vh" }}>
      <div style={{ flex: 0.6 }}>
        <Input
          value={textForSearching}
          onChange={(e) => setTextForSearching(e.target.value)}
          placeholder={t("collection.searchTab.searchPlaceholder")}
          style={{ marginBottom: 20 }}
        />
        {findedWords?.length ? (
          findedWords.map((w) => <FindedWord word={w} />)
        ) : (
          <div
            style={{
              textAlign: "center",
              paddingTop: 30,
              color: "grey",
              fontSize: 20,
            }}
          >
            {t("collection.searchTab.noResults")}
          </div>
        )}
      </div>
      <Divider type="vertical" style={{ height: "auto", margin: "0 20px" }} />
      <div style={{ flex: 0.4 }}>
        <Typography.Title level={4} style={{ marginBottom: 20 }}>
          {t("collection.searchTab.settings.title")}
        </Typography.Title>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 10,
            }}
          >
            <Typography.Text style={{ marginRight: 20, marginBottom: 5 }}>
              {t("collection.searchTab.settings.searchBy")}
            </Typography.Text>
            <Select
              style={{ width: "100%" }}
              defaultValue={searchBy}
              onChange={(e) => setSearchBy(e)}
              options={[
                {
                  value: "word",
                  label: t("collection.searchTab.settings.word"),
                },
                {
                  value: "translation",
                  label: t("collection.searchTab.settings.translation"),
                },
              ]}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 10,
            }}
          >
            <Typography.Text style={{ marginRight: 20, marginBottom: 5 }}>
              {t("collection.searchTab.settings.partOfSpeech")}
            </Typography.Text>
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              placeholder={t(
                "collection.searchTab.settings.partOfSpeechPlaceholder"
              )}
              defaultValue={partsOfSpeech}
              onChange={(e) => setPartsOfSpeech(e)}
              options={getPartsOfSpeechOptionsTrans(t)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTab;
