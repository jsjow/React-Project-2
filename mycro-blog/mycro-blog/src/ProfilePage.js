import React from "react";
import { Container, Row, Button } from 'reactstrap';
import "./App.css";
import ls from "local-storage";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userName: '' };
    }

    changeUsernameValue = (event) => {
        this.setState({ userName: event.target.value })
    }

    userNameClick = () => {
        ls.set("userName", this.state.userName);
    }

    render() {
        return (
            <Container className="d-flex flex-column align-item-center mt-5">
                <Row className="d-flex flex-column align-items-center">
                    <h1 className="text-white">Profile</h1>
                    <p className="text-white">Username: </p>
                    <input onChange={this.changeUsernameValue} value={this.state.userName} className="pl-4 user-change rounded"></input>
                    <Button onClick={this.userNameClick} className="mt-3 bg-success">Change</Button>
                </Row>
            </Container>
        )
    }
}


export default ProfilePage;