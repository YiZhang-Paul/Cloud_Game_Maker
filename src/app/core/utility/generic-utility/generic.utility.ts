export class GenericUtility {

    public static replaceAt<T>(elements: T[], element: T, index: number): T[] {
        if (index < 0 || index > elements.length - 1) {
            return elements;
        }

        return [...elements.slice(0, index), element, ...elements.slice(index + 1)];
    }
}
