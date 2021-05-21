import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/pages/Home";
import { Hotels } from "./components/pages/Hotels";
import { Guesthouses } from "./components/pages/Guesthouses";
import { BAndBs } from "./components/pages/BAndBs";
import { SignIn } from "./components/pages/SignIn";
import Footer from "./components/Footer";
import { HotelDetail } from "./components/pages/HotelDetail";
import { About } from "./components/pages/About";
import { Contact } from "./components/pages/Contact";
import { BookNow } from "./components/BookNow";
import { AuthProvider } from "./context/AuthContext";
import { Dashboardpage } from "./components/Dashboard/Dashboardpage";
import { TestSearch } from "./components/pages/TestSearch";

function App() {
  return (
    <AuthProvider>
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/hotels" component={Hotels} />
            <Route path="/guesthouses" component={Guesthouses} />
            <Route path="/bandbs" component={BAndBs} />
            <Route path="/signin" component={SignIn} />
            <Route path="/hoteldetail/:id" component={HotelDetail} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/booknow" component={BookNow} />
            <Route path="/signin" component={SignIn} />
            <Route path="/dashboard" component={Dashboardpage} />
            <Route path="/testsearch" component={TestSearch} />
          </Switch>
          <Footer />
        </Router>
      </>
    </AuthProvider>
  );
}

export default App;
