<template>
	<section>
		<el-tabs type="card">
			<!-- l流转单 -->
			<el-tab-pane label="流转单信息">
				<!--工具条-->
				<el-row>
					<el-col :span="16">
						<el-button size="small" type="primary" @click="back">返回</el-button><el-button size="small" type="primary" @click="download" :loading="downloadLoading" icon="el-icon-download">下载</el-button>
					</el-col>
				</el-row>

				<el-form size="small" :model="sheetForm" label-width="100px" style="width: 800px;">
					<el-row>
						<el-col :span="24" align="middle">
							<h2>云南三正技术检测有限公司样品检验交接流转单</h2>
						</el-col>
					</el-row>
					<!-- 收样信息 -->
					<el-row>
						<el-col :span="12">
							<el-form-item label="样品标识："><span>{{ sheetForm.sample_code }}</span></el-form-item>
							<el-form-item label="样品名称："><span>{{ sheetForm.sample_name }}</span></el-form-item>
							<el-form-item label="检测数量："><span>{{ sheetForm.sample_num }}</span></el-form-item>
							<el-form-item label="样品状态："><span>{{ sheetForm.sample_prop }}</span></el-form-item>
							<el-form-item label="商标："><span>{{ sheetForm.sample_brand }}</span></el-form-item>
							<el-form-item label="执行标准："><span style="color: red;">{{ sheetForm.perform_no }} {{ sheetForm.perform_name }}</span></el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="送检人："><span>{{ sheetForm.sample_send_user }}</span></el-form-item>
							<el-form-item label="收样人："><span>{{ sheetForm.sample_rec_user }}</span></el-form-item>
							<el-form-item label="收样日期："><span>{{ sheetForm.sample_rec_date }}</span></el-form-item>
							<el-form-item label="送检日期："><span>{{ sheetForm.sample_send_date }}</span></el-form-item>
							<el-form-item label="签字日期："><span>{{ sheetForm.sample_rec_date }}</span></el-form-item>
						</el-col>
					</el-row>
					<!-- 选择执行标准 -->
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="执行标准：">
								<el-select
									size="small"
									style="width: 100%"
									v-model="performs"
									filterable
									clearable
									remote
									reserve-keyword
									placeholder="请输入执行标准编号或名称"
									@change="selectChange"
									:remote-method="remoteMethod"
									:loading="loading">
									<el-option
										v-for="item in options"
										:key="item.id"
										:label="item.no+' '+item.name"
										:value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-button size="small" type="primary" :disabled="performs === ''" @click="performMethodAdd(sheetForm.id)" icon="el-icon-caret-bottom" plain>添加到检测列表</el-button>
						</el-col>
						<el-col :span="8">
							<el-button size="small" type="success" @click.native="methodVisible = true" plain>新增检测项</el-button>
						</el-col>
					</el-row>
					<!-- 检测项列表 -->
					<el-row>
						<el-table size="mini" :data="methodData">
							<el-table-column property="no" label="方法编号"></el-table-column>
							<el-table-column property="parent" label="上级"></el-table-column>
							<el-table-column property="name" label="方法名称"></el-table-column>
							<el-table-column property="unit" label="单位"></el-table-column>
							<el-table-column property="standard" label="标准值"></el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button type="danger" size="mini" @click="methodDel(scope.row)" icon="el-icon-delete" circle></el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-row>

					<!-- 添加检测项对话框 -->
					<el-dialog width="50%" title="添加检测方法" :close-on-click-modal="false" :visible.sync="methodVisible" append-to-body>
						<el-form ref="methodForm" label-position="right" label-width="80px" :rules="methodFormRules" :model="methodForm" size="mini">
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
							<el-button size="small" type="primary" @click.native="methodAdd(sheetForm.id)">提交</el-button>
						</div>
					</el-dialog>
				</el-form>
			</el-tab-pane>
			<!-- 检测结果 -->
			<el-tab-pane label="检测结果">
				<!--工具条-->
				<el-row>
					<el-col :span="16">
						<el-button size="small" type="primary" @click="back">返回</el-button>
						<el-button size="small" type="primary" @click="saveResult">保存</el-button>
					</el-col>
				</el-row>
				<el-form
					v-for="item in methodData"
					:key="item.id"
					:label="item.name"
					:value="item.id"
					size="small"
					:model="item">
					<el-row>
						<el-col :span="12">
							<el-form-item :label="item.name+' '+item.no">
								<el-input v-model="item.result" :placeholder="item.no"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="结论">
								<el-input v-model="item.conclusion" placeholder="结论"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
		</el-tabs>
		
	</section>
</template>

