export class GenericUtility {

    public static getValueRange(start: number, end: number): number[] {
        if (start > end) {
            throw new Error('Starting value must not exceed ending value.');
        }

        return new Array(end - start + 1).fill(0).map((_, i) => start + i);
    }

    public static limitValue(value: number, min: number, max: number): number {
        if (min > max) {
            throw new Error('Minimum value must not exceed maximum value.');
        }

        return Math.max(min, Math.min(max, value));
    }

    public static replaceAt<T>(elements: T[], element: T, index: number): T[] {
        if (index < 0 || index > elements.length - 1) {
            return elements;
        }

        return [...elements.slice(0, index), element, ...elements.slice(index + 1)];
    }
}
