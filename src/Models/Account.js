'use strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports = module.exports = (sequelize, DataTypes) => {
    return sequelize.define("account", {
        id_account: DataTypes.TEXT,
        update_time: DataTypes.INTEGER,
        available_time: DataTypes.INTEGER,
        count_per_time: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
        next_update: DataTypes.DATE
    }, {
        tableName: 'accounts',
        version: false,
        underscored: false,
        timestamps: false,

        scopes: {
            updateable: {
                where: {
                    next_update: {
                        [Op.or]: {
                            [Op.lt]: new Date(),
                            [Op.eq]: null
                        }
                    }
                }
            }
        }

    })
};
