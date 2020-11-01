export class FileUtility {

    public static base64ToBlob(base64: string, type = 'text'): Blob {
        const characters = atob(base64.replace(/^[^,]*,/g, ''));
        const bytes = new Array(characters.length);

        for (let i = 0; i < characters.length; ++i) {
            bytes[i] = characters.charCodeAt(i);
        }

        return new Blob([new Uint8Array(bytes)], { type });
    }

    public static handleDuplicateName(existing: string[], name: string): string {
        const regex = new RegExp(`^${name}(\s\(\d+\)$)?`);
        const conflicts = existing.map(_ => _.trim()).filter(_ => regex.test(_));

        if (!conflicts.length) {
            return name;
        }

        const values = conflicts.map(_ => {
            const value = _.replace(/^.*\((\d+)\)$/g, '$1');
            const parsed = parseInt(value, 10);

            return isNaN(parsed) ? 0 : parsed;
        });

        return `${name} (${Math.max(...values) + 1})`;
    }
}
