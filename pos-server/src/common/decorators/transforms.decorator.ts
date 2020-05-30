/* tslint:disable:naming-convention */

import { Transform } from 'class-transformer';
import * as _ from 'lodash';

/**
 * @description convert string or number to integer
 * @example
 * @IsNumber()
 * @ToInt()
 * name: number;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */
export function ToInt() {
    return Transform(value => parseInt(value, 10), { toClassOnly: true });
}

/**
 * @description transforms to array, specially for query params
 * @example
 * @IsNumber()
 * @ToArray()
 * name: number;
 * @constructor
 */
export function ToArray(): (target: any, key: string) => void {
    return Transform(
        value => {
            if (_.isNil(value)) {
                return [];
            }
            return _.castArray(value);
        },
        { toClassOnly: true },
    );
}
