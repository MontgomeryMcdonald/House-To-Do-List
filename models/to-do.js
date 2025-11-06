import mongoose from 'mongoose'

const taskSchema= new mongoose.Schema({
    "taskName" : {type: String, required:true},
    "duedate" : {type: String},
    "taskExecutor" : {type: String, required:true},
    "taskLocation" : {type: String, enum: ['Kitchen', 'Living Room', 'Bathroom', 'Bedroom', 'Garage', 'Yard', 'Other']},
    "completed" : {type: Boolean, required:true},
    
}, {timestamps: true})

export default mongoose.models.Event || mongoose.model('Task', taskSchema)