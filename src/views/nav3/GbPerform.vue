<template>
	<section>
		<!--工具条-->
		<el-row class="toolbar">
			<el-col :span="12">
				<el-form size="small" :inline="true" :model="filters">
					<el-form-item>
						<el-input v-model="filters.search" placeholder="编号或名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="getPerforms">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="success" @click="handleAdd">新增</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="12" align="right">
				<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="page_size" :total="total" background>
				</el-pagination>
			</el-col>
		</el-row>

		<!--列表-->
		<el-table size="mini" :data="items" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" label="#">
			</el-table-column>
			<el-table-column prop="no" label="标准编号" sortable>
			</el-table-column>
			<el-table-column prop="name" label="标准名称">
			</el-table-column>
			<el-table-column prop="created" label="创建时间">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="page_size" :total="total" style="float:right;" background>
			</el-pagination>
		</el-col>

		<!--添加和编辑界面-->
		<el-dialog width="70%" top="30px" title="编辑执行标准" :close-on-click-modal="false" :visible.sync="editFormVisible">
			<el-dialog width="50%" title="添加检测方法" :close-on-click-modal="false" :visible.sync="methodVisible" append-to-body>
				<el-form ref="methodForm" label-position="right" label-width="80px" :rules="methodFormRules" :model="methodForm" size="mini">
					<el-form-item label="父级" prop="parent">
						<el-select v-model="methodForm.parent" placeholder="请选择父级" clearable>
							<el-option v-for="item in methodParent" :key="item.id" :value="item.id" :label="item.name"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="编号" prop="no">
						<el-input v-model="methodForm.no"></el-input>
					</el-form-item>
					<el-form-item label="名称" prop="name">
						<el-input v-model="methodForm.name"></el-input>
					</el-form-item>
					<el-form-item label="标准值" prop="standard">
						<el-input v-model="methodForm.standard"></el-input>
					</el-form-item>
					<el-form-item label="单位" prop="unit">
						<el-select v-model="methodForm.unit" placeholder="请选择活动区域">
							<el-option label="g/L" value="g/L"></el-option>
							<el-option label="g" value="g"></el-option>
						</el-select>
					</el-form-item>
				</el-form>

				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click.native="methodVisible = false">取消</el-button>
					<el-button size="small" type="primary" @click.native="methodAdd(editForm.id)">提交</el-button>
				</div>
			</el-dialog>

			<el-form size="mini" :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="标准编号" prop="no">
					<el-input v-model="editForm.no" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="标准名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<el-table size="mini" :data="methodData">
				<el-table-column property="no" label="方法编号" width="140px"></el-table-column>
				<el-table-column property="parent_name" label="上级" width="120px"></el-table-column>
				<el-table-column property="name" label="方法名称" width="120px"></el-table-column>
				<el-table-column property="unit" label="单位" width="80px"></el-table-column>
				<el-table-column property="standard" label="标准值"></el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-button type="danger" size="mini" @click="methodDel(scope.row)" icon="el-icon-delete" circle></el-button>
					</template>
				</el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" type="success" @click.native="methodVisible = true" v-show="showAddMethod">增加检测方法</el-button>
				<el-button size="small" @click.native="editFormVisible = false">取消</el-button>
				<el-button size="small" type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util';
	import { http_request } from '../../api/api';

	export default {
		data() {
			return {
				performUrl: 'http://localhost:8000/api/perform/',
				methodUrl: 'http://localhost:8000/api/method/',
				filters: {
					search: ''
				},
				methodData: [],
				items: [],
				total: 0,
				page_size: 10,
				page: 1,
				oper: 0,
				listLoading: false,
				showAddMethod: true,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				methodVisible: false,//添加检测方法界面是否显示
				editLoading: false,
				editFormRules: {
					no: [
						{ required: true, message: '请输入标准编号', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入标准名称', trigger: 'blur' }
					]
				},
				methodFormRules: {
					no: [
						{ required: true, message: '请输入方法编号', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入方法名称', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					no: ''
				},
				//检测方法
				methodForm: {
					perform: null,
					id: null,
					no: '',
					name: '',
					unit: '',
					standard: ''
				}
			}
		},
		computed: {
			methodParent: function () {
				return this.methodData;
			}
		},
		methods: {
			//分页切换
			handleCurrentChange(val) {
				this.page = val;
				this.getPerforms();
			},
			//增加检测方法
			methodAdd(perform_id) {
				this.methodForm.perform = perform_id;
				this.$refs.methodForm.validate((valid) => {
					if (valid) {
						let para = Object.assign({}, this.methodForm);
						http_request(this.methodUrl, 'post', para).then((res) => {
							this.methodData.push(res.data);
							this.methodVisible = false;
							this.editFormVisible = true;
						}).catch((error) => {
							this.$message({
								message: '提交失败',
								type: 'error'
							});
						});
					}
				});
			},
			//删除检测方法
			methodDel(row) {
				let url = this.methodUrl+row.id+'/';
				http_request(url, 'delete', {}).then((res) => {
					util.removeValueById(this.methodData, row.id);
					util.removeValueByParent(this.methodData, row.id);
				}).catch(() => {
					this.$message({
						message: '删除失败',
						type: 'error'
					});
				});
			},
			//获取执行标准
			getPerforms() {
				this.listLoading = true;
				let url = this.performUrl+'?page='+this.page+'&search='+this.filters.search;
				http_request(url, 'get', {}).then((res) => {
					this.total = res.data.count;
					this.page_size = res.data.page_size;
					this.items = res.data.results;
					this.listLoading = false;
				}).catch(() => {
					this.listLoading = false;
					this.$message({
						message: '获取执行标准失败',
						type: 'error'
					});
				});
			},
			//删除
			handleDel: function (row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let url = this.performUrl+row.id+'/'
					http_request(url, 'delete').then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getPerforms();
					}).catch(() => {
						this.$message({
							message: '删除执行标准失败',
							type: 'error'
						});
					});
				}).catch(() => {
					this.listLoading = false;
				});
			},
			//显示编辑界面
			handleEdit: function (row) {
				this.showAddMethod = true;
				this.oper = 1;
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
				this.methodData = row.methods;
				this.formReset('editForm');
			},
			//显示新增界面
			handleAdd: function () {
				this.showAddMethod = false;
				this.oper = 0;
				this.editFormVisible = true;
				this.editForm = {
					name: '',
					no: ''
				};
				this.methodData = []
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.editLoading = true;
						//NProgress.start();
						let para = Object.assign({}, this.editForm);
						let url = '';
						let method = '';
						if (this.oper === 0) {
							url = this.performUrl;
							method = 'post';
							para['methods'] = Array()
						} else {
							url = this.performUrl+para.id+'/';
							method = 'patch';
						}

						http_request(url, method, para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.formReset('editForm');
							this.editFormVisible = false;
							this.getPerforms();
						}).catch(() => {
							this.editLoading = false;
							this.$message({
								message: '提交失败，标准标号不能重复',
								type: 'error'
							});
						});
					}
				});
			},
			formReset(formName) {
				if (this.$refs.hasOwnProperty(formName)) {
					this.$refs[formName].resetFields();
				}
			}
		},
		mounted() {
			this.getPerforms();
		}
	}

</script>

<style scoped>
</style>