import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-personal-details',
    templateUrl: './personal-details.component.html',
    styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

    PersonalDetails!: FormGroup;
    EmergencyDetailsForm!: FormGroup;
    NomineeDetailsForm!: FormGroup;

    BloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other']
    categories = ['CJ/DT, NT-A', 'NT-B', 'NT-C', 'NT-D', 'OBC', 'SC', 'ST', 'SBC', 'OPEN', 'Person With Disability']

    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit(): void {

        this.PersonalDetails = this._formBuilder.group({
            dateOfBirth: ['', Validators.required],
            bloodGroup: ['', Validators.required],
            gender: ['', Validators.required],
            caste: ['', Validators.required],
            castevalidity: ['', Validators.required],
            creamylayer: ['', Validators.required],
            religion: ['', Validators.required],
            category: ['', Validators.required],
            maritalStatus: ['', Validators.required],
            noOfChildrenMale: ['', Validators.required],
            noOfChildrenFemale: ['', Validators.required],
        });

        this.EmergencyDetailsForm = this._formBuilder.group({
            Name: [''],
            Address: [''],
            Mobile: [''],
        });

        this.NomineeDetailsForm = this._formBuilder.group({
            NomineeName: [''],
            NomineeAddress: [''],
            NomineeMobile: [''],
        });
    }
}