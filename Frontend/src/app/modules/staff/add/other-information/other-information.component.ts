import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface TypeOfInformationInterface {
    Type: string;
    Details: string;
    Remarks: string;
}

@Component({
    selector: 'app-other-information',
    templateUrl: './other-information.component.html',
    styleUrls: ['./other-information.component.scss']
})
export class OtherInformationComponent implements OnInit {

    OtherInformation!: FormGroup;

    displayedColumns: string[] = ['Type', 'Details', 'Remarks', 'Edit', 'Delete'];
    dataSource: MatTableDataSource<TypeOfInformationInterface>;
    editPosition: number | undefined = undefined;

    constructor(private _formBuilder: FormBuilder) {
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.OtherInformation = this._formBuilder.group({
            TypeOfInformation: [''],
            TypeOfInformationDetails: [''],
            Remarks: [''],
        });
    }

    editOtherInformation(pos: number): void {
        this.editPosition = pos;
        let other: TypeOfInformationInterface = this.dataSource.data[this.editPosition];
        this.OtherInformation = this._formBuilder.group({
            TypeOfInformation: [other.Type],
            TypeOfInformationDetails: [other.Details],
            Remarks: [other.Remarks],
        });
    }

    addOtherInformation() {
        const newRow: TypeOfInformationInterface = {
            Type: this.OtherInformation.controls.TypeOfInformation.value,
            Details: this.OtherInformation.controls.TypeOfInformationDetails.value,
            Remarks: this.OtherInformation.controls.Remarks.value
        };
        if (this.editPosition !== undefined) {
            this.dataSource.data[this.editPosition] = { ...newRow };
            this.editPosition = undefined;
        } else {
            this.dataSource.data.push(newRow);
        }
        this.dataSource.filter = "";
        this.OtherInformation.reset();
    }

    deleteOtherInformation(rowID: number) {
        this.dataSource.data.splice(rowID, 1)
        this.dataSource.filter = ""
    }

}