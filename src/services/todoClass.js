import utils from './utils.js';
export default class Todo {
    constructor(txt) {
        this.txt = txt
        this.isDone = false
        this.txtId = utils.getRandomID()


    }

}