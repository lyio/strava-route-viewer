import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Athlete } from '../model/athlete';
import { MapToSvgMapperService } from '../map-to-svg-mapper.service';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.css']
})
export class RoutesListComponent implements OnInit, OnChanges {

  @Input()
  routes: Array<any> = [];

  @Input()
  athlete: Athlete;

  private transformedRoutes: Array<any> = [];

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
    }
  }
}
