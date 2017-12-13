import {Component, OnInit} from '@angular/core';
import {TodoListService} from "./todo-list.service";
import {Todo} from "./todo";

@Component({
    selector: 'todo-list-component',
    templateUrl: 'todo-list.component.html',
    providers: []
})

export class TodoListComponent implements OnInit {
    //These are public so that tests can reference them (.spec.ts)
    todoOwner : string;
    todoCategory : string;
    todoStatus : boolean;
    todoBodyText : string;
    todoLimit : number;
    public todos: Todo[];
    public filteredTodos: Todo[];

    //Inject the TodoListService into this component.
    //That's what happens in the following constructor.
    //
    //We can call upon the service for interacting
    //with the server.
    constructor(private todoListService: TodoListService) {

    }

    public filterTodos(searchOwner: string,
                       searchCategory: string,
                       searchBody: string,
                       searchLimit: number,
                       searchStatus: boolean): Todo[] {

        this.filteredTodos = this.todos;

        // Filter by owner
        if (searchOwner != null) {
            searchOwner = searchOwner.toLocaleLowerCase();

            this.filteredTodos = this.filteredTodos.filter(todo => {
                return !searchOwner || todo.owner.toLowerCase().indexOf(searchOwner) !== -1;
            });
        }

        // Filter by category
        if (searchCategory != null) {
            this.filteredTodos = this.filteredTodos.filter(todo => {
                return !searchCategory || todo.category.toLowerCase().indexOf(searchCategory) !== -1;
            });
        }

        // Filter by body
        if (searchBody != null) {
            this.filteredTodos = this.filteredTodos.filter(todo => {
                return !searchBody || todo.body.toLowerCase().indexOf(searchBody) !== -1;
            });
        }
        // Filter with limit numbers
        if (searchLimit != null) {
            this.filteredTodos = this.filteredTodos.slice(0,searchLimit);
        }
        // Filter by status
        if (searchStatus != null) {
            this.filteredTodos = this.filteredTodos.filter(todo => {
                return todo.status == searchStatus;
            })
        }

        return this.filteredTodos;
    }

    ngOnInit(): void {
        //Get Users returns an Observable, basically a "promise" that
        //we will get the data from the server.
        //
        //Subscribe waits until the data is fully downloaded, then
        //performs an action on it (the first lambda)
        this.todoListService.getTodos().subscribe(
            todos => {
                this.todos = todos;
                this.filteredTodos = this.todos;
            },
            err => {
                console.log(err);
            }
        );
    }
}
