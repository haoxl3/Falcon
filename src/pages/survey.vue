<template>
    <div>
        <div class="survey-menu" ref="surveyMenu">
            <div class="survey-btn"><i class="icon iconfont icon-brush"></i>形状和外观</div>
            <div class="survey-btn"><i class="icon iconfont icon-flow"></i>调研流程</div>  
            <div class="survey-btn"><i class="icon iconfont icon-setting"></i>调研选项</div>  
            <div class="survey-btn"><i class="icon iconfont icon-wrench"></i>工具</div>  
            <div class="survey-right-box">
                <el-button type="primary" class="preview"><i class="icon iconfont icon-preview"></i>预览问卷</el-button>
                <span class="search"><input type="text" placeholder="搜索项目..."><i class="icon iconfont icon-magnifying-glass"></i></span>
            </div> 
        </div> 
        <div class="survey-content" @mousewheel="surveyWheel">
            <div class="survey-form">
                <div class="survey-header"><span contenteditable="true">test</span></div> 
                <div class="block-outer">
                    <div class="block">
                        <div class="header-block-container">
                            <div class="block-title float-left">
                                <span @click="toggelBlock">
                                    <i v-show="!isShowBlock" class="icon iconfont icon-right-triangle"></i>
                                    <i v-show="isShowBlock" class="icon iconfont icon-under-triangle"></i>
                                </span>
                                <span class="block-name" contenteditable="true">Block 1</span>
                                <span>({{questions.length}} Questions)</span>
                            </div>
                            <el-popover ref="blockPopover" popper-class="block-popover my-popover" placement="left" width="200" trigger="click">
                                <ul>
                                    <li>View Block...</li>
                                    <li class="divider"></li>
                                    <li>Collapse Questions...</li>
                                    <li class="divider"></li>
                                    <li @click="lockBlockDialog = true">Lock Block...</li>
                                    <li>Question Randomization...</li>
                                    <li>Loop & Merge...</li>
                                    <li>Next/Previous Buttion Text...</li>
                                    <li class="divider"></li>
                                    <li><i class="icon iconfont icon-up-triangle"></i>Move Block Up...</li>
                                    <li><i class="icon iconfont icon-under-triangle"></i>Move Block Down...</li>
                                    <li class="divider"></li>
                                    <li>Add Block Below</li>
                                    <li>Copy Block...</li>
                                    <li>Copy Block To Library...</li>
                                    <li>Copy Questions To Library...</li>
                                    <li>Delete Block...</li>
                                </ul>
                            </el-popover>
                            <div class="block-options float-right" v-popover:blockPopover>Block Options<i class="icon iconfont icon-arrow-down"></i></div> 
                        </div>
                        <div v-if="isShowBlock">
                            <div class="questions-block-container">
                                <questions :questions="questions" :rubbish="rubbish" @cq="createQuestion"></questions>
                            </div>
                        </div>
                    </div>
                    <div class="add-block">Add Block</div>  
                </div> 
            </div>
        </div> 
    </div>
</template>
<script>
import questions from '@/components/questions'
export default{
    data() {
        return {
            questions: [],
            rubbish: [],//当前项目删除的所有题目
            isShowBlock: true,//块的展开与收起
        }
    },
    created() {
        this._searchQuestions();
    },
    methods: {
        _searchQuestions() {
            this.$axios.post('question/search?surveyid=' + this.$route.query.id).then(res => {
                if (res.data.code == 'ok') {
                    console.log(res.data)
                    this.questions = res.data.results
                }
            })
        },
        //块的展开与收起
        toggelBlock() {
            this.isShowBlock = !this.isShowBlock;
        },
        surveyWheel() {
            console.log('surveywheel...')
            console.log(document.body.scrollTop)
        },
        createQuestion() {
            console.log('create question')
        }
    },
    components: {
        questions
    }
}
</script>
<style lang="stylus" scoped>
@import '../common/stylus/base.styl'
.survey-menu{
    width: 100%;
    height: 66px;
    box-sizing: border-box;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    padding: 16px 24px 0;
    z-index: 99;
    .survey-btn{
        float: left;
        height: 36px;
        box-sizing: border-box;
        border-radius: 3px;
        padding: 10px 13px;
        cursor: pointer;
        color: #737373;
        font-size: 14px;
        border: 1px solid transparent;
        i{
            margin-right: 4px;
        }
        &:hover{
            border-color: #737373;
            color: #222;
        }
    }
    .survey-right-box{
        float: right;
        .preview i{
            margin-right: 4px;
        }
    }
}
.survey-content{
    background-color: #f2f5f8;
    .survey-form{
        background: #f9f9f9;
        min-height: 790px;
        border-right: 1px solid #cccfd2;
        margin: 0 230px 0 0;
        padding: 20px 16px 1px 24px; 
        .survey-header{
            font-size: 16px;
            color: #404040;
            padding: 16px 0 32px 0;
            span{
                padding: 4px 10px;
                &:hover{
                    background-color: #d1e1ed;
                }
            }
        }
        .block-outer{
            margin: 0 0 22px;
            text-align: center;
            .block{
                border:1px solid #d4d4d4;
                background-color: #fff;
                border-radius: 3px;
                margin: 0;
                text-align: left;
                padding: 16px 0;
                box-sizing: border-box;
                box-shadow: 0 1px 2px -1px rgba(0,0,0,.2);
                .header-block-container{
                    border-top-left-radius: 3px;
                    border-top-right-radius: 3px;
                    color: gray;
                    height: 36px;
                    padding: 0 10px;
                    .block-title,.block-options {
                        font-size: 12px;
                        border: 1px solid transparent;
                        cursor: pointer;
                        i{
                            font-size: 12px;
                            margin-left: 8px;
                        }
                    }
                    .block-title{
                        line-height: 36px;
                        .block-name{
                            color: #404040;
                        }
                    }
                    .block-options{
                        padding: 6px 8px;
                        border-radius: 3px;
                        cursor: pointer;
                        margin-top: 5px;
                    }
                    .block-options:hover{
                        border-color: #b3b3b3;
                    }
                }
                .footer-block-container{
                    text-align: center;
                    padding: 0 10px;
                    margin-top: 25px;
                    .create-question{
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                    }
                    .create-question-right{
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                        margin-left: -3px;
                        i{
                            font-size: 12px;
                        }
                    }
                }
                .block-fold-button{
                    padding-left: 10px;
                    i{
                        font-size: 12px;
                        color: #9e9e9e;
                        cursor: pointer;
                    }
                }
            }
            .add-block{
                color: #007ac0;
                cursor: pointer;
                display: inline-block;
                font-size: 14px;
                margin: 22px 0 0;
            }
        }
    }
}
</style>

