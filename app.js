import express from 'express';
import path from 'path';
import methodOverride from 'method-override';
import studentsRouter from './routes/todo-list.js';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// EJS + static
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing + method override for PUT/DELETE from forms
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// MongoDB Connection

const uri = process.env.MONGODB_URI || ""
mongoose.connect(uri).then( () =>{
  console.log(" \n MongoDB Connected \n")
}).catch(err=>{
  console.error("MongoDB COnnection errored. my bad gang: ", err)
})





// Home
app.get('/', (req, res) => {
  res.redirect('/todo-list');
});

// Routes
app.use('/todo-list', studentsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
