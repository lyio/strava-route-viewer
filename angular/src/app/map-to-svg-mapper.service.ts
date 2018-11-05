import { Injectable } from '@angular/core';
import { decode } from '@mapbox/polyline';
import { ActivityMap } from './model/activity-map';

export interface Path {
  x: number;
  y: number;
}

export interface SvGCoordinate {
  path: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root'
})
export class MapToSvgMapperService {

  constructor() { }

  extract(route: ActivityMap) {
    return this.mapPathtoSvGCoordinates(
      decode(route.summary_polyline)
    );
  }

  private latLng2point([latitude, longitude]: Array<number>): Path {
    return {
      x: (longitude + 180) * (256 / 360),
      y: (256 / 2) - (256 * Math.log(Math.tan((Math.PI / 4)
            + ((latitude * Math.PI / 180) / 2))) / (2 * Math.PI))
    };
  }

  private mapPathtoSvGCoordinates(decodedPath): SvGCoordinate {
    let point,
    gmPath,
    svgPath: Array<String>,
    minX = 256,
    minY = 256,
    maxX = 0,
    maxY = 0;
    const svgPaths = [];

    gmPath = decodedPath;

    svgPath = [];
    for (let p = 0; p < gmPath.length; ++p) {
        point = this.latLng2point(gmPath[p]);
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
        svgPath.push([point.x, point.y].join(','));
    }
    svgPaths.push(svgPath.join(' '));

    return {
        path: svgPaths.join(' '),
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
    };
  }
}
