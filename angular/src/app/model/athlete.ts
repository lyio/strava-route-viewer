import { Activity } from './acitvity';

export class Athlete {
    public name: string;

    public distance: number;

    public time: number;

    public activities: Array<Activity>;

    constructor(name = '', distance = 0, elapsedTime = 0, activities: Array<Activity> = []) {
        this.name = name;
        this.distance = distance;
        this.time = elapsedTime;
        this.activities = activities;
    }
}
