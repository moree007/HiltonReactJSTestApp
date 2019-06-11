import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Header  from './Header';

const GET_RESERVATION = gql`
    query reservation($reservationId: String) {
        reservation(id: $reservationId) {
            _id
            guest_name
            hotel_name
            arrival_date
            departure_date
            updated_date
        }
    }
`;

const UPDATE_RESERVATION = gql`
    mutation updateReservation(
        $id: String!,
        $guest_name: String!,
        $hotel_name: String!,
        $arrival_date: String!,
        $departure_date: String!) {
        updateReservation(
        id: $id,
        guest_name: $guest_name,
        hotel_name: $hotel_name,
        arrival_date: $arrival_date,
        departure_date: $departure_date) {
            updated_date
        }
    }
`;

class Edit extends Component {

  render() {
    let guest_name, hotel_name, arrival_date, departure_date;
    return (
        <Query query={GET_RESERVATION} variables={{ reservationId: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                console.log(data);
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                
                return (
                    <Mutation mutation={UPDATE_RESERVATION} key={data.reservation._id} onCompleted={() => this.props.history.push(`/`)}>
                        {(updateReservation, { loading, error }) => (
                            <div className="wrapper">
                                <Header />
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                          <div className="row">
                                            <div className="col-md-9">
                                              <h4 className="panel-title">
                                                Update Reservation
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
                                                updateReservation({ variables: { id: data.reservation._id, guest_name: guest_name.value, hotel_name: hotel_name.value, arrival_date: arrival_date.value, departure_date: departure_date.value } });
                                                guest_name.value = "";
                                                hotel_name.value = "";
                                                arrival_date.value = "";
                                                departure_date.value = "";
                                            }}>
                                                <div className="form-group">
                                                    <label htmlFor="guest_name">Guest Name:</label>
                                                    <input type="text" required className="form-control" name="guest_name" ref={node => {
                                                        guest_name = node;
                                                    }} placeholder="Guest Name" defaultValue={data.reservation.guest_name} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="title">Hotel Name:</label>
                                                    <input type="text" required className="form-control" name="hotel_name" ref={node => {
                                                        hotel_name = node;
                                                    }} placeholder="Hotel Name" defaultValue={data.reservation.hotel_name} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="author">Arrival Date:</label>
                                                    <input type="date" className="form-control" name="arrival_date" ref={node => {
                                                        arrival_date = node;
                                                    }} placeholder="Arrival Date" defaultValue={data.reservation.arrival_date} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="description">Departure Date:</label>
                                                    <input type="date" className="form-control" name="departure_date" ref={node => {
                                                        departure_date = node;
                                                    }} placeholder="Departure Date" cols="80" rows="3" defaultValue={data.reservation.departure_date} />
                                                </div>
                                                <div className="divider-line"></div>
                                                <div className="btn-area text-right">
                                                    <button type="submit" className="btn btn-success"><i class="fa fa-check" aria-hidden="true" ></i>Submit</button>
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
            }}
        </Query>
    );
  }
}

export default Edit;