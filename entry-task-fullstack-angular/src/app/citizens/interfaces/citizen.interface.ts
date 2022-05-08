export interface Citizen {
    id: number,
    name: string,
    city_id: number,
    groups: Array<CitizenGroup>,
}

export interface CitizenGroup {
    type: string,
    name: string,
}
