import db from "../Database/databaseConnection.js";

export function getUserByEmail(email) {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

export function createUser(email, hash, username, picture) {
    return db.query(`
    INSERT INTO users 
    (email, password, username, picture)
    VALUES ($1, $2, $3, $4);
    `, [email, hash, username, picture]);
}

export function loginUser(email) {
    return db.query(`
    SELECT users.id, users.name, users.email, users.password, sessions.token
    FROM users
    LEFT JOIN sessions ON users.id = sessions."userId"
    WHERE users.email = $1;
  `, [email])
  }

  export function getToken() {
     return`
            INSERT INTO sessions 
                ("userId", token)
            VALUES 
                ($1, $2)
            `
  }