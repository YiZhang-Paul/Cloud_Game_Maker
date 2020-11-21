export class ConfirmActionOption<T> {
    public text: string;
    public value: T;

    constructor(text: string, value: T) {
        this.text = text;
        this.value = value;
    }
}
