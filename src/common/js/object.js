const QUESTION_TYPE_SINGLE = 2
const QUESTION_SUBTYPE_SINGLE = 1

const OBJECT_TYPE_BLANK_TEXT = '1-1'
const OBJECT_TYPE_BLANK_NAME = '1-2'
const OBJECT_TYPE_BLANK_PHONENUMBER = '1-3'
const OBJECT_TYPE_BLANK_EMAIL = '1-4'
const OBJECT_TYPE_SINGLE = '2-1'
const OBJECT_TYPE_MULTIPLE = '3-1'
const OBJECT_TYPE_SCORE = '4-11'

let OBJECT_MAP = {}

OBJECT_MAP[OBJECT_TYPE_SINGLE] = {
    id: -1,
    surveyId: -1,
    type: QUESTION_TYPE_SINGLE,
    subType: QUESTION_SUBTYPE_SINGLE,
    number: 'Q1',
    title: '单选题',
    help: '',
    layout: -1,
    displayIndex: -1,
    optional: false,
    lastFixed: false,
    disordered: false,
    weight: -1,
    value: -1,
    reserved1: '',
    reserved2: '',
    reserved3: '',
    options: [
        {
            id: -1,
            questionId: -1,
            code: 'OP1',
            tip: '',
            value: 1,
            title: '选项1',
            displayIndex: 1,
            open: false
        }, {
            id: -1,
            questionId: -1,
            code: 'OP2',
            tip: '',
            value: 2,
            title: '选项2',
            displayIndex: 2,
            open: false
        }
    ]
}
export {OBJECT_MAP}