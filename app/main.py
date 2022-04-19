from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import todos


app = FastAPI()


# Handle CORS protection
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# add routes
app.include_router(todos.router)
