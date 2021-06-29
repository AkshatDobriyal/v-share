import React, { Component } from "react";
import Identicon from "react-identicons";
import Profile from "./profile.jpeg";
import "./App.css";

class Navbar extends Component {

    render() {
        return (
                <ul>
                    <li>
                        <a href="https://github.com/AkshatDobriyal">
                            <img  border= "1px solid white" width="40 rem" height="40 rem" src={Profile} alt="" />&nbsp;AD
                        </a>
                    </li>
        
                    <li float="right">
                        <small>
                            <a href={"https://etherscan.io/address/" + this.props.account}>
                                {this.props.account ? this.props.account.substring(0, 6) + '...' + this.props.account.substring(36, 42) : '0x0'}
                                {this.props.account
                                    ? <Identicon size="40" string={this.props.account}/>
                                    : <span></span>
                                }   
                            </a>
                        </small>
                    </li>
                </ul>
            );
    }
}

export default Navbar;