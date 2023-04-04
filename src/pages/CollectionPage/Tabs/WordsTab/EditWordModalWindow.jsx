import { Button, Form, Input, message, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { getWord, updateWord } from "../../../../api/words";
import { getPartsOfSpeechOptionsTrans } from "../../../../utils/collections";

const EditWordModalWindow = ({ setEditWordId, editWordId, collectionId }) => {
  const { t } = useTranslation()

  const queryClient = useQueryClient();

  const [form] = useForm();

  useEffect(() => {
    if (editWordId && collectionId) {
      getWordMutation.mutate({
        id: editWordId,
        collectionId: collectionId
      });
    }
  }, [editWordId]);

  const getWordMutation = useMutation(getWord, {
    onSuccess: (data) => {
      form.setFieldsValue(data);
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  const updateWordMutation = useMutation(updateWord, {
    onSuccess: () => {
      setEditWordId(null);
      queryClient.invalidateQueries(["words", collectionId]);
      message.success(t("collection.wordsTab.editModal.success"));
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  const updateWordHandler = (values) => {
    updateWordMutation.mutate({
      id: editWordId,
      collectionId: collectionId,
      word: values.word,
      translation: values.translation,
      partOfSpeech: values.partOfSpeech,
      scentance: values.scentance,
    });
  };

  return (
    <Modal
      title="Edit"
      closable
      open={editWordId}
      footer={false}
      onCancel={() => setEditWordId(null)}
      destroyOnClose
    >
      {
        <Form form={form} onFinish={updateWordHandler} preserve>
          <Form.Item name="word">
            <Input
              placeholder={t("collection.wordsTab.editModal.namePlaceholder")}
              style={{ boxShadow: "none" }}
            />
          </Form.Item>
          <Form.Item name="partOfSpeech">
            <Select
              placeholder={t("collection.wordsTab.editModal.partOfSpeechPlaceholder")}
              options={getPartsOfSpeechOptionsTrans(t)}
              style={{ boxShadow: "none" }}
            />
          </Form.Item>
          <Form.Item name="translation">
            <Input
              placeholder={t("collection.wordsTab.editModal.translationPlaceholder")}
              style={{ boxShadow: "none" }}
            />
          </Form.Item>
          <Form.Item name="scentance">
            <Input
              placeholder={t("collection.wordsTab.editModal.examplePlaceholder")}
              style={{ boxShadow: "none" }}
            />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              htmlType="submit"
              style={{
                padding: "5px 20px",
                height: "auto",
                backgroundColor: "purple",
                color: "white",
                textTransform: "uppercase",
                outline: "none",
              }}
            >
              {t("buttons.update")}
            </Button>
          </Form.Item>
        </Form>
      }
    </Modal>
  );
};

export default EditWordModalWindow;
