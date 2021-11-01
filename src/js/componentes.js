import { Todo } from '../classes';
import { todoList } from '../index';

//Referencias en HTML
const divTodoList = document.querySelector('.todo-list');
const txtinput    = document.querySelector('.new-todo');
const btndelete   = document.querySelector('.clear-completed');
const ulFilter    = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const createTodoHtml = ( todo ) =>{
    const htmlTodo = `
    <li class="${ (todo.completed) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completed) ? 'checked' : ''}>
            <label>${todo.task}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );
    return div.firstElementChild;
}

//Eventos
txtinput.addEventListener('keyup', ( event ) =>{
    if( event.keyCode === 13 && txtinput.value.length > 0 ) {
        const nuevoTodo = new Todo( txtinput.value );
        todoList.newTask(nuevoTodo);
        createTodoHtml(nuevoTodo);
        txtinput.value = '';
        //console.log(todoList)
    }
});

divTodoList.addEventListener('click', ( event ) =>{
    //console.log( event.target.localName );
    const nameElement =  event.target.localName; // input, label, button
    const taskElement =  event.target.parentElement.parentElement;
    const taskId      =  taskElement.getAttribute('data-id');

    if( nameElement.includes('input')) { //click en check
        todoList.taskCompleted( taskId );
        taskElement.classList.toggle('completed');
    }
    else if( nameElement.includes('button')){
        todoList.deleteTask( taskId );
        divTodoList.removeChild( taskElement );
    }

     console.log(todoList);
});

btndelete.addEventListener('click', () =>{
   
    todoList.deleteCompleted();

    for( let i = divTodoList.children.length-1; i >= 0; i--){
        const elemento = divTodoList.children[i];
        if ( elemento.classList.contains('completed') ){
            divTodoList.removeChild( elemento );
        }
    }
});

ulFilter.addEventListener('click', ( event ) => {

    const filter = event.target.text;
    if( !filter ) { return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filter ){

            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;

        }
    }
});