import L from 'leaflet';
import { Component, OnInit, Input } from '@angular/core';
import { ActivityRoute } from '../model/activity-route';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css']
})
export class RouteDetailComponent implements OnInit {

  @Input()
  activityRoute: ActivityRoute;

  constructor() { }

  ngOnInit() {
    const coordinates = this.activityRoute.svgPath.path.split(' ').map(pair => pair.split(','));
    const map = L.map('map');

    const polyline = L.polyline(coordinates, {color: 'red'}).addTo(map);

    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }
}
