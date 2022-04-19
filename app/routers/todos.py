from fastapi import APIRouter, status, HTTPException
from ..models import Todo
from aredis_om import NotFoundError

router = APIRouter(
    tags=["Todos"]
)

# get todo
@router.get("/todos/{pk}", status_code=status.HTTP_200_OK)
async def get_todo(pk: str):
    try:
        return await Todo.get(pk)
    except NotFoundError:
        return HTTPException(status_code=404, detail="Todo not found")


@router.get("/todos")
async def get_todos():
    todos = [await get_all_todos(pk) async for pk in await Todo.all_pks()]
    # todo_pks = await Todo.all_pks()
    # todos = []

    # async for pk in todo_pks:
    #     todo = await get_all_todos(pk)
    #     todos.append(todo)

    return todos

async def get_all_todos(pk: str):
    todo = await Todo.get(pk)

    return {
        "id": todo.pk,
        "title": todo.title,
        "description": todo.description,
        "completed": todo.completed,
        "time": todo.time
    }


# create todo
@router.post("/todos", status_code=status.HTTP_201_CREATED)
async def create_todo(todo: Todo):
    todo.completed = int(todo.completed)
    new_todo = await todo.save()
    return new_todo


# delete todo
@router.delete("/todos/{pk}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(pk: str):
    await Todo.delete(pk)


# update todo
@router.put("/todos/{pk}", status_code=status.HTTP_200_OK)
async def update_todo(pk: str, todo: Todo):
    try:
        old_todo = await Todo.get(pk)
        print(old_todo)
        old_todo.title = todo.title
        old_todo.description = todo.description
        old_todo.completed = int(todo.completed)

        await old_todo.save()

        return old_todo
    except NotFoundError:
        return HTTPException(status_code=404, detail="Todo not found")




# Reading resources
# 1. https://github.com/redis/redis-om-python/blob/main/docs/fastapi_integration.md
