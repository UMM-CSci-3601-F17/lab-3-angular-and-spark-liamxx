import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {Todo} from "./todo";
import {TodoComponent} from "./todo.component";
import {TodoListService} from "./todo-list.service";
import {Observable} from "rxjs";
//import { PipeModule } from "../../pipe.module";

describe("Todo component", () => {

    let todoComponent: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;

    let todoListServiceStub: {
        getTodoById: (todoId: string) => Observable<Todo>
    };

    beforeEach(() => {
        // stub UserService for test purposes
        todoListServiceStub = {
            getTodoById: (todoId: string) => Observable.of([
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
            ].find(todo => todo._id === todoId))
        };

        TestBed.configureTestingModule({
            //imports: [PipeModule],
            declarations: [TodoComponent],
            providers: [{provide: TodoListService, useValue: todoListServiceStub}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoComponent);
            todoComponent = fixture.componentInstance;
        });
    }));

    it("can retrieve Blanche by ID", () => {
        todoComponent.setId("58895985a22c04e761776d54");
        expect(todoComponent.todo).toBeDefined();
        expect(todoComponent.todo.owner).toBe("Blanche");
        expect(todoComponent.todo.category).toBe("software design");
    });

    it("returns undefined for 58895985a22c04e761776d566", () => {
        todoComponent.setId("58895985a22c04e761776d566");
        expect(todoComponent.todo).not.toBeDefined();
    });

});
