import { DataService } from './../data.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  public programMasterdata: any;
  public pricingMasterdata: any = [];
  public curYear = [];
  public preYear = [];
  public barChartData: any[] = [];
  public pricingMasterdataArr: any[] = [];
  public masterArray: any[] = [];
  public barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  public barChartType = 'bar';
  public barChartLegend = false;
  public showChart = false;
 
  public details: boolean

FIELDS = {
    Name : null, 
    PricingOptionID: null,
    ProgramID: null,
    Sales: null
  };

  constructor(public dataservice: DataService) {
  }
  ngOnInit() {
    this.fetchdata();

  }
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        display: false
      }]
    }
  };
  public barChartColors = [
    {
      backgroundColor: '#CCBCCD'
    },
    {
      backgroundColor: '#B6D8B9'
    },

  ]

  fetchdata() {
    this.dataservice.programs().then((data) => {
      this.programMasterdata = data;
      console.log("Data :", this.programMasterdata)
      this.dataservice.pricingOptions().then((data1) => {
        this.pricingMasterdata = data1;
        for(let i = 0; i<this.programMasterdata.length; i++){
          let index = 0;
          this.programMasterdata[i]["Pricing"] = [];
          this.curYear = this.programMasterdata[i].Sales.CurrentYear;
          this.preYear = this.programMasterdata[i].Sales.PreviousYear;
          this.programMasterdata[i]["Chart"]=[[{ data: this.curYear, label: 'Series A' }, { data: this.preYear, label: 'Series B' }], [this.programMasterdata[i].ProgramID, this.programMasterdata[i].Name, this.programMasterdata[i].TotalMonthlySales]];
          this.showChart = true;
          for(let j = 0; j<this.pricingMasterdata.length; j++){
            let flag = false;
            if(this.pricingMasterdata[j]["ProgramID"] == this.programMasterdata[i]["ProgramID"]){
              flag = true;
            }
            if(flag){
              const obj = Object.assign({}, this.FIELDS);
              obj.Name = this.pricingMasterdata[j]["Name"];
              obj.PricingOptionID = this.pricingMasterdata[j]["PricingOptionID"];
              obj.ProgramID = this.pricingMasterdata[j]["ProgramID"];
              obj.Sales = this.pricingMasterdata[j]["Sales"];
              this.programMasterdata[i]["Pricing"].push(obj);
            }
          }
        }
        console.log(this.programMasterdata);
      });
    });

    
  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  showmore(item){       
     if(item.show == false || item.show==undefined){
      item.show=true; 
     }else{
      item.show=false;   
     }       
  }
}
