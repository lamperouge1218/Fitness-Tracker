const router = require("express").Router();
const db = require("../models");

// GET all Workouts
// do aggregate function up here lol
router.get("/api/workouts", (req, res) => {
  db.Workout.find().sort({ day: -1 }).limit(1);
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((workout) => {
      res.status(200).json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// POST new Workout
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Add an exercise to the most recent workout plan
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $push: {
        exercises: req.body,
      },
    },
    {
      new: true,
    }
  )
    .then((workout) => {
      res.status(200).json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// View combined weight on stats page of the past seven workouts
router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: `$exercises.duration`,
        },
        totalPounds: {
          $sum: `$exercises.weight`,
        },
      },
    },
  ])
    .then((workout) => {
      res.status(200).json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
