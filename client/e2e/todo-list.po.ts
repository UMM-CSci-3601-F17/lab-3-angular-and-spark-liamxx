import {browser, element, by} from 'protractor';
import {Key} from "selenium-webdriver";

export class TodoPage {
    navigateTo() {
        return browser.get('/todos');
    }

    //http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
    highlightElement(byObject) {
        function setStyle(element, style) {
            const previous = element.getAttribute('style');
            element.setAttribute('style', style);
            setTimeout(() => {
                element.setAttribute('style', previous);
            }, 200);
            return "highlighted";
        }

        return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
    }

    getTodoTitle() {
        let title = element(by.id('title')).getText();
        this.highlightElement(by.id('title'));

        return title;
    }

    typeAnOwner(name: string) {
        let input = element(by.tagName('input'));
        input.click();
        input.sendKeys(name);

    }

    typeACategory(category: string) {
        let input = element(by.id('todoCategory'));
        input.click();
        input.sendKeys(category);
    }

    filterByBody(body: string) {
        let input = element(by.tagName('todoBodyText'));
        input.click();
        input.sendKeys(body);
    }


    setStatusAll() {
        let input = element(by.id('statusAll'));
        input.click();
    }

    setStatusComplete() {
        let input = element(by.id('statusComplete'));
        input.click();
    }

    setStatusInomplete() {
        let input = element(by.id('statusIncomplete'));
        input.click();
    }

    getFirstTodo() {
        let todo = element(by.id('thisTodoId')).getText();
        this.highlightElement(by.id('thisTodoId'));

        return todo;
    }
}
