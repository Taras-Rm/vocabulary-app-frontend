import { Divider, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { getPartsOfSpeechOptionsTrans } from "../../../../utils/collections";
import { formatDate } from "../../../../utils/date";

export const FindedWord = ({ word }) => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Text style={{ fontSize: 20 }}>
          {word.word.word}
        </Typography.Text>
        <Typography.Text style={{ fontSize: 20 }}>
          {word.word.translation}
        </Typography.Text>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Text type="secondary" style={{ fontSize: 15 }}>
          {t("findedWord.partOfSpeech") + ":"}
        </Typography.Text>
        <Typography.Text type="secondary" style={{ fontSize: 15 }}>
          {
            getPartsOfSpeechOptionsTrans(t).find(
              (o) => o.value === word.word.partOfSpeech
            )?.label
          }
        </Typography.Text>
      </div>
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Text type="secondary" style={{ fontSize: 15 }}>
          {t("findedWord.creator") + ":"}
        </Typography.Text>
        <Typography.Text type="secondary" style={{ fontSize: 15 }}>
          {word.creator.email}
        </Typography.Text>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Text type="secondary" style={{ fontSize: 15 }}>
          {t("findedWord.createdAt") + ":"}
        </Typography.Text>
        <Typography.Text type="secondary" style={{ fontSize: 15 }}>
          {formatDate(new Date(word.word.createdAt))}
        </Typography.Text>
      </div>
    </div>
  );
};
