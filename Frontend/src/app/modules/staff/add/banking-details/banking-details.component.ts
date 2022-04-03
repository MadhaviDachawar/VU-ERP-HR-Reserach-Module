import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface BankAccount {
    bankName: string;
    accountNumber: number;
    branch: string;
    ifsc: string;
    nominee: string;
}

@Component({
    selector: 'app-banking-details',
    templateUrl: './banking-details.component.html',
    styleUrls: ['./banking-details.component.scss'],
})
export class BankingDetailsComponent implements OnInit {
    BankingDetails!: FormGroup;
    displayedColumns: string[] = [
        'BankName',
        'AccountNumber',
        'Branch',
        'IFSC',
        'Nominee',
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
            BankName: [''],
            AccountNumber: [''],
            Branch: [''],
            IFSC: [''],
            Nominee: [''],
        });
    }

    editOtherInformation(pos: number): void {
        this.editPosition = pos;
        let info = this.dataSource.data[this.editPosition];
        this.BankingDetails = this.BankingDetails.value
    }

    addOtherInformation() {
        const newRow: BankAccount = {
            bankName: this.BankingDetails.controls.BankName.value,
            accountNumber: this.BankingDetails.controls.AccountNumber.value,
            branch: this.BankingDetails.controls.Branch.value,
            ifsc: this.BankingDetails.controls.IFSC.value,
            nominee: this.BankingDetails.controls.Nominee.value,
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
