import { Spin } from "antd";
import { useQuery } from "react-query";
import { Redirect, Route } from "react-router";
import { getAuthenticatedUser } from "../../api/auth";

const PrivateRoute = (props) => {
  const {
    data,
    isLoading,
    error,
  } = useQuery("me", getAuthenticatedUser, {
    retry: false,
  });

  if (isLoading) {
    return <Spin spinning />;
  }

  if (props.forSuper && !data.user.isSuper) {
    return <Redirect to="noResult"/>
  }

  if (error) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};

export default PrivateRoute;
