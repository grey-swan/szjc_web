<template>
	<el-form size="small" :model="form" label-width="160px">
		<el-row 
			v-for="item in form.items"
			:key="item.id"
			:label="item.name"
			:value="item.id">
			<el-col :span="12">
				<el-input v-model="item.result" placeholder="item.no"></el-input>
			</el-col>
			<el-col :span="6">
				<el-input v-model="item.conclusion" placeholder="结论"></el-input>
			</el-col>
		</el-row>
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
		}
	}
</script>