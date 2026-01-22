import uuid from "react-uuid";
import type {Todo} from "../App.tsx";
import { beforeEach, expect, test } from 'vitest'
import {addTodoAC, deleteTodoAC, todolistsReducer, toggleTodoAC, updateTitleTodoAC} from "./todolists-reducer.ts";



let todolistId1: string
let todolistId2: string
let startState: Todo[] = []

beforeEach(() => {
    todolistId1 = uuid()
    todolistId2 = uuid()


    startState = [
        {id: todolistId1, text: 'What to learn', completed: false},
        {id: todolistId2, text: 'What to buy', completed: true, tasks: []},
    ]
})
test ('correct todolist should be deleted', ()=>{

    //2.действие
    // const action = {
    //     type: 'DELETE_TODO',
    //     payload: {
    //         id: todolistId1,
    //     }
    // } as const
        const endState = todolistsReducer(startState, deleteTodoAC(todolistId1))
        // 3. Проверка, что действие измененило state соответствующим образом
        // в массиве останется один тудулист
        expect(endState.length).toBe(1)
        // удалится нужный тудулист, не любой
        expect(endState[0].id).toBe(todolistId2)
}
)
test ('correct todolist should be created', ()=>{


    const endState = todolistsReducer(startState, addTodoAC( 'new todo'))

    expect(endState.length).toBe(3)
    expect(endState[2].text).toBe('new todo')
expect(endState[2].completed).toBe(false)
})

test ('correct todo should be toggled',()=> {
    const completed = false
    const endState = todolistsReducer(startState, toggleTodoAC(todolistId2, completed))

    expect(endState[0].completed).toBe(false)
    expect(endState[1].completed).toBe(false)
})
test ('correct todo should be toggled',()=> {
    const text = 'Hello World!'
    const endState = todolistsReducer(startState, updateTitleTodoAC(todolistId2, text))

    expect(endState[0].text).toBe('What to learn')
    expect(endState[1].text).toBe('Hello World!')
})