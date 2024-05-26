import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDoc,
  addDoc,
  DocumentReference,
  DocumentSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { inject } from '@angular/core';
import { Item } from '../../model/item.model';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private firestore: Firestore = inject(Firestore);
  private itemsCollectionReference = collection(this.firestore, 'items');
  public items$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  public itemError: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public itemLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private readonly SUBTRACT: string = 'SUBTRACT';
  private readonly ADD: string = 'ADD';

  constructor(private router: Router) {}

  // Create items
  public async createNewItemAndAppendToItems(newItem: Item): Promise<void> {
    if (!newItem) return;
    const newlyCreatedItem: Item = await this.createNewItem(
      JSON.parse(JSON.stringify(newItem))
    );
    const existingItems: Item[] = this.items$.value;
    existingItems.push(newlyCreatedItem);
    this.items$.next(existingItems);
  }

  private async createNewItem(newItem: Item): Promise<Item> {
    const createdItemReference = await addDoc(
      this.itemsCollectionReference,
      newItem
    );
    const data = await getDoc(createdItemReference);
    return { ...(data.data() as Item), id: data.id };
  }

  // Read items
  public async getAllItems(): Promise<void> {
    const itemsWithIds: Item[] = [];
    (await getDocs(query(this.itemsCollectionReference))).docs.map((item) => {
      const itemWithId = { ...item.data(), id: item.id };
      itemsWithIds.push(itemWithId as Item);
    });
    this.items$.next(itemsWithIds);
  }

  public async getItemById(id: string): Promise<Item> {
    const documentSnapshot: DocumentSnapshot = await getDoc(
      doc(this.firestore, 'items', id)
    );
    const itemData: Item = {
      ...(documentSnapshot.data() as Item),
      id: documentSnapshot.id,
    };
    return itemData;
  }

  // Update items
  public async updateItemById(updatedItem: Item): Promise<void> {
    await updateDoc(doc(this.firestore, 'items', updatedItem.id as string), {
      ...updatedItem,
    });
  }

  public async deleteItemById(itemIdToDelete: string): Promise<void> {
    const documentReference: DocumentReference = doc(
      this.firestore,
      'items',
      itemIdToDelete
    );
    const document = await getDoc(documentReference);
    if (document.exists()) {
      await deleteDoc(documentReference);
      const updatedItems: Item[] =
        this.removeDeletedItemFromExistingItems(itemIdToDelete);
      this.items$.next(updatedItems);
    } else {
      console.error(
        'Something went wrong trying to delete item with id: ',
        itemIdToDelete
      );
    }
  }

  // Destroy items
  private removeDeletedItemFromExistingItems(itemIdToDelete: string): Item[] {
    const existingItems: Item[] = this.items$.value;
    const filteredItems = existingItems.filter(
      (item: Item) => item?.id !== itemIdToDelete
    );
    return filteredItems;
  }

  public async adjustCurrentQuantityByGivenAmount(
    updatedQuantity: number,
    item: Item
  ): Promise<void> {
    await updateDoc(doc(this.firestore, 'items', item.id as string), {
      ...item,
      currentQuantity: updatedQuantity,
      lastUsed: new Date().toString(),
    });
  }

  public sortItems(items: Item[]): Item[] {
    return _.sortBy(items, (item): string => {
      return item.name;
    });
  }
}
