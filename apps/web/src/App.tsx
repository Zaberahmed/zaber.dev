import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "@routes/index.ts";
// import Navbar from "@sections/navbar/index.ts";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <RoutesComponent />
    </BrowserRouter>
  );
}

export default App;
