import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Hotels from "./pages/Hotels";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Shotel from "./pages/Shotel";
import "./sass/main.scss";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/hotels" exact component={Hotels} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
