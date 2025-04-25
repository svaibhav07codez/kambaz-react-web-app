import { Button, FormControl, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <ListGroup.Item className="d-flex">
            <FormControl value={todo.title}
                onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} />
            <Button className="ms-auto " variant="warning" onClick={() => dispatch(updateTodo(todo))}
                id="wd-update-todo-click"> Update </Button>
            <Button className="mx-1" variant="success" onClick={() => dispatch(addTodo(todo))}
                id="wd-add-todo-click"> Add </Button>
        </ListGroup.Item>
    );
}
