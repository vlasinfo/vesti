$(function () {
        var overlayData = {
            labels: ["27 апреля", "28 апреля", "29 апреля", "30 апреля", "1 мая", "2 мая", "3 мая"],
            datasets: [{
                label: "Давление",
                type: "bar",
                yAxesGroup: "1",
                fillColor: "rgba(85,133,215,0.9)",
                strokeColor: "transparent",
                highlightFill: "rgba(6,37,108,0.6)",
                scaleOverride: true,
                highlightStroke: "transparent",
                data: [1020, 1013, 1007, 1016, 1023, 843, 812]
            }, {
                label: "Температура",
                type: "line",
                yAxesGroup: "2",
                fillColor: "rgba(85,133,215,0.3)",
                pointColor: "transparent",
                pointStrokeColor: "transparent",
                strokeColor: "rgba(6,37,108,1)",
                highlightFill: "rgba(85,133,215,0.75)",
                highlightStroke: "rgba(85,133,215,1)",
                data: [8, 20, 24, 17, 19, 23, 26]
            }],
            yAxes: [{
                name: "1",
                scalePositionLeft: false,
                scaleLabel : "<%=value%> кПа          ",
                scaleOverride:true,
                scaleSteps: 3,
                scaleStartValue:800,
                scaleEndValue:1000,
                scaleStepWidth:100,
                scaleFontColor: "rgba(151,137,200,0.8)"
            }, {
                name: "2",
                scalePositionLeft: true,
                scaleLabel : "<%=value%>°C",
                fontStyle: "bold",
                scaleFontColor: "#06256c"
            }]
        };
        Chart.defaults.global.responsive = true;
        window.onload = function () {
            window.myOverlayChart = new Chart(document.getElementById("weatherGraph").getContext("2d")).Overlay(overlayData, {
                populateSparseData: true,
                overlayBars: false,
                pointDotRadius: 10,
                bezierCurve: false,
                scaleShowVerticalLines: false
            });
        }



            var areaChartCanvas = $("#weatherGraph-2").get(0).getContext("2d");
            // This will get the first returned node in the jQuery collection.
            var areaChart = new Chart(areaChartCanvas);

            var areaChartData = {
                labels: ["27 апреля", "28 апреля", "29 апреля", "30 апреля", "1 мая", "2 мая", "3 мая"],
                datasets: [
                    {
                        label: "Вероятность осадков",
                        scaleSteps: 4,
                        fillColor: "rgba(85,133,215,0.3)",
                        pointColor: "transparent",
                        pointStrokeColor: "transparent",
                        pointDotRadius: 3,
                        pointHighlightFill: "red",
                        pointHighlightStroke: "red",
                        strokeColor: "rgba(6,37,108,1)",
                        highlightFill: "rgba(85,133,215,0.75)",
                        highlightStroke: "rgba(85,133,215,1)",
                        data: [8, 20, 24, 17, 19, 25, 23 , 19 , 27 , 32]
                    }
                ]
            };

            var areaChartOptions = {
                populateSparseData: true,
                scaleLabel : "<%=value%>°C",
                overlayBars: false,
                scaleShowLabels: false,
                tooltipCaretSize: 0,
                tooltipXPadding: 6,
                tooltipYPadding: 6,
                tooltipFillColor: "transparent",
                tooltipFontColor: "#06256c",
                bezierCurve: false,
                scaleLineColor: 'rgba(0, 0, 0, 0)',
                scaleShowHorizontalLines: false,
                scaleShowVerticalLines: false,
                tooltipTemplate: "<%= value %>°C",
                showTooltips: true,
                onAnimationComplete: function()
                {this.showTooltip(this.datasets[0].points, true);},
                tooltipEvents: []
            };

            //Create the line chart
            areaChart.Line(areaChartData, areaChartOptions);

        });