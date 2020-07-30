import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PhotoUploadService } from 'src/app/services/photo-upload.service';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styles: [],
})
export class PhotoComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(
    private readonly afs: AngularFirestore,
    public photoUploadService: PhotoUploadService
  ) {
    this.itemsCollection = afs.collection<Item>('img');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Item;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  ngOnInit() {}

  deleteItem(item: Item) {
    this.photoUploadService.deleteImageFromStorage(item);
  }
}
