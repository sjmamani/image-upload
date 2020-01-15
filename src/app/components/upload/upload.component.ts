import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { PhotoUploadService } from 'src/app/services/photo-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {

  files: FileItem[] = [];
  isOverDrop = false;

  constructor(public photoUploadService: PhotoUploadService) { }

  ngOnInit() {
  }

  upload() {
    this.photoUploadService.uploadImages(this.files);
  }

}
