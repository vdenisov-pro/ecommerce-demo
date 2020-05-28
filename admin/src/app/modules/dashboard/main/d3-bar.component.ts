import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'sp-d3-bar',
  template: `
    <ngx-charts-bar-vertical
      [scheme]="colorScheme"
      [results]="results"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel"
      [legendTitle]="'Легенда'"
    >
    </ngx-charts-bar-vertical>
  `
})
export class D3BarComponent implements OnInit, OnDestroy {
  results = [];
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'Country';
  yAxisLabel = 'Population';
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

  public ngOnInit() {
    this.results = [
      {
        name: 'Клиенты',
        value: Math.floor(Math.random() * 1000) + 1
      },
      {
        name: 'Менеджеры',
        value: Math.floor(Math.random() * 15) + 1
      },
      {
        name: 'Курьеры',
        value: Math.floor(Math.random() * 15) + 1
      }
    ];
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
