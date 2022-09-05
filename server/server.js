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

const seedDatabase = async(res,req) =>{
    try {
    let toDo1 = new toDoModel({
        toDoDescription: 'vacuum carpets',
        dueDate: 'Thursday'
    })
    let toDo2 = new toDoModel({
        toDoDescription: 'wash work clothes',
        dueDate: 'Saturday'
    })
    let toDo3 = new toDoModel({
        toDoDescription: 'study',
        dueDate: 'Monday'
    })
    await toDo1.save();
    await toDo2.save();
    await toDo3.save();

    } catch (error) {
        console.log(error)
    }
}

seedDatabase();

app.use(todoRouter)


app.listen(PORT, ()=> console.log(`Keep going. Port: ${PORT}`))