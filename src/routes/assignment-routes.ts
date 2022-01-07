import express from "express";
import Assignment from "../models/assignment";

const assignmentRoutes = express.Router();

let assignmentArray: Assignment[] = [
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



assignmentRoutes.get("/api/assignments/", (req, res) => {
    res.json(assignmentArray);
})

assignmentRoutes.get("/", (req, res) => {
    res.render("home", {assignmentArray} );
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
          name: req.body.name as string,
          score: parseInt(req.body.score),
          total: parseInt(req.body.total),
          completed: Boolean(req.body.completed as string),
        }
        createAssignment(newAssignment);

        res.render("add-confirmation", { newAssignment });
});




export default assignmentRoutes;