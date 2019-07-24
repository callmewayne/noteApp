import { decorate, observable } from "mobx";

class Todo {
    id = Math.random();
    title = "";
    finished = false;
}
decorate(Todo, {
    title: observable,
    finished: observable
})
module.exports = {
    Todo,
}

