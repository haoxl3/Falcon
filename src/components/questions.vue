<template>
    <div>
        <div class="question-box clearfix" v-for="(question,index) in questions" ref="questionList" :key="index">
            <div @click="curQuestion(index,question)" :style="{backgroundColor: bgColor == index? '#f2f5f8': 'transparent'}">
                <div class="question-left">
                    <div class="question-num">{{question.number}}</div>
                    <div class="question-settings">
                        <i class="icon iconfont icon-setting"></i>
                    </div> 
                </div>
                <div class="question-right">
                    <div class="question-title" contenteditable="true">
                        <div class="rich-content-editor" contenteditable="false">T</div>
                        <div v-html="question.title"></div>
                    </div>
                    <div class="question-options">
                        <!--单选题-->
                        <div class="option" v-if="question.type == 2 && question.subType == 1" v-for="(option,index) in question.options" :key="index">
                            <input type="radio" name="single"/>
                            <div class="option-text" contenteditable="true">
                                <div v-html="option.title"></div>
                                <!-- <el-popover popper-class="opt-popover" placement="right"  width="210" trigger="click">
                                    <ul>
                                        <li>添加空文本框</li>
                                        <li>文本框大小</li>
                                        <li>验证文本框</li>
                                        <li class="divider"></li>
                                        <li>富文本编辑</li>
                                        <li>插入图片</li>
                                        <li>exclude from analysis</li>
                                        <li>插入管道文本</li>
                                        <li class="divider"></li>
                                        <li>分配给组</li>
                                        <li><i class="icon iconfont icon-up-triangle"></i>向上移动</li>
                                        <li><i class="icon iconfont icon-under-triangle"></i>向下移动</li>
                                        <li><i class="icon iconfont icon-reduce"></i>删除选项</li>
                                    </ul>
                                    <span class="option-setting"  slot="reference" contenteditable="false"><i class="icon iconfont icon-under-triangle"></i></span>
                                </el-popover> -->
                            </div>
                        </div>
                        <!--多选题-->
                        <div class="option" v-if="question.type == 3 && question.subType == 1" v-for="(option,index) in question.options" :key="index">
                            <input type="checkbox"/>
                            <div class="option-text" contenteditable="true" >
                                <div>{{option.title}}</div>
                                <!-- <el-popover popper-class="opt-popover" placement="right"  width="210" trigger="click">
                                    <ul>
                                        <li>添加空文本框</li>
                                        <li>文本框大小</li>
                                        <li>验证文本框</li>
                                        <li class="divider"></li>
                                        <li>富文本编辑</li>
                                        <li>插入图片</li>
                                        <li>exclude from analysis</li>
                                        <li>插入管道文本</li>
                                        <li class="divider"></li>
                                        <li>分配给组</li>
                                        <li @click="toMove('option','up',index)"><i class="icon iconfont icon-up-triangle"></i>向上移动</li>
                                        <li @click="toMove('option','down',index)"><i class="icon iconfont icon-under-triangle"></i>向下移动</li>
                                        <li @click="delOption(option.id)"><i class="icon iconfont icon-reduce"></i>删除选项</li>
                                    </ul>
                                    <span class="option-setting"  slot="reference" contenteditable="false"><i class="icon iconfont icon-under-triangle"></i></span>
                                </el-popover> -->
                            </div>
                        </div>
                        <!--填空题-->
                        <div class="option" v-for="(option,index) in question.options"  v-if="question.type == 1" :key="index">
                            <el-input v-model="singleText" placeholder="单行填空" v-if="question.subType == 1"></el-input>
                        </div>
                    </div>  
                </div>  
                <div class="question-btn">
                    <i class="icon iconfont icon-add icon-add-top" @click="cqToTop"></i>
                    <i class="icon iconfont icon-reduce" @click="delQuestion(question.id)"></i>
                    <i class="icon iconfont icon-add icon-add-bottom" @click="cqToBottom"></i>
                </div>
                <div class="question-setup">
                    <i class="icon iconfont icon-arrow-up" @click="toMove('question','up',index)"></i>
                    <i class="icon iconfont icon-arrow-down" @click="toMove('question','down',index)"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        questions: {
            type: Array 
        }
    },
    data() {
        return {
            singleText: '',
            bgColor: 'trasparent',
        }
    },
    methods: {
        curQuestion() {

        },
        delQuestion() {

        },
        toMove() {

        },
        //在其上面添加题目
        cqToTop() {

        },
        //在其下面添加题目
        cqToBottom() {
            
        }
    }
}
</script>

