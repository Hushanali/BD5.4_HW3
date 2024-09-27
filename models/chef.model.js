let { DataTypes, sequelize } = require('../lib/index');

let chef = sequelize.define('chef', {
  name: DataTypes.STRING,
  birthYear: DataTypes.INTEGER,
});

module.exports = {
  chef,
};
