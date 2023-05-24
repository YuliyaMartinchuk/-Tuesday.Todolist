import {AssocTaskType, TodolistType} from "../App";
import {addTodoliststAC, todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";


test('ids should be equals', () => {
    const startTasksState: AssocTaskType = {} //создали  пустой объект с типизацией
    const startTodolistsState: TodolistType[] = [] //создали  пустой массив с типизацией

    const action = addTodoliststAC('new todolist') //3 типа передается

    const endTasksState = tasksReducer(startTasksState, action) //объект,  ключ и пустой массив
    const endTodolistsState = todolistsReducer(startTodolistsState, action) //массивв

    const keys = Object.keys(endTasksState) // проверяем сколько ключей. Должен быть один
    const idFromTasks = keys[0] //тип данны строка idFromTasks. Наша айдишка
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})
