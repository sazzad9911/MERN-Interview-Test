import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Boards from "./pages/Boards";
import Create from "./pages/Create";
import View from "./pages/View";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route Component={Boards} path="/" />
        <Route Component={Create} path="/create" />
        <Route Component={View} path="/view/:id" />
      </Routes>
    </Router>
  );
}

export default App;
