import express from "express";
import Assignment from "../models/assignment";

const assignmentRoutes = express.Router();

let assignmentArray: Assignment[] = [
{
    assignment: "Walrus Worksheet",
    score: 9,
    total: 10,
    completed: true,
    id: 1
},
{
    assignment: "Jellyfish Project",
    score: 15,
    total: 15,
    completed: true,
    id: 2
},
{
    assignment: "Dolphin Quiz",
    score: 8,
    total: 10,
    completed: true,
    id: 3
},
{
    assignment: "Oceans Unit Test",
    score: 0,
    total: 25,
    completed: false,
    id: 4
}];
let nextId = 6;

assignmentRoutes.get("/", (req, res) => {
    res.json(assignmentArray);
})

assignmentRoutes.get("/home", (req, res) => {
    res.render("home", {assignmentArray});
})

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
          assignment: req.body.name as string,
          score: parseInt(req.body.score),
          total: parseInt(req.body.total),
          completed: Boolean(req.body.completed),
        }
        createAssignment(newAssignment);

        res.render("add-confirmation", { newAssignment });
});




export default assignmentRoutes;