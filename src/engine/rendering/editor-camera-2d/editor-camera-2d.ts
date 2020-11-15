import { Camera2D } from '../camera-2d/camera-2d';

export class EditorCamera2D extends Camera2D {

    public drawGridLines(): void {
        const canvas = this.getCanvas('grid-line-layer');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'rgb(0, 255, 0)';

        for (let i = 0; i < this._renderColumns; ++i) {
            const x = i * this._scale;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
            context.stroke();
        }

        for (let i = 0; i < this._renderRows; ++i) {
            const y = i * this._scale;
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvas.width, y);
            context.stroke();
        }
    }
}
