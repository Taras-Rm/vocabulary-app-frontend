import { Button, Modal } from "antd";

const ModalConfirm = ({
  title,
  showDeleteConfirm,
  setShowDeleteConfirm,
  deleteHandler,
}) => {
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
        <div style={{display: "flex", justifyContent: "flex-end"}}>
          <Button
            onClick={deleteHandler}
            style={{
              padding: "5px 20px",
              height: "auto",
              backgroundColor: "purple",
              color: "white",
              textTransform: "uppercase",
              outline: "none",
              marginTop: 20
            }}
          >
            Delete
          </Button>
        </div>
      }
    </Modal>
  );
};

export default ModalConfirm;
