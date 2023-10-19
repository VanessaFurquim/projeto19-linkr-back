import { db } from "../Database/databaseConnection.js"

export function findUserId(session) {
    const resultUserId = db.query(`SELECT "userId" FROM sessions WHERE token = $1;`,
     [session.rows[0].token])
     
     return resultUserId;
}
 
export function postPublish(user, url, description) {
    const resultNewPublish = db.query(`INSERT INTO posts ("userId", description, url) VALUES ($1, $2, $3);`,
     [user.rows[0].userId, description, url])
     
     return resultNewPublish;
}