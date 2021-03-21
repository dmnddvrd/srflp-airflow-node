
const places = ['Baia Mare', 'Bucuresti', 'Carei', 'Cluj-Napoca', 'Oradea', 'Satu Mare', 'Targu Mures', 'Zalau'],
  types = ['CFR', 'High-speed', 'International', 'Night train'],
  days = ['All', 'Weekdays', 'Weekends'],
  schedules = [];

const initDb = () => {
  places.forEach((from) => {
    places.forEach((to) => {
      days.forEach(() => {
        if (from !== to) {
          schedules.push({
            from,
            to,
            type: types[Math.floor(Math.random() * types.length)],
            days: days[Math.floor(Math.random() * days.length)],
            hour: (Math.floor(Math.random() * 24)),
            price: (Math.floor(Math.random() * 80 + 20)),
          });
        }
      });
    });
  });
};

initDb();

exports.seed = (knex) => knex('schedules').del()
  .then(() => knex('schedules').insert(schedules));
