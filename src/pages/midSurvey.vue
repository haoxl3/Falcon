<template>
    <div>
        <ul>
            <li><router-link :to="{path:'survey', query: {id: pid}}">调研</router-link></li>
            <li><router-link :to="{path:'distribution', query: {id: pid}}">发布</router-link></li>
            <li><router-link :to="{path:'analysis', query: {id: pid}}">数据分析</router-link></li>
            <li><router-link :to="{path:'report', query: {id: pid}}">报表</router-link></li>
        </ul>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
export default{
    data() {
        return {
            pid: this.$router.query.id
        }
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    ul{
        height: 40px;
        padding: 0 24px;
        background-color: #f9f9f9;
        li{
            float: left;
            font-size: 14px;
            line-height: 37px;
            margin-right: 32px;
            box-sizing: border-box;
            a{
                width: 100%;
                height: 100%;
                display: inline-block;
                box-sizing: border-box;
            }
            a:hover{
                color: #007ac0;
            }
            a.router-link-active{
                color: #007ac0;
                font-weight: 600;
                border-bottom: 3px solid #007ac0;
            }
        }
    }
</style>
