import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'sp-d3-line',
  template: `
    <ngx-charts-line-chart
      [scheme]="colorScheme"
      [results]="multi"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [showXAxisLabel]="showXAxisLabel"
      [showYAxisLabel]="showYAxisLabel"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel"
      [legendTitle]="'Легенда'"
    >
    </ngx-charts-line-chart>
  `
})
export class D3LineComponent implements OnInit, OnDestroy {
  public multi;

  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Города';
  showYAxisLabel = true;
  yAxisLabel = 'Количество';
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [
          colors.primaryLight,
          colors.infoLight,
          colors.successLight,
          colors.warningLight,
          colors.dangerLight
        ]
      };
    });
  }

  ngOnInit() {

    this.multi = [
      {
        name: 'Нур-Султан',
        series: this.generateData()
      },
      {
        name: 'Алматы',
        series: this.generateData()
      },
      {
        name: 'Талгар',
        series: this.generateData()
      }
    ];
  }

  public generateData() {
    const values = [];
    for (let i = 0; i < 10; i++) {
      values.push(
        {
          name: i,
          value: Math.floor(Math.random() * 1000) + 1
        }
      );
    }
    return values;
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
