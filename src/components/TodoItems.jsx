import checked from "../assets/checked.png"
import not_checked from "../assets/not_checked.png"
import delete_icon from "../assets/delete.png"

const TodoItems = ({text, id, isComplete, deleteTodo, toggle}) => {
    return (
        <div className="flex items-center my-3 gap-2">
            <div onClick={() => {toggle(id)}} className="flex flex-1 items-center cursor-pointer">
                <img src={isComplete ? checked : not_checked} alt="Check icon" className="w-7" />
                <p className={`text-slate-700 ml-4 text-[17px] ${isComplete ? "line-through" : ""}`}>
                    {text}
                </p>
            </div>
            <img onClick={() => {deleteTodo(id)}} src={delete_icon} alt="Delete icon" className="w-3.5 cursor-pointer" />
        </div>
    )
}

export default TodoItems