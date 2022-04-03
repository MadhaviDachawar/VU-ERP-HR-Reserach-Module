import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface EmergencyDetails {
    Name: string;
    Relation: string;
    Mobile: number;
    Email: string;
    Address: string;
}

export interface SpouseDetails {
    Name: string;
    Working: string;
    Company: string;
    Email: string;
    Mobile: number;
}

export interface IDMOVGI {
    AccidentClaim: string;
    MediClaim: string;
    TermInsurance: string;
    VUAccidentClaim: string;
    VUMediClaim: string;
    VUTermInsurance: string;
}

@Component({
    selector: 'app-personal-details',
    templateUrl: './personal-details.component.html',
    styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

    emergencyEdit: undefined | number = undefined;
    spouseEdit: undefined | number = undefined;
    PersonalDetails!: FormGroup;
    EmergencyDetailsForm!: FormGroup;
    EmergencyDetailsCols: string[] = ["Name", "Relation", "Mobile", "Email", "Address", "Edit", "Delete"];
    EmergencyDetailsDataSource: MatTableDataSource<EmergencyDetails>;

    SpouseDetailsForm!: FormGroup;
    SpouseDetailsCols: string[] = ["Name", "Working", "Company", "Email", "Mobile", "Edit", "Delete"];
    SpouseDetailsDataSource: MatTableDataSource<SpouseDetails>;

    IDMOVGITableData: IDMOVGI[] = [
        {
            AccidentClaim: 'No',
            MediClaim: 'No',
            TermInsurance: 'No',
            VUAccidentClaim: 'No',
            VUMediClaim: 'No',
            VUTermInsurance: 'No',
        }];

    IDMOVGIDataSource: MatTableDataSource<IDMOVGI>;
    IDMOVGICols: string[] = ['InsuranceDetails', 'MemberOfVUGroupInsurance'];

    accidentClaim = new FormControl(false)
    mediClaim = new FormControl(false)
    termInsurance = new FormControl(false)
    VUAccidentClaim = new FormControl(false)
    VUMediClaim = new FormControl(false)
    VUTermInsurance = new FormControl(false)

    BloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other']
    categories = ['CJ/DT, NT-A', 'NT-B', 'NT-C', 'NT-D', 'OBC', 'SC', 'ST', 'SBC', 'OPEN', 'Person With Disability']

    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit(): void {

        this.PersonalDetails = this._formBuilder.group({
            bloodGroup: ['', Validators.required],
            gender: ['', Validators.required],
            caste: ['', Validators.required],
            religion: ['', Validators.required],
            category: ['', Validators.required],
            maritalStatus: ['', Validators.required],
            noOfChildren: ['0', Validators.required],
        });

        this.EmergencyDetailsForm = this._formBuilder.group({
            Name: [''],
            Relation: [''],
            Mobile: [''],
            Email: [''],
            Address: [''],
        });

        this.EmergencyDetailsDataSource = new MatTableDataSource([]);

        this.SpouseDetailsForm = this._formBuilder.group({
            Name: [''],
            Working: [''],
            Company: [''],
            Email: [''],
            Mobile: [''],
        });

        this.SpouseDetailsDataSource = new MatTableDataSource([]);
        this.IDMOVGIDataSource = new MatTableDataSource(this.IDMOVGITableData);
    }

    editEmergencyDetails(pos: number) {
        this.emergencyEdit = pos;
        let s = this.EmergencyDetailsDataSource.data[pos];
        this.EmergencyDetailsForm = this._formBuilder.group({
            Name: [s.Name],
            Relation: [s.Relation],
            Mobile: [s.Mobile],
            Email: [s.Email],
            Address: [s.Address],
        });
    }

    addEmergencyDetail() {
        const newRow: EmergencyDetails = {
            Name: this.EmergencyDetailsForm.controls.Name.value,
            Relation: this.EmergencyDetailsForm.controls.Relation.value,
            Mobile: this.EmergencyDetailsForm.controls.Mobile.value,
            Email: this.EmergencyDetailsForm.controls.Email.value,
            Address: this.EmergencyDetailsForm.controls.Address.value
        };
        if (this.emergencyEdit !== undefined) {
            this.EmergencyDetailsDataSource.data[this.emergencyEdit] = { ...newRow };
            this.emergencyEdit = undefined;
        } else {
            this.EmergencyDetailsDataSource.data.push(newRow);
        }
        this.EmergencyDetailsDataSource.filter = ""
        this.EmergencyDetailsForm.reset();
    }

    deleteEmergencyDetail(rowID: number) {
        this.EmergencyDetailsDataSource.data.splice(rowID, 1)
        this.EmergencyDetailsDataSource.filter = ""
    }

    editSpouseDetails(pos: number) {
        this.spouseEdit = pos;
        let s = this.SpouseDetailsDataSource.data[pos];
        this.SpouseDetailsForm = this._formBuilder.group({
            Name: [s.Name],
            Working: [s.Working],
            Company: [s.Company],
            Email: [s.Email],
            Mobile: [s.Mobile],
        });
    }

    addSpouseDetail() {
        const newRow: SpouseDetails = {
            Name: this.SpouseDetailsForm.controls.Name.value,
            Working: this.SpouseDetailsForm.controls.Working.value,
            Company: this.SpouseDetailsForm.controls.Company.value,
            Email: this.SpouseDetailsForm.controls.Email.value,
            Mobile: this.SpouseDetailsForm.controls.Mobile.value
        };
        if (this.spouseEdit !== undefined) {
            this.SpouseDetailsDataSource.data[this.spouseEdit] = { ...newRow };
            this.spouseEdit = undefined;
        } else {
            this.SpouseDetailsDataSource.data.push(newRow);
        }
        this.SpouseDetailsDataSource.filter = ""
        this.SpouseDetailsForm.reset();
    }

    deleteSpouseDetail(rowID: number) {
        this.SpouseDetailsDataSource.data.splice(rowID, 1)
        this.SpouseDetailsDataSource.filter = ""
    }

}