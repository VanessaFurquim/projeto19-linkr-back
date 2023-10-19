import bcrypt from 'bcrypt';
import { stripHtml } from "string-strip-html";
import { v4 as uuid } from 'uuid';
import { deleteToken, findEmail, findUser, insertSession, insertUser } from '../Repositories/auth.repository.js';

// ---------- Controllers SignIn -------------
export async function postSignIn(req, res) {

    const { email, password } = req.body;

    const sanitizedPassword = stripHtml(password).result.trim();


    try {
        const user = await findUser(email)

        if (user.rowCount === 0) return res.status(401).send({message:"User not registered!"});

        const passwordIsCorrect = bcrypt.compareSync(sanitizedPassword, user.rows[0].password);
        if (!passwordIsCorrect) return res.status(401).send({message: "Incorrect password!"});

        const token = uuid();

        await insertSession(token, user)  

        return res.status(200).send({ userId: user.rows[0].id, token: token, username: user.rows[0].username, picture: user.rows[0].photo });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

// ------------ Controllers SignUp -------------------
export async function postSignUp(req, res) {
    const { email, password, username, photo } = req.body;
    const senha = password;

    const passwordHash = bcrypt.hashSync(senha, 10);

    try {

        const searchUser = await findEmail(email);

        if (searchUser.rowCount > 0) return res.status(409).send({message: 'email já cadastrado'});

        await insertUser(req.body, passwordHash)

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

// -------------- Controllers SignOut -----------------

export async function signOut(req, res) {
    const session = res.locals.session
    console.log("já passou pela validação" , session.rows[0])

    try{
        await deleteToken(session)
        
        res.sendStatus(204)
     } catch (err) {
        res.status(500).send(err.message);
    }


}

