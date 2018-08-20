import React from 'react';

export function Route(props) {
    return (
        <svg height="210" width="200" viewBox={calculateViewBox(props.points)} xmlns="http://www.w3.org/2000/svg">
            <polyline 
              points={props.points.path}
              style={{fill:'none', stroke:'orangered', strokeWidth: '0.0001'}} />
        </svg>
    )

    function calculateViewBox(route) {
        return [route.x, route.y, route.width, route.height].join(' ');
    }
}