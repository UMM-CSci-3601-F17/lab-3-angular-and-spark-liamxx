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
    public todos: Todo[];
    public filteredTodos: Todo[];

    //Inject the UserListService into this component.
    //That's what happens in the following constructor.
    //
    //We can call upon the service for interacting
    //with the server.
    constructor(private todoListService: TodoListService) {

    }
/** filters samples
    public filterTodos(searchName: string, searchAge: number): Todo[] {

        this.filteredTodos = this.todos;

        //Filter by name            change
        if (searchName != null) {
            searchName = searchName.toLocaleLowerCase();

            this.filteredTodos = this.filteredTodos.filter(todo => {
                return !searchName || todo.name.toLowerCase().indexOf(searchName) !== -1;
            });
        }
*
*
*
        //Filter by age         change
        if (searchAge != null) {
            this.filteredTodos = this.filteredTodos.filter(todo => {
                return !searchAge || todo.age == searchAge;
            });
        }

        return this.filteredTodos;
    }
 */

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
