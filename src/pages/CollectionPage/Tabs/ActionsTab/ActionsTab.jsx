import { generateCollectionPdfFile } from "../../../../api/collections";
import { Button, message } from "antd";
import { useMutation } from "react-query";
import { useParams } from "react-router";
import { useState } from "react";
import { downloadAttachedFile } from "../../../../utils/downloadFile";
import { useTranslation } from "react-i18next";

const ActionsTab = ({ collection }) => {
  const { t } = useTranslation();

  const params = useParams();

  const [isFileGenerationLoading, setIsFileGenerationLoading] = useState(false);

  const generateCollectionPdfFileMutation = useMutation(
    generateCollectionPdfFile,
    {
      onSuccess: (data) => {
        setIsFileGenerationLoading(false);
        downloadAttachedFile(data);
        message.success(t("collection.actionsTab.fileIsDownloadedSuccess"));
      },
      onError: (error) => {
        message.error(error.response.data.message);
      },
    }
  );

  const onGeneratePdfFileClick = () => {
    setIsFileGenerationLoading(true);
    generateCollectionPdfFileMutation.mutate({
      collectionId: params.collectionId,
    });
  };

  return (
    <div>
      <Button
        loading={isFileGenerationLoading}
        onClick={() => onGeneratePdfFileClick(collection.id)}
      >
        {t("collection.actionsTab.downloadPdfFile")}
      </Button>
    </div>
  );
};

export default ActionsTab;
