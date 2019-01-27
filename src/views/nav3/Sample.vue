<template>
	<section>
		<!--工具条-->
		<el-row class="toolbar">
			<el-col :span="12">
				<el-form size="small" :inline="true" :model="filter">
					<el-form-item>
						<el-input v-model="filter.search" placeholder="编号或名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="getSampleList">查询</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="12" align="right">
				<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="page_size" :total="total" background>
				</el-pagination>
			</el-col>
		</el-row>

		<!--列表-->
		<el-table size="mini" :data="items" highlight-current-row v-loading="listLoading" style="width: 100%;" border>
			<el-table-column prop="id" label="#" width="50"></el-table-column>
			<el-table-column prop="code" label="样品标识" width="140" sortable></el-table-column>
			<el-table-column prop="name" label="样品名称" width="130"></el-table-column>
			<el-table-column prop="type" :formatter="formatType" label="检验检测类别" width="100"></el-table-column>
			<el-table-column prop="source" label="样品来源" width="70"></el-table-column>
			<el-table-column prop="brand" label="商标" width="130"></el-table-column>
			<el-table-column prop="prod_date" label="生产日期" width="80" :formatter="formatDate"></el-table-column>
			<el-table-column prop="spec" label="规格" width="80"></el-table-column>
			<el-table-column prop="num" label="样品数量" width="80"></el-table-column>
			<el-table-column prop="store" label="保存方式" width="80"></el-table-column>
			<el-table-column prop="prop" :formatter="formatProp" label="性状/包装状态" width="100"></el-table-column>
			<el-table-column prop="prod_firm" label="生产单位" width="200"></el-table-column>
			<el-table-column prop="agent_firm" label="委托单位" width="200"></el-table-column>
			<el-table-column prop="agent_adress" label="委托单位地址" width="200"></el-table-column>
			<el-table-column prop="agent_user" label="联系人" width="60"></el-table-column>
			<el-table-column prop="agent_tell" label="联系电话" width="100"></el-table-column>
			<el-table-column prop="accept_firm" label="受检单位" width="200"></el-table-column>
			<el-table-column prop="accept_user" label="受检单位联系人" width="110"></el-table-column>
			<el-table-column prop="accept_tell" label="受检单位联系电话" width="120"></el-table-column>
			<el-table-column prop="send_user" label="送样人" width="80"></el-table-column>
			<el-table-column prop="rec_user" label="收样人" width="80"></el-table-column>
			<el-table-column prop="send_date" label="送样日期" width="80" :formatter="formatDate"></el-table-column>
			<el-table-column prop="rec_date" label="收样日期" width="80" :formatter="formatDate"></el-table-column>
			<el-table-column prop="check_date" label="检测日期" width="80" :formatter="formatDate"></el-table-column>
			<el-table-column prop="temperature" label="温度(℃)" width="80"></el-table-column>
			<el-table-column prop="humidity" label="湿度(%RH)" width="90"></el-table-column>
			<el-table-column prop="check_base" label="检验检测依据" width="100"></el-table-column>
			<el-table-column prop="instrument" label="主要仪器" width="150"></el-table-column>
			<el-table-column prop="status" label="状态" :formatter="formatStatus" width="80"></el-table-column>

			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
					<el-button size="small" @click="handleDel(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="100" fixed="right">
				<template slot-scope="scope">
					<el-button size="small" @click="handleSheet(scope.row)" type="warning" circle>流</el-button>
					<el-button size="small" @click="handleReport(scope.row)" type="primary" circle>报</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="page_size" :total="total" style="float:right;" background>
			</el-pagination>
		</el-col>
		<!-- 报告对话框 -->
		<el-dialog width="220mm" title="检验报告" top="10px" :close-on-click-modal="false" :visible.sync="reportVisible">
			<div slot="title" class="dialog-title">
				<el-button size="small" @click.native="reportVisible = false">取消</el-button>
				<el-button size="small" type="primary" :loading="downloadLoading" @click.native="handleDownload">下载</el-button>
			</div>
			
			<!-- <app-report :reportId="reportId"></app-report> -->
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util';
	import { http_request } from '../../api/api';
	import Report from '../Report';

	export default {
		data() {
			return {
				sampleUrl: 'http://localhost:8000/api/sample/',
				items: [],
				total: 0,
				page_size: 10,
				page: 1,
				listLoading: false,
				reportVisible: false,
				downloadLoading: false,
				reportId: null,
				reportHtml: '',
				filter: {
					search: ''
				}
			}
		},
		components: {
			'app-report': Report
		},
		methods: {
			//日期格式化
			formatDate(row) {
				let val = row.send_date;
				var value=new Date(val);
				var year=value.getFullYear();
				var month=value.getMonth() + 1;
				var day=value.getDate();
				return year+'-'+month+'-'+day;
			},
			//格式化检验检测类别
			formatType(val) {
				return util.choices.types[val.type]
			},
			//格式化性状
			formatProp(val) {
				return util.choices.properties[val.prop]
			},
			//格式化样品状态
			formatStatus(val) {
				return util.choices.statuses[val.status]
			},
			//分页切换
			handleCurrentChange(val) {
				this.page = val;
				this.getSampleList();
			},
			//处理流转单
			handleSheet(row) {
				this.$router.push({ name: '流转单', params: { sheet_id: row.sheet_id }});
			},
			//生成报告
			handleReport(row) {
				if (row.report === null) {
					this.$confirm('确认生成报告吗?', '提示', {
						type: 'warning'
					}).then(() => {
						let reportUrl = 'http://127.0.0.1:8000/api/report/';
						let para = {sample: [row.id], no: 'SZCJ'};
						http_request(reportUrl, 'post', para).then((res) => {
							this.reportId = res.data.id;
							this.items.forEach(element => {
								if (element.id === row.id) {
									element.report = res.data.id;
								}
							});
							this.handleReportView()
						}).catch(() => {
							this.$message({
								message: '生成报告失败',
								type: 'error'
							});
						});
					});
				} else {
					this.reportId = row.report;
					this.handleReportView()
				}
			},
			handleReportView() {
				this.reportVisible = true;
				// let reportUrl = 'http://localhost:8000/api/download/report/view/'+this.reportId+'/';
				// http_request(reportUrl, 'get', {}).then((res) => {
				// 	this.reportHtml = res.data;
				// }).catch(() => {
				// 	this.$message({
				// 		message: '获取报告预览失败',
				// 		type: 'error'
				// 	});
				// });
			},
			//打印
			// handlePrint() {
			// 	var printhtml = document.getElementById('report_id').innerHtml // 获取打印区域
			// 	var oldhtml = document.innerHtml // 保存原始内容
			// 	document.innerHtml = printhtml // 赋值打印
			// 	window.print()
			// 	document.innerHtml = oldhtml // 还原页面
			// 	window.location.reload() // 刷新解决页面无法点击
			// },
			//下载报告
			handleDownload() {
				this.downloadLoading = true;
                let downloadUrl = 'http://127.0.0.1:8000/api/download/report/'+this.reportId+'/';
                http_request(downloadUrl, 'get', {}, 'blob').then((res) => {
                    let filename = 'report.pdf';
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
                    this.$message({message: '下载报告失败', type: 'error'});
                    this.downloadLoading = false;
                });
			},
			//获取样品列表
			getSampleList() {
				this.listLoading = true;
				let url = this.sampleUrl+'?page='+this.page+'&search='+this.filter.search;
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
			handleEdit(row) {
				//this.$router.push({path:'/sample/add/'});
				this.$router.push({ name: '添加抽样', params: { sample_id: row.id }})
			}
		},
		mounted() {
			this.getSampleList();
		}
	}
</script>

