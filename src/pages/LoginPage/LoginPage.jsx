import { Button, Form, Input, message, Typography } from "antd";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { login } from "../../api/auth";
import s from "./LoginPage.module.css";

const LoginPage = () => {
  const loginMutation = useMutation(login, {
    onSuccess(data) {
      localStorage.setItem("authToken", data.token);
      window.location.href = "/";
    },
    onError(error) {
      message.error(error.response.data.message);
    },
  });

  const handleLogin = (values) => {
    loginMutation.mutate({ email: values.email, password: values.password });
  };

  return (
    <div className={s.loginPage}>
      <div className={s.loginContent}>
        <Typography.Title style={{ textAlign: "center" }}>
          Login
        </Typography.Title>
        <Form
          layout="vertical"
          style={{ marginTop: 50 }}
          onFinish={handleLogin}
        >
          <Form.Item name="email" label="Email" required>
            <Input />
          </Form.Item>

          <Form.Item name="password" label="Password" required>
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
              Login
            </Button>
          </Form.Item>
        </Form>

        <Link to={"/registration"} style={{textDecoration: "none"}}>
          <Typography.Link>Registration</Typography.Link>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
