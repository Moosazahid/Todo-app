"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addTodo, getTodo, pushTodo, removeTodo } from "@/redux/features/todo-slice";
import { Button, Card, CardHeader, Input, TextField } from "@mui/material";


const AddTodoForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [todo, setTodo] = useState<string>();
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const { list } = useSelector((state: any) => state.todoReducer);

  const handleSubmit = async () => {
    const id = localStorage.getItem("userId");
    if (!todo) {
      setIsInvalid(true);
      setErrorMessage("Task name is required");
      return;
    }
    // async function add (data:{todo:string; completed:boolean; userId:number}){
    if (id) {
      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        body: JSON.stringify({
          todo,
          completed: true,
          userId: parseInt(id, 10),
        }),
      });
      const todo_resp = await response.json();
      dispatch(pushTodo(todo_resp.todo));
    }

    // dispatch(addTodo({ id: Date.now(), name: todo, done: false }));
    setTodo("");
    setIsInvalid(false);
    setErrorMessage(undefined);
  };

  const fetchUserTodos = async (id: string) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/user/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const { todos } = await response.json();
      dispatch(getTodo(todos));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  const handleDelete = async (todoId: number) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/${todoId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      dispatch(removeTodo(todoId))
      console.log(data);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      fetchUserTodos(id);
    }
  }, [dispatch]);

  return (
    <Card className="p-4">
      <CardHeader>
        <div className="flex flex-col">
          <p className="text-lg font-bold">Add Todo</p>
          <p className="text-small text-default-500">Type and save your task</p>
        </div>
      </CardHeader>
      <div>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(e) => setTodo(e.target.value)}
        />
      </div>
      <Button color="primary" onClick={() => handleSubmit()}>
        Add
      </Button>
      <div>
        {list.map((todos: any) => (
          <div key={todos?.id} className="flex items-center justify-between">
            <div key={todos?.id}>{todos?.todo}</div>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(todos.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AddTodoForm;
