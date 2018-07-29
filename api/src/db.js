const initOptions = {

    // pg-promise initialization options...

    connect(client, dc, useCount) {
        const cp = client.connectionParameters;
        console.log('Connected to database:', cp.database);
    }

};
var pgp = require("pg-promise")(initOptions);
const cn = {
    host: 'dbpostgres',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'phonelist',
    password: process.env.DB_PASSWORD || undefined,
    database: process.env.DATABASE // DATABASE = devblog
};

var db = pgp(cn);
module.exports=db;