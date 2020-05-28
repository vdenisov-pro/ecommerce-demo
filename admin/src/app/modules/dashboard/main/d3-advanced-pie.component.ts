import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'sp-d3-advanced-pie',
  template: `
    <ngx-charts-advanced-pie-chart
      [scheme]="colorScheme"
      [results]="single"
      [label]="'Всего'"
    >
    </ngx-charts-advanced-pie-chart>
  `
})
export class D3AdvancedPieComponent implements OnDestroy {
  single = [
    {
      name: 'Отменены',
      value: 20
    },
    {
      name: 'Выполняются',
      value: 50
    },
    {
      name: 'Завершены',
      value: 150
    }
  ];
  public colorScheme: any;
  public themeSubscription: any;

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

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
