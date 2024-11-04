
const cors = require('cors')
const morgan =  require('morgan')
const dotenv =  require('dotenv')
const colors =  require('colors')
const connectDb = require('./config/connectDb')
const express = require('express')
const path = require('path')
// config.env
dotenv.config();

//database call

connectDb();
// rest objects
const app =express();

// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
 



//routess
//app.get('/'): Defines a route that listens for GET requests to the root URL (/).
// res.send("<h1>Hello from Server</h1>"): Sends an HTML response when the root route is accessed.
// app.get('/', (req,res) =>{
//     res.send("<h1>hello from Server</h1>")
// })


// user routes 
app.use('/api/v1/users', require('./routes/userRoute'))


// trsnsaction routes
app.use('/api/v1/transactions', require('./routes/transactionRoutes'));

// static
app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function(req,res){
res.sendFile(path.join(__.dirname," ./client/build/index.html" ))
});
 
// port
const PORT = 8080 || process.env.PORT

// listen server
//Port Configuration: You set the port on which the server will listen for incoming requests, defaulting to port 3000 if no environment variable is provided.

//Starting the Server: Finally, you started the server with app.listen(PORT), which makes it ready to accept incoming requests.

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
    });