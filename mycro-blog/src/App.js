import React from "react";
import CreateTweet from './CreateTweet';
import TweetList from "./TweetList";
import { Spinner } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import { TweetContext } from "./context/TweetContext";
import ProfilePage from "./ProfilePage";
import NavLinks from "./NavLinks";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweets: [], userName: '', isLoading: false};
  }

  setTweets(tweets) {
    this.setState({ tweets: tweets })
  }

  handleLoads = (loading) => {
    this.setState({isLoading: loading})
  }

  render() {
    return (
      <TweetContext.Provider value={{
        tweets: this.state.tweets,
        setTweets: (tweets) => this.setTweets(tweets)
      }}>
          <Router>
          <NavLinks />
            <Switch>
              <Route path="/profile">
                <ProfilePage />
              </Route>
              <Route path="/">
                  <CreateTweet handleLoads={(loading) => this.handleLoads(loading)}/>
                  {this.state.isLoading ? <div className="d-flex justify-content-center" >
                  <Spinner color="primary" />
                </div> : <TweetList/>}
              </Route>
            </Switch>
          </Router>
      </TweetContext.Provider>
    );
  }
}

export default App;