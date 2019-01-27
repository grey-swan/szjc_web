<template>
	<el-form size="small" ref="infoForm" :rules="infoFormRules" :model="infoForm" label-width="160px">
		<el-col :span="12">
			<el-form-item label="样品标识" prop="code">
				<el-select v-model="infoForm.code" placeholder="请选择样品标识">
					<el-option v-for="item in codes" :key="item.value" :value="item.value" :label="item.label"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="样品名称" prop="name">
				<el-input v-model="infoForm.name" placeholder="请输入样品名称"></el-input>
			</el-form-item>
			<el-form-item label="检验检测类别">
				<el-select v-model="infoForm.type" placeholder="请选择检验检测类别">
					<el-option v-for="item in types" :key="item.value" :value="item.value" :label="item.label"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="样品来源" prop="source">
				<el-input v-model="infoForm.source" placeholder="请输入样品来源"></el-input>
			</el-form-item>
			<el-form-item label="送样人" prop="send_user">
				<el-input v-model="infoForm.send_user" placeholder="请输入送样人"></el-input>
			</el-form-item>
			<el-form-item label="收样人">
				<el-input v-model="infoForm.rec_user" placeholder="请输入收样人"></el-input>
			</el-form-item>
			<el-form-item label="送样日期">
				<el-date-picker type="date" placeholder="送样日期" v-model="infoForm.send_date"></el-date-picker>
			</el-form-item>
			<el-form-item label="收样日期">
				<el-date-picker type="date" placeholder="收样日期" v-model="infoForm.rec_date"></el-date-picker>
			</el-form-item>
		</el-col>

		<el-col :span="12">
			<el-form-item label="商标">
				<el-input v-model="infoForm.brand" placeholder="请输入商标"></el-input>
			</el-form-item>
			<el-form-item label="批号/生产日期">
				<el-date-picker type="date" placeholder="请选择生产日期" v-model="infoForm.prod_date"></el-date-picker>
			</el-form-item>
			<el-form-item label="规格">
				<el-input v-model="infoForm.spec" placeholder="请输入规格"></el-input>
			</el-form-item>
			<el-form-item label="样品数量" prop="num">
				<el-input v-model="infoForm.num" placeholder="请输入样品数量"></el-input>
			</el-form-item>
			<el-form-item label="保存方式" prop="store">
				<el-input v-model="infoForm.store" placeholder="请输入保存方式"></el-input>
			</el-form-item>
			<el-form-item label="性状/包装状态">
				<el-select v-model="infoForm.prop" placeholder="请选择性状/包装状态">
					<el-option v-for="item in properties" :key="item.value" :value="item.value" :label="item.label"></el-option>
				</el-select>
			</el-form-item>
		</el-col>
	</el-form>
</template>

<script>
	import util from '../../common/js/util';
	export default {
		data() {
			return {
				infoFormRules: {
					code: [
						{ required: true, message: '请输入样品标识', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入样品名称', trigger: 'blur' }
					],
					num: [
						{ required: true, message: '请输入样品数量', trigger: 'blur' }
					],
					store: [
						{ required: true, message: '请输入保存方式', trigger: 'blur' }
					],
					source: [
						{ required: true, message: '请输入样品来源', trigger: 'blur' }
					],
					send_user: [
						{ required: true, message: '请输入送样人', trigger: 'blur' }
					],
					rec_user: [
						{ required: true, message: '请输入收样人', trigger: 'blur' }
					],
					send_date: [
						{ required: true, message: '请输入送样日期', trigger: 'blur' }
					],
					rec_date: [
						{ required: true, message: '请输入收样日期', trigger: 'blur' }
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
			},
			codes: {
				get () {
					return util.selectList.codes
				}
			},
			properties: {
				get () {
					return util.selectList.properties
				}
			},
			types: {
				get () {
					return util.selectList.types
				}
			}
		},
		methods: {
			check() {
				this.$refs.infoForm.validate((valid) => {
					this.$emit("validate", valid);
				});
			}
		}
	}
</script>