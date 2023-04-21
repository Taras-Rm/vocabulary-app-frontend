import { Button, Form, Input, message, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { getCollection, updateCollection } from "../../api/collections";

const EditCollectionModalWindow = ({
  showEditCollectionModal,
  setShowEditCollectionModal,
  collectionId,
}) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const [form] = useForm();

  useEffect(() => {
    if (showEditCollectionModal) {
      getCollectionMutation.mutate({
        collectionId: collectionId,
      });
    }
  }, [showEditCollectionModal]);

  const getCollectionMutation = useMutation(getCollection, {
    onSuccess: (data) => {
      form.setFieldsValue(data);
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  const updateCollectionMutation = useMutation(updateCollection, {
    onSuccess: () => {
      setShowEditCollectionModal(null);
      queryClient.invalidateQueries(["collections"]);
      message.success(t("collectionCard.editModal.success"));
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  const updateCollectionHandler = (values) => {
    updateCollectionMutation.mutate({
      id: collectionId,
      name: values.name,
    });
  };

  return (
    <Modal
      title={t("collectionCard.editModal.text")}
      closable
      open={showEditCollectionModal}
      footer={false}
      onCancel={() => setShowEditCollectionModal(null)}
      destroyOnClose
    >
      {
        <Form form={form} onFinish={updateCollectionHandler} preserve>
          <Form.Item name="name">
            <Input placeholder={t("collectionCard.editModal.namePlaceholder")} style={{ boxShadow: "none" }} />
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

export default EditCollectionModalWindow;
