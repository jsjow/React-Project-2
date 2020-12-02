import React from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import ls from "local-storage";
import "./App.css";
import { Container, Row, Col } from 'reactstrap';

class CreateTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = { maxExceeded: false, tweetText: '' };
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
                'userName': ls.get("userName"),
                'date': new Date().toISOString(),
            }
            this.props.getTweet(newTweet);
            this.setState({ tweetText: '' });
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
                                    <input className="rounded tweet-box" type='textarea' value={this.state.tweetText} onChange={this.checkCharMax} placeholder="Share Your Thoughts 😛">
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