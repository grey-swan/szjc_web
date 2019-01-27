<template>
<section style="width: 210mm; height: 297mm; position: relative;">
  <el-row>
    <el-col :span="24">
      <div class="head"><strong>声&nbsp;&nbsp;&nbsp;明</strong></div>
    </el-col>
  </el-row>

  <el-row style="margin-top: 30px;">
    <el-col :span="24">
      <p class="line-text">1、报告内容涂改、缺页复制、无批准人（授权签字人）签字、未加盖检验检测专用章均无效。</p>
      <p class="line-text">2、检验检测委托方如对本报告有异议，请于收到报告之日起或在指定领取报告终止之日起七个工作日内，向本公司申请复验，逾期不申请的，视为认可本检验报告。</p>
      <p class="line-text">3、对于采用国家规定的快速检测方法对食用农产品进行抽查检测，被抽查人对检测结果有异议的，可以自收到检测结果时起四小时内申请复检，逾期不申请的，视为认可当次检测结果。</p>
      <p class="line-text">4、由委托单位自行采集的样品，本公司仅对送检样品的测试数据负责，不对样品来源负责；测试条件和工况变化大的样品、无法保存和复现的样品，本公司仅对本次所采样品的检验数据负责。</p>
      <p class="line-text">5、委托检测样品留样期一般为发出报告后30天，样品保质期不足30天的，保质期满后即对该样品进行处置。</p>
      <p class="line-text">6、未经本公司书面批准，本报告及数据不得用于商业宣传，违者必究。</p>
    </el-col>
  </el-row>

  <el-row style="position:absolute; bottom:20px; left:0; right:0;">
    <el-col :span="24">
      <p>本机构通讯资料</p>
      <p>地址：昆明市高新区海源中路30号创新大厦A段3楼301室</p>
      <p>检测业务联系电话及传真：（0871）67351489</p>
      <p>质量投诉电话及传真：（0871）67351489</p>
      <p>邮政编码：650034</p>
    </el-col>
  </el-row>
</section>
</template>

<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
  .head {
    text-align: center;
    font-size: 30px;
  }
  .line-text {
    font-size: 20px;
    line-height: 35px;
    margin: 0px;
  }
</style>
