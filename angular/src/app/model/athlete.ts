export class Athlete {
    public name: string;

    public distance: number;

    public time: number;

    constructor(firstName = '', lastName = '', distance = 0, elapsedTime = 0) {
        this.name = `${firstName} ${lastName}`;
        this.distance = this._convertToKm(distance);
        this.time = this._convertToHours(elapsedTime);
    }

    private _convertToKm(distance) {
        return Math.floor(distance / 1000);
    }

    private _convertToHours(elapsedTime) {
        return Math.floor(elapsedTime / 3600);
    }
}
