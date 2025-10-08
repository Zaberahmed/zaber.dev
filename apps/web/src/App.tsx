import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "@routes/index.ts";

function App() {
  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
}

export default App;
