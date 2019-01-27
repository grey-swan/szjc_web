<template>
	<el-form size="small" :model="infoForm" label-width="160px">
		<el-col :span="12">
			<el-form-item label="样品标识："><span>{{ infoForm.code }}</span></el-form-item>
			<el-form-item label="样品名称："><span>{{ infoForm.name }}</span></el-form-item>
			<el-form-item label="检验检测类别"><span>{{ infoForm.type }}</span></el-form-item>
			<el-form-item label="样品来源"><span>{{ infoForm.source }}</span></el-form-item>
			<el-form-item label="商标"><span>{{ infoForm.brand }}</span></el-form-item>
			<el-form-item label="批号/生产日期"><span>{{ infoForm.prod_date | formatDate }}</span></el-form-item>
			<el-form-item label="规格"><span>{{ infoForm.spec }}</span></el-form-item>
			<el-form-item label="样品数量"><span>{{ infoForm.num }}</span></el-form-item>
			<el-form-item label="保存方式"><span>{{ infoForm.store }}</span></el-form-item>
			<el-form-item label="性状"><span>{{ infoForm.prop }}</span></el-form-item>
			<el-form-item label="送样人"><span>{{ infoForm.send_user }}</span></el-form-item>
			<el-form-item label="收样人"><span>{{ infoForm.rec_user }}</span></el-form-item>
			<el-form-item label="送样日期"><span>{{ infoForm.send_date | formatDate }}</span></el-form-item>
			<el-form-item label="收样日期"><span>{{ infoForm.rec_date | formatDate }}</span></el-form-item>
		</el-col>
		<el-col :span="12">
			<el-form-item label="生产单位"><span>{{ infoForm.prod_firm }}</span></el-form-item>
			<el-form-item label="委托单位"><span>{{ infoForm.agent_firm }}</span></el-form-item>
			<el-form-item label="委托单位地址"><span>{{ infoForm.agent_adress }}</span></el-form-item>
			<el-form-item label="联系人"><span>{{ infoForm.agent_user }}</span></el-form-item>
			<el-form-item label="联系电话"><span>{{ infoForm.agent_tell }}</span></el-form-item>
			<el-form-item label="受检单位"><span>{{ infoForm.accept_firm }}</span></el-form-item>
			<el-form-item label="受检单位联系人"><span>{{ infoForm.accept_user }}</span></el-form-item>
			<el-form-item label="受检单位联系电话"><span>{{ infoForm.accept_tell }}</span></el-form-item>
		</el-col>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		filters:{
			formatDate:function (val) {
				var value=new Date(val);
				var year=value.getFullYear();
				var month=value.getMonth() + 1;
				var day=value.getDate();
				return year+'-'+month+'-'+day;
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
				}
			}
		}
	}
</script>