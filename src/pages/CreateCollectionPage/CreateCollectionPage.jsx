import { Button, Form, Input, message, Select, Typography } from "antd";
import s from "./CreateCollectionPage.module.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "antd/es/form/Form";
import { createCollection } from "../../api/collections";
import { useMemo } from "react";
import { languages, languageToCountry } from "../../utils/collections";
import ReactCountryFlag from "react-country-flag";

function CreateCollectionPage() {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const createCollectionMutation = useMutation(createCollection, {
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);

      message.success("Collection is added !");
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  const createCollectionHandler = (values) => {
    createCollectionMutation.mutate({
      name: values.name,
      langFrom: values.langFrom,
      langTo: values.langTo,
    });
    form.resetFields();
  };

  return (
    <div className={s.addCollectionPage}>
      <Typography.Title level={2}>Create collection</Typography.Title>
      <Form onFinish={createCollectionHandler} form={form}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input
            placeholder="Name"
            className={s.input}
            style={{ boxShadow: "none" }}
          />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            name="langFrom"
            style={{ width: "40%" }}
            rules={[{ required: true }]}
          >
            <Select placeholder="From language" showSearch>
              {languages.map((l) => (
                <Select.Option value={l.code}>
                  {l.description} {l.flag}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="langTo"
            style={{ width: "40%" }}
            rules={[{ required: true }]}
          >
            <Select placeholder="To language" showSearch>
              {languages.map((l) => (
                <Select.Option value={l.code}>
                  {l.description} {l.flag}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            icon={<PlusCircleOutlined />}
            style={{
              padding: "5px 20px",
              height: "auto",
              backgroundColor: "purple",
              color: "white",
              textTransform: "uppercase",
              outline: "none",
            }}
            htmlType="submit"
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateCollectionPage;
