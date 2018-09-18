import { Route } from './route.component';
import React from 'react';
import { PosterFooter } from './poster-footer';

import { mapPathtoSvGCoordinates } from './../projector';

 export function RoutesList(props) {
     return (
         <div className="routes-container">
            {props.routes.map(route => {
                return (
                    <Route key={ route.map.id } points={ { path: _extract(route.map), isRace: route.isRace } }></Route>
                );
            })}
            <PosterFooter athlete={props.athlete}/>
         </div>
     );

     function _extract(route) {
        return mapPathtoSvGCoordinates(google.maps.geometry.encoding.decodePath(route.summary_polyline)); // eslint-disable-line no-undef
     }
 }