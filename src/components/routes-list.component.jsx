import { Route } from "./route.component";
import React from 'react';

import { mapPathtoSvGCoordinates } from './../projector';

 export function RoutesList(props) {
     return (
         <div className="routes-container">
            {props.routes.map(route => {
                return (
                    <Route key={ route.id } points={ _extract(route) }></Route>
                );
            })}
         </div>
     );

     function _extract(route) {
        return mapPathtoSvGCoordinates(google.maps.geometry.encoding.decodePath(route.summary_polyline)); // eslint-disable-line no-undef
     }
 }