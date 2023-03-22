import { Switch, Route } from "react-router-dom";
import Layout from "../components/Layout";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import CollectionPage from "./CollectionPage/CollectionPage";
import CreateCollectionPage from "./CreateCollectionPage/CreateCollectionPage";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import NoResultPage from "./NoResultPage/NoResultPage";
import RegistrationPage from "./RegistrationPage/RegistrationPage";
import SettingsPage from "./SettingsPage/SettingsPage";
import StatisticPage from "./StatisticPage/StatisticPage";

const Root = () => {
  return (
    <Switch>
      <Route exact path={"/login"} component={LoginPage} />
      <Route exact path={"/registration"} component={RegistrationPage} />
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
          <PrivateRoute exact path={"/settings"} component={SettingsPage} />
          <PrivateRoute exact forSuper={true} path={"/statistic"} component={StatisticPage} />

          <PrivateRoute exact path={"/noResult"} component={NoResultPage} />
        </Switch>
      </Layout>
    </Switch>
  );
};

export default Root;
