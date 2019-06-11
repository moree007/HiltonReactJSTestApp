import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import Header  from './Header';

const ADD_RESERVATION = gql`
    mutation AddReservation(
        $guest_name: String!,
        $hotel_name: String!,
        $arrival_date: String!,
        $departure_date: String!) {
        addReservation(
            guest_name: $guest_name,
            hotel_name: $hotel_name,
            arrival_date: $arrival_date,
            departure_date: $departure_date) {
            _id
        }
    }
`;

class Create extends Component {
  
    render() {
      let guest_name, hotel_name, arrival_date, departure_date;
      return (
        <Mutation mutation={ADD_RESERVATION} onCompleted={() => this.props.history.push('/')}>
            {(addReservation, { loading, error }) => (
                <div className="wrapper">
                    <Header />
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                              <div className="row">
                                <div className="col-md-9">
                                  <h4 className="panel-title">
                                    Add Reservation
                                  </h4>
                                </div>
                                <div className="col-md-3 text-right">
                                  <Link className="btn-primary" to="/"><i class="fa fa-arrow-left" aria-hidden="true"></i>Back</Link>
                                </div>
                              </div>
                            </div>
                            <div className="panel-body">

                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addReservation({ variables: { guest_name: guest_name.value, hotel_name: hotel_name.value, arrival_date: arrival_date.value, departure_date: departure_date.value } });
                                    guest_name.value = "";
                                    hotel_name.value = "";
                                    arrival_date.value = "";
                                    departure_date.value = "";
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="isbn">Guest Name:</label>
                                        <input required type="text" className="form-control" name="guest_name" ref={node => {
                                            guest_name = node;
                                        }} placeholder="Guest Name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="title">Hotel Name:</label>
                                        <input type="text" required className="form-control" name="hotel_name" ref={node => {
                                            hotel_name = node;
                                        }} placeholder="Hotel Name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="author">Arrival Date:</label>
                                        <input type="date" className="form-control" name="arrival_date" ref={node => {
                                            arrival_date = node;
                                        }} placeholder="Arrival Date" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Departure Date:</label>
                                        <input type="date" className="form-control" name="departure_date" ref={node => {
                                            departure_date = node;
                                        }} placeholder="Departure Date" />
                                    </div>
                                    <div className="divider-line"></div>
                                    <div className="btn-area text-right">
                                        <button type="submit" className="btn btn-success"><i class="fa fa-check" aria-hidden="true"></i>Submit</button>
                                    </div>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Mutation>
      );
    }
  }
  
  export default Create;