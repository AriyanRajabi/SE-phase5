import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signin from "./pages/Signin";
import Layout from "./components/Layout";
import RequestPackage from "./pages/RequestPackage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Signin />} path="/sign-in" />
        <Route element={<Layout />} path="/">
          <Route element={<RequestPackage />} path="" />
          <Route element={<div>404 not ofund</div>} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
