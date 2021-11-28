import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DataBases from "./pages/AllDataBases";

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
        <Route path="/" element={<DataBases />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
