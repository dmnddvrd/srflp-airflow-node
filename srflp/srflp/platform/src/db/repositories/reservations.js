const repo = require('./repo');

exports.getReservations = () => repo.selectData('reservations', {
  filteringConditions: [],
})
  .then((reservations) => {
    console.log(`Queried nr of records from "reservations" table: ${reservations.length}`);
    return reservations;
  });

exports.addReservation = (reservationFor, userId, scheduleId) => repo.insertData('reservations', [
  {
    reservation_for: reservationFor,
    user_id: userId,
    schedule_id: scheduleId,
  },
])
  .then((insertedId) => {
    console.log(`Record ${insertedId} inserted into "reservations" table`);
    return insertedId;
  });


exports.deleteReservation = (id) => repo.deleteData('reservations', {
  filteringConditions: [
    ['id', '=', id],
  ],
})
  .then((deletedId) => {
    console.log(`Deleted reservation: ${deletedId}`);
    return deletedId > 0;
  });
