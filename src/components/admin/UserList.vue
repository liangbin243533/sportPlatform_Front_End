<template>
    <div>User list
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/home' }">Home page</el-breadcrumb-item>
            <el-breadcrumb-item>Permissions management</el-breadcrumb-item>
            <el-breadcrumb-item>User List</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="25">
                <el-col :span=10>
                    <el-input placeholder="Please input searching content" v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span=4>
                <el-button type="primary" @click="addDialogVisible = true">Add User</el-button>
                </el-col>
            </el-row>
            <el-table :data="userList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="Username" prop="username"></el-table-column>
                <el-table-column label="Email" prop="email"></el-table-column>
                <el-table-column label="Password" prop="password"></el-table-column>
                <el-table-column label="Role" prop="role"></el-table-column>
                <el-table-column label="State" prop="state">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.state" @change="userStateChanged(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="Operation">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
                        <el-tooltip effect="dark" content="Assign permissions" placement="top-start">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>                        
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="queryInfo.pageNum"
                    :page-sizes="[1, 2, 5, 100]"
                    :page-size="queryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog title="Add user" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <el-form :model="addFrom" :rules="addFromRules" ref="addFormRef" label-width="80px">
                <el-form-item label="Username" prop="username">
                    <el-input v-model="addFrom.username"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="addFrom.password"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="addFrom.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="addUser">OK</el-button>
            </span>
        </el-dialog>

        <el-dialog title="Edit user" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
                <el-form-item label="Username" prop="username">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="editForm.password"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="editUser">OK</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    created() {
        this.getUserList();
    },
    data() {
        return {
            queryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 5,
            },
            userList: [],
            total: 0,
            addDialogVisible: false,
            addFrom: {
                username: "",
                password: "",
                email: "",
            },
            editForm: {
                username: "",
                password: "",
                email: "",
            },
            editDialogVisible: false,

            addFromRules: {
                username: [
                    { required: true, message: 'Please input username', trigger: 'blur' },
                    { min: 5, max: 8, message: 'Length should be 5 to 8', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: 'Please input Password', trigger: 'blur' },
                    { min: 6, max: 8, message: 'Length should be 6 to 8', trigger: 'blur' }
                ],
                email:[
                    { required: true, message: 'Please input Email', trigger: 'blur' },
                    { min: 5, max: 15, message: 'Length should be 5 to 15', trigger: 'blur' }
                ],
                },
            editFormRules: {
                password:[
                    { required: true, message: 'Please input Password', trigger: 'blur' },
                    { min: 6, max: 8, message: 'Length should be 6 to 8', trigger: 'blur' }
                ],
                email:[
                    { required: true, message: 'Please input Email', trigger: 'blur' },
                    { min: 5, max: 15, message: 'Length should be 5 to 15', trigger: 'blur' }
                ],
                }
        }
    },
    methods: {
        async getUserList() {
            const {data : res} = await this.$http.get("allUser", {params:this.queryInfo});
            this.userList = res.data;
            this.total = res.numbers;
        },
        handleSizeChange(newSize) {
            this.queryInfo.pageSize = newSize;
            this.getUserList();
        },
        handleCurrentChange(newPage) {
            this.queryInfo.pageNum = newPage;
            this.getUserList();
        },
        async userStateChanged(userInfo) {
            var formData = new FormData();
            formData.append('id', userInfo.id);
            formData.append('state', userInfo.state);
            this.$http.put('/userState', formData);
            const {data : res} = await this.$http.put('/userState', formData);
            if (res != "success") {
                userInfo.id = !userInfo.id;
                return this.$message.error("Operation failly");
            }
            this.$message.success("Operation successfully");
        },
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
        },
        addUser() {
            this.$refs.addFormRef.validate(async valid =>{
                if (!valid) {
                    return;
                }
                console.log(this.addFrom);
               const {data : res} = await this.$http.post("addUser", this.addFrom);
               if (res !="success") {
                   return this.$message.error("Operation failly");                  
               } 
               this.$message.success("Operate successfully");
               this.addDialogVisible = false;
                this.getUserList();
            });
        },
        async deleteUser(id) {
            const confirmResult = await this.$confirm("This operation will delete user, continue?", "Tips", {
                confirmButtonText: "Confirm",
                cancelButtonText: "Cancel",
                type: "warning"
            }).catch(err => err)
            if (confirmResult != "confirm") {
                return this.$message.info("Cancel delete");
            }
            const {data : res} = await this.$http.delete("deleteUser?id=" + id);
            if (res !="success") {
                   return this.$message.error("Delete failly");                  
            }
            this.$message.success("Delete successfully");
            this.getUserList();
        },
        async showEditDialog(id) {
            const {data : res} = await this.$http.get("getUpdate?id=" + id);
            this.editForm = res;
            this.editDialogVisible = true;
        },
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        editUser() {
            this.$refs.editFormRef.validate(async valid =>{
                if (!valid) {
                    return;
                }
               const {data : res} = await this.$http.put("editUser", this.editForm);
               if (res !="success") {
                   return this.$message.error("Edit failly");                  
               } 
               this.$message.success("Edit successfully");
               this.editDialogVisible = false;
                this.getUserList();
            });
        }
    },
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
    margin-bottom: 15px;
    font-size: 17px;
}

</style>