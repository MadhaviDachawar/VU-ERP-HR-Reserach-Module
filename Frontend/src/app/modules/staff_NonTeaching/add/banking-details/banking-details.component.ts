import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface BankAccount {
    AccountNumber: string;
    BankNameWithBranch: string;
    Remarks: string;
}

@Component({
    selector: 'app-banking-details',
    templateUrl: './banking-details.component.html',
    styleUrls: ['./banking-details.component.scss'],
})
export class BankingDetailsComponent implements OnInit {
    BankingDetails!: FormGroup;
    displayedColumns: string[] = [
        'AccountNumber',
        'BankNameWithBranch',
        'Remarks',
        'Edit',
        'Delete',
    ];
    dataSource: MatTableDataSource<BankAccount>;
    editPosition: number | undefined = undefined;

    constructor(private _formBuilder: FormBuilder) {
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.BankingDetails = this._formBuilder.group({
            AccountNumber: [''],
            BankNameWithBranch: [''],
            Remarks: [''],
        });
    }

    editOtherInformation(pos: number): void {
        this.editPosition = pos;
        let info = this.dataSource.data[this.editPosition];
        this.BankingDetails = this.BankingDetails.value
    }

    addOtherInformation() {
        const newRow: BankAccount = {
            BankNameWithBranch: this.BankingDetails.controls.BankNameWithBranch.value,
            AccountNumber: this.BankingDetails.controls.AccountNumber.value,
            Remarks: this.BankingDetails.controls.Remarks.value,
        };
        if (this.editPosition !== undefined) {
            this.dataSource.data[this.editPosition] = { ...newRow };
            this.editPosition = undefined;
        } else {
            this.dataSource.data.push(newRow);
        }
        this.dataSource.filter = '';
        this.BankingDetails.reset();
    }

    deleteOtherInformation(rowID: number) {
        this.dataSource.data.splice(rowID, 1);
        this.dataSource.filter = '';
    }
}
