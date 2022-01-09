import express from "express";
import Assignment from "../models/assignment";
import { averageScore, deleteAssignment, findAssignmentById, fullAverageScore, updateAssignment } from "../models/assignment-database";

const assignmentRoutes = express.Router();

export let assignmentArray: Assignment[] = [
{
    name: "Walrus Worksheet",
    score: 9,
    total: 10,
    completed: true,
    id: 1
},
{
    name: "Jellyfish Project",
    score: 15,
    total: 15,
    completed: true,
    id: 2
},
{
    name: "Dolphin Quiz",
    score: 8,
    total: 10,
    completed: true,
    id: 3
},
{
    name: "Oceans Unit Test",
    score: 0,
    total: 25,
    completed: false,
    id: 4
}];
let nextId = 6;


// API
assignmentRoutes.get("/api/assignments/", (req, res) => {
    res.json(assignmentArray);
});

assignmentRoutes.get("/api/summary", (req, res) => {
    let fullAverage = fullAverageScore(assignmentArray);
    res.json(
    { 
        fullAverage,
        assignmentArray
    });

    res.status(200);
});

// WEB

assignmentRoutes.get("/", (req, res) => {
    let average = averageScore(assignmentArray);
    if (assignmentArray.length === 0) {
        average = 0;
    }
    // if (completed === true) {
    //     completed = "&check";
    // }
    // else {

    // }
        res.render("home", { average, assignmentArray });
});

function createAssignment(assignment: Assignment):void {
    assignment.id = nextId;
    nextId += 1;
    assignmentArray.push(assignment);
  }

assignmentRoutes.get("/add", (req, res) => {
    res.render("add");
});

assignmentRoutes.post("/add-confirmation", (req, res) => {

        const newAssignment: Assignment = {
          name: req.body.name as string,
          score: parseInt(req.body.score),
          total: parseInt(req.body.total),
          completed: Boolean(req.body.completed as string),
        }
        createAssignment(newAssignment);

        res.render("add-confirmation", { newAssignment });
});

// console.log(findAssignmentById(4));

assignmentRoutes.get("/api/assignments/:id/delete", (req, res) => {
    let id = parseInt(req.params.id);
    let assignment = findAssignmentById(id);

    res.render("delete", {id, assignment});
});

assignmentRoutes.get("/api/assignments/:id/delete-confirmation", (req, res) => {
    let id = parseInt(req.params.id);
    let assignment = findAssignmentById(id);

    if (assignment) {
        deleteAssignment(id);
        res.render("delete-confirmation",  { name: assignment.name })
    }
    else {
        res.status(404).render("error/not-found");
    }

});

assignmentRoutes.get("/api/assignments/:id/edit", (req, res) => {
    let id = parseInt(req.params.id);
    let assignment = findAssignmentById(id);

    if (assignment) {
        res.render('edit', { assignment });
      } else {
        res.status(404).render('error/not-found');
      }
});

assignmentRoutes.put("/api/assignments/:id/edit-confirmation", (req, res) => {

    let assignment: Assignment = {
        id: parseInt(req.params.id),
        name: req.body.name as string,
        score: parseFloat(req.body.score),
        total: parseFloat(req.body.total),
        completed: Boolean(req.body.completed)
      }
      if(updateAssignment(assignment)) {
        res.render('edit-confirmation', { assignment });
      } else {
        res.status(404).render('error/not-found');
      }
    });

export default assignmentRoutes;