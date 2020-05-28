import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

import { D3AdvancedPieComponent } from './d3-advanced-pie.component';
import { D3LineComponent } from './d3-line.component';
import { D3BarComponent } from './d3-bar.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { ThemeModule } from 'src/app/@theme/theme.module';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  declarations: [
    MainComponent,
    D3AdvancedPieComponent,
    D3LineComponent,
    D3BarComponent
  ],
  imports: [
    CommonModule, ThemeModule, SharedModule,
    NgxEchartsModule, NgxChartsModule, ChartModule,
    MainRoutingModule
  ]
})
export class MainModule { }
