const reservationDao = require('../db/repositories/reservations');


// Controller func of POST: /reservations/create
exports.createReservation = async (form) => {
  const reservationFor = form.reservation_for === '' ? 'Unspecified' : form.reservation_for;
  const userId = parseInt(form.user_id, 10);
  const scheduleId = parseInt(form.schedule_id, 10);
  // console.log(form);
  if (!Number.isNaN(userId) && !Number.isNaN(scheduleId) && userId > 0 && scheduleId > 0) {
    const resp = await reservationDao.addReservation(reservationFor, userId, scheduleId);
    return resp !== undefined ? resp : false;
  }
  return false;
};

// Controller func of POST: /reservations/delete
exports.removeReservation = (form) => {
  const id = parseInt(form.id, 10);
  if (Number.isNaN(id)) {
    return false;
  }
  return reservationDao.deleteReservation(id);
};

// Controller func of GET: /reservations/all
exports.queryReservations = async (form) => {
  const filters = [];
  if (form.user_id !== undefined && form.user_id !== '') {
    filters.push(['user_id', '=', form.user_id]);
  }
  if (form.schedule_id !== undefined && form.schedule_id !== '') {
    filters.push(['schedule_id'], '=', form.schedule_id);
  }
  const response = await reservationDao.getReservations();
  return response;
};
