export class DashboardsData {
    constructor(public data: Dashboards) {}
}

export class Dashboards {
    constructor(public name: string, public description: string) {}
}

export class DashboardsUsers {
    constructor(public name: string, public credential: string, public address: string) {}
}