import uuid from "react-uuid";
import type {Todo} from "../App.tsx";
import { beforeEach, expect, test } from 'vitest'
import {todolistsReducer} from "./todolists-reducer.ts";


let todolistId1: string
let todolistId2: string
let startState: Todo[] = []

beforeEach(() => {
    todolistId1 = uuid()
    todolistId2 = uuid()

    startState = [
        {id: todolistId1, text: 'What to learn', completed: false},
        {id: todolistId2, text: 'What to buy', completed: true},
    ]
})
test ('correct todolist should be deleted', ()=>{

    //2.действие
    const action = {
        type: 'DELETE_TODO',
        payload: {
            id: todolistId1,
        }
    }
        const endState = todolistsReducer(startState, action)
        // 3. Проверка, что действие измененило state соответствующим образом
        // в массиве останется один тудулист
        expect(endState.length).toBe(1)
        // удалится нужный тудулист, не любой
        expect(endState[0].id).toBe(todolistId2)
}
)