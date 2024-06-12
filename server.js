import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import http from 'http'
import router from './src/route/index.js'
import connectDB from './database.js'


const app = express()
dotenv.config();

const server = http.createServer(app)


app.use(cors({origin:"*"}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/vidtube', router)





const startServer = async () => {
   const PORT = process.env.PORT || 5505;
   connectDB();
   try {
       server.listen(PORT, () => {
           console.log(`APP IS RUNNING ON PORT: ${PORT}`);
       });
   } catch (error) {
       console.log(error);
   }
};

startServer();

app.get("/", (req,res) => {
   res.send('API IS RUNNING')
})