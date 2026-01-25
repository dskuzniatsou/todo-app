import {beforeEach, test, expect} from "vitest";

import type {TasksState} from "../App.tsx";
import {addTaskAC, deleteTaskAC, tasksReducer, toggleTaskAC, updateTitleTaskAC} from "./tasks-reducer.ts";
import { addTodoAC, deleteTodoAC } from "./todolists-reducer.ts";
import uuid from "react-uuid";


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
test('todolist should be added', () => {

        // const endState = tasksReducer(startState, addTodoAC('todolistId3', 'juice'))
        // expect(endState).toHaveLength(3)
        // expect(endState.todolistId.length).toBe(3)
        // expect(endState["todolistId3"]).toBe("juice")

        const todoTitle = 'Новая задача';
        const action = addTodoAC( todoTitle)
        const endState = tasksReducer(startState,action)
        const newTodoId = action.payload.id
// Проверяем, что добавлен новый ключ с пустым массивом
        expect(endState[newTodoId]).toBeDefined();
        expect(endState[newTodoId]).toEqual([]);

        // Проверяем, что старые данные не изменились
        expect(endState["todolistId1"]).toEqual(startState["todolistId1"]);
        expect(endState["todolistId2"]).toEqual(startState["todolistId2"]);

        // Проверяем количество ключей
        expect(Object.keys(endState)).toHaveLength(3);
    }
)

test('should add task to todo', () => {

    const endState = tasksReducer(startState, addTaskAC('todolistId1', 'Яйца'));

    expect(endState['todolistId1']).toHaveLength(4);
    expect(endState['todolistId1'][3].text).toBe('Яйца');
    expect(endState['todolistId1'][3].completed).toBe(false);
})
test("todolist should be deleted", () => {
    // const action = deleteTodoAC("todolistId1");
    const endState = tasksReducer(startState, deleteTodoAC("todolistId1"));

    // Проверяем, что ключ удален
    expect(endState["todolistId1"]).toBeUndefined();

    // Проверяем, что остальные данные остались
    expect(endState["todolistId2"]).toEqual(startState["todolistId2"]);

    // Проверяем количество ключей
    expect(Object.keys(endState)).toHaveLength(1);
});
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

test('should update  task  title', () => {

    const endState = tasksReducer(startState, updateTitleTaskAC('todolistId1', '3', "COCO"));

    expect(endState['todolistId1'][2].text).toBe("COCO"); // Было false
    expect(endState['todolistId1'][1].completed).toBe(true); // Осталось true
});