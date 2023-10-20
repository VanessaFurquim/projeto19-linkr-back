import { countLikes, findAllPublishes, findUserId, postPublish } from "../Repositories/publishes.repository.js";

export async function newPublish(req, res) {
    const { url, description } = req.body;
    const session = res.locals.session

    try {
        const user = await findUserId(session);

        await postPublish(user, url, description);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }


}

export async function getPublishes(req, res) {
   
    try {
        const publishes = await findAllPublishes();
        console.log("publishes", publishes)

       // const likes = await countLikes(publishes)
       // console.log("likes", likes.rows[0])


        const result = publishes.rows.map(p => {
            const obj = {
                username: p.username,
                picture: p.photo,
                post: {
                    id:p.id,
                    url: p.url,
                    description: p.description
                }
                /*
                trend: {
                    trend:p.trending
                },
                likes: {
                    likes:likes
                }
                */
            }
            delete obj.userId;
            /*
            delete obj.postId;
            delete obj.trendingId;
            */

            return obj;
        })
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }


}