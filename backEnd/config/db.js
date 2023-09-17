import mysql from "mysql2/promise";


const connection = await mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'Dummypassword99',
    database:'monevti-v2'
});

console.log("connected to database");

export default connection;