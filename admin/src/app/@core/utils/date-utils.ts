import * as moment from 'moment';
import { environment } from 'src/environments/environment';

let serverTimeOffset: number;
export function setServerTimeOffset(offset) {
    serverTimeOffset = offset;
}

export function getServerTimeOffset(skipValidation = false) {
    if (environment.DEBUG_MODE) {
        if (serverTimeOffset === undefined && !skipValidation) {
            throw new Error('serverTimeOffset is no ready yet');
        }
    }
    return serverTimeOffset || 0;
}

export function isoStringToTimestamp(str: string, withServerTimeOffset = false): number {
    const m = moment(str);
    let result;
    if (m.isValid()) {
        result = m.valueOf();
    } else {
        if (environment.DEBUG_MODE) {
            throw new Error(`Invalid time datetime format: ${str}`);
        }
        result = new Date(str).getTime();
    }
    if (withServerTimeOffset) {
        result -= getServerTimeOffset();
    }
    return result;
}

export function timestampToIsoString(num: number, withServerTimeOffset = false): string {
    if (withServerTimeOffset) {
        num += getServerTimeOffset();
    }
    return moment(num).toISOString();
}
