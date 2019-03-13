'use strict';

exports = module.exports = (sequelize, DataTypes) => {
    return sequelize.define("tweet", {
        tweet_id: DataTypes.TEXT,
        content: DataTypes.TEXT,
        url: DataTypes.TEXT,
        published_at: DataTypes.DATE,
        account_id: DataTypes.INTEGER,
    }, {
        tableName: 'tweets',
        version: false,
        underscored: false,
        timestamps: false
    })
};