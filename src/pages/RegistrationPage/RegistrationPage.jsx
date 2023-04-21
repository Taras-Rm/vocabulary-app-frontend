import { Button, Form, Input, message, Typography } from "antd";
import React from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { registration } from "../../api/auth";
import s from "./RegistrationPage.module.css";

function RegistrationPage() {
  const registrationMutation = useMutation(registration, {
    onSuccess(data) {
      message.success("You are registered !");
      window.location.href = "/login";
    },
    onError(error) {
      message.error(error.response.data.message);
    },
  });

  const handleRegistration = (values) => {
    registrationMutation.mutate({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className={s.registrationPage}>
      <div className={s.registrationContent}>
        <Typography.Title style={{ textAlign: "center" }}>
          Registration
        </Typography.Title>
        <Form
          layout="vertical"
          style={{ marginTop: 50 }}
          onFinish={handleRegistration}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input type="password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              style={{
                width: "100%",
                marginTop: 10,
                backgroundColor: "purple",
              }}
              htmlType="submit"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <Typography.Link>Login</Typography.Link>
        </Link>
      </div>
    </div>
  );
}

export default RegistrationPage;
