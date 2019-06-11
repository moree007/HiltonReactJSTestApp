import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
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

const DELETE_RESERVATION = gql`
  mutation removeReservation($id: String!) {
    removeReservation(id:$id) {
      _id
    }
  }
`;

class Show extends Component {

  render() {
    return (
        <Query pollInterval={500} query={GET_RESERVATION} variables={{ reservationId: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
        
                return (
                    <div className="wrapper">
                        <Header />
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                  <div className="row">
                                    <div className="col-md-9">
                                      <h4 className="panel-title">
                                        Reservation Details
                                      </h4>
                                    </div>
                                    <div className="col-md-3 text-right">
                                      <Link className="btn-primary" to="/"><i class="fa fa-arrow-left" aria-hidden="true"></i>Back</Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="panel-body">
                                    
                                    <div className="reservation-dtls">
                                        <div className="row">
                                            <div className="col-md-2 col-sm-2 col-xs-12">
                                                <label className="lbl-title">Guest Name</label>
                                            </div>
                                            <div className="col-md-10 col-sm-10 col-xs-12">
                                                <label className="lbl-value">{data.reservation.guest_name}</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2 col-sm-2 col-xs-12">
                                                <label className="lbl-title">Hotel Name</label>
                                            </div>
                                            <div className="col-md-10 col-sm-10 col-xs-12">
                                                <label className="lbl-value">{data.reservation.hotel_name}</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2 col-sm-2 col-xs-12">
                                                <label className="lbl-title">Arrival Date</label>
                                            </div>
                                            <div className="col-md-10 col-sm-10 col-xs-12">
                                                <label className="lbl-value">{data.reservation.arrival_date}</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2 col-sm-2 col-xs-12">
                                                <label className="lbl-title">Departure Date</label>
                                            </div>
                                            <div className="col-md-10 col-sm-10 col-xs-12">
                                                <label className="lbl-value">{data.reservation.departure_date}</label>
                                            </div>
                                        </div>
                                    </div>

                                    <Mutation mutation={DELETE_RESERVATION} key={data.reservation._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeReservation, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeReservation({ variables: { id: data.reservation._id } });
                                                    }}>
                                                    <div className="divider-line"></div>
                                                    <div className="btn-area text-right">
                                                        <Link to={`/edit/${data.reservation._id}`} className="btn btn-success"><i class="fa fa-edit" aria-hidden="true"></i>Edit</Link>&nbsp;
                                                        <button type="submit" className="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</button>
                                                    </div>
                                                </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Query>
    );
  }
}

export default Show;