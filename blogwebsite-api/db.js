import mysql from "mysql"

export const db = mysql.createConnection({
    host:"localhost",
    user:"user",
    password:"databasepassword",
    database:"databasename"
})