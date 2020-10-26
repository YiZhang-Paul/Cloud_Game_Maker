export class FileUtility {

    public static handleDuplicateName(existing: string[], name: string): string {
        const regex = new RegExp(`^${name}(\s\(\d+\)$)?`);
        const conflicts = existing.map(_ => _.trim()).filter(_ => regex.test(_));

        if (!conflicts.length) {
            return name;
        }

        const values = conflicts.map(_ => {
            const value = _.replace(/^.*\((\d+)\)$/g, '$1');
            const parsed = parseInt(value, 2);

            return isNaN(parsed) ? 0 : parsed;
        });

        return `${name} (${Math.max(...values) + 1})`;
    }
}
