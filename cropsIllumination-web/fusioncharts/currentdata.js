function getDialTem(value){
FusionCharts.ready(function () {
    var csatGauge = new FusionCharts({
        "type": "angulargauge",
        "renderAt": "wd",
        "width": "440",
        "height": "380",
        "dataFormat": "json",
        "dataSource": {
            "chart": {
                "manageresize": "1",
                "origw": "260",
                "origh": "260",
                "bgcolor": "FFFFFF",
                "upperlimit": "100",
                "lowerlimit": "0",
                "basefontcolor": "000000",
                "majortmnumber": "11",
                "majortmcolor": "000000",
                "majortmheight": "8",
                "minortmnumber": "5",
                "minortmcolor": "000000",
                "minortmheight": "3",
                "tooltipbordercolor": "000000",//鼠标经过显示值的边框颜色
                "tooltipbgcolor": "333333",//鼠标经过显示值的背景色
                "tooltipcolor": "ffffff",//鼠标经过显示值的字体颜色
                "tooltipborderradius": "3",//鼠标经过显示值的圆角值
                "gaugeouterradius": "110",
                "gaugestartangle": "225",
                "gaugeendangle": "-45",
                "placevaluesinside": "1",
                "gaugeinnerradius": "80%",
                "annrenderdelay": "0",
                "gaugefillmix": "",
                "pivotradius": "10",
                "showpivotborder": "0",
                "pivotfillmix": "{CCCCCC},{666666}",
                "pivotfillratio": "50,50",
                "showshadow": "0",
                "gaugeoriginx": "158",
                "gaugeoriginy": "130",
                "showborder": "0",
                "showValue": "1",
                "valueBelowPivot": "1"
            },
            "colorrange": {
                "color": [
                    {
                        "minvalue": "0",
                        "maxvalue": "50",
                        "code": "C1E1C1",
                        "alpha": "80"
                    },
                    {
                        "minvalue": "50",
                        "maxvalue": "85",
                        "code": "F6F164",
                        "alpha": "80"
                    },
                    {
                        "minvalue": "85",
                        "maxvalue": "120",
                        "code": "F70118",
                        "alpha": "80"
                    }
                ]
            },
            "dials": {
                "dial": [
                    {
                        "value": value,
                        "bordercolor": "FFFFFF",
                        "bgcolor": "666666,CCCCCC,666666",
                        "borderalpha": "0",
                        "basewidth": "10"
                    }
                ]
            },
            "annotations": {
                "groups": [
                    {
                        "x": "158",
                        "y": "130",
                        "showbelow": "10",
                        "items": [
                            {
                                "type": "circle",
                                "x": "0",
                                "y": "0",
                                "radius": "121",
                                "color": "dddddd"
                            },
                            {
                                "type": "circle",
                                "x": "0",
                                "y": "0",
                                "radius": "120",
                                "color": "ffffff"//"color": "666666"
                            }
                        ]
                    },
                    {
                        "x": "160",
                        "y": "160",
                        "showbelow": "0",
                        "scaletext": "1",
                        "items": [
                            {
                                "type": "text",
                                "y": "55",
                                "x": "0",
                                "label": "光照强度"+ value + "(lx)",
                                "fontcolor": "000000",
                                "fontsize": "16",
                                "bold": "1"
                            }
                        ]
                    }
                ]
            },
            "value": "28"
        }
    });
    csatGauge.render();
});
}
function getDialHum(value){
FusionCharts.ready(function () {
    var csatGauge = new FusionCharts({
        "type": "angulargauge",
        "renderAt": "sd",
        "width": "340",
        "height": "280",
        "dataFormat": "json",
        "dataSource": {
            "chart": {
                "manageresize": "1",
                "origw": "260",
                "origh": "260",
                "bgcolor": "FFFFFF",
                "upperlimit": "100",
                "lowerlimit": "0",
                "basefontcolor": "000000",
                "majortmnumber": "11",
                "majortmcolor": "000000",
                "majortmheight": "8",
                "minortmnumber": "5",
                "minortmcolor": "000000",
                "minortmheight": "3",
                "tooltipbordercolor": "000000",//鼠标经过显示值的边框颜色
                "tooltipbgcolor": "333333",//鼠标经过显示值的背景色
                "tooltipcolor": "ffffff",//鼠标经过显示值的字体颜色
                "tooltipborderradius": "3",//鼠标经过显示值的圆角值
                "gaugeouterradius": "110",
                "gaugestartangle": "225",
                "gaugeendangle": "-45",
                "placevaluesinside": "1",
                "gaugeinnerradius": "80%",
                "annrenderdelay": "0",
                "gaugefillmix": "",
                "pivotradius": "10",
                "showpivotborder": "0",
                "pivotfillmix": "{CCCCCC},{666666}",
                "pivotfillratio": "50,50",
                "showshadow": "0",
                "gaugeoriginx": "158",
                "gaugeoriginy": "130",
                "showborder": "0",
                "showValue": "1",
                "valueBelowPivot": "1"
            },
            "colorrange": {
                "color": [
                    {
                        "minvalue": "0",
                        "maxvalue": "50",
                        "code": "C1E1C1",
                        "alpha": "80"
                    },
                    {
                        "minvalue": "50",
                        "maxvalue": "85",
                        "code": "F6F164",
                        "alpha": "80"
                    },
                    {
                        "minvalue": "85",
                        "maxvalue": "120",
                        "code": "F70118",
                        "alpha": "80"
                    }
                ]
            },
            "dials": {
                "dial": [
                    {
                        "value": value,
                        "bordercolor": "FFFFFF",
                        "bgcolor": "666666,CCCCCC,666666",
                        "borderalpha": "0",
                        "basewidth": "10"
                    }
                ]
            },
            "annotations": {
                "groups": [
                    {
                        "x": "158",
                        "y": "130",
                        "showbelow": "10",
                        "items": [
                            {
                                "type": "circle",
                                "x": "0",
                                "y": "0",
                                "radius": "121",
                                "color": "dddddd"
                            },
                            {
                                "type": "circle",
                                "x": "0",
                                "y": "0",
                                "radius": "120",
                                "color": "ffffff"//"color": "666666"
                            }
                        ]
                    },
                    {
                        "x": "160",
                        "y": "160",
                        "showbelow": "0",
                        "scaletext": "1",
                        "items": [
                            {
                                "type": "text",
                                "y": "55",
                                "x": "0",
                                "label": "当前温度" + value +"(℃)",
                                "fontcolor": "000000",
                                "fontsize": "16",
                                "bold": "1"
                            }
                        ]
                    }
                ]
            },
            "value": "28"
        }
    });
    csatGauge.render();
});
}


