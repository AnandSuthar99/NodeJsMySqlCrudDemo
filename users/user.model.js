const { DataTypes } = require('sequelize');

module.exports = function model(sequelize) {
    const attributes = {
        first_name: { type: DataTypes.STRING, allowNull: false },
        last_name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        age: {type: DataTypes.INTEGER, allowNull: true},
        passwordHash: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };
    return sequelize.define('User', attributes, options);
};