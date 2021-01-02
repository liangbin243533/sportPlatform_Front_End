<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/homePage.png" alt="">
                <span>Fitness management platform</span>
            </div>            
            <el-button type="info" @click="logout">Logout</el-button>
        </el-header>
  <el-container>
    <el-aside width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapase">|||</div>
        <el-menu background-color="#2a6691" text-color="#fff" active-text-color="#409eff"
        :collapse="isCollapse" :collapse-transition="false" :router="true"
        :default-active="activePath">
      <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
        <template slot="title">
          <i :class="iconsObject[item.id]"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item :index="it.path" v-for="it in item.subMenuList" :key="it.id" @click="saveNavState(it.path)">
            <template slot="title">
          <i :class="iconsObject[it.id]"></i>
          <span>{{it.title}}</span>
        </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
    data() {
        return {
            menuList: [],
            isCollapse: false,
            iconsObject: {
                '100':'iconfont icon-quanxianshezhi',
                '200':'iconfont icon-yundong',
                '101':'iconfont icon-denglu',
                '102':'iconfont icon-quanxianshezhi',
                '103':'iconfont icon-yundong',
                '104':'iconfont icon-shiwu',
                '201':'iconfont icon-gerenjianjie',
                '202':'iconfont icon-qialuli',
                '203':'iconfont icon-chifan2600',
                '204':'iconfont icon-yundong-',
            },
            activePath: '/welcome',
        }
    },
    created() {
        this.getMenuList();
        this.activePath = window.sessionStorage.getItem("activePath");
    },
    methods: {
        logout(){
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        async getMenuList() {
            const {data : res} = await this.$http.get("menus");
            if (res.flag != 200) {
                return this.$message.error("Failed to get list");
            }
            this.menuList = res.menus;
        },
        toggleCollapase() {
            this.isCollapse = !this.isCollapse;
        },
        saveNavState(activePath) {
            window.sessionStorage.setItem("activePath", activePath);
            this.activePath = activePath;
        }
    }
}
</script>
<style lang='less' scoped>
.el-header {
    background-color: #2a6691;
    display: flex;
    justify-content: space-between;
    padding-left: 0%;
    align-items: center;
    color: #fff;
    font-size: 20px;
    >div {
        display: flex;
        align-items: center;
        span {
            margin-left: 15px;
        }
    }
}
.el-aside {
    background-color: #a1ca80;
    .el-menu {
        border-right: none;
    }
}
.el-main {
    background-color: #eaedf1;
}
img {
    width: 55px;
    width: 55px;
}
.toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}

</style>