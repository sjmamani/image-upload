import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() files: FileItem[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseOver.emit(true);
    this.preventAndStop(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseOver.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const dataTransfer = this.getDataTransfer(event);
    if (!dataTransfer) {
      return;
    }
    this.extractFiles(dataTransfer.files);
    this.preventAndStop(event);
    this.mouseOver.emit(false);
  }

  private getDataTransfer(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extractFiles(fileList: FileList) {
    // tslint:disable-next-line: forin
    for (const property in Object.getOwnPropertyNames(fileList)) {
      const tempFile = fileList[property];
      if (this.canBeUploaded(tempFile)) {
        const newFile = new FileItem(tempFile);
        this.files.push(newFile);
      }
    }
    console.log(this.files);
  }

  // Validators
  private canBeUploaded(file: File): boolean {
    if (!this.alreadyDropped(file.name) && this.isImage(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * This function prevents image to be open by default by the browser
   * when dropping
   */
  private preventAndStop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private alreadyDropped(fileName: string): boolean {
    for (const file of this.files) {
      if (file.name === fileName) {
        console.log(`The file ${fileName} was already dropped`);
        return true;
      }
    }
    return false;
  }

  private isImage(fileType: string): boolean {
    return (fileType === '' || fileType === undefined) ? false : fileType.startsWith('image');
  }
}
