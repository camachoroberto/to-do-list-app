const express = require('express');
const Events = require('../models/Events');
const Tasks = require('../models/Tasks');

const router = express.Router();

/* GET home page */
router.get('/', async (req, res, next) => {
  const events = await Events.find();
  res.render('index', { events });
});

router.get('/events/create', (req, res) => {
  res.render('create-event');
});

router.post('/events/create', (req, res) => {
  // const { name, deadLine, description, imageUrl } = req.body;
  const newEvent = new Events(req.body);
  console.log(newEvent);
  newEvent.save()
    .then(() => {
      console.log('Evento Criado com Sucesso');
      res.redirect('/');
    })
    .catch((err) => {
      throw new Error(err);
    });
});

router.get('/event/:eventID', async (req, res) => {
  const { eventID } = req.params;
  const event = await Events.findById(eventID);
  const tasks = await Tasks.find({ eventID });
  tasks.sort((a, b) => a.priority - b.priority);
  console.log(tasks)

  res.render('event-view', { event, tasks });
});

router.post('/task/create', (req, res) => {
  const newTask = new Tasks(req.body);
  newTask.save()
    .then(() => {
      console.log('Task Criada com Sucesso');
      res.redirect(`/event/${req.body.eventID}`);
    })
    .catch((err) => {
      throw new Error(err);
    });
});

router.get('/task/edit/:taskId', async (req, res) => {
  const task = await Tasks.findById(req.params.taskId);
  res.render('task-edit-view', task);
});

module.exports = router;
