import { db } from "../Database/databaseConnection.js"
// -------- repository de signIn -----------

export function findUser(email) {
    const resultUser = db.query(`SELECT * FROM users WHERE email = $1;`, [email])

    return resultUser;
}

export function insertSession(token, user) {
    const resultInsertSession = db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2);`, [token, user.rows[0].id]);

    return resultInsertSession;
}
// -------- repository de signUp -----------

export function findEmail(email) {
    const resultEmail = db.query(`SELECT email FROM users WHERE email = $1`, [email])

    return resultEmail;
}

export function insertUser(body, passwordHash) {
    const { email, username, photo } = body;

    const resultInsertUser = db.query(`INSERT INTO users (email, password, username, photo ) VALUES ($1, $2, $3, $4);`,
        [ email,  passwordHash, username, photo ]);

    return resultInsertUser;
}


// --------- repository de token ----------

export function getToken(token) {
    const resultToken = db.query(`SELECT token FROM sessions WHERE token = $1;`, [token])
   
    return resultToken;
}

export function searchUser (session){
    const resultCompare = db.query(`SELECT "userId" FROM sessions WHERE token = $1;`, [session.rows[0].token])
    
    return resultCompare;
}

export function deleteToken(session) {
    const resultDelete = db.query(`DELETE FROM sessions WHERE token = $1;`, [session.rows[0].token])

    return resultDelete;
}