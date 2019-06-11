var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var ReservationModel = require('../models/Reservation');

var reservationType = new GraphQLObjectType({
    name: 'reservation',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        guest_name: {
          type: GraphQLString
        },
        hotel_name: {
          type: GraphQLString
        },
        arrival_date: {
          type: GraphQLString
        },
        departure_date: {
          type: GraphQLString
        },
        updated_date: {
          type: GraphQLDate
        }
      }
    }
  });

  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        reservations: {
          type: new GraphQLList(reservationType),
          resolve: function () {
            const reservations = ReservationModel.find().exec()
            if (!reservations) {
              throw new Error('Error')
            }
            return reservations
          }
        },
        reservation: {
          type: reservationType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const reservationDetails = ReservationModel.findById(params.id).exec()
            if (!reservationDetails) {
              throw new Error('Error')
            }
            return reservationDetails
          }
        }
      }
    }
  });

  var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addReservation: {
          type: reservationType,
          args: {
            guest_name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            hotel_name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            arrival_date: {
              type: new GraphQLNonNull(GraphQLString)
            },
            departure_date: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: function (root, params) {
            const reservationModel = new ReservationModel(params);
            const newReservation = reservationModel.save();
            if (!newReservation) {
              throw new Error('Error');
            }
            return newReservation
          }
        },
        updateReservation: {
          type: reservationType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            guest_name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            hotel_name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            arrival_date: {
              type: new GraphQLNonNull(GraphQLString)
            },
            departure_date: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            return ReservationModel.findByIdAndUpdate(params.id, { guest_name: params.guest_name, hotel_name: params.hotel_name, arrival_date: params.arrival_date, departure_date: params.departure_date,updated_date: new Date() }, function (err) {
              if (err) return next(err);
            });
          }
        },
        removeReservation: {
          type: reservationType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const remReservation = ReservationModel.findByIdAndRemove(params.id).exec();
            if (!remReservation) {
              throw new Error('Error')
            }
            return remReservation;
          }
        }
      }
    }
  });

  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});