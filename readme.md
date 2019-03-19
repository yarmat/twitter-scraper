### Instruction

0 - run install
<pre>
npm install
</pre>


1 - Import dump db to your mysql.
<pre>
twitter.sql
</pre>
<hr>
2 - Change settings DB connection (index.js)

```js
const sequelize = new Sequelize('db_name', 'db_user', 'db_password', {
    dialect: 'mysql',
    operatorsAliases: false
});
```
<hr>
3 - Setting proxy servers
<pre>
config/proxy.js
</pre>

<hr>

4 - Setting UserAgents
<pre>
config/userAgent.js
</pre>

<hr>

5 - Setting imgur.com
<pre>
config/imgur.js
</pre>
```js
    login: 'login',
    password: 'password',
    client_id: 'client_id'
```

<hr>
6 - In DB you can see three tables: accounts, tweets and tweets_removed<br>
6.1 - refresh tweets table<br>
6.2 - refresh tweets_removed table<br>
6.3 - setting accounts table
<hr>
7 - run script

```js
node index.js
```