const Sequelize = require('sequelize');
const orm = new Sequelize('films', 'root', '', {
  dialect: 'mysql'
});

const Films = orm.define('Films', {
  title: Sequelize.STRING,
  overview: Sequelize.TEXT,
  release_date: Sequelize.DATEONLY,
  image: Sequelize.STRING
});

Films.sync();

exports.Films = Films;
