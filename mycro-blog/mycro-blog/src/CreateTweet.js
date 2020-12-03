import React from "react";
import { InputGroup, Button } from 'reactstrap';
import ls from "local-storage";
import { Container, Row } from 'reactstrap';
import "./App.css";
import { TweetContext } from "./context/TweetContext";
import axios from "axios";
const tweetsURL = "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet";

class CreateTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = { maxExceeded: false, tweetText: '', userName: '' };
    }

    static contextType = TweetContext;

    componentDidMount = () => {
        ls.get("userName") && this.setState({ userName: ls.get("userName") })
        axios.get(tweetsURL)
            .then(response => {
                this.context.setTweets(response.data.tweets)
            })
        setInterval(() => {
            axios.get(tweetsURL)
                .then(response => {
                    this.context.setTweets(response.data.tweets)
                })
        }, 3000)
    }

    checkCharMax = (event) => {
        this.state.tweetText = event.target.value;
        const userInputArray = event.target.value.split('');
        if (userInputArray.length > 140) {
            this.setState({ maxExceeded: true });
        }
        if (userInputArray.length < 140) {
            this.setState({ maxExceeded: false });
        }
    }

    sendTweet = () => {
        if (this.state.tweetText === "") {
            ;
        }
        else {
            const newTweet = {
                'content': this.state.tweetText,
                'userName': "n",
                'date': new Date().toISOString(),
            }
            axios.post(tweetsURL, newTweet)
                .catch(error => alert(error));
            this.setState({ tweetText: '' });
            ls.set("userName", this.state.userName);
        }
    }

    render() {
        return (
            <div>
                <Container className="mb-5 d-flex justify-content-center">
                    <Row className="mt-5">
                        <form>
                            <InputGroup>
                                <div className="">
                                    <input className="rounded tweet-box pl-4" type='textarea' value={this.state.tweetText} onChange={this.checkCharMax} placeholder="Share Your Thoughts 🤓">
                                    </input>
                                    <Button className="negative-margin" disabled={this.state.maxExceeded} onClick={this.sendTweet}>Tweet</Button>
                                </div>
                            </InputGroup>
                        </form>
                    </Row>
                </Container>
            </div>
        )

    }
}

export default CreateTweet;