import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import Boards from "./pages/Boards";
import Create from "./pages/Create";
import View from "./pages/View";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Edit from "./pages/Edit";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route Component={Boards} path="/" />
        <Route Component={Create} path="/create" />
        <Route Component={View} path="/view/:id" />
        <Route Component={Edit} path="/edit/:id" />
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
