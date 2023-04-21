import { Divider, Input, Select, Typography } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { searchWordsInAllCollections } from "../../../../api/statistic";
import { getPartsOfSpeechOptionsTrans } from "../../../../utils/collections";
import { FindedWord } from "./FindedWord";

function SearchTab() {
  const { t } = useTranslation();
  const [findedWords, setFindedWords] = useState([]);

  const [textForSearching, setTextForSearching] = useState("");

  const [searchSettings, setSearchSettings] = useState({
    searchBy: "word",
    partsOfSpeech: ["noune"],
    date: null,
  });

  useQuery(
    ["statistic", "text", textForSearching, "searchSettings", searchSettings],
    () =>
      searchWordsInAllCollections({
        text: textForSearching,
        searchBy: searchSettings.searchBy,
        partsOfSpeech: searchSettings.partsOfSpeech,
        startDate: searchSettings.date?.start,
        endDate: searchSettings.date?.end,
      }),
    {
      onSuccess: (data) => {
        setFindedWords(data);
      },
    }
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography.Title style={{ marginBottom: 20 }} level={4}>
        {t("statistics.searchTab.title")}
      </Typography.Title>
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ flex: 0.6 }}>
          <Input
            value={textForSearching}
            onChange={(e) => setTextForSearching(e.target.value)}
            placeholder={t("statistics.searchTab.searchPlaceholder")}
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
              {t("statistics.searchTab.noResults")}
            </div>
          )}
        </div>
        <Divider type="vertical" style={{ height: "auto", margin: "0 20px" }} />
        <div style={{ flex: 0.4 }}>
          <Typography.Title level={5} style={{ marginBottom: 20 }}>
            {t("statistics.searchTab.settings.title")}
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
                {t("statistics.searchTab.settings.searchBy")}
              </Typography.Text>
              <Select
                style={{ width: "100%" }}
                defaultValue={searchSettings.searchBy}
                onChange={(e) =>
                  setSearchSettings((s) => ({ ...s, searchBy: e }))
                }
                options={[
                  {
                    value: "word",
                    label: t("statistics.searchTab.settings.word"),
                  },
                  {
                    value: "translation",
                    label: t("statistics.searchTab.settings.translation"),
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
                {t("statistics.searchTab.settings.partOfSpeech")}
              </Typography.Text>
              <Select
                mode="multiple"
                style={{
                  width: "100%",
                }}
                placeholder={t(
                  "statistics.searchTab.settings.partOfSpeechPlaceholder"
                )}
                defaultValue={searchSettings.partsOfSpeech}
                onChange={(e) =>
                  setSearchSettings((s) => ({ ...s, partsOfSpeech: e }))
                }
                options={getPartsOfSpeechOptionsTrans(t)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchTab;
