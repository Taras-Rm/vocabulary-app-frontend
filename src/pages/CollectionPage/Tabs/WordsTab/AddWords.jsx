import Dragger from "antd/es/upload/Dragger";
import s from "./WordsTab.module.css";
import {
  InboxOutlined,
  DeleteOutlined,
  TranslationOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import {
  Button,
  Input,
  message,
  Select,
  Table,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import { useMutation, useQueryClient } from "react-query";
import { createWords, translateWord } from "../../../../api/words";
import { useParams } from "react-router";
import { partsOfSpeechOptions } from "../../../../utils/collections";
import { useTranslation } from "react-i18next";

const allowedFileFormet = "txt"

const AddWords = ({ setShowComponent, collection }) => {
  const {t} = useTranslation()

  const queryClient = useQueryClient();
  const params = useParams();

  const [words, setWords] = useState([]);

  const onTableFieldChange = (key, index, e, fieldType) => {
    let newWords = [...words];
    newWords[index][key] = fieldType === "select" ? e : e.target.value;
    setWords(newWords);
  };

  const onTableFieldRemove = (index) => {
    let newWords = words.filter((_, i) => i !== index);
    setWords(newWords);
  };

  const translateWordMutation = useMutation(translateWord, {
    onSuccess: (data) => {
      let newWords = [...words];
      newWords[data.index]["translation"] = data.word;
      setWords(newWords);
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  const onTranslateWordClick = (word, index) => {
    console.log(collection);
    translateWordMutation.mutate({
      word: word,
      index,
      langFrom: collection.langFrom,
      langTo: collection.langTo,
    });
  };

  const columns = [
    {
      title: t('collection.wordsTab.addWords.table.word'),
      dataIndex: "word",
      render: (text, record, index) => {
        return (
          <Input
            value={text}
            onChange={(e) => onTableFieldChange("word", index, e)}
          />
        );
      },
    },
    {
      title: t('collection.wordsTab.addWords.table.partOfSpeech'),
      dataIndex: "partOfSpeech",
      render: (text, record, index) => {
        return (
          <Select
            placeholder={t('collection.wordsTab.addWords.partOfSpeechPlaceholder')}
            options={partsOfSpeechOptions}
            style={{ boxShadow: "none" }}
            onChange={(e) =>
              onTableFieldChange("partOfSpeech", index, e, "select")
            }
          />
        );
      },
    },
    {
      title: t('collection.wordsTab.addWords.table.translation'),
      dataIndex: "translation",
      render: (text, record, index) => {
        return (
          <Input
            value={text}
            onChange={(e) => onTableFieldChange("translation", index, e)}
          />
        );
      },
    },
    {
      title: "",
      dataIndex: "actions",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => onTableFieldRemove(index)}
            />
            <Button
              icon={<TranslationOutlined />}
              onClick={() => onTranslateWordClick(record.word, index)}
            />
          </div>
        );
      },
    },
  ];

  const createWordsMutation = useMutation(createWords, {
    onSuccess: () => {
      queryClient.invalidateQueries(["words", params.collectionId]);
      message.success(t('collection.wordsTab.addWords.addWordsSuccess'));
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  const createWordsHandler = (words) => {
    if (words.length <= 0) {
      message.warning(t('collection.wordsTab.addWords.addWordsWarn'));
      return;
    }
    for (let i = 0; i < words.length; i++) {
      if (words[i].translation === "" || words[i].word === "") {
        message.warning(
          t('collection.wordsTab.addWords.addOriginTranslationWarn')
        );
        return;
      }
    }

    createWordsMutation.mutate({
      words: words,
      collectionId: Number(params.collectionId),
    });
  };

  const handleAddRowButtonClick = () => {
    setWords([...words, { word: "", translation: "", partOfSpeech: "" }]);
  };

  const getWordsFromString = (string) => {
    let words = string.split("\n").filter((w) => w !== "");
    return words;
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 15,
          padding: "0px 10px",
        }}
      >
        <Tooltip title={t('collection.wordsTab.addWords.backToWordsBtn')}>
          <Button
            icon={
              <ArrowLeftOutlined
                style={{ fontSize: 18, color: "gray", marginTop: 2 }}
              />
            }
            shape="circle"
            type="text"
            onClick={() => setShowComponent("words")}
          />
        </Tooltip>
        <Typography.Title level={2} style={{ margin: 0, marginLeft: 10 }}>
          {t('collection.wordsTab.addWords.title')}
        </Typography.Title>
      </div>
      <div className={s.dragerBox}>
        <Dragger
          name="file"
          customRequest={({ _, onSuccess }) => {
            setTimeout(() => {
              onSuccess("ok");
            }, 0);
          }}
          beforeUpload={(file) => {
            const fileFormat = file.name.split(".").pop()
            if (fileFormat != allowedFileFormet) {
              message.error("Not allowed file format")
              return false, Upload.LIST_IGNORE
            }
          }}
          onChange={(info) => {
            let reader = new FileReader();

            reader.onload = function (e) {
              let content = reader.result;
              let inputWords = getWordsFromString(content);

              let wordsFromFile = inputWords.map((w) => {
                return {
                  word: w,
                  translation: "",
                  partOfSpeech: "",
                };
              });
              setWords([...words, ...wordsFromFile]);
            };

            reader.readAsText(info.file.originFileObj);
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            {t('collection.wordsTab.addWords.draggerTitle')}
          </p>
          <p className="ant-upload-hint">
          {t('collection.wordsTab.addWords.draggerSubtitle')}
          </p>
        </Dragger>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={words}
          pagination={false}
          style={{ marginBottom: 20 }}
        />

        <Button onClick={() => handleAddRowButtonClick()}>{t('buttons.addRow')}</Button>

        <Button
          style={{
            padding: "5px 20px",
            height: "auto",
            backgroundColor: "purple",
            color: "white",
            textTransform: "uppercase",
            outline: "none",
            float: "right",
          }}
          onClick={() => createWordsHandler(words)}
        >
          {t('buttons.addWords')}
        </Button>
      </div>
    </div>
  );
};

export default AddWords;
