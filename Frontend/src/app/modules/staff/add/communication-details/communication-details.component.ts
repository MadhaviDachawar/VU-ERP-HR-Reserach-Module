import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export interface Address {
    AddressType: string;
    HouseFlatNo: string;
    StreetName: string;
    LocationLandmark: string;
    Pincode: number;
    State: string;
    District: string;
    Tehsil: string;
    VillageTown: string;
}

@Component({
    selector: 'app-communication-details',
    templateUrl: './communication-details.component.html',
    styleUrls: ['./communication-details.component.scss']
})
export class CommunicationDetailsComponent implements OnInit {

    displayedColumns: string[] = [
        'AddressType',
        'HouseFlatNo',
        'StreetName',
        'LocationLandmark',
        'Pincode',
        'State',
        'District',
        'Tehsil',
        'VillageTown',
        'Edit',
        'Delete'
    ];

    dataSource: MatTableDataSource<Address>;
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    CommunicationDetails!: FormGroup;
    AddressForm!: FormGroup;
    editPosition: number | undefined = undefined;

    constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
        this.dataSource = new MatTableDataSource([]);

        this.CommunicationDetails = this._formBuilder.group({
            VUEmailID: ['', Validators.required],
        });

        this.AddressForm = this._formBuilder.group({
            AddressType: [''],
            HouseFlatNo: [''],
            StreetName: [''],
            LocationLandmark: [''],
            Pincode: [''],
            State: [''],
            District: [''],
            Tehsil: [''],
            VillageTown: [''],
        });
    }

    ngOnInit(): void { }

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    mobileNumbers: string[] = [];
    emailIDs: string[] = [];

    openSnackBar(message: string) {

        let snackBarRef = this._snackBar.open(message, 'OKAY', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000
        });
        snackBarRef.onAction().subscribe(() => {
            console.log('The snack-bar action was triggered!');
        });
    }

    editAddress(pos: number): void {
        this.editPosition = pos;
        let address = this.dataSource.data[this.editPosition];
        this.AddressForm = this._formBuilder.group({
            AddressType: [address.AddressType],
            HouseFlatNo: [address.HouseFlatNo],
            StreetName: [address.StreetName],
            LocationLandmark: [address.LocationLandmark],
            Pincode: [address.Pincode],
            State: [address.State],
            District: [address.District],
            Tehsil: [address.Tehsil],
            VillageTown: [address.VillageTown],
        });
    }

    addMobileNumber(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value) {
            if (Number(value) && value.length == 10) {

                if (!this.mobileNumbers.includes(value))
                    this.mobileNumbers.push(value);
                else
                    this.openSnackBar('Mobile Number entered already exists!')
            }
            else {
                this.openSnackBar('Invalid Mobile Number Entered!')
            }
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    removeMobileNumber(number): void {
        const index = this.mobileNumbers.indexOf(number);

        if (index >= 0) {
            this.mobileNumbers.splice(index, 1);
        }
    }

    public get mobiles(): string[] {
        return [...this.mobileNumbers];
    }

    addEmail(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value) {
            this.emailIDs.push(value);
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    removeEmail(email: any): void {
        const index = this.emailIDs.indexOf(email);

        if (index >= 0) {
            this.emailIDs.splice(index, 1);
        }
    }

    public get emails(): string[] {
        return [...this.emailIDs];
    }

    addAddress() {
        const newRow: Address = {
            AddressType: this.AddressForm.controls.AddressType.value,
            HouseFlatNo: this.AddressForm.controls.HouseFlatNo.value,
            StreetName: this.AddressForm.controls.StreetName.value,
            LocationLandmark: this.AddressForm.controls.LocationLandmark.value,
            Pincode: this.AddressForm.controls.Pincode.value,
            State: this.AddressForm.controls.State.value,
            District: this.AddressForm.controls.District.value,
            Tehsil: this.AddressForm.controls.Tehsil.value,
            VillageTown: this.AddressForm.controls.VillageTown.value
        };
        if (this.editPosition !== undefined) {
            this.dataSource.data[this.editPosition] = { ...newRow };
            this.editPosition = undefined;
        } else {
            this.dataSource.data.push(newRow);
        }

        this.dataSource.filter = "";
        this.AddressForm.reset();
    }

    deleteAddress(rowID: number) {
        this.dataSource.data.splice(rowID, 1);
        this.dataSource.filter = "";
    }

    checkData() {
        // console.log(this.CommunicationDetails.value)
        // console.log(this.CommunicationDetails.valid)
    }

}