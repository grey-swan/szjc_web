var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
	var len = len - (s + '').length;
	for (var i = 0; i < len; i++) { s = '0' + s; }
	return s;
};

export default {
	getQueryStringByName: function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		var context = "";
		if (r != null)
			context = r[2];
		reg = null;
		r = null;
		return context == null || context == "" || context == "undefined" ? "" : context;
	},
	removeValueById: function (arr, val) {
		for(var i=0; i<arr.length; i++) {
			if (arr[i].id === val) {
				arr.splice(i, 1);
				break;
			}
		}
	},
	removeValueByParent: function (arr, val) {
		for(var i=0; i<arr.length; i++) {
			if (arr[i].parent == val) {
				arr.splice(i, 1);
				i--;
			}
		}
	},
	formatDate: {
		format: function (date, pattern) {
			pattern = pattern || DEFAULT_PATTERN;
			return pattern.replace(SIGN_REGEXP, function ($0) {
				switch ($0.charAt(0)) {
					case 'y': return padding(date.getFullYear(), $0.length);
					case 'M': return padding(date.getMonth() + 1, $0.length);
					case 'd': return padding(date.getDate(), $0.length);
					case 'w': return date.getDay() + 1;
					case 'h': return padding(date.getHours(), $0.length);
					case 'm': return padding(date.getMinutes(), $0.length);
					case 's': return padding(date.getSeconds(), $0.length);
				}
			});
		},
		parse: function (dateString, pattern) {
			var matchs1 = pattern.match(SIGN_REGEXP);
			var matchs2 = dateString.match(/(\d)+/g);
			if (matchs1.length == matchs2.length) {
				var _date = new Date(1970, 0, 1);
				for (var i = 0; i < matchs1.length; i++) {
					var _int = parseInt(matchs2[i]);
					var sign = matchs1[i];
					switch (sign.charAt(0)) {
						case 'y': _date.setFullYear(_int); break;
						case 'M': _date.setMonth(_int - 1); break;
						case 'd': _date.setDate(_int); break;
						case 'h': _date.setHours(_int); break;
						case 'm': _date.setMinutes(_int); break;
						case 's': _date.setSeconds(_int); break;
					}
				}
				return _date;
			}
			return null;
		}
	},
	choices: {
		statuses: {
			0: '已收样',
			1: '已生成流转单',
			2: '已生成报告',
			3: '已发放报告',
			9: '已删除'
		},
		types: {
			0: '/',
			1: '委托检验',
			2: '未确定'
		},
		properties: {
			0: '/',
			10: '固态/散装',
			11: '固态/棉纸装',
			12: '固态/罐装',
			21: '液态/无菌生理盐水试管',
			22: '液态/瓶装',
			23: '液态/罐装',
			24: '液态/无菌瓶',
			31: '固液混合态/瓶装'
		},
	},
	selectList: {
		codes: [
			{
				label: 'SP 食品', value: 0
			},
			{
				label: 'W 水', value: 1
			},
			{
				label: 'TR 土壤', value: 2
			},
			{
				label: 'QT 其他', value: 3
			}
		],
		properties: [
			{
				label: '/', value: 0
			},
			{
				label: '固态/散装', value: 10
			},
			{
				label: '固态/棉纸装', value: 11
			},
			{
				label: '固态/罐装', value: 12
			},
			{
				label: '液态/无菌生理盐水试管', value: 21
			},
			{
				label: '液态/瓶装', value: 22
			},
			{
				label: '液态/罐装', value: 23
			},
			{
				label: '液态/无菌瓶', value: 24
			},
			{
				label: '固液混合态/瓶装', value: 31
			}
		],
		types: [
			{
				label: '/', value: 0 
			},
			{
				label: '委托检验', value: 1 
			},
			{
				label: '未确定', value: 2 
			}
		]
	}
};