<style lang="stylus"  rel="stylesheet/stylus" scoped>
.question-box{
    background-color: #fff;
    border-top: 1px solid #cccfd2;
    border-bottom: 1px solid #cccfd2;
    display: table;
    width: 100%;
    position: relative;
    cursor: pointer;
    &:hover{
        background-color: #f2f5f8;
    }
    .question-left{
        padding: 24px 14px;
        text-align: center;
        border-right: 1px solid #cccfd2;
        display: table-cell;
        width: 60px;
        .question-num{
            padding: 0 0 20px 0;
        }
        .question-settings{
            padding: 6px;
            border: 1px solid transparent;
            border-radius: 3px;
            cursor: pointer;
            i{
                font-size:20px;
                color: #8a8a8a;
            }
            &:hover{
                border-color: #a5a5a5;
            }
        }
    }
    .question-right{
        padding: 24px 8px;
        width: 100%;
        display: table-cell;
        .question-title{
            margin-bottom: 10px;
            font-size: 14px;
            width: 90%;
            padding: 4px 0;
            position: relative;
            cursor: pointer;
            .rich-content-editor{
                display: none;
            }
            &:focus{
                .rich-content-editor{
                    display: block;
                    position: absolute;
                    top: -20px;
                    left: 0;
                    padding: 3px 8px;
                    background: #9EC2FA;
                    color: #fff;
                    cursor: pointer;
                }
            }
            &:hover{
                background-color: #d1e1ed;
            }
        }
        .question-options{
            display: inline-block;
            width: 90%;
            .layout{
                padding: 6px 0; 
            }
            .layout-block{
                display: block;
            }
            .layout-line{
                display: inline-block;
                padding-left: 8px;
            }
            .option{
                margin-bottom: 12px;
                font-size: 12px;
                display: table;
                input{
                    display: table-cell;
                    width: 20px;
                }
                .option-text{
                    padding: 6px 6px;
                    cursor: pointer;
                    display: table-cell;
                    position: relative;
                    min-width: 44px;
                    min-height: 26px;
                    &:hover{
                        background-color: #d1e1ed;
                    }
                    .option-setting{
                        display: none;
                    }
                    &:focus{
                        .option-setting{
                            display: block;
                            width: 20px;
                            height: 26px;
                            background: #9FC2FB;
                            text-align: center;
                            line-height: 25px;
                            color: #fff;
                            display: inline-block;
                            position: absolute;
                            top: -1px;
                            right: -20px;
                            i{
                                font-size: 12px;
                            }
                        }
                    }
                }
                .btn-upload{
                    padding: 10px 15px;
                    background-color: #42d885;
                    color: #fff;
                    text-align: center;
                    width: 50px;
                    margin-top: 20px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .upload-img{
                    height: 150px;
                    border: 1px solid #eee;
                }
                .my-select-question{
                    width: 175px;
                }
                table{
                    th,td{
                        height: 20px;
                        line-height: 20px;
                        padding: 4px;
                        text-align: center;
                    }
                    th{
                        border-bottom: 1px solid #d4d4d4;
                    }
                    .table-row{
                        border-right: 1px solid #d4d4d4; 
                    }
                }
            }
        }
    }
    .question-btn,.question-setup{
        display: none;
    }
    &:hover .question-btn{
        display: block;
        .icon{
            position: absolute;
            right: -10px;
            font-size: 20px;
            color: #13ce66;
            cursor: pointer;
            z-index: 2;
        }
        .icon-add-top{
            top: -10px;
        }
        .icon-add-bottom{
            bottom: -10px;
        }
        .icon-reduce{
            top: 45%;
            color: #ff4949;
        }
    }
    &:hover .question-setup{
        display: block;
        width: 24px;
        height: 60px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: -24px;
        text-align: center;
        color: #fff;
        background: #5a5a5a;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        cursor: pointer;
        margin: auto;
        i{
            line-height: 30px;
            font-size: 14px;
            width: 24px;
            height: 30px;
            display: inline-block;
            &:hover{
                background: #474747;
            }
        }
    }
}
.dialog-container{
    min-height: 250px;
    .ql-toolbar.ql-snow{
        background-color: #eee!important;
    }
    .ql-container.ql-snow{
        min-height: 250px;
    }
}
.ope-panel{
    width: 230px;
    background-color: #f2f5f8;
    position: absolute;
    right: 1px;
    padding: 0;
    box-sizing: border-box;
    z-index: 2;
    .form-control{
        margin: 0;
        font-size: 12px;
        .el-collapse-item__header{
            background-color: pink;
        }
        .part{
            margin-top: 10px;
        }
        .response{
            margin-bottom: 10px;
        }
        h2{
            font-size: 14px;
            font-weight: 700;
        }
        .change-question-type{
            width: 100%;
            height: 36px;
            border-radius: 3px;
            background-color: #009451;
            color: #fff;
            margin-top: 6px;
            text-align: center;
            line-height: 36px;
            cursor: pointer;
            i{
                vertical-align: middle;
                margin-right: 4px;
            }
        }
        .count{
            width: 36px;
            height: 20px;
            text-align: center;
            margin-right: 8px;
        }
        a{
            font-size: 13px;
            color: #007ac0;
        }
        .el-radio+.el-radio{
            margin: 4px 0;
        }
        .el-radio-group .el-radio{
            font-size: 12px;
            margin-right: 10px;
        }
        p{
            line-height: 20px;
            cursor: pointer;
            i{
                margin-right: 6px;
                font-size: 14px;
                color: gray;
            }
        }
        .icon-bent-right-down{
            color: #6898bb;
        }
        .icon-copy{
            color: #8cb55c;
        }
    }
}
.opt-popover{
    padding: 0;
    li.divider{
        background: 0 0;
        border-top: 1px solid #e8e8e8;
        margin:4px 0;
        padding: 0;
    }
    li{
        padding: 6px 0;
        font-size: 12px;
        cursor: pointer;
        &:hover{
            background-color: #007ac0;
            color: #fff;
            i{
                color: #fff;
            }
        }
        i{
            font-size: 12px;
            color: #666;
            margin-right: 6px;
        }
    }
}
.my-radio-group{
    padding-left: 10px;
}
</style>
