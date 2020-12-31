<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/homePage.png" alt="">
                <span>Personal Sport Platform</span>
            </div>            
            <el-button type="info" @click="logout">Logout</el-button>
        </el-header>
  <el-container>
    <el-aside width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapase">|||</div>
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff"
        :collapse="isCollapse" :collapse-transition="false">
      <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
        <template slot="title">
          <i :class="iconsObject[item.id]"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item :index="it.id + ''" v-for="it in item.subMenuList" :key="it.id">
            <template slot="title">
          <i :class="iconsObject[it.id]"></i>
          <span>{{it.title}}</span>
        </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
        
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
                '100':'iconfont icon-denglu',
                '200':'iconfont icon-denglu',
                '101':'iconfont icon-denglu',
                '102':'iconfont icon-denglu',
                '103':'iconfont icon-denglu',
                '104':'iconfont icon-denglu',
                '201':'iconfont icon-denglu',
                '202':'iconfont icon-denglu',
                '203':'iconfont icon-denglu',
                '204':'iconfont icon-denglu',
            }
        }
    },
    created() {
        this.getMenuList();
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
        }
    }
}
</script>
<style lang='less' scoped>
.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0%;
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
    background-color: #373d44;
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