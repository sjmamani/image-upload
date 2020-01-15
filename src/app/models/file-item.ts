export class FileItem {

    public file: File;
    public name: string;
    public url: string;
    public isUploading: boolean;
    public progress: number;

    constructor(file: File) {
        this.file = file;
        this.name = file.name;
        this.isUploading = false;
        this.progress = 0;
    }
}
