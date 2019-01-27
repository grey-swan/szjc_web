<template>
<section style="width: 210mm; height: 297mm;">
  <el-row>
    <el-col :span="24">
      <div class="head-no">报告编号：SZJC2019010107</div>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="24"><span class="head-name">检验检测结果</span></el-col>
  </el-row>

  <table cellspacing="0px" style="border-collapse:collapse; text-align: center;">
    <tbody>
      <tr>
        <td class="td-seq">序号</td>
        <td colspan="2">检验检测项目</td>
        <td class="td-basic">检验检测依据</td>
        <td>结果</td>
        <td class="td-unit">单位</td>
        <td class="td-standard">标准限值</td>
        <td class="td-conclusion">单项结论</td>
      </tr>
      <tr>
        <td class="td-seq">1</td>
        <td rowspan="3">感官</td>
        <td>色泽</td>
        <td>GB 5009.12-2017</td>
        <td>该样为浅黄棕色</td>
        <td class="td-unit">mg/kg</td>
        <td class="td-standard">0.5</td>
        <td class="td-conclusion">合格</td>
      </tr>
      <tr>
        <td class="td-seq">1</td>
        <td>滋味、 气味</td>
        <td>GB 5009.12-2017</td>
        <td>有烧烤的香气， 无异味</td>
        <td class="td-unit">mg/kg</td>
        <td class="td-standard">0.5</td>
        <td class="td-conclusion">合格</td>
      </tr>
      <tr>
        <td class="td-seq">1</td>
        <td>状态</td>
        <td>GB 5009.12-2017</td>
        <td>呈块状，无霉变，无正常视力可见外来异物</td>
        <td class="td-unit">mg/kg</td>
        <td class="td-standard">0.5</td>
        <td class="td-conclusion">合格</td>
      </tr>
      <tr>
        <td class="td-seq">1</td>
        <td colspan="2">铅(以 Pb 计)</td>
        <td>GB 5009.12-2017</td>
        <td>未检出 (检出限:0.02)</td>
        <td class="td-unit">mg/kg</td>
        <td class="td-standard">0.5</td>
        <td class="td-conclusion">合格</td>
      </tr>
    </tbody>
  </table>

  <el-row style="margin-top: 10px; font-size: 18px;">
    <el-col :span="8"><span>批准：</span></el-col>
    <el-col :span="8"><span>审核：</span></el-col>
    <el-col :span="8"><span>检验：</span></el-col>
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
  .head-no {
    text-align: right;
  }
  .head-name {
    font-size: 26px;
  }
  table {
    width: 100%;
    border-top: 1px sold;
    border-bottom: 1px solid;
  }
  table td{
    border:1px solid #000000;
    border-left:none;
  }
  td {
    border-left: none;
    height: 40px;
    font-size: 16px;
  }
  table tr td:last-child {
    border-right:none;
  }
  .td-seq {
    width: 10mm;
  }
  .td-basic {
    min-width: 40mm;
  }
  .td-unit {
    min-width: 20mm;
  }
  .td-standard {
    min-width: 20mm;
  }
  .td-conclusion {
    min-width: 18mm;
  }
</style>
