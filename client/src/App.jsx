import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import Hero from "./pages/Hero";
import SignInPage from "./components/SignInPage";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Hero} />
        <Route path="/signin" component={SignInPage} />
        {/* Add other routes here if needed */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
