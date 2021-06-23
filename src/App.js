import { AnimatePresence } from "framer-motion";
import { Switch, useLocation } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ValidateOTP from "./pages/ValidateOTP";
import ValidatePhone from "./pages/ValidatePhone";

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        <PrivateRoute exact path="/" component={<Home />} />
        <AuthRoute path="/login" component={<Login />} />
        <AuthRoute path="/validate-phone" component={<ValidatePhone />} />
        <AuthRoute path="/validate-otp" component={<ValidateOTP />} />
        <AuthRoute path="/register" component={<Register />} />
      </Switch>
    </AnimatePresence>
  );
}

export default App;
