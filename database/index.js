const Sequelize = require('sequelize');
const orm = new Sequelize('films', 'root', '', {
  dialect: 'mysql'
});

const Films = orm.define('Films', {
  title: Sequelize.STRING,
  overview: Sequelize.TEXT,
  release_date: Sequelize.DATEONLY,
  poster_path: Sequelize.STRING,
  watched: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
});

Films.sync();

module.exports = Films;
