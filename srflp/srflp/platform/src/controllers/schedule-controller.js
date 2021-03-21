const scheduleDao = require('../db/repositories/schedules');
const validator = require('../util/input-validator');

// Controller func of POST: /schedules/create
exports.createRoute = (form) => {
  const hour = parseInt(form.hour, 10);
  const price = parseFloat(form.price);
  if (!Number.isNaN(hour) && validator.isValidHour(hour) && !Number.isNaN(price)
  && validator.isValidDay(form.days) && validator.isValidType(form.type)) {
    return scheduleDao.addSchedule(form.from, form.to, form.days, hour, form.type, price);
  }
  return false;
};

// Controller func of POST: /schedules/delete
exports.removeRoute = (form) => {
  const id = parseInt(form.id, 10);
  if (Number.isNaN(id)) {
    return false;
  }
  return scheduleDao.deleteSchedule(id);
};

// Controller func of GET: /schedules/all
exports.queryRoutes = async (form) => {
  const low = form.minPrice === undefined || form.minPrice === '' ? 0 : parseFloat(form.minPrice);
  const high = form.maxPrice === undefined || form.maxPrice === '' ? 10000 : parseFloat(form.maxPrice);
  let { from } = form;
  if (form.from === undefined) {
    from = '%';
  }
  let { to } = form;
  if (form.to === undefined) {
    to = '%';
  }
  const response = await scheduleDao.getSchedules(from, to, low, high);
  return response;
};
