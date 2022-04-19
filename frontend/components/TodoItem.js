import styles from "../styles/Home.module.css"
import { Button } from 'react-bootstrap';
import axios from "axios"
// for redirect
import { useRouter } from 'next/router'

const TodoItem = ({ todo }) => {

    const router = useRouter()

    const deleteTodo = async (pk) => {
        axios.delete(`http://localhost:8000/todos/${pk}`)
          .then(function (response) {
            swal({
              title: "Todo Deleted!",
              text: "Todo task deleted successfully",
              icon: "danger",
            });
          })
        .catch(function (error) {
            console.log(error);
        });
        router.push("/")
    }

    const updateTodo = async (pk) => {
        axios.put(`http://localhost:8000/todos/${pk}`, {
            title: todo.title,
            description: todo.description,
            completed: !todo.completed,
            time: todo.time
          })
          .then(function (response) {
            swal({
              title: "Todo Updated!",
              text: "Todo task Updated successfully",
              icon: "success",
            });
          })
          .catch(function (error) {
            console.log(error);
          });

          router.push("/")
    }


    return (
        <div className={styles.card}>
            {todo.completed? <h2><del>{ todo.title }</del></h2> : <h2>{ todo.title }</h2>}
            <p>{ todo.description }</p>
            <p className="text-muted">{ todo.time }</p>
            <br />
            {todo.completed? 
                <Button  variant="success" onClick={() => (updateTodo(todo.id))}>Completed</Button>
                :
                <Button variant="primary" onClick={() => (updateTodo(todo.id))}>Complete</Button>
            }
            <Button className="m-3" variant="danger" onClick={() => (deleteTodo(todo.id))}>Delete</Button>
        </div>
    )
}

export default TodoItem

