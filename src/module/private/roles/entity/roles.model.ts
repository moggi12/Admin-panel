export interface RolesUI {
    id: string,
    name: string,
    scopes?: ScopesUI,
}

export interface ScopesUI {
    service: string;
    office: string;
    merchant: string;
    configure: string;
    dataReport: string;
    report: string;
    recommendation: string;
    userManagement: string;
    roles: string
}