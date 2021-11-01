
export class Todo{

    static fromJson( {id, task, completed, created} ){

        const tempTodo     = new Todo( task );

        tempTodo.id        = id;
        tempTodo.completed = completed;
        tempTodo.created   = created;

    }

    constructor( task ){
        this.task = task;

        this.id   = new Date().getTime();// 1232131235
        this.completed = false;
        this.created = new Date();

        
    }
}