import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";
import { useRef, useState, useEffect } from "react";

const Todo = () => {

    const inputRef = useRef();
    const [todoList, setTodoList] = useState(
        localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : []);

    // [add] button functionality
    const add = () => {
        const inputText = inputRef.current.value.trim();

        if (inputText === "") {
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false
        }
        setTodoList((currentTodos) => [...currentTodos, newTodo]);
        inputRef.current.value = "";
    }

    // [delete] button functionality
    const deleteTodo = (id) => {
        setTodoList((currentTodos) => {
           return currentTodos.filter((item) => item.id !== id)
        })
    }

    // check/uncheck functionality
    const toggle = (id) => {
        setTodoList((currentTodos) => {
            return currentTodos.map((item) => {
                if(item.id === id){
                    return {...item, isComplete: !item.isComplete};
                }
                return item;
            })
        })
    }
    
    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList])

    return (
        <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[500px] rounded-xl">
            <div className="flex items-center mt-7 gap-2">
                <img src={todo_icon} alt="To-Do icon" className="w-8" />
                <h1 className="text-3xl font-semibold">To-Do List</h1>
            </div>

            <div className="flex items-center my-7 bg-gray-200 rounded-full">
                <input ref={inputRef} type="text" placeholder="Add Task" className="bg-transparent border-0 outline-none 
                    flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600" />
                <button 
                    onClick={add}
                    className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg 
                    font-medium cursor-pointer">Add +</button>
            </div>

            <div>
                {todoList.map((item, index) => {
                    return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}></TodoItems>
                })}
            </div>
        </div>
    )
}

export default Todo