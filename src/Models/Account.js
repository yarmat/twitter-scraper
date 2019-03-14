'use strict';


exports = module.exports = (sequelize, DataTypes) => {
    return sequelize.define("account", {
        id_account: DataTypes.TEXT,
        update_time: DataTypes.INTEGER,
        available_time: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
        next_update: DataTypes.DATE
    }, {
        tableName: 'accounts',
        version: false,
        underscored: false,
        timestamps: true,
        createdAt: false,
        updatedAt: 'updated_at'

    })
};
