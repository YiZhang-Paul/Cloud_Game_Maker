export class Point {
    public x = 0;
    public y = 0;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    public static add(a: Point, b: Point): Point {
        return new Point(a.x + b.x, a.y + b.y);
    }
}
