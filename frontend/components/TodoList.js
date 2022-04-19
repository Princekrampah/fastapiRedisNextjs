import styles from "../styles/Home.module.css"
import TodoItem from "./TodoItem"

const TodoList = ({ todos }) => {
    return (
        <div className={styles.grid}>
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    )
}

export default TodoList

