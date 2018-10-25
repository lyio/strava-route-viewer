export class Athlete {
    public name: string;

    public distance: number;

    public time: number;

    constructor(firstName = '', lastName = '', distance = 0, elapsedTime = 0) {
        this.name = `${firstName} ${lastName}`;
        this.distance = Math.floor(distance / 1000);
        this.time = Math.floor(elapsedTime / 3600);
    }
}
