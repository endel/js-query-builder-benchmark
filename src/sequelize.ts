/**
 * Sequelize does not allow to retrieve the raw SQL from a query.
 * https://github.com/sequelize/sequelize/issues/394
 */

import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  id: DataTypes.INTEGER,
  name: DataTypes.STRING,
});

const Account = sequelize.define('Account', {
  id: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER,
});

export function simple() {
  return User.findOne({ where: { id: 1 } });
}