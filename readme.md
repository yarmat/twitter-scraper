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
3 - In DB you can see two tables: accounts and tweets<br>
3.1 - refresh tweets table<br>
3.2 - setting accounts table
<hr>
4 - run script

```js
node index.js
```