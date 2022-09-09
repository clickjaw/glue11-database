const mongoose = require('mongoose');


//create a Schema

let ToDoSchema = new mongoose.Schema({
    
    toDoDescription: String,
    dueDate: String
    
})

//create the model

// const toDoModel = new mongoose.model('toDoList', ToDoSchema);

module.exports = mongoose.model('toDoModel', ToDoSchema);

