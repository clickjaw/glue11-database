const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3005;
const bodyParser = require('body-parser')
const mongoose = require("mongoose");

const todoRouter = require("./routes/getToDos");

const toDoModel = require("./models/todoModel");

mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(()=> console.log("Connected to MongoDB"))
.catch(err=>{
    console.log(err);
})
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.get('/', (request, response)=>{
    let today = new Date;
    response.send(`Hello World / ${today}`)
})

app.get('/todos', async (req, res) => {
    const { toDoDescription } = req.query; // from the user
    // use the findOne() method
    const allTODO = await toDoModel.findOne({ toDoDescription: toDoDescription }); // if empty, gets all employees

    res.status(200).send(allTODO);
})

app.post('/new-todo', async (req, res) => {
    try {
      
        const newToDo = await toDoModel.create(req.body); 
        res.send(`To Do sucessfully Created : ${newToDo}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating Employee');
    }
})

app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id; // From the client

    try {

        await toDoModel.findByIdAndDelete(id); // thos does ALL the work for me. yay!

        // We don't need to send any data, but we do need a success message
        res.send('Item Deleted');

    } catch (error) {
        console.error(error);
        res.status(404).send('Error occured. Try again.')
    }

})

app.use(todoRouter)


app.listen(PORT, ()=> console.log(`Keep going. Port: ${PORT}`))