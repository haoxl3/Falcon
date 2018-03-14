<template>
  <div>
    <header>
      <div class="logo"></div>
      <ul>
          <li>
              <router-link to="/projects">项目</router-link>
          </li>
          <li>
              <router-link to="/contacts">联系人</router-link>
          </li>
          <li>
              <router-link to="/library">库</router-link>
          </li>
          <li @click="helpDialog=true">帮助</li>
          <li>
            <el-dropdown trigger="click" @command="handleCommand">
                <i class="icon iconfont icon-user"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>{{username}} 2017/06/30</el-dropdown-item>
                    <el-dropdown-item divided>账号设置...</el-dropdown-item>
                    <el-dropdown-item>刷新账户</el-dropdown-item>
                    <el-dropdown-item command="logout">注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
          </li>
      </ul>
    </header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!--帮助弹出框-->
    <el-dialog title="Help & Feedback" :visible.sync="helpDialog" size="small">
      <div class="help-content">
          <h2>Become an Expert</h2>
          <p>Visit Qualtrics University for tutorials, webinars, online training and more.</p>
          <div class="center-container clearfix">
              <div class="img-box"></div>
              <div class="btn-box">
                  <el-button class="help-btn" type="success">Visit Qualtrics University</el-button>
                  <el-button class="help-btn" :plain="true" type="success">Explore the Qualtrics XM Platform</el-button>
              </div>
          </div>
          <div class="contact-section">
              <h2>Contact Us</h2>
              <div class="squares-box">
                  <a href="" class="square-box">I have a technical question/issue</a>
                  <a href="" class="square-box">I would like to request a feature</a>
                  <a href="" class="square-box">I want to give feedback</a>
              </div>
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="helpDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      helpDialog: false,
      name: 'test'
    }
  },
  computed: {
    username() {
      let username = localStorage.getItem('username');
      return username ? username : this.name;
    }
  },
  methods: {
    handleCommand(command) {
      if (command == 'logout') {
        localStorage.removeItem('username')
        this.$router.push('/login');
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
header{
  width: 100%;
  height: 72px;
  border-bottom: 1px solid #e8e8e8;
  color: #737373;
  font-weight: 300;
  background-color: #fff; 
  .logo{
    width: 140px;
    height: 72px;
    background: url('../assets/logo.png') no-repeat center center;
    background-size: contain;
    margin-left: 24px;
    float: left;
  }
  ul{
    float: right;
    li{
      display: inline-block;
      margin-right: 32px;
      text-align: center;
      line-height: 72px;
      font-size: 14px;
      cursor: pointer;
      &:hover a{
        color: #007ac0;
      }
      a.router-link-active{
        font-weight: 600;
        color: #007ac0;
      }
      .icon-user{
        font-size: 20px;
        cursor: pointer;
        &:hover{
          color: #007ac0;
        }
      }
    }
  }
}
.help-content{
    padding: 20px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    .center-container{
        margin: 20px 0 0 58px;
        .img-box{
            float: left;
            width: 200px;
            height: 90px;
            background: url('../assets/logo.png') no-repeat center center;
            background-size: contain;
            margin-right: 20px;
        }
        .btn-box{
            float: right;
            .help-btn{
                display: block;
                margin-left: 0;
                width: 260px;
            }
            .help-btn:first-child{
                margin-bottom: 20px;
            }
        }
    }
   .contact-section{
        padding: 10px 0;
        .squares-box{
            display: flex;
            justify-content: space-between;
            .square-box{
                display: inline-block;
                width: 170px;
                height: 72px;
                border: 1px solid #a4a4a4;
                border-radius: 3px;
                text-align: center;
                padding: 18px 24px;
                box-sizing: border-box;
            }
            .square-box:hover{
                border: 1px solid #333;
                color: #333;
            }
        }
    }
    h2{
        margin-top: 0!important;
    }
}
</style>