import React from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input, ListGroup, ListGroupItem } from 'reactstrap';
import "./App.css";
import { Container, Row, Col, Spinner } from 'reactstrap';

class TweetList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (true) {
            <button>hi</button>
        }
        return (
            <Container>
                <Row xs="2" className="justify-content-center">
                    <ListGroup>
                        {this.props.tweetInfo.map((tweet) => {
                            return (
                                <ListGroupItem className="mb-4 rounded tweet-listitems" key={tweet.id}>
                                    {tweet.content}
                                    {tweet.userName}
                                </ListGroupItem>
                            )
                        })}
                    </ListGroup>
                </Row>
            </Container>
        )
    }
}

export default TweetList;