function latLng2point({lat, lng}){
    const latitude = lat();
    const longitude = lng();
  return {
          x:(longitude+180)*(256/360),
          y:(256/2)-(256*Math.log(Math.tan((Math.PI/4)
                     +((latitude*Math.PI/180)/2)))/(2*Math.PI))
         };
}

function mapPathtoSvGCoordinates(decodedPath) {
    var point,
    gmPath,
    svgPath,
    svgPaths = [],
        minX = 256,
        minY = 256,
        maxX = 0,
        maxY = 0;

        gmPath = decodedPath;
    
        svgPath = [];
        for (var p = 0; p < gmPath.length; ++p) {
            point = latLng2point(gmPath[p]);
            minX = Math.min(minX, point.x);
            minY = Math.min(minY, point.y);
            maxX = Math.max(maxX, point.x);
            maxY = Math.max(maxY, point.y);
            svgPath.push([point.x, point.y].join(','));
        }
        svgPaths.push(svgPath.join(' '))

    return {
        path: svgPaths.join(' '),
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
    };
}

export { mapPathtoSvGCoordinates };