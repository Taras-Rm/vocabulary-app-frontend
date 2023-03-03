import { Switch, Route } from "react-router-dom";
import Layout from "../components/Layout";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import CollectionPage from "./CollectionPage/CollectionPage";
import CreateCollectionPage from "./CreateCollectionPage/CreateCollectionPage";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";

const Root = () => {
  return (
    <Switch>
      <Route exact path={"/login"} component={LoginPage} />
      <Layout>
        <Switch>
          <PrivateRoute key={"/"} exact path={"/"} component={HomePage} />
          <PrivateRoute
            exact
            path={"/createCollection"}
            component={CreateCollectionPage}
          />
          <PrivateRoute
            exact
            path={"/collection/:collectionId"}
            component={CollectionPage}
          />
        </Switch>
      </Layout>
    </Switch>
  );
};

export default Root;
