import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./pages/Root";
import "./services/i18n/i18n"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Root />
      </div>
    </BrowserRouter>
  );
}

export default App;
