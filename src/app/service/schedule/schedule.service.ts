import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Schedule } from '../../model/schedule.model';
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { Topic } from '../../model/topic.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private firestore: Firestore = inject(Firestore);
  private schedulesCollectionReference: CollectionReference<
    DocumentData,
    DocumentData
  > = collection(this.firestore, 'schedules');
  public schedules$: BehaviorSubject<Schedule[]> = new BehaviorSubject<
    Schedule[]
  >([]);

  constructor() {}

  public async getAllSchedules(): Promise<void> {
    const schedulesWithIds: Schedule[] = [];
    (await getDocs(query(this.schedulesCollectionReference))).docs.map(
      (schedule) => {
        const scheduleWithId = {
          ...schedule.data(),
          id: schedule.id,
          topics: this.getTopicById(schedule.data()['topics']),
        };
        schedulesWithIds.push(scheduleWithId as Schedule);
      }
    );
    this.schedules$.next(schedulesWithIds);
  }

  private getTopicById(topicIds: string[]): Topic[] {
    const topics: Topic[] = [];
    topicIds.forEach(async (id) => {
      const documentSnapshot: DocumentSnapshot = await getDoc(
        doc(this.firestore, 'topics', id)
      );
      const topicData: Topic = {
        ...(documentSnapshot.data() as Topic),
        id: documentSnapshot.id,
      };
      if (topicData.active) {
        topics.push(topicData);
      }
    });
    return topics;
  }
}
