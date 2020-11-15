export class GenericUtility {

    public static getNumberRange(start: number, end: number): number[] {
        if (start > end) {
            throw new Error('Starting number must not exceed ending number.');
        }

        return new Array(end - start + 1).fill(0).map((_, i) => start + i);
    }
}
