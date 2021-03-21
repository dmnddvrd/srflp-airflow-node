const repo = require('./repo');

exports.getSchedules = (start, destination, low, high) => repo.selectData('schedules', {
  filteringConditions: [
    // TODO: CREATE MYSQL WILDCARD FOR BETTER SEARCH
    ['from', 'LIKE', `${start}`],
    ['to', 'LIKE', `${destination}`],
    ['price', 'BETWEEN', [low, high]],
  ],
})
  .then((schedules) => {
    console.log(`Queried nr of records from "schedules" table: ${schedules.length}`);
    return schedules;
  });

exports.addSchedule = (from, to, days, hour, type, price) => repo.insertData('schedules', [
  {
    from,
    to,
    days,
    hour,
    type,
    price,
  },
])
  .then((insertedId) => {
    console.log(`Record ${insertedId} inserted into "schedules" table`);
    // TODO: RETURN ID?
    return insertedId;
  });

exports.deleteSchedule = (id) => repo.deleteData('schedules', {
  filteringConditions: [
    ['id', '=', id],
  ],
})
  .then((deletedSchedule) => {
    console.log(`Deleted schedule: ${deletedSchedule}`);
    return deletedSchedule > 0;
  });
