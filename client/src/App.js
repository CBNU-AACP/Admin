import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { getCookie } from "./common/cookies";
import Login from "./pages/Login";
import AllDataBases from "./pages/AllDataBases";
import InsideDataBase from "./pages/InsideDataBase";

function App() {
  const accessToken = getCookie("accessToken");

  return (
    <Provider store={store}>
      <BrowserRouter>
        {!accessToken && <Navigate replace to="/login" />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<AllDataBases />} />
          <Route path="/:dbName" element={<InsideDataBase />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
