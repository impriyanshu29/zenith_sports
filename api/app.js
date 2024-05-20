import express from 'express'
import userRouter from '../routes/user.routes.js'
import authRouter from '../routes/auth.routes.js'
import postRouter from '../routes/post.routes.js'
import alumniRouter from '../routes/alumni.routes.js'
import userList from '../routes/userList.routes.js'
import cookieParser from 'cookie-parser'
import achievment from '../routes/achievment.routes.js'
import path from 'path';

const app = express()

const __dirname = path.resolve();
app.use(express.json())
app.use(cookieParser());
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/post",postRouter)
app.use("/api/alumni",alumniRouter)
app.use("/api/list",userList)
app.use("/api/achievment",achievment)



app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
);

export default app


























































































































// app.use(): This is like telling your server, "Hey, when you get a request, make sure to run some code before sending a response."
// "/api/auth": Imagine this as a specific area in your website. If someone tries to go to any address that starts with /api/auth, we want to do something special.
// authRouter: Think of this like a set of instructions. When someone goes to a URL starting with /api/auth, follow these instructions to handle their request.