// USER MODEL MAY NEED TO BE WORKOUT, AS THERE IS NO LOGIN/LOGOUT FUNCTIONALITY FOR THE APP

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Workout schema has type, name, duration, weight, reps, and sets 
const WorkoutSchema = new Schema({});

// This creates our model from the above schema, using mongoose's model method
const Workout = mongoose.model("Workout", WorkoutSchema);

// Export the User model
module.exports = Workout;
