export function changeFieldName <T extends object, K extends keyof  T> (obj: T, key:     string ,  newName: string) {
    const clone = {...obj}
    for (const k of Object.keys(obj)) {
        if (k === key) {
            clone[newName] = obj[key]
            delete clone[key]
        }
    }
    return clone
}