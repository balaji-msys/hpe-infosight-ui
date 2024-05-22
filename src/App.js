import "./App.css";
import { Route, Routes } from "react-router-dom";
import { OperationalDashboard } from "./pages/OperationalDashboard";
import { VmDashboard } from "./pages/VmDashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<OperationalDashboard />} />
        <Route path="/vm" exact element={<VmDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
