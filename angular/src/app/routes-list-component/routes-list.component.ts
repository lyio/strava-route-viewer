import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Athlete } from '../model/athlete';
import { MapToSvgMapperService } from '../map-to-svg-mapper.service';
import { Activity } from '../model/acitvity';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.css']
})
export class RoutesListComponent implements OnInit, OnChanges {

  @Input()
  routes: Array<Activity> = [];

  @Input()
  athlete: Athlete;

  transformedRoutes: Array<any> = [];
  private scaling = 1;
  height: number;
  width: number;

  constructor(private mapToSvgMapper: MapToSvgMapperService) { }

  ngOnInit() {
  }

  ngOnChanges({routes, athlete}: SimpleChanges) {
    if (routes && routes.currentValue) {
      this.transformedRoutes = routes.currentValue.map(route => {
        return {
          path: this.mapToSvgMapper.extract(route.map),
          isRace: route.isRace
        };
      });

      // this.scaling = Math.abs(40 / this.transformedRoutes.length);
      this.height = 200 * this.scaling;
      this.width = 180 * this.scaling;
    }
  }
}
