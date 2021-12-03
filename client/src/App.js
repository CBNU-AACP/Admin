import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AllDataBases from "./pages/AllDataBases";
import InsideDataBase from "./pages/InsideDataBase";

function App() {
  const isAuthorized = localStorage.getItem("isAuthorized");

  return (
    <BrowserRouter>
      {/* {!isAuthorized ? (
        <Navigate replace to="/login" />
      ) : (
        <Navigate replace to="/" />
      )} */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<AllDataBases />} />
        <Route path="/:dbName" element={<InsideDataBase />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
