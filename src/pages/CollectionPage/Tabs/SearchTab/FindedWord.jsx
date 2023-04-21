import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { getPartsOfSpeechOptionsTrans } from "../../../../utils/collections";

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
      <div style={{ display: "flex" }}>
        <Typography.Text style={{ fontSize: 20, width: "50%" }}>
          {word.word}
        </Typography.Text>
        <Typography.Text style={{ fontSize: 20 }}>
          {word.translation}
        </Typography.Text>
      </div>
      <Typography.Text type="secondary" style={{ fontSize: 15 }}>
        {
          getPartsOfSpeechOptionsTrans(t).find(
            (o) => o.value === word.partOfSpeech
          )?.label
        }
      </Typography.Text>
    </div>
  );
};
