<template>
<section style="width: 210mm; height: 297mm; position: relative;">
  <el-row>
    <el-col :span="24" style="text-align: right;">
      <span class="head-code-name">报告编号</span>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="24" style="text-align: right;">
      <span class="head-code">STS/SP-201805-0006</span>
    </el-col>
  </el-row>

  <el-row style="padding-top: 120px;">
    <el-col :span="24">
      <div class="head-cn"><span>检&nbsp;验&nbsp;报&nbsp;告</span></div>
    </el-col>
  </el-row>
    <el-row>
    <el-col :span="24">
      <div class="head-en"><span>TEST&nbsp;&nbsp;REPORT</span></div>
    </el-col>
  </el-row>

  <el-row class="cover-row" style="margin-top: 120px;">
    <el-col :span="4" :offset="4">
      <span>项目名称：</span>
    </el-col>
    <el-col :span="12"><span class="cover-item">烧烤味香菇嫩豆干</span></el-col>
  </el-row>
  <el-row class="cover-row">
    <el-col :span="4" :offset="4">
      <span>委托单位：</span>
    </el-col>
    <el-col :span="12"><span class="cover-item">昆明市好彩头食品有限公司</span></el-col>
  </el-row>
  <el-row class="cover-row">
    <el-col :span="4" :offset="4">
      <span>委托单位：</span>
    </el-col>
    <el-col :span="12"><span class="cover-item">昆明市好彩头食品有限公司</span></el-col>
  </el-row>
  <el-row class="cover-row">
    <el-col :span="4" :offset="4">
      <span>检测类别：</span>
    </el-col>
    <el-col :span="12"><span class="cover-item">委托检验</span></el-col>
  </el-row>

  <el-row style="position:absolute; bottom:20px; left:0; right:0;">
    <el-col :span="24">
      <div class="cover-footer">
        <span>云&nbsp;南&nbsp;三&nbsp;正&nbsp;技&nbsp;术&nbsp;检&nbsp;测&nbsp;有&nbsp;限&nbsp;公&nbsp;司</span>
      </div>
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
  .head-code-name {
    text-align: right;
    font-size: 20px;
    margin-right: 60px;
  }
  .head-code {
    text-align: right;
    font-size: 20px;
  }
  .head-cn {
    font-size: 80px;
    font-family: '黑体';
    text-align: center;
  }
  .head-en {
    font-size: 80px;
    font-family: '黑体';
    padding-top: 30px;
    text-align: center;
  }
  .cover-row {
    font-size: 20px;
    padding-top: 30px;
  }
  .cover-item {
    border-bottom: 1px solid;
    width: 100%;
    display: block;
    text-align: center
  }
  .cover-footer {
    font-size: 30px;
    font-family: '黑体';
    text-align: center;
  }
</style>
