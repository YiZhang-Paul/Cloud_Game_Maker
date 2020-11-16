import { Camera2D } from '../camera-2d/camera-2d';

export class EditorCamera2D extends Camera2D {

    public drawGridLines(id: string): void {
        const canvas = this.getCanvas(id);
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'rgb(0, 255, 0)';

        for (let i = 0; i <= this._renderColumns; ++i) {
            const x = i * this._scale;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
            context.stroke();
        }

        for (let i = 0; i <= this._renderRows; ++i) {
            const y = i * this._scale;
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvas.width, y);
            context.stroke();
        }
    }

    public highlightGrid(left: number, top: number, id: string): void {
        const canvas = this.getCanvas(id);
        const context = canvas.getContext('2d');
        const row = Math.floor((this.position.y + top) / this._scale);
        const column = Math.floor((this.position.x + left) / this._scale);
        context.strokeStyle = 'rgb(255, 255, 0)';
        context.strokeRect(column * this._scale, row * this._scale, this._scale, this._scale);
    }
}
