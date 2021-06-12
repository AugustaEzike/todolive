const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req, res) => {
        console.log(req.user)
        try {
            //Do we want to grab all the todos?
            const todoItems = await Todo.find({microsoftId: req.user.microsoftId})           
            //How can we grab all users left to dos? -  const itemsLeft = await Todo.countDocuments({completed: false})
            //how to grab the logged in user left to do items?
            const itemsLeft = await Todo.countDocuments({microsoftId: req.user.microsoftId, completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        } catch (err) {
            console.log(err)
        }
    },
    createTodo: async (req, res) => {
        try {
            await Todo.createTodo({todo: req.body.todoItem, completed: false, microsoftId: req.user.microsoftId})
            console.log('Todo has been added!')
            res.redirect('/todos')
        } catch (err) {
            console.log(err)            
        }
    },
    markComplete: async (req, res) => {
        try {
            await Todo.findOneAndUpdate({_id: req.body.todoIdFromJSFile}, {
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        } catch (err) {
            console.log(err)            
        }
    },
    markIncomplete: async (req, res) => {
        try {
            await Todo.findOneAndUpdate({_id: req.body.todoIdFromJSFile}, {
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        } catch (err) {
            console.log(err)            
        }
    },
    deleteTodo: async (req, res) => {
        console.log(req.body.todoIdFromJSFile)
        try {
            await Todo.findOneAndDelete({_id: req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json("deleted It")
        } catch (err) {
            console.log(err)
        }
    }
}