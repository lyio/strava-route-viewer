import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivityRoute } from '../model/activity-route';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  @Input()
  activityRoute: ActivityRoute;

  viewBox;

  svgStyle;

  style: object;

  path: string;

  @Input()
  height = 200;

  @Input()
  width = 190;

  @Input()
  scale = 1.0;

  @Output()
  activityClicked = new EventEmitter<ActivityRoute>();

  constructor() { }

  ngOnInit() {
    this.viewBox = this.calculateViewBox(this.activityRoute.svgPath);

    this.path = this.activityRoute.svgPath.path;

    this.svgStyle = this.getStyle(this.activityRoute);
  }

  clicked() {
    this.activityClicked.emit(this.activityRoute);
  }

  private calculateViewBox(route) {
    return [route.x, route.y, route.width, route.height].join(' ');
}

  private getStyle(points) {
    const lightBlue = '#00b1fa';
    const orangeRed = 'orangered';

    return {
        fill: 'none',
        stroke: points.isRace ? orangeRed : lightBlue,
        strokeWidth: '0.0001'
    };
  }
}
