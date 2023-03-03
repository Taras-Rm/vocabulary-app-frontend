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
} from "antd";
import { useMutation, useQueryClient } from "react-query";
import { createWords, translateWord } from "../../../../api/words";
import { useParams } from "react-router";
import { partsOfSpeechOptions } from "../../../../utils/collections";

const AddWords = ({ setShowComponent, collection }) => {
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
      title: "Word",
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
      title: "Part of speech",
      dataIndex: "partOfSpeech",
      render: (text, record, index) => {
        return (
          <Select
            placeholder="Part of speech"
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
      title: "Translation",
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
      message.success("Words are added !");
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  const createWordsHandler = (words) => {
    if (words.length <= 0) {
      message.warning("You have to add some words");
      return;
    }
    for (let i = 0; i < words.length; i++) {
      if (words[i].translation === "" || words[i].word === "") {
        message.warning(
          "You have to add origin and translation for every word"
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
        <Tooltip title={"Back to words"}>
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
          Add words list
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
          onChange={(info) => {
            let reader = new FileReader();

            reader.onload = function (e) {
              let content = reader.result;
              let inputWords = content
                .split("\n")
                .filter((w) => w !== "")
                .map((w) => {
                  return {
                    word: w,
                    translation: "",
                    partOfSpeech: "",
                  };
                });
              setWords([...words, ...inputWords]);
            };

            reader.readAsText(info.file.originFileObj);
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload of file. You should select txt file.
            <br />
            Words have to be written one per line.
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

        <Button onClick={() => handleAddRowButtonClick()}>Add row</Button>

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
          Add words
        </Button>
      </div>
    </div>
  );
};

export default AddWords;
