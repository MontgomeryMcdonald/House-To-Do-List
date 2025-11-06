import express from 'express';
import Task from '../models/to-do.js'
const router = express.Router();



// Helper to read/write JSON "database"


// INDEX — list + basic search
router.get('/', async (req, res) => {
  const { search = '', cohort = '' } = req.query;
  const q = {}
  if (search) {
    const re = new RegExp(search, 'i');
    // 'i'; creates a regular expression object from the value of the search and with 'i', making it case-insensitive

    // dude i told my therapist a joke and he wrote it down. he stole my joke 

    // example - if search='jose' the regex would equal /jose/i

    q.$or = [
      // $or is a mongodb operator that is used to match any of the conditions inside the array. where each entry in the array is a condition to be matched.

      {taskName:re},
      {duedate:re},
      {taskExecutor:re},
      {taskLocation:re},
      {completed:re},
    ]
  }
    const data = await Task.find(q).sort({createdAt: -1}).lean()
  res.render('todo-list/index', { data, search});
});

// NEW — show form
router.get('/new', (req, res) => {
  res.render('todo-list/new');
});

// CREATE — handle form
router.post('/', async (req, res) => {
  const { taskName, duedate, taskExecutor, taskLocation, completed} = req.body;
  const completedBool = completed == "on" ? true : false
  await Task.create({taskName, duedate, taskExecutor, taskLocation, completed : completedBool})
  res.redirect('/todo-list');
});

// SHOW
router.get('/:id', async (req, res) => {
  const data = await Task.findById(req.params.id)
  if(!data) return res.status(404).send("Not Found")
    Task.CreatedAt = Task.createdAt || new Date()
  res.render('todo-list/show', { Task : data });
});

// EDIT — form
router.get('/:id/edit', async (req, res) => {
  const data = await Task.findById(req.params.id).lean()
  if(!data) return res.status(404).send("Not Found")
    res.render('todo-list/edit', { Task :{...data}, id:Task._id})
})

// UPDATE
router.put('/:id',async (req, res) => {
  const {taskName, taskLocation, taskExecutor, completed, duedate} = req.body
  await Task.findByIdAndUpdate(req.params.id, {taskName, taskLocation, taskExecutor, completed, duedate}, {new:true}).lean()
  res.redirect(`/todo-list/${req.params.id}`)
});

// DELETE
router.delete('/:id',async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
  res.redirect(`/`)
});

export default router;
