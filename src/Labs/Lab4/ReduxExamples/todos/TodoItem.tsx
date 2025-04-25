import { Button, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: any) {
    const dispatch = useDispatch();

    return (
        <ListGroup.Item key={todo.id} className="d-flex">
            <span className="align-content-center">{todo.title}</span>
            <Button className="ms-auto" onClick={() => dispatch(setTodo(todo))} id="wd-set-todo-click"> Edit </Button>
            <Button className="mx-1" variant="danger" onClick={() => dispatch(deleteTodo(todo.id))} id="wd-delete-todo-click"> Delete </Button>
        </ListGroup.Item>);
}

