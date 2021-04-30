import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Places from "./pages/Places";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MyLayout from "./components/layout/MyLayout";
import "antd/dist/antd.css";
import "./sass/main.scss";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <MyLayout>
            <Route path="/" exact component={Home} />
            <Route path="/places-to-stay" exact component={Places} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/login" exact component={Login} />
          </MyLayout>
        </Switch>
      </Router>
    </>
  );
}

export default App;
