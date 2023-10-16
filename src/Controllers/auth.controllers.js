import { getUserByEmail, createUser, getToken } from "../Repositories/auth.repository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
    const { email, password, username, picture } = req.body
  
    try {
  
      if (!email || !password || !username || !picture) {
          return res.status(400).send("Preencha todos os campos!")
        }
  
      const userExist = await getUserByEmail(email);
      if (userExist.rowCount > 0) return res.status(409).send("Email já cadastrado!")
  
      
      const hash = bcrypt.hashSync(password, 7)
  
      await createUser(email, hash, username, picture);
  
      res.sendStatus(201)
  
    } catch (err) {
      res.status(500).send(err.message)
    }
  }

  export async function signIn(req, res) {
    const { email, password } = req.body;
    const token = uuid();


    try {
        const user = (await loginUser(email)).rows[0];

        const verifyPassword = bcrypt.compareSync(password, user.password);
        if (!verifyPassword) { return res.status(401).send("Senha incorreta") };

        if (!user) {
            return res.status(401).send("Email incorreto")
        }

        if (user.token === null) {
            await db.query(
            getToken()
            ,[user.id, token])
            return res.send(token)
        }

        res.send(user.token);
    } catch (err) {
        res.status(500).send(err.message);
    }
}


 
