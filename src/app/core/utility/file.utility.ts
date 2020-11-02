export class FileUtility {

    public static base64ToBlob(base64: string, type = 'text'): Blob {
        const characters = atob(base64.replace(/^[^,]*,/g, ''));
        const bytes = new Array(characters.length);

        for (let i = 0; i < characters.length; ++i) {
            bytes[i] = characters.charCodeAt(i);
        }

        return new Blob([new Uint8Array(bytes)], { type });
    }

    public static handleDuplicateName(existing: string[], name: string, prefix = ' (', suffix = ')'): string {
        const prefixPattern = this.escape(prefix ?? '');
        const suffixPattern = this.escape(suffix ?? '');
        const nameRegex = new RegExp(`^${name}(${prefixPattern}\\d+${suffixPattern})?$`);
        const valueRegex = new RegExp(`^.*${prefixPattern}(\\d+)${suffixPattern}$`);
        const conflicts = existing.map(_ => _.trim()).filter(_ => nameRegex.test(_));

        if (!conflicts.length) {
            return name;
        }

        const values = conflicts.map(_ => {
            const value = _.replace(valueRegex, '$1');
            const parsed = parseInt(value, 10);

            return isNaN(parsed) ? 0 : parsed;
        });

        return `${name}${prefix ?? ''}${Math.max(...values) + 1}${suffix ?? ''}`;
    }

    private static escape(text: string): string {
        return text.replace(/(\\|\^|\$|\*|\+|\?|\.|\(|\)|\||\{|\}|\[|\])/g, '\\' + '$1');
    }
}
