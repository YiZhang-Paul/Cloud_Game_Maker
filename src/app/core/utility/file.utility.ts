export class FileUtility {

    public static async toBase64(file: Blob): Promise<string> {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise(resolve => {
            reader.onload = () => {
                const base64 = reader.result as string;
                resolve(base64.split(',')[1]);
            };
        });
    }
}
