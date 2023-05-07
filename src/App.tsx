import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type AssocTaskType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<AssocTaskType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ],

    });



    function removeTask(todolistId: string, taskId: string ) {
        setTasks({...tasks,[todolistId]:tasks[todolistId].filter(el=>el.id!==taskId)})
    }

   function changeStatus(todolistId: string, taskId: string, isDone: boolean ) {
        setTasks({...tasks, [todolistId]:tasks[todolistId].map(el=>el.id === taskId? {...el, isDone} : el)})

    }

    function changeFilter(todolistId: string, value: FilterValuesType ) {
        setTodolists(todolists.map(el=>el.id===todolistId ? {...el,filter:value}:el))
    }



    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(el=>el.id!== todolistId))
        delete tasks[todolistId]
    }

    function addTask(todolistId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone:false};
        setTasks({...tasks, [todolistId]:[newTask,...tasks[todolistId]]})
    }

    const addTodolists = (newTitle: string) => {
        const newTodolistID = v1()
        const newTodolist: TodolistType = {id: newTodolistID, title: newTitle, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks,[newTodolistID]:[]})
    }

    const updateTask=(todolistId: string,taskId: string,updateTitle:string)=>{
        setTasks({...tasks,[todolistId]:tasks[todolistId].map(el=>el.id===taskId ? {...el, title:updateTitle} :el)})
    }

    const updateTodolistTitle=(todolistId: string,updateTitle:string)=>{
        setTodolists(todolists.map(el=>el.id===todolistId ? {...el,title:updateTitle}:el))
    }


    return (
        <div className="App">
            <AddItemForm callBack={addTodolists}/>
            {
                todolists.map(tl => {
                    let taskForTodolist = tasks[tl.id];
                    let tasksForTodolist = taskForTodolist;

                    if (tl.filter === "active") {
                        tasksForTodolist = taskForTodolist.filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = taskForTodolist.filter(t => t.isDone);
                    }

                    return <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        updateTodolistTitle={updateTodolistTitle}
                    />
                })
            }

        </div>
    );
}

export default App;
