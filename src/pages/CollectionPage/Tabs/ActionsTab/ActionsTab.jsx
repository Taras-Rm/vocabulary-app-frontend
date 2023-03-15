import { generateCollectionPdfFile } from "../../../../api/collections";
import { Button, message } from "antd";
import { useMutation } from "react-query";
import { useParams } from "react-router";
import { useState } from "react";
import { downloadAttachedFile } from "../../../../utils/downloadFile";

const ActionsTab = ({ collection }) => {
  const params = useParams();

  const [isFileGenerationLoading, setIsFileGenerationLoading] = useState(false);

  const generateCollectionPdfFileMutation = useMutation(
    generateCollectionPdfFile,
    {
      onSuccess: (data) => {
        setIsFileGenerationLoading(false);
        downloadAttachedFile(data);
        message.success("File is generated");
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
        {collection?.pdfFileUrl ? "Regenerate pdf file" : "Generate pdf file"}
      </Button>
      {collection?.pdfFileUrl && (
        <Button type="link" href={collection?.pdfFileUrl}>
          Download pdf file
        </Button>
      )}
    </div>
  );
};

export default ActionsTab;
