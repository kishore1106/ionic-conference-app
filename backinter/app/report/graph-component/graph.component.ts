import { Component, OnInit,Input,SimpleChange } from '@angular/core';

import {nvD3} from 'ng2-nvD3';
declare let d3: any;

@Component({
    // moduleId: module.id,
    selector: 'my-graph',
    templateUrl: 'report/graph-component/graph.component.html',
   // directives: [nvD3]
})

export class GraphComponent implements OnInit {
    constructor() { }
    @Input () reportDataQualityArray:any;
    @Input () reportDataVelocityArray:any;

    onTimeDeliveryChartOptions: any;
    onTimeDeliveryData: any;
        
    qualityImprovementChartOption: any;
    qualityImprovementData: any;

    productivityImprovementChartOption: any;
    productivityImprovementdata: any;
  
    externalToCatAndAcsdChartOptions: any;
    externalToCatAndAcsdData: any;


    
    //  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    //     console.log(changes);
    //     for (let propName in changes) {
    //         let changedProp = changes[propName];
    //         console.log(changedProp);
    //     }
                
    // }
       ngOnInit() {}

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
  
        if(this.reportDataQualityArray!=undefined && this.reportDataVelocityArray!=undefined) {
            console.log("reportData",this.reportDataQualityArray,this.reportDataVelocityArray)
            var sectionName=this.reportDataQualityArray.sectionName;
        var Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
//-----------------------------------------------------------------------------------------------------------------//
        this.onTimeDeliveryChartOptions = {
            chart: {
                type: 'discreteBarChart',// lineChart,discreteBarChart,scatterChart,multiBarChart,multiBarHorizontalChart
                height: 450,
                margin: {
                    top: 100,
                    right: 80,
                    bottom: 100,
                    left: 80
                },
                x: function (d) { return d.x; },
                y: function (d) { return d.y; },
                showValues: true,
                valueFormat: function (d) {
                    return ((d) + ("%"));
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'Month'
                },
                yAxis: {
                    axisLabel: 'No of Defects',
                    tickFormat: function (d) {
                        return ((d) + ("%"));
                    },
                    axisLabelDistance: -10
                }
            }
        }

        this.onTimeDeliveryData = this.getDataForOnTimeDelivery();
//----------------------------------------------------------------------------------------------------------------//
        this.qualityImprovementChartOption = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function (d) { return d.x; },
                y: function (d) { return d.y; },
                useInteractiveGuideline: true,
                showValue: true,
                xAxis: {
                    axisLabel: 'Month ',
                    tickFormat: function (d) {
                        return Months[d];
                    }
                },
                yAxis: {
                    axisLabel: 'NUMBER OF SPILLS',
                    tickFormat: function (d) {
                        return ((d) + ("%"));
                    },
                    axisLabelDistance: -10
                }
            }
        };

        this.qualityImprovementData = this.getDataForQualityImprovement();
//-----------------------------------------------------------------------------------------------------------//
        /// productive improvement
        this.productivityImprovementChartOption = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55

                },
                x: function (d) { return d.x; },
                y: function (d) { return d.y; },
                useInteractiveGuideline: true,
                showValue: true,
                showValues: true,
                valueFormat: function (d) {
                    return ((d) + ("%"));
                },
                xAxis: {
                    axisLabel: 'Month ',
                    tickFormat: function (d) {
                        return Months[d];
                    }
                },
                yAxis: {
                    axisLabel: 'Productivity Improvement(%)',
                    tickFormat: function (d) {
                        return ((d) + ("%"));
                    },
                    axisLabelDistance: -10
                },
                title: {
                    enable: true,
                    text: "Message Throughput"
                }
            }
        };

        this.productivityImprovementdata = this.getDataForProductiveImprovement();
