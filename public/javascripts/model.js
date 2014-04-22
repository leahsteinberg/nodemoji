var pg = require('pg');
var connection = "postgres://postgres:1234@localhost/posgres";

pg.connect(connection, function(err, client, done){
  if(err){
    return console.error('error fetching client from pool', err);
  }
client.query('SELECT $1::int AS number', ['1'], function
