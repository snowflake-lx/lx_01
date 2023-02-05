$(function(){

    var tem;
    var hum;
    var red1_flag;
    var edge;
    var flag_news = 0,flag_news1=0, flag_data = 0,flag_data1=0, flag_bgd_status = 0; flag_bgd_status1 = 0;
    var high, low;
    var high1, low1;
    var myZCloudID = "8411";                  //序列号
    var myZCloudKey = "111";                 //密钥
    var mySensorMac = "00:12:4B:00:1A:BE:F5:9A";                //光照度传感器的MAC地址
    var mySensorMac1 = "00:12:4B:00:1A:BE:2C:BA";              //温湿度传感器的MAC地址
    var mySensorMac2 = "00:12:4B:00:1A:BE:F5:A8";             //信号灯控制器器的MAC地址
    var rtc = new WSNRTConnect(myZCloudID, myZCloudKey);        //创建数据连接服务对象
    rtc.setServerAddr("192.168.11.110:28080");			       //服务器入口
    rtc.connect();
    rtc.onConnect = function() {                                //连接成功回调函数
        rtc.sendMessage(mySensorMac, "{A0=?}");                //向光照度传感器发送查询数据
        rtc.sendMessage(mySensorMac1, "{A0=?}");              //向温湿度传感器发送查询数据
        rtc.sendMessage(mySensorMac2, "{D1=?}");             //向信号灯控制器发送查询数据
        $("#ConnectState").text("数据服务连接成功！");
    };

    rtc.onConnectLost = function() {                            //数据服务掉线回调函数
        $("#ConnectState").text("数据服务掉线！");
    };

    rtc.onmessageArrive = function(mac, dat) {                  //消息处理回调函数
        if (mac == mySensorMac) {                               //判断传感器Mac地址
            if (dat[0] == '{' && dat[dat.length - 1] == '}') {  //判断字符串首尾是否为
                dat = dat.substr(1, dat.length - 2);            //截取{}内的字符串
                var its = dat.split(',');                       //以‘,’来分割字符串
                for (var x in its) {
                    var t = its[x].split('=');                  //以‘=’来分割字符串
                    if (t.length != 2) continue;
                    if (t[0] == "A0") {                         //判断参数A0
                        tem = parseInt(t[1]);
                        $("#currentTem").text(tem + "Lux");     //更数据
                        flag_news = 0;
                        var now = new Date();
                        flag_news = 1;
                        if(flag_data == 1) {
                            //if (flag_bgd_status == 1) {
                            //    if (parseInt(tem) > high || parseInt(tem) < low) {
                            //        $("#images img").attr("src", "images/bgd.gif");
                            //        rtc.sendMessage(mySensorMac2, "{CD1=7,OD1=1,D1=?}");
                            //    }else {
                            //        $("#images img").attr("src", "images/bgd_green.jpg");
                            //    }
                            //}
                            if (parseInt(tem) > high || parseInt(tem) < low) {//自动报警
                                $("#images img").attr("src", "images/bgd.gif");//当当前的光照强度不在设置好的阈值内，web界面的图标自动为红色图标
                                $("#set_bgd").text("开启");//报警按钮自动变为开启状态
                                rtc.sendMessage(mySensorMac2, "{CD1=7,OD1=1,D1=?}");//当前的光照强度不在设置好的阈值内，信号灯亮红色灯
                            } else {
                                $("#images img").attr("src", "images/bgd_green.jpg"); //当前光照强度在阈值内，web界面的图标自动变为为绿色图标
                                 $("#set_bgd").text("关闭");//报警按钮变为关闭状态
                                rtc.sendMessage(mySensorMac2, "{CD1=7,OD1=4,D1=?}");//当前光照强度在阈值内，信号灯亮绿灯
                            }
                        }
                        //更新图表
                        getDialTem(parseFloat(tem));
                    }
                    
                }
            }
        }
        if (mac == mySensorMac1) {                               //判断传感器mac地址
            if (dat[0] == '{' && dat[dat.length - 1] == '}') {  //判断字符串首尾是否为
                dat = dat.substr(1, dat.length - 2);            //截取{}内的字符串
                var its = dat.split(',');                       //以‘,’来分割字符串
                for (var x in its) {
                    var t = its[x].split('=');                  //以‘=’来分割字符串
                    if (t.length != 2) continue;
                    if (t[0] == "A0") {                         //判断参数a0
                        hum = parseInt(t[1]);
                        $("#currentTem1").text(hum + "℃");     //更新图表
                        flag_news1 = 0;
                        var now = new Date();
                        flag_news1 = 1;
                        if (flag_data1 == 1) {
                            //if (flag_bgd_status1 == 1) {
                            //    if (parseInt(hum) > high1 || parseInt(hum) < low1) {
                            //        $("#images1 img").attr("src", "images/orange.gif");
                            //        rtc.sendMessage(mySensorMac2, "{CD1=7,OD1=2,D1=?}");
                            //    } else {
                            //        $("#images1 img").attr("src", "images/bgd_green.jpg");
                            //    }
                            //}
                            if (parseInt(hum) > high1 || parseInt(hum) < low1) {
                                $("#images1 img").attr("src", "images/bgd.gif");
                                $("#set_bgd1").text("开启");
                                rtc.sendMessage(mySensorMac2, "{CD1=63,OD1=16,D1=?}");//{CD1=63.OD1=16,D1=?}
                            } else {
                                $("#images1 img").attr("src", "images/bgd_green.jpg");
                                $("#set_bgd1").text("关闭");
                                rtc.sendMessage(mySensorMac2, "{CD1=63,OD1=32,D1=?}");//{CD1=63,OD1=32,D1=?}
                            }
                        }
                        //更新图表
                        getDialHum(parseFloat(hum));
                    }

                }
            }
        }
        if (mac == mySensorMac2) {                               //判断传感器Mac地址
            if (dat[0] == '{' && dat[dat.length - 1] == '}') {  //判断字符串首尾是否为{}
                dat = dat.substr(1, dat.length - 2);            //截取{}内的字符串
                var its = dat.split(',');                       //以‘,’来分割字符串
                for (var x in its) {
                    var t = its[x].split('=');                //以‘=’来分割字符串
                    if (t.length != 2) continue;
                    if (t[0] == "D1") {                         //判断参数D1
                        edge = parseInt(t[1]);
                        if ((edge & 0x01) == 0x01) {
                            red1_flag = 1;
                        } else {
                            red1_flag = 0;

                        }
                    }
                }
            }
        }
            
        
    };
    //$("#searchTem").click(function(){                           //查询当前光照强度
    //    rtc.sendMessage(mySensorMac, "{A0=?}");                 //向传感器发送数据
    //    flag_news = 1;//数据跟更新标志
    //});
   
    $("#input_data").click(function(){                          //输入报警权值
        high = $("#high_light").val();
        low = $("#low_light").val();
        flag_data = 1;
        var x;
        x = low - high;
        if(flag_bgd_status == 0) {
            alert("请开启报警！");
            flag_data = 0;
        }
        if(x >= 0){
            alert("请合理输入参数！");
            flag_data = 0;
        }
    });
    //$("#searchTem1").click(function () {
    //    rtc.sendMessage(mySensorMac1, "{A0=?}");
    //    flag_news1 = 1;
    //});
    $("#input_data1").click(function () {                          //输入报警权值
        high1 = $("#high_tem").val();
        low1 = $("#low_tem").val();
        flag_data1= 1;
        var n;
        n = low1 - high1;
        if (flag_bgd_status1 == 0) {
            alert("请开启报警！");
            flag_data1 = 0;
        }
        if (n >= 0) {
            alert("请合理输入参数！");
            flag_data1 = 0;
        }
    });
    var i = 0;
    $("#set_bgd").click(function(){                             //设置报警开关
        if ((i % 2) == 0) {
            flag_bgd_status = 1; //更改标志位
            high = $("#high_light").val();
            low = $("#low_light").val();
            if (flag_bgd_status = 1) {
                if ((rtc.sendMessage(mySensorMac, "{A0=?}")) > high || (rtc.sendMessage(mySensorMac, "{A0=?}"))<low) {
                    $("#set_bgd").text("开启");
                    rtc.sendMessage(mySensorMac2, "{CD1=7,OD1=1,D1=?}");//打开红灯
                }
            }                             
            flag_data = 1;
           
        }else{
            flag_bgd_status = 0;                                //更改标志位
            $("#set_bgd").text("关闭");
            $("#images img").attr("src", "images/bgd_green.jpg");
            rtc.sendMessage(mySensorMac2, "{CD1=7,OD1=4,D1=?}");//打开绿灯
        }
        i ++;
        if(i == 100000)i = 0;
    });
    var j = 0;
    $("#set_bgd1").click(function () {        //设置报警开关
        if ((j % 2) == 0) {
            flag_bgd_status1 = 1;            //更改报警按钮标志位
            high1 = $("#high_tem").val();
            low1 = $("#low_tem").val();
            if (flag_bgd_status1 = 1) {
                //判断当前的温度值是否在设置的阈值内
                if ((rtc.sendMessage(mySensorMac1, "{A0=?}")) > high1 || (rtc.sendMessage(mySensorMac1, "{A0=?}")) < low1) {
                    $("#set_bgd1").text("开启");//报警的按钮变为开启，表示报警打开了
                    rtc.sendMessage(mySensorMac2, "{CD1=63,OD1=16,D1=?}");//如果超过温度设置的阈值，信号灯亮黄灯

                }
            }
            flag_data1 = 1;
        } else {
            flag_bgd_status1 = 0;     //更改报警按钮标志位
            $("#set_bgd1").text("关闭");
            $("#images1 img").attr("src", "images/bgd_green.jpg");  //如果获得温度值在设置的阈值内，web界面上的显示的使绿灯图标
            rtc.sendMessage(mySensorMac2, "{CD1=63,OD1=32,D1=?}"); //如果获得温度值在设置的阈值内，信号灯亮绿灯
        }
        j ++;
        if (j == 100000) j= 0;
    });

    $(document).ready(function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

       // var chart;
        $('#line_charts').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg,                      //don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), y = parseFloat(tem);
                            if(flag_news == 1)
                            {
                                series.addPoint([x, y], true, true);
                            }
                            flag_news = 0;
                        }, 100);
                    }
                }
            },
            title: {
                text: '光照强度曲线'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 100
            },
            yAxis: {
                title: {
                    text: '光照强度（Lux）'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
                    for (i = -60; i <= 0; i++) {
                        data.push({
                            x: time + i * 1000,
                            y: null
                        });
                    }
                    return data;
                })()
            }]
        });

       
        $('#line_charts1').highcharts({
            chart:{
                type: 'spline',
                animation: Highcharts.svg,                      //don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), y = parseFloat(hum);
                            if (flag_news1 == 1) {
                                series.addPoint([x, y], true, true);
                            }
                            flag_news1 = 0;
                        }, 100);
                    }
                }
            },
            title: {
                text: '温度曲线'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 100
            },
            yAxis: {
                title: {
                    text: '温度（℃）'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                    
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
                    for (i = -60; i <= 0; i++) {
                        data.push({
                            x: time + i * 1000,
                            y: null
                        });
                    }
                    return data;
                })()
            }]
        });
    });

})