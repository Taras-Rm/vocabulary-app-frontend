import { Divider, Input, Select, Typography } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { searchWordsInAllCollections } from "../../../../api/statistic";
import { partsOfSpeechOptions } from "../../../../utils/collections";
import { FindedWord } from "./FindedWord";

function SearchTab() {
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
        Search words in all collections
      </Typography.Title>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 0.6 }}>
          <Input
            value={textForSearching}
            onChange={(e) => setTextForSearching(e.target.value)}
            placeholder={"Search ..."}
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
              No results
            </div>
          )}
        </div>
        <Divider type="vertical" style={{ height: "auto", margin: "0 20px" }} />
        <div style={{ flex: 0.4 }}>
          <Typography.Title level={5} style={{ marginBottom: 20 }}>
            Search params
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
                Search by
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
                    label: "Word",
                  },
                  {
                    value: "translation",
                    label: "Translation",
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
                Part of speech
              </Typography.Text>
              <Select
                mode="multiple"
                style={{
                  width: "100%",
                }}
                placeholder={"Part of speech"}
                defaultValue={searchSettings.partsOfSpeech}
                onChange={(e) =>
                  setSearchSettings((s) => ({ ...s, partsOfSpeech: e }))
                }
                options={partsOfSpeechOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchTab;
