import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Login from "./pages/Login";
import AllDataBases from "./pages/AllDataBases";
import InsideDataBase from "./pages/InsideDataBase";

function App() {
  const isAuthorized = localStorage.getItem("isAuthorized");

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
