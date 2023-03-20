import {
  Button,
  Form,
  Input,
  message,
  Select,
  Tooltip,
  Typography,
} from "antd";
import s from "./WordsTab.module.css";
import { PlusCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "antd/es/form/Form";
import { createWord } from "../../../../api/words";
import { useParams } from "react-router";
import { partsOfSpeechOptions } from "../../../../utils/collections";
import { useTranslation } from "react-i18next";

const AddWord = ({ setShowComponent }) => {
  const { t } = useTranslation()

  const params = useParams();
  const queryClient = useQueryClient();

  const [form] = useForm();

  const createWordMutation = useMutation(createWord, {
    onSuccess: () => {
      queryClient.invalidateQueries(["words", params.collectionId]);
      message.success(t('collection.wordsTab.addWord.wordAddedSuccess'));
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  const createWordHandler = (values) => {
    createWordMutation.mutate({
      word: values.word,
      translation: values.translation,
      partOfSpeech: values.partOfSpeech,
      scentance: values.scentance,
      collectionId: Number(params.collectionId),
    });
    form.resetFields();
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
        <Tooltip title={t('collection.wordsTab.addWord.backToWordsBtn')}>
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
          {t('collection.wordsTab.addWord.title')}
        </Typography.Title>
      </div>
      <Form onFinish={createWordHandler} form={form}>
        <Form.Item name="word">
          <Input
            placeholder={t('collection.wordsTab.addWord.wordPlaceholder')}
            className={s.input}
            style={{ boxShadow: "none" }}
          />
        </Form.Item>
        <Form.Item name="partOfSpeech">
          <Select
            placeholder={t('collection.wordsTab.addWord.partOfSpeechPlaceholder')}
            options={partsOfSpeechOptions}
            style={{ boxShadow: "none" }}
          />
        </Form.Item>

        <Form.Item name="translation">
          <Input
            placeholder={t('collection.wordsTab.addWord.translationPlaceholder')}
            className={s.input}
            style={{ boxShadow: "none" }}
          />
        </Form.Item>
        <Form.Item name="scentance">
          <Input
            placeholder={t('collection.wordsTab.addWord.scentancePlaceholder')}
            className={s.input}
            style={{ boxShadow: "none" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            icon={<PlusCircleOutlined />}
            style={{
              padding: "5px 20px",
              height: "auto",
              backgroundColor: "purple",
              color: "white",
              textTransform: "uppercase",
              outline: "none",
            }}
            htmlType="submit"
          >
            {t('buttons.add')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddWord;
