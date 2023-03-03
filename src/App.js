import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./pages/Root";

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
