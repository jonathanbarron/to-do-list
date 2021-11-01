import './css/styles.css';
import {Todo, TodoList} from './classes';
import { createTodoHtml } from './js/componentes';

export const todoList = new TodoList();

//ejecturar la clase createTodoHtml por cada elemento existente en todolist
//todoList.todos.forEach( todo => createTodoHtml( todo ) ); //forma con flecha
todoList.todos.forEach( createTodoHtml ); // forma minify