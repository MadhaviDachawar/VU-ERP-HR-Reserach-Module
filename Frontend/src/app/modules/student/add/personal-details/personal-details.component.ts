import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/common/services/common/common.service';
import { MetaDataService } from 'src/app/common/services/metaData/meta-data.service';
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

export interface FamilyDetails {
    fullName: string;
    relation: string;
    profession: string;
    workExperience: string;
    companyName: string;
    mobile: number;
    email: string;
    address: string;
}

@Component({
    selector: 'app-personal-details',
    templateUrl: './personal-details.component.html',
    styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

    @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) nationalities: MatAutocompleteTrigger;

    familyEdit: undefined | number = undefined;
    PersonalDetails!: FormGroup;
    FamilyDetailsForm!: FormGroup;
    FamilyDetailsCols: string[] = ["fullName", "relation", "profession", "workExperience", "companyName", "mobile", "email", "address", "edit", "delete"];
    FamilyDetailsDataSource: MatTableDataSource<FamilyDetails>;

    BloodGroups = []
    religions = []

    internationalCategories = []
    mhCategories = []
    aiCategories = []

    countryList = []
    filteredCountryList: Observable<any[]>;

    statesOfIndia = []
    filteredStatesOfIndia: Observable<any[]>;

    categories = this.internationalCategories

    motherTongues = ['Hindi', 'Marathi', 'English', 'Konkani', 'Tamil', 'Telugu', 'Malayalam']

    constructor(
        private _formBuilder: FormBuilder,
        public commonService: CommonService,
        private metaDataService: MetaDataService
    ) {
        this.metaDataService.getMetaData(['bloodGroups', 'religions', 'internationalCategories', 'mhCategories', 'aiCategories', 'countryList', 'statesOfIndia']).subscribe(res => {
            this.BloodGroups = res.bloodGroups
            this.religions = res.religions
            this.internationalCategories = res.internationalCategories
            this.mhCategories = res.mhCategories
            this.aiCategories = res.aiCategories
            this.countryList = res.countryList
            this.statesOfIndia = res.statesOfIndia

            this.filteredCountryList = this.PersonalDetails.get('nationality').valueChanges.pipe(
                startWith(''),
                map(value => this.filterCountryList(value))
            );

            this.filteredStatesOfIndia = this.PersonalDetails.get('domicileState').valueChanges.pipe(
                startWith(''),
                map(value => this.filterStatesOfIndia(value))
            );
        })
    }

    private filterCountryList(value: string): string[] {
        if (value != null) {
            const filterValue = value.toLowerCase();
            return this.countryList.filter(option => option.name.toLowerCase().includes(filterValue));
        }
        else
            return this.countryList
    }

    private filterStatesOfIndia(value: string): string[] {
        if (value != null) {
            const filterValue = value.toLowerCase();
            return this.statesOfIndia.filter(option => option.toLowerCase().includes(filterValue));
        }
        else
            return this.statesOfIndia
    }

    resetNationality() {
        this.PersonalDetails.get('nationality').reset('');
        setTimeout(() => {
            this.nationalities.openPanel();
        }, 1);
    }

    ngOnInit(): void {

        this.PersonalDetails = this._formBuilder.group({
            bloodGroup: [''],
            motherTongue: [''],
            gender: ['', Validators.required],
            placeOfBirth: ['', Validators.required],
            nationality: ['', Validators.required],
            domicileState: ['', Validators.required],
            caste: [''],
            subCaste: [''],
            religion: ['', Validators.required],
            category: ['', Validators.required],
            admissionCategory: ['', Validators.required],
            maritalStatus: ['', Validators.required],
            noOfChildren: ['0', Validators.required],
            covidVaccinated: [false],
            physicalDisability: [false],
            physicalDisabilityPercentage: ['', Validators.required]
        });

        this.FamilyDetailsForm = this._formBuilder.group({
            fullName: ['', Validators.required],
            relation: ['', Validators.required],
            profession: ['', Validators.required],
            workExperience: ['', Validators.required],
            companyName: ['', Validators.required],
            annualIncome: ['', Validators.required],
            mobile: ['', Validators.required],
            email: ['', Validators.required],
            address: ['', Validators.required],
        });

        this.FamilyDetailsDataSource = new MatTableDataSource([]);

        this.PersonalDetails.get('nationality').valueChanges.subscribe(value => {
            this.PersonalDetails.get('domicileState').setValue(null)

            if (value.toLowerCase() == 'indian') {
                this.categories = this.aiCategories
            }
            else {
                this.categories = this.internationalCategories
            }
        })

        this.PersonalDetails.get('domicileState').valueChanges.subscribe(value => {
            if (!!value) {
                if (value.toLowerCase() == 'maharashtra') {
                    this.categories = this.mhCategories
                }
                else {
                    this.categories = this.aiCategories
                }
            }
            else {
                this.categories = this.aiCategories
            }
        })

    }

    editFamilyDetails(pos: number) {
        this.familyEdit = pos;
        // let s = this.FamilyDetailsDataSource.data[pos];
        this.FamilyDetailsForm.setValue(this.FamilyDetailsDataSource.data[pos]);
    }

    addFamilyDetail() {
        const newRow: FamilyDetails = this.FamilyDetailsForm.value
        if (this.familyEdit !== undefined) {
            this.FamilyDetailsDataSource.data[this.familyEdit] = { ...newRow };
            this.familyEdit = undefined;
        } else {
            this.FamilyDetailsDataSource.data.push(newRow);
        }
        this.FamilyDetailsDataSource.filter = ""
        this.FamilyDetailsForm.reset();
    }

    deleteFamilyDetail(rowID: number) {
        this.FamilyDetailsDataSource.data.splice(rowID, 1)
        this.FamilyDetailsDataSource.filter = ""
    }
}