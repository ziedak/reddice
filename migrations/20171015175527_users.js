//to create migration :  knex migrate:make <Table name>
//to run all magration : knex migrate:lastest
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('username').notNullable().unique();
        table.string('password_digest').notNullable();
        table.string('email').notNullable().unique();
        table.string('timezone').notNullable();
        table.timestamps();//create 2 col created_at/updated_at
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
