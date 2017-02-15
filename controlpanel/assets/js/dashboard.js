$(document).ready(function($) {
    Site.run(),
        function() {
            ! function() {
                var defaults = $.components.getDefaults("vectorMap"),
                    options = $.extend({}, defaults, {
                        map: "world_merc",
                        markers: [{
                            latLng: [-33.55, 150.53],
                            name: "1,512 Visits"
                        }, {
                            latLng: [-37.5, 144.58],
                            name: "940 Visits"
                        }, {
                            latLng: [-31.58, 115.49],
                            name: "340 Visits"
                        }],
                        markerStyle: {
                            initial: {
                                r: 6,
                                fill: $.colors("blue-grey", 600),
                                stroke: $.colors("blue-grey", 600),
                                "stroke-width": 6,
                                "stroke-opacity": .6
                            },
                            hover: {
                                r: 10,
                                fill: $.colors("blue-grey", 500),
                                "stroke-width": 0
                            }
                        }
                    }, !0);
                $("#widgetJvmap").vectorMap(options)
            }()
        }(),
        function() {
            new Chartist.Line("#widgetLinepoint .ct-chart", {
                labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
                series: [
                    [1, 1.5, .5, 2, 1, 2.5, 1.5, 2]
                ]
            }, {
                low: 0,
                showArea: !1,
                showPoint: !0,
                showLine: !0,
                fullWidth: !0,
                lineSmooth: !1,
                chartPadding: {
                    top: 10,
                    right: -4,
                    bottom: 10,
                    left: -4
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
                },
                plugins: [Chartist.plugins.tooltip()]
            })
        }(),
        function() {
            new Chartist.Bar("#widgetSaleBar .ct-chart", {
                labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O", "P", "Q"],
                series: [
                    [50, 90, 100, 90, 110, 100, 120, 130, 115, 95, 80, 85, 100, 140, 130, 120]
                ]
            }, {
                low: 0,
                fullWidth: !0,
                chartPadding: {
                    top: 0,
                    right: 20,
                    bottom: 30,
                    left: 20
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
                },
                plugins: [Chartist.plugins.tooltip()]
            })
        }(),
        function() {
            new Chartist.Line("#widgetLinepointDate .ct-chart", {
                labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
                series: [
                    [36, 45, 28, 19, 39, 46, 35, 13]
                ]
            }, {
                low: 0,
                showArea: !1,
                showPoint: !0,
                showLine: !0,
                fullWidth: !0,
                lineSmooth: !1,
                chartPadding: {
                    top: 5,
                    right: -4,
                    bottom: 10,
                    left: -4
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
                },
                plugins: [Chartist.plugins.tooltip()]
            })
        }()
});