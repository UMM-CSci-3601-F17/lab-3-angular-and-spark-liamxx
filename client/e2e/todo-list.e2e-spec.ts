import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

describe('angular-spark-lab', () => {
    let page: TodoPage;

    beforeEach(() => {
        page = new TodoPage();
    });

    it('should get and highlight title "Todos:" ', () => {
        page.navigateTo();
        expect(page.getTodoTitle()).toEqual('Todos:');
    });

    it('should type "Fry" in the Owner box and check that it returned correct todo', () => {
        page.navigateTo();
        page.typeAnOwner("Fry");
        expect(page.getFirstTodo()).toEqual("58895985c1849992336c219b");
    });

    it('Should type "software design" as category and check that it returned correct todo', () => {
        page.navigateTo();
        page.typeACategory('software design');
        expect(page.getFirstTodo()).toEqual("58895985a22c04e761776d54");
    });

    it('Should type "software design" as category and check that it returned correct todo', () => {
        page.navigateTo();
        page.typeACategory('video games');
        expect(page.getFirstTodo()).toEqual("58895985c1849992336c219b");
    });

    it('Should type "lorem" as body text and check that it returned correct todo', () => {
        page.navigateTo();
        page.filterByBody('lorem');
        expect(page.getFirstTodo()).toEqual("58895985186754887e0381f5");
    });

    it('default status is all, should return all todos appear on the page', () => {
        page.navigateTo();
        page.setStatusAll();
        expect(page.getFirstTodo()).toEqual("58895985a22c04e761776d54")
    });

    it('default status is true, should return todos with status complete appear on the page', () => {
        page.navigateTo();
        page.setStatusComplete();
        expect(page.getFirstTodo()).toEqual("58895985ae3b752b124e7663")
    });

    it('default status is false, should return todos with status incomplete appear on the page', () => {
        page.navigateTo();
        page.setStatusInomplete();
        expect(page.getFirstTodo()).toEqual("58895985a22c04e761776d54")
    });


    it('Should correctly return todos that are filtered by multiple properties', () => {
        page.navigateTo();
        page.typeAnOwner('Workman');
        page.typeACategory('video games');
        page.filterByBody('enim');
        page.setStatusComplete();
        expect(page.getFirstTodo()).toEqual('58895985858afcb1a0105483')
    });

    // !!!!!!!!!!!!!!!!!!!!!!!                          IMPORTANT                            !!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!  This test might fail when the todos pool is getting larger.  !!!!!!!!!!!!!!!!!!!!!!!!!!
    it('Should correctly return todos that are filtered by multiple fractions', () => {
        page.navigateTo();
        page.typeAnOwner('Work');
        page.typeACategory('vid');
        page.filterByBody('enim');
        page.setStatusComplete();
        expect(page.getFirstTodo()).toEqual('58895985858afcb1a0105483')
    });
});
