import { Todo } from './todo.class';

export class TodoList {

    constructor () {
        //this.todos = [];
        this.loadSessionStorage();
    }

    newTask( todo ){
        this.todos.push( todo );
        this.saveLocalStorage()
    }

    deleteTask( id ){

        this.todos = this.todos.filter( todo => todo.id != id);
        this.saveLocalStorage();

    }

    taskCompleted( id ) {

        for( const todo of this.todos) {
            if( todo.id == id) {
                todo.completed = !todo.completed;
                this.saveLocalStorage();
                break;
            }
        }
    }

    deleteCompleted() {

        this.todos = this.todos.filter( todo => !todo.completed);
        this.saveLocalStorage();
        
    }

    saveLocalStorage(){
        
        localStorage.setItem('todo', JSON.stringify(this.todos));

    }

    loadSessionStorage(){
        // if( localStorage.getItem('todo') ){

        //     this.todos =JSON.parse( localStorage.getItem('todo') );
        //     console.log('cargando... ', this.todos );
        // }
        // else {
        //     this.todos = [];
        // }
        this.todos  = ( localStorage.getItem('todo') ) 
                    ? JSON.parse( localStorage.getItem('todo') ) 
                    :  [];

        this.todos = this.todos.map( Todo.fromJson );
        
    }
}