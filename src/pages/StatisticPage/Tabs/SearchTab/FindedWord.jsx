import { Divider, Typography } from "antd";
import { formatDate } from "../../../../utils/date";

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
          Part of speech:
        </Typography.Text>
        <Typography.Text type="secondary" style={{ fontSize: 15 }}>
          {word.word.partOfSpeech}
        </Typography.Text>
      </div>
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Text type="secondary" style={{ fontSize: 15 }}>
          Creator:
        </Typography.Text>
        <Typography.Text type="secondary" style={{ fontSize: 15 }}>
          {word.creator.email}
        </Typography.Text>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Text type="secondary" style={{ fontSize: 15 }}>
          Created at:
        </Typography.Text>
        <Typography.Text type="secondary" style={{ fontSize: 15 }}>
          {formatDate(new Date(word.word.createdAt))}
        </Typography.Text>
      </div>
    </div>
  );
};
