import assignmentRoutes from "../routes/assignment-routes"; 
import { assignmentArray } from "../routes/assignment-routes";
import Assignment from "./assignment";

export function averageScore(array:Assignment[]):number {
    let totalSum = 0;
    let scoreSum = 0;

        for (let i = 0; i < array.length; i++) {
            if (array[i].completed === true) {
                scoreSum += array[i].score;
                totalSum += array[i].total;
        }
    }
        let average = ( scoreSum / totalSum ) * 100;

        return parseFloat(average.toFixed(1));
}

export function fullAverageScore(array:Assignment[]):number {
    let totalSum = 0;
    let scoreSum = 0;

        for (let i = 0; i < array.length; i++) {
            if (array[i].completed === true) {
                scoreSum += array[i].score;
                totalSum += array[i].total;
        }
    }
        let average = ( scoreSum / totalSum ) * 100;
        return average;
}

export function findAssignmentById(id: number): Assignment|undefined {
    return assignmentArray.find( assignmentArray=> assignmentArray.id === id);
  }

export function deleteAssignment(id: number):boolean {
    const index = assignmentArray.findIndex(assignmentArray => assignmentArray.id === id);

    if (index == -1) {
        return false;
    }
    else {
        assignmentArray.splice(index, 1);
        return true;
    }
}
export function updateAssignment(assignment: Assignment): boolean {
    let index = assignmentArray.findIndex(assignment => assignment.id === assignment.id);
    if (index == -1) {
      return false;
    } else {
      assignmentArray[index] = assignment;
      return true;
    }
  }


