import { HttpClient } from '@angular/common/http';
import { DataStore } from './../../engine/data-store';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataStore: DataStore;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  bartypes: string[] = ['bar', 'pie', 'line', 'doughnut', 'radar', 'polarArea', 'horizontalBar'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [
    { data: [25, 30, 28, 26], label: 'Total Seat' },
    { data: [], label: 'Allocated' }
  ];

  constructor(private http: HttpClient) {
    this.dataStore = DataStore.getInstance();
    this.http.get("../dashboard/").subscribe((res: any) => {
      if (res && res.errno) {
        alert(res.sqlMessage ?res.sqlMessage:'Error Occured');
      }
      else {
        for (let i = 0; i < res.length; i++) {
          this.barChartLabels.push(res[i].odc);
          this.barChartData[1].data.push(res[i].alocated_count);
        }
      }

    });
  }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  public randomize(type): void {
    this.barChartType = type;
  }

}
