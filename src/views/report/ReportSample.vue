<template>
<section style="width: 210mm; height: 297mm;">
  <el-row>
    <el-col :span="24">
      <div class="head-no">报告编号：SZJC2019010107</div>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="24"><span class="head-name">样品基本情况</span></el-col>
  </el-row>

  <table cellspacing="0px" style="border-collapse:collapse">
    <tbody>
      <tr>
        <td class="td1"><span>样品名称</span></td>
        <td><span>烧烤味香菇嫩豆干</span></td>
        <td class="td3"><span>检验检测类别</span></td>
        <td><span>委托检验</span></td>
      </tr>
      <tr>
        <td class="td1">样品标识</td>
        <td></td>
        <td class="td3">商标</td>
        <td></td>
      </tr>
      <tr>
        <td class="td1">批号/生产日期</td>
        <td></td>
        <td class="td3">规格</td>
        <td></td>
      </tr>
      <tr>
        <td class="td1">样品数量</td>
        <td></td>
        <td class="td3">性状/包装状态</td>
        <td></td>
      </tr>
      <tr>
        <td class="td1">委托单位</td>
        <td></td>
        <td class="td3">联系人</td>
        <td></td>
      </tr>
      <tr>
        <td class="td1" >样品来源</td>
        <td colspan="3">自送样</td>
      </tr>
      <tr>
        <td class="td1" >生产单位</td>
        <td colspan="3">云南农业大学</td>
      </tr>
      <tr>
        <td class="td1">委托单位地址</td>
        <td></td>
        <td class="td3">电话</td>
        <td></td>
      </tr>
      <tr>
        <td class="td1" >受检单位</td>
        <td colspan="3">地址</td>
      </tr>
      <tr>
        <td class="td1" >受检单位地址</td>
        <td colspan="3">云南省昆明市盘龙区金黑公路云南农业大学1939号</td>
      </tr>
      <tr>
        <td class="td1">送样人</td>
        <td></td>
        <td class="td3">送样日期</td>
        <td></td>
      </tr>
      <tr>
        <td class="td1">收样人</td>
        <td></td>
        <td class="td3">收样日期</td>
        <td></td>
      </tr>
      <tr>
        <td class="td1">检验检测日期</td>
        <td colspan="3"></td>
      </tr>
      <tr>
        <td class="td1">环境条件</td>
        <td colspan="3"></td>
      </tr>
      <tr>
        <td class="td1">检验/判定依据</td>
        <td colspan="3"></td>
      </tr>
      <tr>
        <td class="td1" style="height: 80px;">主要仪器</td>
        <td colspan="3"></td>
      </tr>
      <tr>
        <td class="td1" style="height: 150px;">结论</td>
        <td colspan="3">
          <div>依据《食品安全国家标准 豆制品》GB 2712-2014标准，所检项目符合标准要求。</div>
          <div><br></div>
          <div style="text-align: right; margin-right: 30px;">
            <span>签发日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</span>
          </div>
        </td>
      </tr><tr>
        <td class="td1" >备注</td>
        <td colspan="3"></td>
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
  td span {
    padding-left: 8px;
  }
  table tr td:last-child {
    border-right:none;
  }
  .td1 {
    width: 150px;
  }
  .td3 {
    width: 150px;
  }
</style>