//----------------------------------------------------------------------------------------------------------------------//
        this.externalToCatAndAcsdChartOptions = {
            chart: {
                type: 'multiBarChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
               x: function (d) { return d.x; },
                y: function (d) { return d.y; },
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: 'Month ',
                    tickFormat: function (d) {
                        return Months[d];
                    }
                },
                yAxis: {
                    axisLabel: 'NUMBER OF SPILLS',
                    // tickFormat: function (d) {
                    //   return d3.format('.02f')(d);
                    // },
                    tickFormat: function (d) {
                        return ((d));
                    },
                    axisLabelDistance: -10
                }
            }
        };

        this.externalToCatAndAcsdData = this.getDataForExternalToCatAndAcsd();
//----------------------------------------------------------------------------------------------------------------------//
   } }//ngonchanges  ends here


     getDataForOnTimeDelivery() {
        var defects = [];
        //Data is represented as an array of {x,y} pairs.
        for (var i = 0; i < this.reportDataVelocityArray.Data.length; i++) {
            defects.push({ x: this.reportDataVelocityArray.Data[i].label , y: this.reportDataVelocityArray.Data[i].onTimeDelivery });
        }
        //Line chart data should be sent as an array of series objects.
        return [
            {
                values: defects,      //values - represents the array of {x,y} data points
                key: 'Defects', //key  - the name of the series.
                color: '#ff7f0e'  //color - optional: choose your own line color.
            }
        ];
    }
    // software productive improvement function
    getDataForProductiveImprovement() {

        var mydat = [];
        var mydat3 = [];
        //Data is represented as an array of {x,y} pairs.
 for (var ele = 0; ele < this.reportDataVelocityArray.Data.length; ele++) {
            mydat.push({ x: this.reportDataVelocityArray.Data[ele].month, y: this.reportDataVelocityArray.Data[ele].productiveImprovement});
            mydat3.push({ x: this.reportDataVelocityArray.Data[ele].month, y: this.reportDataVelocityArray.Data[ele].productivityTargetval });
        }
        //Line chart data should be sent as an array of series objects.
        return [
            {
                values: mydat3,
                key: 'TargetValue',
                color: '#ff0066',
                //area: true//area - set to true if you want this line to turn into a filled area chart.
            },
                       {
                values: mydat,
                key: 'Productivity Improvement (%)',
                color: '#6666ff',
                // area: true      //area - set to true if you want this line to turn into a filled area chart.
            }
        ];
    }
  
    // software quality improvement function
    getDataForQualityImprovement() {

        var mydata = [];
        var mydata3 = [];
        //Data is represented as an array of {x,y} pairs.
        for (var ele = 0; ele < this.reportDataQualityArray.Data.length; ele++) {
            mydata.push({ x: this.reportDataQualityArray.Data[ele].month, y: this.reportDataQualityArray.Data[ele].qualityImprovement});
          
            mydata3.push({ x: this.reportDataQualityArray.Data[ele].month, y: this.reportDataQualityArray.Data[ele].qualitytargetval });
        }
        //Line chart data should be sent as an array of series objects.
        return [
            {
                values: mydata3,
                key: 'TargetValue',
                color: '#ff5500',
                //area: true//area - set to true if you want this line to turn into a filled area chart.
            },
             {
                values: mydata,
                key: 'Quality Improvement(%)',
                color: '#3399ff',
              }
        ];
    }
   
getDataForExternalToCatAndAcsd() {

        var mydat = [];
        var mydat2 = [];
               //Data is represented as an array of {x,y} pairs.
        for (var ele = 0; ele < this.reportDataQualityArray.Data.length; ele++) {
            mydat.push({ x: this.reportDataQualityArray.Data[ele].month, y: this.reportDataQualityArray.Data[ele].externalToCat});
            mydat2.push({x: this.reportDataQualityArray.Data[ele].month, y: this.reportDataQualityArray.Data[ele].externalToAcsd });
           
        }
        //Line chart data should be sent as an array of series objects.
        return [
            {
                values: mydat,
                key: 'ExternalToCat',
                color: ' #66ffff',
                //area: true//area - set to true if you want this line to turn into a filled area chart.
            },
            {
                values: mydat2,
                key: 'ExternalToACSD',
                color: '#993333',
                // area: true      //area - set to true if you want this line to turn into a filled area chart.
            }
        ];
    }

}
