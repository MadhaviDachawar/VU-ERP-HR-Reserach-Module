import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import {
    MatSnackBar,
} from '@angular/material/snack-bar';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationServiceService } from 'src/app/common/services/notification/notification-service.service';
import { TitleServiceService } from 'src/app/common/services/title/title-service.service';

export interface timeTable {
    timeFrom: number;
    timeTo: number;
    time: string;
    monday: Array<string>;
    tuesday: Array<string>;
    wednesday: Array<string>;
    thursday: Array<string>;
    friday: Array<string>;
    saturday: Array<string>;
}

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {

    tableData: timeTable[] = [];
    displayedColumns: string[] = [
        "time", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", 'delete'
    ];
    dataSource: MatTableDataSource<timeTable>;
    addSlotForm: FormGroup

    todo = [
        'Discrete Mathematics',
        'Engineering Mathematics - I',
        'Computer Graphics',
        'Database Management Systems',
        'Database Management Systems',
        'Database Management Systems',
        'Business Analytics',
        'Business Analytics',
        'Systems Programming',
        'Systems Programming',
        'Compiler Design',
        'Compiler Design',
        'Compiler Design',
    ];

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }

    constructor(
        private _formBuilder: FormBuilder,
        private titleService: TitleServiceService,
        private notificationService: NotificationServiceService,
    ) {
        this.dataSource = new MatTableDataSource(this.tableData);

        this.addSlotForm = this._formBuilder.group({
            timeFrom: [''],
            timeTo: ['']
        })
    }

    ngOnInit(): void {
        this.titleService.setTitle("Timetable Create");
    }

    addSlot() {

        let timeFrom = new Date()
        let timeTo = new Date()
        timeFrom.setHours(this.addSlotForm.controls.timeFrom.value.split(':')[0])
        timeFrom.setMinutes(this.addSlotForm.controls.timeFrom.value.split(':')[1])
        timeFrom.setSeconds(0)
        timeFrom.setMilliseconds(0)
        timeTo.setHours(this.addSlotForm.controls.timeTo.value.split(':')[0])
        timeTo.setMinutes(this.addSlotForm.controls.timeTo.value.split(':')[1])
        timeTo.setSeconds(0)
        timeTo.setMilliseconds(0)

        if (this.addSlotForm.controls.timeFrom.value == "" || this.addSlotForm.controls.timeTo.value == "") {
            this.notificationService.error("Time can not be empty!")
        }
        else if (timeFrom.getTime() > timeTo.getTime()) {
            this.notificationService.error("End time can not be less than Start time!")
        }
        else if (timeFrom.getTime() == timeTo.getTime()) {
            this.notificationService.error("Start time can not be same as End Time!")
        }
        else {
            var overflowElement: any

            if (this.dataSource.data.find(item => { return timeFrom.getTime() < item.timeTo }))
                overflowElement = this.dataSource.data.find(item => { return timeFrom.getTime() < item.timeTo })

            if (overflowElement != null && timeTo.getTime() > overflowElement.timeFrom) {
                this.notificationService.error("Start time can not be same as End Time!")

                document.getElementById('timeTo').focus()
            }
            else {

                var compiledTime = ""

                if (timeFrom.getHours() > 12) {
                    let subtractedTime = timeFrom.getHours() - 12
                    compiledTime += subtractedTime + ':' + (timeFrom.getMinutes() < 10 ? '0' + timeFrom.getMinutes() : timeFrom.getMinutes()) + "PM"
                }
                else {
                    if (timeFrom.getHours() == 0) {
                        compiledTime += '12' + ':' + (timeFrom.getMinutes() < 10 ? '0' + timeFrom.getMinutes() : timeFrom.getMinutes()) + "AM"
                    }
                    else if (timeFrom.getHours() == 12) {
                        compiledTime += '12' + ':' + (timeFrom.getMinutes() < 10 ? '0' + timeFrom.getMinutes() : timeFrom.getMinutes()) + "PM"
                    }
                    else {
                        compiledTime += timeFrom.getHours() + ':' + (timeFrom.getMinutes() < 10 ? '0' + timeFrom.getMinutes() : timeFrom.getMinutes()) + "AM"
                    }
                }

                compiledTime += ' - '

                if (timeTo.getHours() > 12) {
                    let subtractedTime = timeTo.getHours() - 12
                    compiledTime += subtractedTime + ':' + (timeTo.getMinutes() < 10 ? '0' + timeTo.getMinutes() : timeTo.getMinutes()) + "PM"
                }
                else {
                    if (timeTo.getHours() == 0) {
                        compiledTime += '12' + ':' + (timeTo.getMinutes() < 10 ? '0' + timeTo.getMinutes() : timeTo.getMinutes()) + "AM"
                    }
                    else if (timeTo.getHours() == 12) {
                        compiledTime += '12' + ':' + (timeTo.getMinutes() < 10 ? '0' + timeTo.getMinutes() : timeTo.getMinutes()) + "PM"
                    }
                    else {
                        compiledTime += timeTo.getHours() + ':' + (timeTo.getMinutes() < 10 ? '0' + timeTo.getMinutes() : timeTo.getMinutes()) + "AM"
                    }
                }

                const newRow: timeTable = {
                    timeFrom: timeFrom.getTime(),
                    timeTo: timeTo.getTime(),
                    time: compiledTime,
                    monday: [],
                    tuesday: [],
                    wednesday: [],
                    thursday: [],
                    friday: [],
                    saturday: [],
                };
                // console.log(newRow)
                this.dataSource.data.push(newRow)
                this.dataSource.data.sort((a, b) => { return a.timeFrom - b.timeFrom })
                this.dataSource.filter = ""
                this.addSlotForm.reset()
                document.getElementById('timeTo').focus()
            }
        }
    }

    delete(timeFrom) {
        let rowToDelete = this.dataSource.data.find(item => { return item.timeFrom == timeFrom })
        if (rowToDelete.monday.length > 0)
            this.todo.push(rowToDelete.monday[0])
        if (rowToDelete.tuesday.length > 0)
            this.todo.push(rowToDelete.tuesday[0])
        if (rowToDelete.wednesday.length > 0)
            this.todo.push(rowToDelete.wednesday[0])
        if (rowToDelete.thursday.length > 0)
            this.todo.push(rowToDelete.thursday[0])
        if (rowToDelete.friday.length > 0)
            this.todo.push(rowToDelete.friday[0])
        if (rowToDelete.saturday.length > 0)
            this.todo.push(rowToDelete.saturday[0])

        let indexToDelete = this.dataSource.data.indexOf(this.dataSource.data.find(item => { return item.timeFrom == timeFrom }))
        this.dataSource.data.splice(indexToDelete, 1)
        this.dataSource.filter = ""
    }
}