import { Button, Form, Input, message, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { getWord, updateWord } from "../../../../api/words";
import { partsOfSpeechOptions } from "../../../../utils/collections";

const EditWordModalWindow = ({ setEditWordId, editWordId, collectionId }) => {
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
      message.success("Word is updated !");
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
              placeholder="Word"
              style={{ boxShadow: "none" }}
            />
          </Form.Item>
          <Form.Item name="partOfSpeech">
            <Select
              placeholder="Part of speech"
              options={partsOfSpeechOptions}
              style={{ boxShadow: "none" }}
            />
          </Form.Item>
          <Form.Item name="translation">
            <Input
              placeholder="Translation"
              style={{ boxShadow: "none" }}
            />
          </Form.Item>
          <Form.Item name="scentance">
            <Input
              placeholder="Scentance"
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
              Update
            </Button>
          </Form.Item>
        </Form>
      }
    </Modal>
  );
};

export default EditWordModalWindow;
