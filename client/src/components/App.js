import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Jumbotron from "./Jumbotron";
import Feed from "./Feed";
import Contact from "./Contact";
import About from "./About";
import "./App.css";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import history from "../history";
import Loading from "./Loading";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Manny Henri",
      jumbotronTitle: "List of courses",
      feeds: [],
    };
  }

  async componentDidMount() {
    const { loading } = useAuth0;
    if (loading) {
      return <Loading />;
    }
    const url = "http://localhost:5000/courses";
    const response = await axios.get(url);
    return this.setState({ feeds: response.data });
  }
  render() {
    return (
      <Router history={history}>
        <div className="container">
          <Navigation />
          <Jumbotron title={this.state.jumbotronTitle} />
          <Switch>
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
            <Route
              exact
              path="/"
              render={(props) => <Feed feeds={this.state.feeds} />}
            />
          </Switch>
          <div className="footer">
            <p>&copy; {this.state.name} Inc.</p>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
