import { useState } from "react";
import { useTodo } from "../../context/TodoContext";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
        todo.completed ? "bg-gray-100" : "bg-white"
      }`}
    >
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`flex-grow text-gray-700 text-sm focus:outline-none bg-transparent ${
          isTodoEditable ? "border-b border-gray-300 pb-1" : ""
        } ${todo.completed ? "line-through text-gray-500" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "Save" : "Edit"}
      </button>
      <button
        className="text-sm text-red-500 hover:text-red-700 focus:outline-none"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
