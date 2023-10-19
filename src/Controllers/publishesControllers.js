import { findUserId, postPublish } from "../Repositories/publishes.repository.js";

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