const express = require('express')
const toDo = require('../models/todoModel');
const todoRouter = express.Router();

todoRouter.get('/todo', async(req,res)=>{

    const myToDo = await toDo.find({});
    res.send(myToDo);
})

module.exports= todoRouter;