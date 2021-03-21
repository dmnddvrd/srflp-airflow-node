
exports.up = (knex) =>  knex.schema.createTable('schedules', (table) => {
  table.increments('id').notNullable();
  table.string('from');
  table.string('to');
  table.string('type');
  table.string('days');
  table.integer('hour').unsigned();
  table.float('price').unsigned();
  table.timestamp('created_at').defaultTo(knex.fn.now());
}).then(() => console.log('"schedules" table created.'))
  .catch((err) => { console.log(err); throw err; })
  .finally(() => {
    knex.destroy();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('schedules');
