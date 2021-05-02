import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Places from "./pages/Places";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Shotel from "./pages/Shotel";
import Enquiries from "./pages/Enquiries";
import AddHotel from "./pages/AddHotel";
import { AuthProvider } from "./context/AuthContext";
import "antd/dist/antd.css";
import "./sass/main.scss";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/places-to-stay" exact component={Places} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/login" exact component={Login} />
            <Route path="/places-to-stay/:id" exact component={Shotel} />
            <Route path="/enquiries" exact component={Enquiries} />
            <Route path="/addhotel" exact component={AddHotel} />
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
