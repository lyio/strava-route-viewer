import React from 'react';
import './poster-footer.css';

export function PosterFooter(props) {
    return (
        <div className="poster-footer">
            <div className="athlete-data">
                <label className="athlete-label">Name</label>
                <div className="athlete-value">{ props.athlete.name }</div>
            </div>
            <div className="athlete-data">
                <label className="athlete-label">Total Distance</label>
                <div className="athlete-value">{ props.athlete.distance }</div>
            </div>
            <div className="athlete-data">
                <label className="athlete-label">Total time</label>
                <div className="athlete-value">{ props.athlete.time }</div>
            </div>
        </div>
    );
}

PosterFooter.defaultProps = {
    athlete: {}
};