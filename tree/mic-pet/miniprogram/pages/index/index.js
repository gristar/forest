//index.js
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {    
    userInfo: {},
    items: [
        {name: 'male', value: '公', checked: 'true'},
        {name: 'female', value: '母'},
        {name: 'none', value: '绝育'}
    ],
    name:'',
    array: ['猫', '狗', '兔子', '松鼠', '仓鼠', '鹦鹉', '其他'],
    petTypeIndex: 0,
    dateValue:util.curYearMonthDay(),
    dateStart: '1990-01-01',
    dateEnd: util.curYearMonthDay()
  },
  listenerRadioGroup:function(e) {
      
  },

  listenerNameInput: function(e) {
      this.data.name = e.detail.value;
  },

  listenerPickerSelected: function(e) {
      this.setData({
        petTypeIndex: e.detail.value
      });
  },

  listenerDatePickerSelected:function(e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
  onLoad: function () {
    var that = this
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
