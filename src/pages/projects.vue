<template>
    <div>
        <div v-if="projects.length > 0">
            <div class="top">
                <div class="top-left">
                    <span>
                        <i class="icon iconfont icon-open-folder"></i>文件夹
                    </span>
                    <el-tooltip placement="top">
                        <div slot="content" class="tooltip-content">请马上验证您的邮箱<br/>否则30天过后您将<br/>不能使用此系统</div>
                        <div class="account-verified">
                            <i class="el-icon-information"></i>账户没有被验证
                        </div>
                    </el-tooltip>
                    <span class="send-email">发送邮件验证</span>
                </div>
                <div class="top-right">
                    <el-button type="success" @click="dialogVisible=true" icon="plus">创建一个项目</el-button>
                    <el-input placeholder="搜索项目..." prefix-icon="el-icon-search" v-model="searchVal" style="width: 126px;"></el-input>
                </div>
            </div>
            <div class="menu">
                <span class="title">所有的项目</span>
                <div class="menu-right">
                    <div class="view-style">
                        <span class="text">展示方式:</span>
                        <span class="list" :class="isActive === 0 ? 'active': ''" @click="displayType(0)">
                            <i class="icon iconfont icon-list"></i>
                        </span>
                        <span class="table" :class="isActive === 1 ? 'active': ''" @click="displayType(1)">
                            <i class="icon iconfont icon-table"></i>
                        </span>
                    </div>
                    <div class="sory-by">
                        <span class="text">排序:</span>
                        <el-select v-model="sortValue" placeholder="请选择">
                            <el-option v-for="(value,key,index) in projects[0]" :key="index" :label="key" :value="key"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="projects-box">
                <div class="project-list" v-show="isActive === 0">
                    <p class="text sort-text">Survey</p>
                    <div class="project-list-item" v-for="(item,index) in projects" :key="index">
                        <div class="project-bar-section project-bar-star project-left">
                            <i class="icon iconfont icon-star" :class="item.state == 0 ? '': 'icon-star-active' "></i>
                        </div>
                        <div class="project-bar-section project-description project-middle" @click="$router.push({name:'editSurvey',params:{id:item.id}})">
                            <div class="middle-box">
                                <div class="project-type-icon survey">
                                    <i class="icon iconfont icon-survey"></i>
                                </div>
                                <div class="project-name-container">
                                    <span class="project-name">{{item.name}}</span>
                                    <el-input v-model="titleValue" class="project-name-input" placeholder="test"></el-input>
                                </div>
                                <div class="project-info">上次修改时间：{{item.updatedAt}}</div>
                            </div>
                        </div>
                        <div class="project-right" @click="$router.push({name:'editSurvey',params:{id:index}})">
                            <div class="project-right-content">
                                <div class="widget-container">
                                    <div class="flex-box flex-column">
                                        <h3>状态</h3>
                                        <div class="status" :class="item.state == 0 ? 'edit':'published' ">{{item.state == 0 ? '未发布':'已发布'}}</div>
                                    </div>
                                </div>
                                <div class="widget-container basic-count-widget">
                                    <div class="flex-box flex-column">
                                        <el-tooltip placement="top">
                                            <div slot="content" class="tooltip-content">此问卷题目的总数</div>
                                            <h3>题目个数</h3>
                                        </el-tooltip>
                                        <span>10</span>
                                    </div>
                                </div>
                                <div class="widget-container">
                                    <div class="flex-box flex-column">
                                        <el-tooltip placement="top">
                                            <div slot="content" class="tooltip-content">答完此问卷预估的时间</div>
                                            <h3>Est. Response Time</h3>
                                        </el-tooltip>
                                        <div class="graph-container">
                                            <el-progress type="circle" :width="progressWidth" :percentage="item.responseTime"></el-progress>
                                        </div>
                                    </div>
                                </div>
                                <div class="widget-container basic-count-widget">
                                    <div class="flex-box flex-column">
                                        <el-tooltip placement="top">
                                            <div slot="content" class="tooltip-content">问卷已被翻译<br/>的语言的数量</div>
                                            <h3>语言</h3>
                                        </el-tooltip>
                                        <span class="language">中文</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="actions-menu-button">
                            <el-popover ref="popover1" popper-class="my-popover action-popover" placement="left" width="170" trigger="click">
                                <ul>
                                    <li @click="actionDialog=true">
                                        <i class="icon iconfont icon-forbidden"></i>关闭
                                    </li>
                                    <li class="divider"></li>
                                    <li>
                                        <i class="icon iconfont icon-share"></i>分享项目
                                    </li>
                                    <li>
                                        <i class="icon iconfont icon-folder"></i>显示在文件夹
                                    </li>
                                    <li>
                                        <i class="icon iconfont icon-font"></i>重命名项目
                                    </li>
                                    <li @click="copyProDialog=true">
                                        <i class="icon iconfont icon-iconfontcopy"></i>复制项目
                                    </li>
                                    <li class="divider"></li>
                                    <li>
                                        <i class="icon iconfont icon-pen"></i>编辑调研
                                    </li>
                                    <li>
                                        <i class="icon iconfont icon-preview"></i>预览调研
                                    </li>
                                    <li>
                                        <i class="icon iconfont icon-translate"></i>翻译调研
                                    </li>
                                    <li>
                                        <i class="icon iconfont icon-plane"></i>发布调研
                                    </li>
                                    <li>
                                        <i class="icon iconfont icon-analysis"></i>数据分析
                                    </li>
                                    <li>
                                        <i class="icon iconfont icon-report-view"></i>查看报告
                                    </li>
                                    <li class="divider"></li>
                                    <li @click="triDelProDialog(item.id,index)">
                                        <i class="icon iconfont icon-delete"></i>删除项目
                                    </li>
                                </ul>
                                <i class="icon iconfont icon-arrow-down" slot="reference" style="width:100%;height:100%;display:inline-block;"></i>
                            </el-popover>
                        </div>
                    </div>
                </div>
                <div class="project-table" v-show="isActive === 1">
                    <el-table :data="projects">
                        <el-table-column label="" width="100">
                            <template slot-scope="scope">
                                <i class="icon iconfont icon-star" :class="scope.row.state == '0' ? '': 'icon-star-active' "></i>
                                <div class="project-type-icon">
                                    <i class="icon iconfont icon-survey"></i>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="项目名称" sortable>
                            <template slot-scope="scope">
                                <span v-if="!titleChange">{{scope.row.name}}</span>
                                <el-input ref="titleInput" v-model="titleValue" v-if="titleChange" :placeholder="scope.row.name" size="small" @blur="onblur(scope.row.name)" @keyup.enter="onsubmit(scope.row.name)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="状态" width="180" sortable>
                            <template slot-scope="scope">
                                <i class="icon iconfont" :class="scope.row.state == '0'? 'icon-ring':'icon-circle'"></i>
                                <span>{{scope.row.state == 0 ? '未发布':'已发布'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="updatedAt" label="上次修改时间" sortable></el-table-column>
                        <el-table-column prop="createdAt" label="创建时间" sortable></el-table-column>
                        <el-table-column prop="id" label="答卷数" sortable></el-table-column>
                        <el-table-column prop="createdBy" label="创建人" sortable></el-table-column>
                        <el-table-column prop="name" label="组" sortable></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-popover ref="popover2" popper-class="my-popover action-popover" placement="left" width="170" trigger="click">
                                    <ul>
                                        <li @click="actionDialog=true">
                                            <i class="icon iconfont icon-forbidden"></i>关闭</li>
                                        <li class="divider"></li>
                                        <li>
                                            <i class="icon iconfont icon-share"></i>分享项目</li>
                                        <li>
                                            <i class="icon iconfont icon-folder"></i>显示在文件夹</li>
                                        <li @click="reProName">
                                            <i class="icon iconfont icon-font"></i>重命名项目</li>
                                        <li @click="copyProDialog=true">
                                            <i class="icon iconfont icon-iconfontcopy"></i>复制项目</li>
                                        <li class="divider"></li>
                                        <li>
                                            <i class="icon iconfont icon-pen"></i>编辑调研</li>
                                        <li>
                                            <i class="icon iconfont icon-preview"></i>预览调研</li>
                                        <li>
                                            <i class="icon iconfont icon-translate"></i>翻译调研</li>
                                        <li>
                                            <i class="icon iconfont icon-plane"></i>发布调研</li>
                                        <li>
                                            <i class="icon iconfont icon-analysis"></i>数据分析</li>
                                        <li>
                                            <i class="icon iconfont icon-report-view"></i>查看报告</li>
                                        <li class="divider"></li>
                                        <li @click="triDelProDialog(scope.row.id,scope.$index)">
                                            <i class="icon iconfont icon-delete"></i>删除项目</li>
                                    </ul>
                                </el-popover>
                                <span class="icon-arrow-box" v-popover:popover2>
                                    <i class="icon iconfont icon-arrow-down"></i>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="" width="50"></el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="none-container">
            <p class="none-text">欢迎来到问卷系统<br>开始创建您的第一个项目</p>
            <el-button type="success" @click="dialogVisible=true" icon="plus">创建一个项目</el-button>
        </div>
        <!--创建项目弹出框-->
        <el-dialog title="创建一个项目" :visible.sync="dialogVisible">
            <div class="create-container">
                <ul class="create-menu">
                    <li :class="liIndex === 0 ? 'active':''" @click="menuSelect(0)">
                        <i class="icon iconfont icon-survey"></i>
                        <span>空白项目</span>
                    </li>
                    <li :class="liIndex === 1 ? 'active':''" @click="menuSelect(1)">
                        <i class="icon iconfont icon-rocket"></i>
                        <span>已认证的解决方案</span>
                    </li>
                    <li class="divider">
                        <i class="icon iconfont"></i>
                        <span>从现有的项目中创建</span>
                    </li>
                    <li :class="liIndex === 2 ? 'active':''" @click="menuSelect(2)">
                        <i class="icon iconfont icon-copy"></i>
                        <span>从复本中创建项目</span>
                    </li>
                    <li :class="liIndex === 3 ? 'active':''" @click="menuSelect(3)">
                        <i class="icon iconfont icon-badge"></i>
                        <span>从库中创建项目</span>
                    </li>
                    <li :class="liIndex === 4 ? 'active':''" @click="menuSelect(4)">
                        <i class="icon iconfont icon-upload"></i>
                        <span>来自一个文件</span>
                    </li>
                </ul>
                <div class="create-content">
                    <div class="blank-project-content" v-show="liIndex === 0">
                        <h2>从零开始创建一个项目</h2>
                        <div class="form-control">
                            <span>项目名称</span>
                            <el-input v-model="proName" placeholder="请输入项目名称"></el-input>
                        </div>
                        <div class="form-control">
                            <span>文件夹</span>
                            <select></select>
                        </div>
                    </div>
                    <div class="certified-content" v-show="liIndex === 1"></div>
                    <div class="copy-content" v-show="liIndex === 2">
                        <h2>从副本中创建一个项目</h2>
                        <div class="form-control">
                            <span>源项目</span>
                            <select></select>
                        </div>
                        <div class="form-control">
                            <span>项目名称</span>
                            <el-input v-model="proName" placeholder="请输入项目名称"></el-input>
                        </div>
                        <div class="form-control">
                            <span>文件夹</span>
                            <select></select>
                        </div>
                    </div>
                    <div class="library-content" v-show="liIndex === 3">
                        <h2>从库中创建一个项目</h2>
                        <div class="form-control">
                            <span>请选择一个库:</span>
                            <select></select>
                        </div>
                        <div class="form-control">
                            <span>源项目</span>
                            <select></select>
                        </div>
                        <div class="form-control">
                            <span>项目名称</span>
                            <el-input v-model="proName" placeholder="请输入项目名称"></el-input>
                        </div>
                        <div class="form-control">
                            <span>文件夹</span>
                            <select></select>
                        </div>
                    </div>
                    <div class="file-content" v-show="liIndex === 4">
                        <h2>从文件中创建一个项目</h2>
                        <input type="file" class="btn btn-success">
                        <span>QSF stands for "Qualtrics Survey Format." This would be a survey that was created and exported from Qualtrics.</span>
                        <div class="form-control">
                            <span>项目名称</span>
                            <el-input v-model="proName" placeholder="请输入项目名称"></el-input>
                        </div>
                        <div class="form-control">
                            <span>文件夹</span>
                            <select></select>
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="success" @click="createPro(proName)">创建项目</el-button>
            </span>
        </el-dialog>
        <!--激活或关闭项目弹出框-->
        <el-dialog title="Pause Response Collection: projectName" :visible.sync="actionDialog">
            <div class="project-status-container">
                <h2>New survey sessions can not be started.</h2>
                <el-radio-group v-model="proStatus">
                    <p>
                        <el-radio :label="1">Close all active survey sessions and record them as partial data.</el-radio>
                    </p>
                    <p>
                        <el-radio :label="2">Allow all active survey sessions to be finished.</el-radio>
                    </p>
                </el-radio-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="actionDialog = false">Cancel</el-button>
                <el-button type="danger" @click="actionDialog = false">
                    <i class="icon iconfont icon-forbidden"></i> Create project</el-button>
            </span>
        </el-dialog>
        <!--删除项目弹出框-->
        <el-dialog title="删除项目" :visible.sync="delProDialog">
            <div class="dele-project-container">
                <h3>您确定要删除“{{curProject.name}}”吗？</h3>
                <h3>删除这个项目将永久地删除这个项目创建的所有数据。</h3>
                <h2>此操作将无法挽回！</h2>
                <el-checkbox v-model="checked">所有与这个项目相关的数据将被永久删除。</el-checkbox>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delProDialog = false">取消</el-button>
                <el-button type="danger" :disabled="!checked" @click="delProject(curProject.id)">删除项目</el-button>
            </span>
        </el-dialog>
        <!--复制项目弹出框-->
        <el-dialog title="复制项目" :visible.sync="copyProDialog">
            <div class="copy-project-container">
                <div class="form-control">
                    <p>复制到</p>
                    <div class="form-btns">
                        <el-button>Account</el-button>
                        <el-button>库</el-button>
                        <el-button>Other User</el-button>
                    </div>
                </div>
                <div class="form-control">
                    <p>项目名称</p>
                    <el-input v-model="copyProName" placeholder="请输入内容"></el-input>
                </div>
                <div class="form-control">
                    <p>文件夹</p>
                    <el-select v-model="copyFolder" placeholder="请选择">
                        <el-option value="1">1</el-option>
                        <el-option value="1">2</el-option>
                    </el-select>
                </div>
                <div class="form-control">
                    <p>User</p>
                    <el-input v-model="copyUsers" placeholder="Start typing a name or email..."></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="copyProDialog = false">取消</el-button>
                <el-button type="success" @click="copyProDialog = false">复制项目</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import utils from '@/common/js/utils'
const ERR_OK = 0
export default {
  data() {
    return {
      isActive: 0, //
      liIndex: 0, //项目展示方式
      dialogVisible: false,
      actionDialog: false, //action按钮弹出框
      delProDialog: false, //删除项目弹出框
      copyProDialog: false, //复制项目弹出框
      proStatus: 1, //
      projects: [], 
      cur_page: 1, //分页初始值
      titleChange: false, //是否修改项目名
      formThead: [],
      curProject: [], //当前项目
      checked: false, //删除项目前必须选中
      proName: '', //默认项目名称
      pid: 1, //项目名称
      titleValue:'',//项目名称
      sortValue: '',//以..排序
      searchVal: '',//搜索项目
      progressWidth: 40,//环形进度条宽度
      copyProName: '',//复制项目名称
      copyUsers: '',//复制项目时的用户
      copyFolder: '',//复制项目－文件夹
    }
  },
  created() {
    this._searchSurvey()
  },
  methods: {
    // 展示list/table
    displayType(index) {
      this.isActive = index
    },
    menuSelect(index) {
      this.liIndex = index
    },
    //
    handleCurrentChange(val) {
      this.cur_page = val
      this._searchSurvey()
    },
    //获取项目并赋给表格展示
    _searchSurvey() {
        this.$axios.post('survey/search').then((res) => {
            if(res.data.code == 'ok') {
                this.projects = res.data.results;
            }
        })
    },
    //触发修改项目名称
    reProName() {
      this.titleChange = !this.titleChange
      setTimeout(() => {
        this.$refs.titleInput.focus()
      }, 150)
    },
    //修改项目名的文本框失去焦点时
    onblur(proName) {
      this.titleValue = this.titleValue.trim()
      proName = this.titleValue === '' ? proName : this.titleValue
      this.titleChange = false
    },
    //修改项目名的文本框内容自动提交
    onsubmit(proName) {
      this.titleValue = this.titleValue.trim()
      proName = this.titleValue === '' ? proName : this.titleValue
      this.titleChange = false
    },
    //创建一个项目
    createPro(proName) {
        this.dialogVisible = false
        // TODO 添加创建项目API
        let temp = {
            id: -1,
            name: this.proName || '新问卷',
            description: '新问卷',
            welcomeUrl: '',
            closingUrl: ''
        };
        this.$axios.post('survey/create', temp).then((res) => {
            if(res.data.code == 'ok') {
                this.projects.unshift(res.data.results[0])
            }
        })
    },
    //触发删除项目弹出框
    triDelProDialog(id, index) {
      this.delProDialog = true
      this.curProject = this.projects[index] //当前项目
    },
    //删除一个项目
    delProject(proId) {
      for (let i = 0; i, this.projects.length; i++) {
        if (this.projects[i].id == proId) {
          this.projects.splice(i, 1)
          this.delProDialog = false
          return
        }
      }
      // TODO添加删除项目API
    }
  },
  components: {}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/base.styl';
@import '../common/stylus/mixin.styl';

.top {
    border-bottom: 1px solid #CCC;
    height: 68px;
    width: 100%;
    padding: 16px 24px 0;
    box-sizing: border-box;

    .top-left {
        float: left;

        i.icon-open-folder {
            font-size: 20px;
            margin-right: 6px;
        }

        span {
            padding: 5px 8px;
            display: inline-block;
            border: 1px solid transparent;
            border-radius: 3px;
            cursor: pointer;
            color: #222;
            font-size: 14px;
            line-height: 14px;

            &:hover {
                border: 1px solid #737373;
            }
        }

        .account-verified {
            padding: 4px 8px;
            display: inline-block;
            border-radius: 10px;
            background-color: #F3E350;
            color: #777;
            text-align: center;
            font-size: 12px;
            cursor: default;

            i {
                margin-right: 4px;
            }
        }

        .send-email {
            color: #007ac0;
            font-size: 12px;

            &:hover {
                border-color: #007ac0;
            }
        }
    }
    .top-right {
        float: right;
        i.icon-plus {
            font-size: 12px;
            margin-right: 8px;
        }
    }
}

.menu {
    padding: 24px 24px 0;
    margin-bottom: 32px;

    .title {
        font-size: 19px;
        color: #a5a5a5;
    }

    .menu-right {
        float: right;

        .view-style {
            display: inline-block;
            margin: 0 16px;
        }

        .list, .table {
            cursor: pointer;
            margin-right: 4px;
            width: 24px;
            height: 25px;
            text-align: center;
            line-height: 25px;
            border-radius: 3px;
            display: inline-block;
            color: #a5a5a5;

            &.active {
                color: #fff;
                background-color: #a5a5a5;
            }
        }

        .sory-by {
            display: inline-block;
            padding: 10px 13px;
        }
    }
}

.projects-box {
    padding: 0 24px;

    .icon-star.icon-star-active {
        color: #f3e350;
    }

    .icon-ring {
        font-size: 12px;
        color: #007ac0;
    }

    .icon-circle {
        font-size: 12px;
        color: #04b26e;
    }
    .sort-text{
        margin-bottom: 10px;
    }
    .project-list-item {
        width: 100%;
        height: 100px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        background-color: #fff;
        margin-bottom: 20px;
        border-radius: 3px;
        box-shadow: 0 1px 4px #f2f2f2;
        position: relative;
        display: flex;
        cursor: pointer;

        &:hover {
            background-color: #f7f7f7;
            transition: background-color 0.2s;
        }

        .project-bar-star {
            text-align: center;
            line-height: 100px;
            color: #a5a5a5;
            cursor: pointer;
            padding: 0 14px;

            &.active {
                color: #edc95f;
            }
        }

        .project-description {
            min-width: 34%;
        }

        .project-name-container {
            height: 20px;
            margin: 0 0 0 44px;
            position: relative;

            .project-name {
                color: #333;
                display: block;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .project-name-input {
                position: absolute;
                top: -22px;
                left: -5px;
                display: none;
            }
        }

        .project-info {
            color: #b3b3b3;
            display: block;
            font-size: 12px;
            font-weight: 300;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 15px;
        }

        .widget-container {
            width: 145px;
            height: 100%;
            position: relative;
            text-align: center;
            float: left;
            h3 {
                color: #999;
                font-weight: 300;
                white-space: nowrap;
                position: relative;
                font-size: 12px;
            }
            .status.edit {
                background: 0 0;
                border-color: #599d97;
                color: #599d97;
            }
            .status.published {
                background: #599d97;
                color: #fff;
            }
            .basic-count-widget {
                span {
                    color: #6699bd;
                    display: block;
                    font-size: 42px;
                }
                .language {
                    color: #a5a5a5;
                    font-size: 16px;
                }
            }
        }

        .actions-menu-button {
            background-color: #f7f7f7;
            border: none;
            border-left: 1px solid #e6e6e6;
            cursor: pointer;
            padding: 0;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            height: auto;
            width: 40px;
            text-align: center;
            line-height: 100px;
            position: relative;

            .icon-arrow-down {
                font-size: 12px;
                color: gray;
            }
        }
    }

    .project-left {
        width: 20px;
    }

    .project-middle {
        flex: 1;

        .middle-box {
            top: 50%;
            transform: translateY(-50%);
            position: absolute;

            .icon-survey {
                font-size: 18px;
            }
        }
    }

    .project-right {
        width: 600px;
        position: relative;
        .project-right-content{
            height: 60px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}

/* 表格展示项目 */
.project-table {
    cursor: pointer;
    font-family: 'microsoft yahei';

    .icon-star {
        color: #a5a5a5;
        padding: 0 6px;
    }

    .project-type-icon {
        display: inline-block;
        float: none;
        margin-right: 0;
    }

    .icon-arrow-box {
        height: 26px;
        width: 26px;
        display: inline-block;
        text-align: center;
        line-height: 26px;
        box-sizing: border-box;
        border-radius: 3px;
        border: 1px solid #a4a4a4;

        i {
            font-size: 12px;
        }
    }
}

/* 创新项目弹出框 */
.create-container {
    width: 100%;
    max-height: 310px;
    overflow-y: auto;
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    background-color: #f2f5f8;
}

.create-menu {
    float: left;
    width: 30%;

    li {
        width: 100%;
        height: 48px;
        line-height: 48px;
        padding: 0 12px;
        text-align: left;
        color: #737373;
        cursor: pointer;
        overflos: hidden;
        box-sizing: border-box;
        font-size: 12px;
    }

    li:hover {
        background-color: #8f96a6;
        color: #fff;
    }

    li.active {
        background-color: #007ac0;
        color: #fff;
    }

    li.divider, li.divider:hover {
        background-color: transparent;
        cursor: auto;
        color: #a5a5a5;
        border-top: 1px solid #ccc;
    }
}

.create-content {
    float: right;
    width: 70%;
    min-height: 300px;
    box-sizing: border-box;
    padding: 30px 24px 24px;
    background-color: #fff;
    border-left: 1px solid #e8e8e8;

    h2 {
        color: #000;
        margin-bottom: 30px;
        font-size: 12px;
        font-weight: 700;
    }

    span {
        display: block;
        color: #a5a5a5;
        font-size: 14px;
        margin-bottom: 8px;
    }

    input, select {
        border: 1px solid #c6c6c6;
        display: block;
        width: 100%;
        color: #222;
        height: 36px;
        padding: 8px 13px;
        box-sizing: border-box;
        border-radius: 3px;
    }
}

.el-dialog__wrapper {
    z-index: 10000 !important;
}

/* 项目是否激活弹出框 */
.project-status-container {
    h2 {
        line-height: 20px;
    }

    p {
        margin-top: 12px;
    }
}
/* 删除项目弹出框 */
.dele-project-container {
    h3, h2 {
        margin-bottom: 13px;
    }

    h2 {
        font-weight: 700;
    }
}

/* 复制项目弹出框 */
.copy-project-container {
    .form-control {
        margin: 16px 0;
        p {
            margin-bottom: 8px;
        }
        button {
            margin: 0;
        }
    }
}

.tooltip-content {
    text-align: center;
}

/* 无项目时 */
.none-container {
    width: 300px;
    height: 150px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    text-align: center;
}

.none-text {
    font-size: 24px;
    line-height: 36px;
    color: #aaa;
    margin-bottom: 20px;
}
.flex-box{
    display: flex;
}
.flex-column{
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.flex-item{
    flex: 1;
}
</style>