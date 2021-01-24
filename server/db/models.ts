const { Sequelize, Model, DataTypes } = require('sequelize');
import path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, "db.sqlite")
});

const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    resetToken: DataTypes.STRING
});

const Item = sequelize.define('Item', {
    title: DataTypes.STRING,
    userEmail: DataTypes.STRING
});

User.hasMany(Item, {});
Item.User = Item.belongsTo(User);

User.sync({ alter: true });
Item.sync({ alter: true });

module.exports = {
    User,
    Item
}