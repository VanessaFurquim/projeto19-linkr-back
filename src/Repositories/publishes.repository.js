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


export function findAllPublishes() {

    const publishesResult = db.query(`
    SELECT users.username, users.photo, posts.*
	FROM users
	JOIN posts ON users.id = posts."userId"
    ORDER BY posts.id DESC
    LIMIT 20;`)

    /*
        SELECT users.username, users.photo, posts.*, post_trending."postId", post_trending."trendingId", trendings.trending
        FROM posts
        JOIN users ON posts."userId" = users.id
        JOIN post_trending ON posts.id = post_trending."postId"
        JOIN trendings ON post_trending.id = trendings.id
    */

    return publishesResult
}

// ------------------- likes --------------------------

export function insertLikes(user, idPost){
    const resultInsertLike = db.query(` INSERT INTO likes ("userId", "postId") VALUES ($1, $2);`, [user.rows[0].userId, idPost ])

    return resultInsertLike
}
export function countLikes(idPost) {
    const resultLike = db.query(` SELECT COUNT(likes) AS "likes" FROM likes WHERE "postId" = $1;`, [idPost])

    return resultLike
}
