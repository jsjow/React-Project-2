import React from "react";
import './App.css';
import logo from './logo.svg';
import ls from "local-storage";
import CreateTweet from './CreateTweet';
import TweetList from "./TweetList";
import axios from "axios";
import { Container, Spinner, Row, InputGroup, Input, Button } from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const tweetsURL = "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweets: [], newestTweet: {}, isLoading: true, userName: '' };
  }

  componentDidMount = () => {
    ls.get("userName") && this.setState({ userName: ls.get("userName") })
    axios.get(tweetsURL)
    .then(response => {
      this.setState({ tweets: response.data.tweets, isLoading: false })
    })
    setInterval(() => {
      axios.get(tweetsURL)
      .then(response => {
        this.setState({ tweets: response.data.tweets, isLoading: false })
      })
    }, 3000)
  }

  handleTweet(newTweet) {
    this.setState((state) => {
      return { tweets: [newTweet, ...state.tweets,], userName: newTweet.userName };
    });
    ls.set("userName", this.state.userName);
    axios.post(tweetsURL, newTweet)
      .catch(error => alert(error));
  }

  changeUsernameValue = (event) => {
    this.setState({userName: event.target.value})
  }

  userNameClick = () => {
    ls.set("userName", this.state.userName);
  }

  render() {
    console.log(this.state.userName)
    return (
      <Container>
        <Router>
          <Navbar className="offset-1 col-10 d-flex justify-content-start mt-4 my-navbar rounded">
            <li>
              <Link to="/" className="mr-5 text-white font-weight-bold">Home</Link>
            </li>
            <li>
              <Link to="/profile" className="ml-5 text-white font-weight-bold">Profile</Link>
            </li>
          </Navbar>
          <Switch>
            <Route path="/profile">
              <Container className="d-flex flex-column align-item-center mt-5">
                <Row className="d-flex flex-column align-items-center">
                <h1 className="text-white mr-5">Profile</h1>
                <p className="text-white mr-5">Username: </p>
                <input onChange={this.changeUsernameValue} value={this.state.userName} className="user-change rounded"></input>
                <Button onClick={this.userNameClick} className="mt-3 bg-success">Change</Button>
                </Row>
              </Container>
            </Route>
            <Route path="/">
              <Container>
                <CreateTweet getTweet={(newTweet) => this.handleTweet(newTweet)} />
                {this.state.isLoading ? <div className="d-flex justify-content-center" >
                  <Spinner color="primary" />
                </div> : <TweetList tweetInfo={this.state.tweets} newestTweet={this.state.newestTweet} />}
              </Container>
            </Route>
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;