import React from "react";
import CreateTweet from './CreateTweet';
import TweetList from "./TweetList";
import { Spinner } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import { TweetContext } from "./context/TweetContext";
import ProfilePage from "./ProfilePage";
import NavLinks from "./NavBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweets: [], newestTweet: {}, userName: '', isLoading: false};
  }

  setTweets(tweets) {
    this.setState({ tweets: tweets })
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
                  <CreateTweet />
                  {this.state.isLoading ? <div className="d-flex justify-content-center" >
                  <Spinner color="primary" />
                </div> : <TweetList loads={this.state.isLoading} tweetInfo={this.state.tweets} newestTweet={this.state.newestTweet} />}
              </Route>
            </Switch>
          </Router>
      </TweetContext.Provider>
    );
  }
}

export default App;