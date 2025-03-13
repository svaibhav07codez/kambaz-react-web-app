import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroup } from "react-bootstrap";

export default function TodoList() {
  const { todos } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem
            key={todo.id} // Ensuring each TodoItem has a unique key
            todo={todo}
            deleteTodo={(id: string) => dispatch(deleteTodo(id))}
            setTodo={(todo: { id: string; title: string }) => dispatch(setTodo(todo))}
          />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
