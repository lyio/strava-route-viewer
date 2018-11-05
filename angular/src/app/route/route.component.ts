import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  @Input()
  points: any;

  private viewBox;

  private svgStyle;

  private style: object;

  @Input()
  private height = 200;

  @Input()
  private width = 190;

  @Input()
  private scale = 1.0;

  constructor() { }

  ngOnInit() {
    this.viewBox = this.calculateViewBox(this.points.path);

    this.svgStyle = this.getStyle(this.points);

    // this.style = { transform: `scale(${this.scale})`};
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