<script>
	import { http_request } from '../../api/api';
	export default {
		data() {
			return {
				sheetUrl: 'http://localhost:8000/api/sheet/',
				sheetForm: {},
				methodForm: {},
				methodData: [],
				options: [],
                performs: '',
                list: [],
                loading: false,
				downloadLoading: false,
				sheet_id: null,
				methodVisible: false,
				methodFormRules: {
					no: [
						{ required: true, message: '请输入方法编号', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入方法名称', trigger: 'blur' }
					]
				},
			}
		},
		methods: {
			//返回
			back() {
				//this.$router.push({ name: '抽样记录'});
				this.$router.back(-1);
            },
            //流转单下载
            download() {
                this.downloadLoading = true;
                let downloadUrl = 'http://127.0.0.1:8000/api/download/sheet/'+this.sheetForm.sample+'/';
                http_request(downloadUrl, 'get', {}, 'blob').then((res) => {
                    let filename = this.sheetForm.sample_code+'.pdf';
                    let blog = new Blob([res.data], {type: ''});
                    let url = window.URL.createObjectURL(blog);
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', filename)
                    document.body.appendChild(link)
                    link.click()
                    this.downloadLoading = false;
                }).catch(() => {
                    this.$message({message: '下载流转单失败', type: 'error'});
                    this.downloadLoading = false;
                });
            },
			selectChange(value) {
				console.log(value);
				if (value === '') {
					
				}
			},
		    remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    let url = 'http://localhost:8000/api/perform/?search='+query;
                    
                    http_request(url, 'get', {}).then((res) => {
                        this.options = res.data.results;
                    }).catch(() => {
                        this.$message({message: '获取获取样品信息失败', type: 'error'});
                    });
                    this.loading = false;
                } else {
                    this.options = [];
                }
            },
			//获取样品对应的流转单
			getSheet() {
				let url = this.sheetUrl+this.sheet_id+'/';
				http_request(url, 'get', {}).then((res) => {
                    this.sheetForm = res.data;
                    this.methodData = res.data.items;
                    //this.performs = res.data.perform_no+' '+res.data.perform_name;
				}).catch(() => {
					this.$message({message: '获取样品信息失败', type: 'error'});
				});
			},
			//增加库外检测方法
			methodAdd(sheet_id) {
				let url = 'http://localhost:8000/api/sheet_item/';
				let para = {
					sheet: sheet_id,
					no: this.methodForm.no,
					name: this.methodForm.name,
					parent: null,
					unit: this.methodForm.unit,
					standard: this.methodForm.standard 
				};
				http_request(url, 'post', para).then((res) => {
					this.methodData.push(res.data);
					this.$message({message: '增加库外检测方法成功', type: 'success'});
					this.methodVisible = false;
				}).catch(() => {
					this.$message({message: '增加库外检测方法失败', type: 'error'});
					this.methodVisible = false;
				});
			},
			//批量增加库内检测方法
			performMethodAdd(sheet_id) {
				let url = 'http://localhost:8000/api/perform/'+this.performs+'/';
				//获取指定执行标准下所有检测方法
				http_request(url, 'get', {}).then((res) => {
                    //更新流转单中的执行标准字段
                    let url3 = 'http://localhost:8000/api/sheet/'+sheet_id+'/';
                    let para = {perform: this.performs};
                    http_request(url3, 'patch', para).then((res3) => {
						//循环插入检测项
                        res.data.methods.forEach(element => {
                            let url2 = 'http://localhost:8000/api/sheet_item/';
                            let para = {
                                sheet: sheet_id,
                                no: element.no,
								name: element.name,
								parent: element.parent_name,
                                unit: element.unit,
                                standard: element.standard 
							};
							http_request(url2, 'post', para).then((res) => {
								this.methodData.push(res.data);
							}).catch(() => {
								this.$message({message: '循环增加检测方法失败', type: 'error'});
							});
                        });
                    }).catch(() => {
                        this.$message({message: '更新流转单中执行标准失败', type: 'error'});
                    });
				}).catch(() => {
					this.$message({message: '获取执行方法失败', type: 'error'});
				});
			},
			//删除检测方法
			methodDel(row) {
				let url = 'http://localhost:8000/api/sheet_item/'+row.id+'/';
				http_request(url, 'delete', {}).then((res) => {
					this.methodData.splice(this.methodData.findIndex(item => item.id === row.id), 1);
				}).catch(() => {
					this.$message({message: '删除失败', type: 'error'});
				});
			},
			//保存检测结果
			saveResult() {
				this.methodData.forEach(element => {
					let url = 'http://localhost:8000/api/sheet_item/'+element.id+'/';
					let para = {result: element.result, conclusion: element.conclusion};
					http_request(url, 'patch', para).then((res) => {
						this.$message({message: '保存结果成功', type: 'success'});
					}).catch(() => {
						this.$message({message: '保存结果失败', type: 'error'});
					});
				});
			}
		},
		mounted() {
			//页面加载的时候判断有没有生成流转单
			let sheet_id = this.$route.params.sheet_id;
			if (sheet_id !== undefined) {
				this.sheet_id = sheet_id;
				this.getSheet();
			}
		}
	}
</script>
