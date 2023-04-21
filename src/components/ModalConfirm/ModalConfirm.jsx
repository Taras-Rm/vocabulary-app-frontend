import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";

const ModalConfirm = ({
  title,
  showDeleteConfirm,
  setShowDeleteConfirm,
  deleteHandler,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      title={title}
      closable
      open={showDeleteConfirm}
      footer={false}
      onCancel={() => setShowDeleteConfirm(false)}
      destroyOnClose
    >
      {
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={deleteHandler}
            style={{
              padding: "5px 20px",
              height: "auto",
              backgroundColor: "purple",
              color: "white",
              textTransform: "uppercase",
              outline: "none",
              marginTop: 20,
            }}
          >
            {t("buttons.delete")}
          </Button>
        </div>
      }
    </Modal>
  );
};

export default ModalConfirm;
