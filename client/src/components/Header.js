import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import '../App.css';
// import gql from 'graphql-tag';
// import { Query, Mutation } from 'react-apollo';


class Header extends Component {

  render() {
    return (
                <div className="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <a className="brand" href="javascript:void(0)"><i class="fa fa-hospital-o" aria-hidden="true"></i> Hotel Reservation System</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
  }
}

export default Header;
