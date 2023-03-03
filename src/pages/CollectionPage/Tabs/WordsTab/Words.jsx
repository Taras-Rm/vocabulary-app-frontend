import {
  Button,
  Dropdown,
  message,
  Popconfirm,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteWord, getAllWords } from "../../../../api/words";
import EditWordModalWindow from "./EditWordModalWindow";
import { useParams } from "react-router";
import { partsOfSpeechOptions } from "../../../../utils/collections";

const Words = ({ setShowComponent }) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const [editWordId, setEditWordId] = useState(null);
  const [words, setWords] = useState([]);

  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
    total: null,
  });

  const { isLoading: wordsLoading } = useQuery(
    [
      "words",
      params.collectionId,
      "current",
      tableParams.current,
      "size",
      tableParams.pageSize,
    ],
    () =>
      getAllWords({
        collectionId: params.collectionId,
        size: tableParams.pageSize,
        page: tableParams.current,
      }),
    {
      onSuccess: (data) => {
        setTableParams({
          ...tableParams,
          total: data?.totalWords,
        });
        setWords(data?.words);
      },
    }
  );

  const deleteWordMutation = useMutation(deleteWord, {
    onSuccess: () => {
      queryClient.invalidateQueries(["words", params.collectionId]);
      message.success("Word is deleted !");
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  const deleteWordHandler = (wordId) => {
    deleteWordMutation.mutate({
      id: wordId,
    });
  };

  const columns = [
    {
      title: "Word",
      dataIndex: "word",
      key: "word",
      render: (word) => word,
    },
    {
      title: "Translation",
      dataIndex: "translation",
      key: "translation",
    },
    {
      title: "Part of speech",
      dataIndex: "partOfSpeech",
      key: "partOfSpeech",
      render: (partOfSpeech) => {
        return <Tag color={partsOfSpeechOptions.find(p => p.value === partOfSpeech)?.color}>{partOfSpeech}</Tag>;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: (_, word) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <EditOutlined
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => setEditWordId(word.id)}
            />
            <Popconfirm
              title={"Delete word ?"}
              description={`Do you want to delete word - ${word.word} ?`}
              onConfirm={() => deleteWordHandler(word.id)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleMenuClick = (e) => {
    if (e.key === "addWord") {
      setShowComponent("addWord");
    } else if (e.key === "addWords") {
      setShowComponent("addWords");
    }
  };

  const items = [
    {
      label: "Add word",
      key: "addWord",
    },
    {
      label: "Add words",
      key: "addWords",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      ...tableParams,
      pageSize: pagination.pageSize,
      current: pagination.current,
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 15,
          padding: "0px 10px",
        }}
      >
        <Typography.Title level={2} style={{ margin: 0 }}>
          Words
        </Typography.Title>
        <Dropdown menu={menuProps}>
          <PlusCircleOutlined style={{ cursor: "pointer", fontSize: 25 }} />
        </Dropdown>
      </div>
      <Table
        columns={columns}
        dataSource={words}
        pagination={tableParams}
        loading={wordsLoading}
        onChange={handleTableChange}
      />
      <EditWordModalWindow
        setEditWordId={setEditWordId}
        editWordId={editWordId}
        collectionId={params.collectionId}
      />
    </div>
  );
};

export default Words;
