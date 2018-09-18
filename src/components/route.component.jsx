import React from 'react';

export function Route(props) {
    return (
            <svg height="210" width="200" viewBox={calculateViewBox(props.points.path)} xmlns="http://www.w3.org/2000/svg">
                <polyline
                points={props.points.path.path}
                style={getStyle(props.points)} />
            </svg>
    )

    function calculateViewBox(route) {
        return [route.x, route.y, route.width, route.height].join(' ');
    }

    function getStyle(points) {
        const lightBlue = '#00b1fa';
        const orangeRed = 'orangered';

        return {
            fill:'none',
            stroke: points.isRace ? orangeRed : lightBlue,
            strokeWidth: '0.0001'};
    }
}