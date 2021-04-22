import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Hotels from "./pages/Hotels";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MyLayout from "./components/layout/MyLayout";
import "antd/dist/antd.css";
import "./sass/main.scss";

function App() {
  return (
    <>
      <MyLayout>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/hotels" exact component={Hotels} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </Router>
      </MyLayout>
    </>
  );
}

export default App;
