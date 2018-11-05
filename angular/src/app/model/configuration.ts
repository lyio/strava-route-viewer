export class Configuration {
    public token: string;
    public activityTypes: Map<string, boolean>;
    public activityDuration: number;
    public activityCount: number;

    constructor() {
        this.activityCount = 42;
        this.token = '';
        this.activityTypes = new Map<string, boolean>();
    }
}
