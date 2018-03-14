export class Question{
    constructor(el, options) {
        this.options = {
            id: this.qid++,
            projectID: this.pid, 
            type: "1",
            number: this.qid++,
            title:"单选题标题3",
            options: [{
                id: "121",
                questionID: "11",
                code: "OP1",
                title: "选项1",
                dispIndex: 1
            },{
                id: "122",
                questionID: "11",
                code: "OP1",
                title: "选项2",
                dispIndex: 1
            }]
        }
    }
}