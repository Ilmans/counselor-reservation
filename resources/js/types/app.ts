export interface AppData {
    name: string;
    desc: string;
    greeting: string;
    date: AppDate;
    logo: string;
}

export interface AppDate {
    day: string;
    date: string;
    time: string;
    datetime: string;
}
