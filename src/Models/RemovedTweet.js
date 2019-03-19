'use strict';

exports = module.exports = (sequelize, DataTypes) => {
    return sequelize.define("removed_tweet", {
        tweet_id: DataTypes.TEXT,
        content: DataTypes.TEXT,
        url: DataTypes.TEXT,
        published_at: DataTypes.DATE,
        account_id: DataTypes.INTEGER,
    }, {
        tableName: 'tweets_removed',
        version: false,
        underscored: false,
        timestamps: false
    })
};