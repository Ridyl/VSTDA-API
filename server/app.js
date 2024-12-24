const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(morgan('dev'));

let initialData = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

app.get('/', (req, res) => {
    res.status(200).send(initialData);
});

app.get('/api/TodoItems', (req, res,) => {
        res.status(200).send(initialData);
});

app.get('/api/TodoItems/:number', (req, res) => {
    let num = parseInt(req.params.number);
    let item = initialData.find(todo => todo.todoItemId === num);
    res.status(200).send(item);
});

app.post('/api/TodoItems', (req, res) => {
    // Parse information from request body
    const {todoItemId, name, priority, completed} = req.body;
    // Create new object to be pushed to array
    if (!name || priority === undefined || completed === undefined) {
        
    }


    const newTodo = {
        todoItemId, 
        name, 
        priority, 
        completed
    };

    initialData.push(newTodo);

    res.status(201).json(newTodo);
});

app.delete('/api/TodoItems/:number', (req, res) => {
    let rem = parseInt(req.params.number);

    // Find the index of the todo item to delete
    const index = initialData.findIndex(todo => todo.todoItemId === rem);

    if (index !== -1) {
        // Item found, remove it
        const removedItem = initialData.splice(index, 1)[0];
        res.status(200).json(removedItem);
    } else {
        // Item not found
        res.status(404).json({
            message: `Todo item with ID ${rem} not found.`,
        });
    }
});

module.exports = app;
