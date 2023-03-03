import { Typography } from "antd";

export const FindedWord = ({ word }) => {
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
        {word.partOfSpeech}
      </Typography.Text>
    </div>
  );
};
