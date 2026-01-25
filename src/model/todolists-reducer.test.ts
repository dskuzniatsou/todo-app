import uuid from "react-uuid";
import {beforeEach, expect, test} from 'vitest'
import {
    addTodoAC, changeTodoFilterAC,
    deleteTodoAC,
    todolistsReducer,
    type TodoState,
    toggleTodoAC,
    updateTitleTodoAC
} from "./todolists-reducer.ts";


let todolistId1: string
let todolistId2: string
let startState: TodoState

beforeEach(() => {
    todolistId1 = uuid()
    todolistId2 = uuid()

    startState = {
        todos: [
            {id: todolistId1, text: 'What to learn', completed: false, tasks: []},
            {id: todolistId2, text: 'What to buy', completed: true, tasks: []},
        ],
        filter: 'active',
    };
})
    //
    test('correct todolist should be deleted', () => {
            const endState = todolistsReducer(startState, deleteTodoAC(todolistId1))
            // 3. Проверка, что действие измененило state соответствующим образом
            // в массиве останется один тудулист
            expect(endState.todos.length).toBe(1)
            // удалится нужный тудулист, не любой
            expect(endState.todos[0].id).toBe(todolistId2)
        }
    )
    test ('addTodo создает правильный action', () => {

            const text = 'new todo'
        const action = addTodoAC(text)
        const todoId = action.payload.id
        const endState = todolistsReducer(startState,action )

        expect(endState.todos.length).toBe(3)
        expect(endState.todos[0].text).toBe(text)
        expect(endState.todos[1].text).toBe('What to learn')
    }
    )

test ('correct todo should be toggled',()=> {
    const endState = todolistsReducer(startState, toggleTodoAC(todolistId2))

    expect(endState.todos[0].completed).toBe(false) // Первый не изменился
    expect(endState.todos[1].completed).toBe(false) // Второй изменился с true на false

})
    test('correct todolist should change its filter', () => {
        const filter = 'active'
        const endState = todolistsReducer(startState, changeTodoFilterAC( filter))

        expect(endState.todos).toHaveLength(2)
        expect(endState.filter).toBe(filter)
    })
//
    test('correct todo should be change its title', () => {
        const text = 'Hello World!'
        const endState = todolistsReducer(startState, updateTitleTodoAC(todolistId2, text))

        expect(endState.todos[0].text).toBe('What to learn')
        expect(endState.todos[1].text).toBe(text)
    })