<template>
<section>
  <!-- <app-report-cover></app-report-cover>
  <app-report-declare></app-report-declare>
  <app-report-sample></app-report-sample>
  <app-report-result></app-report-result> -->
  <div v-html="reportHtml"></div>
</section>
</template>

<script>
  import { http_request } from '../api/api';
  import ReportCover from './report/ReportCover'
  import ReportDeclare from './report/ReportDeclare'
  import ReportSample from './report/ReportSample'
  import ReportResult from './report/ReportResult'
  export default {
    data() {
      return {
        reportHtml: ''
      }
    },
    props: {
			reportId: {
				type: Number,
				default: null
			}
		},
    components: {
			'app-report-cover': ReportCover,
			'app-report-declare': ReportDeclare,
      'app-report-sample': ReportSample,
      'app-report-result': ReportResult
    },
    mounted() {
      console.log('mounted')
      let reportUrl = 'http://localhost:8000/api/download/report/view/'+this.reportId+'/';
      http_request(reportUrl, 'get', {}).then((res) => {
        this.reportHtml = res.data;
      }).catch(() => {
        this.$message({
          message: '获取报告预览失败',
          type: 'error'
        });
      });
    }
  }
</script>

<style scoped>
</style>
