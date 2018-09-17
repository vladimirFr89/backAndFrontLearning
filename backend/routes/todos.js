const express = require('express');
const router = express.Router();
const data = require('../data/todoList');

/* GET list of todos. */
router.get('/', function(req, res, next) {
    console.log(data);
    res.json(data);
});

router.get('/:id', function (req, res, next) {
    const key = 'id';
    if(!req.params.hasOwnProperty(key)) {
        res.json({})
    }
    console.log('params has a key id with value is: ' + req.params[key]);
    const id = !isNaN(parseInt(req.params[key]))
        ? parseInt(req.params[key])
        : -1;

    console.log('id = ' + id);

    let idxFounded = -1;
    for (var i = 0; i < data.length; i++) {
        if(data[i].id === id) {
            idxFounded = i;
        }
    }

    if (idxFounded >= 0) {
        res.json(todos[idxFounded])
    } else {
        res.json({})
    }
});

router.get('/remove/:id', function (req, res, next) {
    const key = 'id';
    if(!req.params.hasOwnProperty(key)) {
        res.json({Message: 'неверный id'});
    }
    console.log('params has a key id with value is: ' + req.params[key]);
    const id = !isNaN(parseInt(req.params[key]))
        ? parseInt(req.params[key])
        : -1;

    console.log('id = ' + id);

    let deletedIdx = -1;
    for (let i = 0; i < data.length; i++) {
        if(data[i].id === id) {
            deletedIdx = i;
            break;
        }
    }

    if (deletedIdx >= 0) {
        data.splice(deletedIdx,1);
        res.json({})
    } else {
        res.json({ Message: 'id не найден' })
    }
});

module.exports = router;