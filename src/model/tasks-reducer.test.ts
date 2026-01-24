import {beforeEach, test, expect} from "vitest";

import type {TasksState} from "../App.tsx";
import {addTaskAC, addTodoAC, deleteTaskAC, tasksReducer, toggleTaskAC, updateTitleTaskAC} from "./tasks-reducer.ts";


let startState: TasksState = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: '1', text: 'CSS', completed: false},
            {id: '2', text: 'JS', completed: true},
            {id: '3', text: 'React', completed: false},
        ],
        todolistId2: [
            {id: '1', text: 'bread', completed: false},
            {id: '2', text: 'milk', completed: true},
            {id: '3', text: 'tea', completed: false},
        ],
    }
})
//
// test ('todolist should be added', () => {
//
//     const endState = tasksReducer(
//         startState,
//         addTodoAC({
//             todolistId: 'todolistId2',
//             text: 'juice',
//         })
//     )
//
//     expect(endState.todolistId1.length).toBe(3)
//     expect(endState.todolistId2.length).toBe(4)
//     expect(endState.todolistId2[0].id).toBeDefined()
//     expect(endState.todolistId2[0].text).toBe('bread')
//     expect(endState.todolistId2[0].completed).toBe(false)
// }
// )

test ('should add task to todo', () => {

    const endState = tasksReducer(startState, addTaskAC('todolistId1', 'Яйца'));

    expect(endState['todolistId1']).toHaveLength(4);
    expect(endState['todolistId1'][3].text).toBe('Яйца');
    expect(endState['todolistId1'][3].completed).toBe(false);
})
test('should delete task from todo', () => {

    const endState = tasksReducer(startState, deleteTaskAC('todolistId1', '2'))

    expect(endState['todolistId1']).toHaveLength(2);
    expect(endState['todolistId1'][1].id).toBe('3');
});

test('should toggle task status', () => {

    const endState = tasksReducer(startState, toggleTaskAC('todolistId1', '3'));

    expect(endState['todolistId1'][2].completed).toBe(true); // Было false
    expect(endState['todolistId1'][1].completed).toBe(true); // Осталось true
});

test('should toggle task status', () => {

    const endState = tasksReducer(startState, updateTitleTaskAC('todolistId1', '3', "COCO"));

    expect(endState['todolistId1'][2].text).toBe("COCO"); // Было false
    expect(endState['todolistId1'][1].completed).toBe(true); // Осталось true
});