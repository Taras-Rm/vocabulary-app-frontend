import { Dropdown, message, Typography } from "antd";
import { Link, generatePath } from "react-router-dom";
import s from "./CollectionCard.module.css";
import { MoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditCollectionModalWindow from "./EditCollectionModalWindow";
import { deleteCollection } from "../../api/collections";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import { useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";

export const CollectionCard = (props) => {
  const { t } = useTranslation()

  const { id, name, words } = props;
  const queryClient = useQueryClient();

  const [showEditCollectionModal, setShowEditCollectionModal] = useState(false);
  const [showDeleteCollectionConfirm, setShowDeleteCollectionConfirm] =
    useState(false);

  const handleMenuClick = (e) => {
    if (e.key === "edit") {
      setShowEditCollectionModal(true);
    } else if (e.key === "delete") {
      setShowDeleteCollectionConfirm(true);
    }
  };

  const items = [
    {
      label: t("buttons.edit"),
      key: "edit",
    },
    {
      label: t("buttons.delete"),
      key: "delete",
      danger: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const deleteCollectionMutation = useMutation(deleteCollection, {
    onSuccess: () => {
      setShowDeleteCollectionConfirm(null);
      queryClient.invalidateQueries(["collections"]);
      message.success(t('collectionCard.deleteModal.success'));
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  const deleteCollectionHandler = () => {
    deleteCollectionMutation.mutate({
      id: id,
    });
  };

  return (
    <div className={s.collectionCard}>
      <div className={s.collectionCard_top}>
        <div className={s.collectionCard_top_content}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to={generatePath("collection/" + id)}>
              <Typography.Title level={5} style={{ margin: 0 }}>
                {name}
              </Typography.Title>
            </Link>
            <Dropdown menu={menuProps}>
              <MoreOutlined style={{ cursor: "pointer", fontSize: 25 }} />
            </Dropdown>
          </div>

          <Typography.Text>{words.length} {t('collectionCard.words')}</Typography.Text>
        </div>
      </div>
      <div className={s.collectionCard_middle}></div>
      <div className={s.collectionCard_bottom}></div>
      <EditCollectionModalWindow
        showEditCollectionModal={showEditCollectionModal}
        setShowEditCollectionModal={setShowEditCollectionModal}
        collectionId={id}
      />
      <ModalConfirm
        title={`${t('collectionCard.deleteModal.text')} ${name} ?`}
        showDeleteConfirm={showDeleteCollectionConfirm}
        setShowDeleteConfirm={setShowDeleteCollectionConfirm}
        deleteHandler={deleteCollectionHandler}
      />
    </div>
  );
};
