import React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Container, Row } from 'reactstrap';
import "./App.css";
import { TweetContext } from "./context/TweetContext";

function TweetList(props) {
    return (
        <TweetContext.Consumer>
            {(context) =>
                <Container>
                    <Row xs="2" className="justify-content-center">
                        <ListGroup>
                            {context.tweets.map((tweet) => {
                                return (
                                    <ListGroupItem className="mb-4 rounded tweet-listitems" key={tweet.id}>
                                        <span className="mr-3 ml-5 text-white">{tweet.content}</span> <spa className="ml-5 text-success">{tweet.userName}</spa>
                                    </ListGroupItem>
                                )
                            })}
                        </ListGroup>
                    </Row>
                </Container>
            }
        </TweetContext.Consumer>
    )
}

export default TweetList;