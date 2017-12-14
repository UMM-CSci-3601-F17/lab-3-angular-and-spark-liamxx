# Test Coverage


### The key behaviors you tested via my E2E tests:
    I tested the basic search functionality of our todo searching deck.
        - Filter by owner
        - Filter by category
        - Filter by body text
        - Filter by status
        - Filter by multiple filters
        - Filter by multiple fractions (I noted that this test might fail when the todo pool is getting larger)
### Why and where I tested those behaviors:
    These are the basic funtionality that support the searching deck.
    It is the key feature of this lab, and it must work correctly.
    The E2E tests for todo list page are in client/e2e/ directory and named `todo-list.po.ts` and `todo-list.e2e-spec.ts`
