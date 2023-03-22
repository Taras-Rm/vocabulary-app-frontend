import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import s from "./NoResultPage.module.css";

function NoResultPage() {
  return (
    <div className={s.noResultPage}>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Link to={"/"}>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
}

export default NoResultPage;
