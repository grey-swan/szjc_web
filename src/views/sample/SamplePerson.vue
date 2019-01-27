<template>
	<el-form size="small" ref="infoForm" :rules="infoFormRules" :model="infoForm" label-width="160px">
		<el-col :span="12">
			<el-form-item label="委托单位">
				<el-input v-model="infoForm.agent_firm" placeholder="请输入委托单位"></el-input>
			</el-form-item>
			<el-form-item label="委托单位地址">
				<el-input v-model="infoForm.agent_address" placeholder="请输入委托单位地址"></el-input>
			</el-form-item>
			<el-form-item label="委托单位联系人" prop="agent_user">
				<el-input v-model="infoForm.agent_user" placeholder="请输入联系人"></el-input>
			</el-form-item>
			<el-form-item label="委托单位联系电话" prop="agent_tell">
				<el-input v-model="infoForm.agent_tell" placeholder="请输入联系电话"></el-input>
			</el-form-item>
		</el-col>

		<el-col :span="12">
			<el-form-item label="生产单位" prop="prod_firm">
				<el-input v-model="infoForm.prod_firm" placeholder="请输入生产单位"></el-input>
			</el-form-item>
			<el-form-item label="受检单位">
				<el-input v-model="infoForm.accept_firm" placeholder="请输入受检单位"></el-input>
			</el-form-item>
			<el-form-item label="受检单位联系人" prop="accept_user">
				<el-input v-model="infoForm.accept_user" placeholder="请输入受检单位联系人"></el-input>
			</el-form-item>
			<el-form-item label="受检单位联系电话" prop="accept_tell">
				<el-input v-model="infoForm.accept_tell" placeholder="请输入受检单位联系电话"></el-input>
			</el-form-item>
		</el-col>

	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				infoFormRules: {
					prod_firm: [
						{ required: true, message: '请输入', trigger: 'blur' }
					],
					agent_user: [
						{ required: true, message: '请输入联系人', trigger: 'blur' }
					],
					agent_tell: [
						{ required: true, message: '请输入联系电话', trigger: 'blur' }
					],
					accept_user: [
						{ required: true, message: '请输入受检单位联系人', trigger: 'blur' }
					],
					accept_tell: [
						{ required: true, message: '请输入受检单位联系电话', trigger: 'blur' }
					]
				}
			}
		},
		props: {
			form: {
				type: Object,
				default: {}
			}
		},
		computed: {
			infoForm: {
				get () {
					return this.form
				},
				set (newValue) {
					this.form = newValue
				}
			}
		},
		methods: {
			check() {
				this.$refs.infoForm.validate((valid) => {
					console.log(valid);
					this.$emit("validate", valid);
				});
			}
		}
	}
</script>