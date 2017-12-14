import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {Todo} from "./todo";
import {TodoListComponent} from "./todo-list.component";
import {TodoListService} from "./todo-list.service";
import {Observable} from "rxjs";

describe("Todo list", () => {

    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<Todo[]>
    };

    beforeEach(() => {
        // stub TodoService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.of([
                {
                    _id: "34124124214",
                    owner: "Chris",
                    status: true,
                    body: "Your new functionality should be",
                    category: "ball"
                },
                {
                    _id: "58895985a22c04e761776d54",
                    owner: "Blanche",
                    status: false,
                    body: "In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.",
                    category: "software design"
                },
                {
                    _id: "12412412125",
                    owner: "Chris",
                    status: true,
                    body: "UMM",
                    category: "whatever"
                }
            ])
        };

        TestBed.configureTestingModule({
            //imports: [PipeModule],
            declarations: [TodoListComponent],
            // providers:    [ TodoListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers: [{provide: TodoListService, useValue: todoListServiceStub}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("contains all the todos", () => {
        expect(todoList.todos.length).toBe(3);
    });

    it("contains a todo owner 'Chris'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Chris")).toBe(true);
    });

    it("doesn't contain a todo owner 'Jamie'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Jamie")).toBe(false);
    });

    it("doesn't contain a todo owner 'Santa'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Santa")).toBe(false);
    });

    it("doesn't have two todos that category is 'hello'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.category === "hello")).toBe(false);
    });
    it("has todo that category is 'whatever'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.category === "whatever")).toBe(true);
    });

});

describe("Misbehaving Todo List", () => {
    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<Todo[]>
    };

    beforeEach(() => {
        // stub TodoService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.create(observer => {
                observer.error("Error-prone observable");
            })
        };

        TestBed.configureTestingModule({
            declarations: [TodoListComponent],
            providers: [{provide: TodoListService, useValue: todoListServiceStub}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("generates an error if we don't set up a TodoListService", () => {
        // Since the observer throws an error, we don't expect todos to be defined.
        expect(todoList.todos).toBeUndefined();
    });
});
