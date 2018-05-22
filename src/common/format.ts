
export function formatMillisAsISODateString(millis: number) {
    return new Date(millis).toISOString().slice(0, 10);
}

export function formatDateAsISODateString(date: Date) {
    const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return isoDate.toISOString().slice(0, 10);
}


export function formatDataTypeName(name: string|null, fullyQualified: boolean): string {
    if (name && !fullyQualified) {
        const indexColon = name.lastIndexOf(':');
        if (indexColon >= 1) {
            name = name.substr(0, indexColon);
        }
        const indexDot = name.lastIndexOf('.');
        if (indexDot >= 0) {
            name = name.substr(indexDot + 1);
        }
    }
    return name;
}
