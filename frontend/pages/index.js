import TodoList from "../components/TodoList"
import styles from "../styles/Home.module.css"
import { Button, Form, Row, Col} from 'react-bootstrap';
import axios from "axios"
import swal from 'sweetalert'
import { useRouter } from 'next/router'


export default function Home({ todos }) {

  const router = useRouter()

  const registerUser = (e) => {
    e.preventDefault()

    // console.log(e.target.title.value)

    const todo_title = e.target.title.value
    const todo_description = e.target.description.value

    axios.post('http://localhost:8000/todos', {
      title: todo_title,
      description: todo_description,
      completed: false,
      time: Date()
    })
    .then(function (response) {
      swal({
        title: "Todo Created!",
        text: "Todo task created successfully",
        icon: "success",
      });
    })
    .catch(function (error) {
      console.log(error);
    });


    // reset the form empty
    e.target.reset()

    router.push("/")

  }
  return (
    <div>
      <h3 className={styles.title}>Fullstack Todo Project</h3>

      {/* form */}
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className={styles.card}>
            <Form onSubmit={registerUser}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Description" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Create Todo
              </Button>

            </Form>
          </div>
        </Col>
      </Row>

      {/* todolist */}
      <TodoList todos={todos}/>
    </div>
  )
}


export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:8000/todos")
  const todos = await res.json()
  return {
    props: {
      todos
    }
  }
}
