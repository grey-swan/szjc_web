<template>
	<section>
		<br>
		<el-steps :active="active" finish-status="success" simple>
			<el-step title="样品信息"></el-step>
			<el-step title="单位信息"></el-step>
			<el-step title="信息确认"></el-step>
		</el-steps>
		<el-row><br></el-row>

		<!--工具条-->
		<el-row>
			<el-col :span="12" class="toolbar" >
				<el-button-group>
					<el-button size="small" type="primary" icon="el-icon-arrow-left" @click="previous" :disabled="active === 0">上一步</el-button>
					<el-button size="small" type="primary" @click="next" :disabled="active === 2">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
				</el-button-group>
			</el-col>
			<el-col :span="12" class="toolbar" align="right">
				<el-button size="small" type="primary" @click="confirm" :disabled="active < 2">提交</el-button>
			</el-col>
		</el-row>
		<el-row><br><br></el-row>
		<el-row>
			<!-- 样品信息 -->
			<app-sample-info v-show="active === 0" :form.sync="sampleForm" ref="cominfo" @validate="validateForm"></app-sample-info>
			<!-- 第三方收样信息 -->
			<app-sample-person v-show="active === 1" :form.sync="sampleForm" ref="comperson" @validate="validateForm"></app-sample-person>
			<!-- 收样预览，信息确认 -->
			<app-sample-show v-show="active === 2" :form="sampleForm"></app-sample-show>
		</el-row>
	</section>
</template>

<script>
	import { http_request } from '../../api/api';
	import SampleInfo from '../sample/SampleInfo';
	import SamplePerson from '../sample/SamplePerson';
	import SampleShow from '../sample/SampleShow';
	import SampleResult from '../sample/SampleResult';

	export default {
		data() {
			return {
				sampleUrl: 'http://localhost:8000/api/sample/',
				active: 0,
				filters: {
					search: ''
				},
				sampleForm: {
					type: 1,
					prop: 0,
					prod_date: new Date(),
					send_date: new Date(),
					rec_date: new Date(),
					check_date: new Date()
				},
				addLoading: false,
				sources: [
					{
						label: '/',
						value: '0'
					},
					{
						label: '自送样',
						value: '1'
					},
					{
						label: '采样',
						value: '2'
					}
				],
				sampleFormRules: {
					code: [
						{ required: true, message: '请输入样品标识', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入样品名称', trigger: 'blur' }
					]
				}
			}
		},
		components: {
			'app-sample-info': SampleInfo,
			'app-sample-person': SamplePerson,
			'app-sample-show': SampleShow,
			'app-sample-result': SampleResult
		},
		methods: {
			//验证表单正确性
			validateForm(valid) {
				if (valid === true) {
					this.active++
					if (this.active > 2) this.active = 2;
				} else {
					this.$message({
						message: '请正确填写数据',
						type: 'error'
					});
				}
			},
			//上一页
			previous() {
				this.active--;
				if (this.active < 0) this.active = 0;
			},
			//下一页
			next() {
				if (this.active === 0) {
					this.$refs.cominfo.check();
				} else if (this.active === 1) {
					this.$refs.comperson.check();
				} else {
					this.$refs.comext.check();
				}
			},
			//提交
			confirm() {
				let sample_id = this.$route.params.sample_id;
				if (sample_id === undefined) {
					this.handleAdd();
				} else {
					this.handleEdit(sample_id);
				}
			},
			//添加抽样
			handleAdd() {
				this.addLoading = true;
				let para = Object.assign({}, this.sampleForm);
				http_request(this.sampleUrl, 'post', para).then((res) => {
					this.addLoading = false;
					this.$message({message: '提交成功', type: 'success'});
					this.$refs['editForm'].resetFields();
					this.editFormVisible = false;
					//跳转到样品列表
					this.$router.push({path:'/sample/'});
					//this.$router.push({ name: '抽样记录'});
				}).catch(() => {
					this.addLoading = false;
					this.$message({message: '提交失败', type: 'error'});
				});
			},
			//编辑抽样
			handleEdit(sample_id) {
				this.addLoading = true;
				let para = Object.assign({}, this.sampleForm);
				let url = this.sampleUrl+sample_id+'/';
				http_request(url, 'patch', para).then((res) => {
					this.addLoading = false;
					this.$message({message: '提交成功', type: 'success'});
					this.$router.push({path:'/sample/'});
				}).catch(() => {
					this.addLoading = false;
					this.$message({
						message: '提交失败',
						type: 'error'
					});
				});
			},
			//获取样品明细
			getSampleDetail(sample_id) {
				this.listLoading = true;
				let url = this.sampleUrl+sample_id+'/';
				http_request(url, 'get', {}).then((res) => {
					this.sampleForm = res.data;
				}).catch(() => {
					this.$message({message: '获取获取样品信息失败', type: 'error'});
				});
			}
		},
		mounted() {
			let sample_id = this.$route.params.sample_id;
			if (sample_id !== undefined) {
				this.getSampleDetail(sample_id);
			}
		}
	}
</script>