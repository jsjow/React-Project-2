import React from "react";
import { Navbar } from 'reactstrap';
import './App.css';
import { Link } from "react-router-dom";

function NavLinks() {
    return (
        <Navbar className="mt-4 my-navbar rounded">
            <ul className="mt-3 navbar-ul d-flex justify-conent-start">
                <li>
                    <Link to="/" className="text-white font-weight-bold navbar-listitem">Home</Link>
                </li>
                <li>
                    <Link to="/profile" className="ml-5 text-white font-weight-bold navbar-listitem">Profile</Link>
                </li>
            </ul>
        </Navbar>
    )
}

export default NavLinks;