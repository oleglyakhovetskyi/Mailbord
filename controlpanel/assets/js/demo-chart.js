! function(document, window, $) {
    "use strict";
    var Site = window.Site;
    $(document).ready(function(jQuery) {
        function line_time_getData() {
            for (line_time_labels.shift(), line_time_data.shift(); line_time_data.length < line_time_totalPoints;) {
                var x = 100 * Math.random();
                line_time_labels.push(line_time_now += line_time_updateInterval), line_time_data.push(x)
            }
        }

        function line_time_update() {
            line_time_getData(), new Chartist.Line("#chartLineTime .chart-line", lineTime, lineTimeOptions), setTimeout(line_time_update, line_time_updateInterval)
        }

        function getData() {
            for (timeline_labels.shift(), timeline_data1.shift(), timeline_data2.shift(); timeline_data1.length < totalPoints;) {
                var x = 100 * Math.random() + 800,
                    y = 100 * Math.random() + 400;
                timeline_labels.push(now += updateInterval), timeline_data1.push(x), timeline_data2.push(y)
            }
        }

        
        var line_time_labels = [],
            line_time_data = [],
            line_time_totalPoints = 100,
            line_time_updateInterval = 1e3,
            line_time_now = (new Date).getTime(),
            lineTime = {
                labels: line_time_labels,
                series: [line_time_data]
            },
            lineTimeOptions = {
                low: 0,
                showArea: !1,
                showPoint: !1,
                showLine: !0,
                lineSmooth: !1,
                fullWidth: !0,
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                axisX: {
                    showLabel: !1,
                    showGrid: !1,
                    offset: 0
                },
                axisY: {
                    showLabel: !1,
                    showGrid: !1,
                    offset: 0
                }
            };
        new Chartist.Line("#chartLineTime .chart-line", lineTime, lineTimeOptions), line_time_update(), new Chartist.Pie("#chartLineTime .chart-pie-left", {
            series: [50, 50]
        }, {
            donut: !0,
            donutWidth: 10,
            startAngle: 0,
            showLabel: !1
        }), new Chartist.Pie("#chartLineTime .chart-pie-right", {
            series: [80, 20]
        }, {
            donut: !0,
            donutWidth: 10,
            startAngle: 0,
            showLabel: !1
        });
        
    })
}(document, window, jQuery);