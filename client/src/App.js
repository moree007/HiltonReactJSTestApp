import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Header  from './components/Header';

const GET_RESERVATIONS = gql`
  {
    reservations {
      _id
      guest_name
      hotel_name
      arrival_date
      departure_date
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

class App extends Component {

  render() {
    return (
      <Query pollInterval={500} query={GET_RESERVATIONS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
            console.log(data.reservations);
          return (
            <div className="wrapper">
              <Header />
              <div className="container">              
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <div className="row">
                      <div className="col-md-9">
                        <h4 className="panel-title">
                            Reservations List
                        </h4>
                      </div>
                      <div className="col-md-3 text-right">
                        <Link className="btn-primary" to="/create"><i class="fa fa-plus-circle" aria-hidden="true"></i>Add Reservation</Link>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body">
                    <table className="table table-stripe">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Guest Name</th>
                          <th>Hotel Name</th>
                          <th>Arrival Date</th>
                          <th>Departure Date</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.reservations.map((reservation, index) => (

                          <tr key={index}>
                          <td>{index + 1}</td>
                            <td><Link to={`/show/${reservation._id}`}>{reservation.guest_name}</Link></td>
                            <td>{reservation.hotel_name}</td>
                            <td>{reservation.arrival_date}</td>
                            <td>{reservation.departure_date}</td>
                            <td className="action-items text-center">
                                                                                        

                              <Mutation mutation={DELETE_RESERVATION} key={reservation._id} onCompleted={() => this.props.history.push('/')}>
                                  {(removeReservation, { loading, error }) => (
                                      <div>
                                          <form
                                              onSubmit={e => {
                                                  e.preventDefault();
                                                  if(window.confirm('Are you sure you want to delete this reservation?') ){
                                                    removeReservation({ variables: { id: reservation._id } });
                                                  }
                                                  else
                                                      return false;
                                              }}>     
                                              <Link className="icon-theme" title="Edit" to={`/edit/${reservation._id}`}><i class="fa fa-edit" aria-hidden="true"></i></Link>                                             
                                                  <button type="submit" className="icon-theme"><i class="fa fa-trash-o" aria-hidden="true"></i></button>                                                    
                                          </form>
                                      {loading && <p>Loading...</p>}
                                      {error && <p>Error :( Please try again</p>}
                                      </div>
                                  )}
                              </Mutation>                              
                            </td>
                            
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default App;
