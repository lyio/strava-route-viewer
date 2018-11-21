export class Configuration {
    public token: string;
    public activityTypes: Map<string, boolean>;
    public activityDuration: number;
    public activityCount: number;

    constructor() {
        this.token = '';
        this.activityTypes = new Map<string, boolean>();
    }
}
