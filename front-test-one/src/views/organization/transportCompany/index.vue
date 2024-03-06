<template>
    <div class="app-container">
        <div>
            <el-form
                :model="queryParams"
                ref="queryForm"
                size="small"
                :inline="true"
                v-show="showSearch"
                label-width="68px"
            >
                <el-form-item label="企业名称" prop="companyName">
                <el-input
                    v-model="queryParams.companyName"
                    placeholder="请输入企业名称"
                    clearable
                    style="width: 240px"
                    @keyup.enter.native="handleQuery"
                />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                <el-select
                    v-model="queryParams.status"
                    placeholder="用户状态"
                    clearable
                    style="width: 240px"
                >
                    <el-option :label="'启用'" :value="0" />
                    <el-option :label="'禁用'" :value="-1" />
                </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        icon="el-icon-search"
                        size="mini"
                        @click="handleQuery"
                        >搜索</el-button
                    >
                    <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
                        >重置</el-button
                    >
                </el-form-item>
            </el-form>
            <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
            <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd"
                v-hasPermi="['biz:residentCompany:add']"
                >新增</el-button
            >
            </el-col>
            </el-row>
            <right-toolbar
            :showSearch.sync="showSearch"
            @queryTable="getList"
            ></right-toolbar>
            <el-table
            :data="transportCompanies"
            stripe
            style="width: 100%">
            <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50">
            </el-table-column>
            <el-table-column
            prop="companyCode"
            align="center"
            label="公司编码"
            width="150">
            </el-table-column>
            <el-table-column
            prop="companyName"
            align="center"
            label="公司名称">
            </el-table-column>
            <el-table-column
            prop="companyAbbreviation"
            align="center"
            label="简称">
            </el-table-column>
            <el-table-column
            prop="contacts"
            align="center"
            label="联系人"
            >
            </el-table-column>
            <el-table-column
            prop="mobile"
            align="center"
            label="联系电话"
            width="150">
            </el-table-column>
            <el-table-column
            prop="createCompany"
            align="center"
            label="责任单位">
            </el-table-column>
            <el-table-column label="状态" align="center" key="status">
                <template slot-scope="scope">
                    <el-switch
                    v-model="scope.row.status"
                    active-value="0"
                    disabled
                    inactive-value="-1"
                    @change="handleStatusChange(scope.row)"
                    ></el-switch>
                </template>
                </el-table-column>
            <el-table-column
            prop="vehicleCount"
            align="center"
            label="车辆数量">
            </el-table-column>
            <el-table-column
            prop="updateTime"
            align="center"
            label="更新时间"
            width="100">
            </el-table-column>
            <el-table-column
            prop="createTime"
            align="center"
            label="创建时间"
            width="100">
            </el-table-column>
        </el-table>
        <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getList"
            />
        </div>
        <add-or-edite-transport :open="open"  :title="title" @cancel="cancel"  @submit-form="submitForm"></add-or-edite-transport>
    </div>
</template>

<script>
    import {
    listTCompany
    } from "@/api/organization/transportCompany";
    import "@riophae/vue-treeselect/dist/vue-treeselect.css";
    import  {AddOrEditeTransport } from "./component/index.js";
    export default{
        name:"TransportCompany",
        components: {
            AddOrEditeTransport
            },
        data(){
            return{
                loading: true,
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    companyName: undefined,
                    status: "",
                },
                transportCompanies: [],
                total: 0,
                showSearch: true,
                title: "",
                // 是否显示弹出层
                open: false,
                // 导入弹框
                uploadOpen: false,
                companyId:null,
            }
        },
        created(){
            this.getList();
        },
        methods:{
            getList(){
                this.loading = true;
                listTCompany(this.queryParams)
                .then(response => {
                    console.log(response);
                    this.transportCompanies = response.rows;
                    this.total = response.total;
                    this.loading = false;
                    console.log(this.transportCompanies);
                })
                .catch(error => {
                    console.error('Error fetching transport companies: ' + error);
                });
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageNum = 1;
                this.getList();
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.dateRange = [];
                this.resetForm("queryForm");
                this.handleQuery();
            },
            /** 新增按钮操作 */
            handleAdd() {
                this.open = true;
                this.title = "添加企业";
            },
            /* 新增修改弹框取消按钮 */
            cancel() {
                this.open = false;
            },
            /** 提交按钮 */
            submitForm: function () {
            this.open = false;
            this.getList();
            },
        }

    }
</script>
