
exports.up = (knex) =>  knex.schema.createTable('reservations', (table) => {
  table.increments('id').notNullable();
  table.string('reservation_for');
  table.integer('user_id').unsigned().index().references('id')
    .inTable('users');
  table.integer('schedule_id').unsigned().index().references('id')
    .inTable('schedules');
  table.timestamp('created_at').defaultTo(knex.fn.now());
}).then(() => console.log('"users" table created.'))
  .catch((err) => { console.log(err); throw err; })
  .finally(() => {
    knex.destroy();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('reservations');
