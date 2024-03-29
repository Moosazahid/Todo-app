
import { createSlice } from '@reduxjs/toolkit';

type Todo = {
  id: number;
  name: string;
  done: boolean;
};

type TodoState = {
  list: Todo[];
};

const initialState: TodoState = {
  list: [],
};

export const todo = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    pushTodo: (state, action) => {
      state.list.push(action.payload);
     },
    getTodo: (state, action) => {
     state.list = action.payload;
    },
    addTodo: (state, action) => {
      const todo = state.list.find((todo) => todo.name === action.payload.name);
      if (!todo) {
        state.list.push(action.payload);
      }
    },
    removeTodo: (state, action) => {
      console.log('action',action);
      
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
   

  },
});

export const { addTodo, removeTodo, toggleTodo,getTodo ,pushTodo} = todo.actions;
export default todo.reducer;