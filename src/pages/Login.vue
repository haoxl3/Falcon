<template>
    <div class="login-wrap">
        <div class="login-box">
            <span class="toggleImg" @click="accOrQrcode">
                <img v-show="!isAccOrQrcode" src="../../static/img/app.png"/>
                <img v-show="isAccOrQrcode" src="../../static/img/scan.png"/>
            </span>
            <div class="login-by-account" v-show="isAccOrQrcode">
                <div class="login-content">
                    <ul class="login-tab">
                        <li :class="isPwdOrPhone === true ? 'active':''" @click="pwdOrPhone">账号密码登录</li>
                        <li :class="!isPwdOrPhone === true ? 'active':''" @click="pwdOrPhone">手机动态登录</li>
                    </ul>
                    <div class="login-by-password" v-show="isPwdOrPhone">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                            <el-form-item prop="username">
                                <el-input v-model="ruleForm.username" placeholder="手机号/邮箱/用户名">
                                    <template slot="prepend"><i class="icon iconfont icon-singer-user"></i></template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                                    <template slot="prepend"><i class="icon iconfont icon-password"></i></template>
                                </el-input>
                            </el-form-item>
                            <div class="clearfix remember-box">
                                <span style="float: left;">
                                    <input type="checkbox" id="remember"/><label for="remember">两周内自动登录</label>
                                </span>
                                <a href="" style="float: right;">忘记密码</a>
                            </div>
                            <div class="login-btn">
                                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                            </div>
                        </el-form>
                    </div>
                    <div class="login-by-phone" v-show="!isPwdOrPhone">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                            <el-form-item prop="username">
                                <el-input v-model="ruleForm.username" placeholder="手机号">
                                    <template slot="prepend"><i class="icon iconfont icon-phone"></i></template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input style="width: 60%;float:left;" type="password" placeholder="动态码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                                    <template slot="prepend"><i class="icon iconfont icon-key"></i></template>
                                </el-input>
                                <el-button style="width: 38%;float:right;" type="primary">获取动态码</el-button>
                            </el-form-item>
                            <div class="login-btn" style="margin-bottom: 56px;">
                                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div class="login-bottom">
                    <p>使用第三方账号登录</p>
                    <ul class="clearfix">
                        <li><a href="" class="login-type sina" title="微博登录"></a></li>
                        <li><a href="" class="login-type qq" title="QQ登录"></a></li>
                        <li><a href="" class="login-type weixin" title="微信登录"></a></li>
                        <li class="register-text"><a href="">注册新账号></a></li>
                    </ul>
                </div>
            </div>
            <div class="login-by-qrcode" v-show="!isAccOrQrcode">
                <div class="qrcode-content">
                    <h2 class="qrcode-title">App扫码登录</h2>
                    <div class="qrcode-intro clearfix">
                        <i class="icon iconfont icon-scan-code tag-color"></i>
                        <span>Falcon APP<br><b class="tag-color">扫码登录</b>方便快捷</span>
                    </div>
                    <div class="qrcode-img"></div>
                </div>
                <div class="login-bottom">
                    <p style="text-align: center;">打开<a href="" class="tag-color">手机Falcon</a>扫码登录</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isAccOrQrcode: true,//账号登录或扫码登录
            isPwdOrPhone: true,//账号密码or手机动态码
            ruleForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        //登录切换－账号密码/手机动态码
        pwdOrPhone(loginType) {
            this.isPwdOrPhone = !this.isPwdOrPhone;
        },
        // 登录切换－账号/扫码
        accOrQrcode() {
            this.isAccOrQrcode = !this.isAccOrQrcode;
        },
        submitForm(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    localStorage.setItem('username',self.ruleForm.username);
                    self.$router.push('/home');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="stylus" scoped>
.login-wrap{
    position: relative;
    width:100%;
    height:100%;
    background-color: #5AC4F1;
}
.login-box{
    position: absolute;
    width:330px;
    height: 377px;
    background: #fff;
    top: 50%;
    left: 60%;
    transform: translateY(-50%);
    .toggleImg{
        width: 52px;
        height: 52px;
        position:absolute;
        top: 0;
        right: 0;
        cursor: pointer;
    }
}
.login-btn{
    text-align: center;
    margin: 10px 0 22px;
}
.login-btn button{
    width:100%;
    height:36px;
}
.login-content{
    padding: 0 26px;
    .login-tab{
        border-bottom: 1px solid #e7e7e7;
        margin-bottom: 22px;
        display: flex;
        li{
            flex: 1;
            text-align: center;
            font-size: 16px;
            color: #9f9f9f;
            font-weight: 700;
            padding: 20px 0 15px;
            cursor: pointer;
            &.active{
                color: #333;
                border-bottom: 2px solid #20a0ff;
            }
        }
    }
    .remember-box{
        width: 100%;
        font-size: 12px;
        input{
            vertical-align: middle;
            cursor: pointer;
        }
        label{
            vertical-align: middle;
            margin-left: 4px;
            cursor: pointer;
        }
    }
}
.login-bottom{
    background-color: #f3f3f3;
    border-top: dashed 1px #ebebeb;
    padding: 20px 26px 15px;
    opacity: 0.95;
    font-size: 12px;
    p{
        color: #999;
    }
    ul{
        width: 100%;
        margin-top: 10px;
    }
    li{
        float: left;
        margin-right: 8px;
        .login-type{
            width: 25px;
            height: 25px;
            display: inline-block;
            background-color: #20a0ff;
        }
        .sina{
            background:url('~/static/img/weibo.png');
        }
        .qq{
            background: url('~/static/img/qq.png');
        }
        .weixin{
            background: url('~/static/img/weixin.png');
        }
    }
    .register-text{
        float: right;
        margin-right: 0;
        a{
            color: #20a0ff;
        }
    }
}

.login-by-qrcode{
    .qrcode-content{
        padding: 0 26px 36px;
        text-align: center;
        background-color: rgba(233,242,246, .6);
    }
    h2{
        padding: 20px 0 15px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        border-bottom: 2px solid #20a0ff;
        margin-bottom: 30px;
    }
    .qrcode-intro{
        margin: 0 auto 30px;
        text-align: center;
        i{
            float: left;
            font-size: 30px;
            margin-right: 4px;
        }
        span{
            float:left;
            font-size: 12px;
            text-align: left;
        }
    }
    .qrcode-img{
        width: 150px;
        height: 150px;
        background-color: pink;
        margin: 0 auto;
    }
}
.tag-color{
    color: #20a0ff
}
</style>

