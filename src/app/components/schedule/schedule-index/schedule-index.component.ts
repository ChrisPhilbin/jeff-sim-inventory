import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../../model/schedule.model';
import { ScheduleService } from '../../../service/schedule/schedule.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { LoadingComponent } from '../../common/loading/loading.component';
import { Topic } from '../../../model/topic.model';

@Component({
  selector: 'app-schedule-index',
  standalone: true,
  imports: [CommonModule, TableModule, LoadingComponent],
  templateUrl: './schedule-index.component.html',
  styleUrl: './schedule-index.component.scss',
})
export class ScheduleIndexComponent implements OnInit {
  public schedules: Schedule[] = [];

  constructor(private scheduleService: ScheduleService) {}

  public ngOnInit(): void {
    this.scheduleService.schedules$.subscribe((schedules: Schedule[]): void => {
      if (schedules) {
        this.schedules = schedules;
        console.log(this.schedules);
      }
    });

    this.scheduleService.getAllSchedules();
  }

  navigateToCreateSchedule(): void {
    return;
  }

  navigateToSchedule(scheduleId: string): void {
    return;
  }

  generateListOfTopicNames(topics: Topic[]): string {
    let topicString: string = '';
    if (topics && topics.length) {
      topics.forEach((topic, i, array) => {
        if (i === array.length - 1) {
          topicString += `${topic.name}`;
        } else {
          topicString += `${topic.name}, `;
        }
      });
    }
    return topicString;
  }
}
