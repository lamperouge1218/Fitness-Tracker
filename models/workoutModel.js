// USER MODEL MAY NEED TO BE WORKOUT, AS THERE IS NO LOGIN/LOGOUT FUNCTIONALITY FOR THE APP

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Workout schema has type, name, duration, weight, reps, and sets\
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date(),
  },
  exercises: [
    {
      type: {
        type: String,
      },
      name: {
        type: String,
        required: "Please input the name of your workout",
      },
      duration: {
        type: Number,
        required: "Please input a duration",
      },
      weight: {
        type: Number,
        required: "Please input a weight value",
      },
      reps: {
        type: Number,
        required: "Please input a number of reps",
      },
      sets: {
        type: Number,
        required: "Please input a number of sets",
      },
      distance: {
        type: Number,
        required: "Please input a distance",
      },
    },
  ],
  excercisesDuration: {
    type: Number,
    default: 0,
  },
});

WorkoutSchema.methods.fullDuration = function () {
  // the total of each duration in the exercises array(????)
  this.excercisesDuration = exercises.duration.reduce(function (a, b) {
    return a + b;
  }, 0);
};

// This creates our model from the above schema, using mongoose's model method
const Workout = mongoose.model("Workout", WorkoutSchema);

// Export the User model
module.exports = Workout;
