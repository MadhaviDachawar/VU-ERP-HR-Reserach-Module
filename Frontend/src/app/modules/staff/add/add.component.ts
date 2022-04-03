import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Staff } from '../staff.model';

// Child Components
import { CoreInformationComponent } from './core-information/core-information.component';
import { CommunicationDetailsComponent } from './communication-details/communication-details.component';
import { QualificationDetailsComponent } from './qualification-details/qualification-details.component';
import { ExperienceDetailsComponent } from './experience-details/experience-details.component';
import { BankingDetailsComponent } from './banking-details/banking-details.component';
import { DocumentsComponent } from './documents/documents.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { OtherInformationComponent } from './other-information/other-information.component';

import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { FormGroup } from '@angular/forms';
import { StaffService } from '../staff.service';
import { LocalstorageService } from 'src/app/common/services/localStorage/localstorage.service';
import { TitleServiceService } from 'src/app/common/services/title/title-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeGenerationService } from 'src/app/common/services/codeGeneration/code-generation.service';
import { FileService } from 'src/app/common/services/file/file.service';
import { NotificationServiceService } from 'src/app/common/services/notification/notification-service.service';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false, showError: true },
        }
    ],
})

export class AddComponent {
    mode = "add"

    staffIdToEdit = undefined;
    employmentNumber = undefined;
    staffInfo: any;

    iconNames: string[] = [
        'info',
        'contact_phone',
        'school',
        'collections_bookmark',
        'account_balance',
        'file_copy',
        'accessibility_new',
        'more',
    ];

    @ViewChild(CoreInformationComponent)
    private CoreInformationComponent!: CoreInformationComponent;

    @ViewChild(CommunicationDetailsComponent)
    private CommunicationDetailsComponent!: CommunicationDetailsComponent;

    @ViewChild(QualificationDetailsComponent)
    private QualificationDetailsComponent!: QualificationDetailsComponent;

    @ViewChild(ExperienceDetailsComponent)
    private ExperienceDetailsComponent!: ExperienceDetailsComponent;

    @ViewChild(BankingDetailsComponent)
    private BankingDetailsComponent!: BankingDetailsComponent;

    @ViewChild(DocumentsComponent)
    private DocumentsComponent!: DocumentsComponent;

    @ViewChild(PersonalDetailsComponent)
    private PersonalDetailsComponent!: PersonalDetailsComponent;

    @ViewChild(OtherInformationComponent)
    private OtherInformationComponent!: OtherInformationComponent;

    stepperOrientation: Observable<StepperOrientation>;

    CoreInformation!: FormGroup;
    CommunicationDetails!: FormGroup;
    QualificationDetails!: FormGroup;
    ExperienceDetails!: FormGroup;
    BankingDetails!: FormGroup;
    Documents!: FormGroup;
    PersonalDetails!: FormGroup;
    OtherInformation!: FormGroup;

    constructor(
        private activatedRoute: ActivatedRoute,
        breakpointObserver: BreakpointObserver,
        private _snackBar: MatSnackBar,
        private titleService: TitleServiceService,
        private staffService: StaffService,
        private router: Router,
        private fileService: FileService,
        private codeGenerationService: CodeGenerationService,
        private localStorageService: LocalstorageService,
        private notificationService: NotificationServiceService) {
        this.stepperOrientation = breakpointObserver
            .observe('(min-width: 800px)')
            .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    }

    ngAfterViewInit(): void {

        this.activatedRoute.data.subscribe(data => {
            if (!!data.mode) this.mode = data.mode
        })

        this.CoreInformation = this.CoreInformationComponent.CoreInformation;
        this.CommunicationDetails = this.CommunicationDetailsComponent.CommunicationDetails;
        this.QualificationDetails = this.QualificationDetailsComponent.QualificationDetails;
        this.ExperienceDetails = this.ExperienceDetailsComponent.ExperienceDetails;
        this.BankingDetails = this.BankingDetailsComponent.BankingDetails;
        this.Documents = this.DocumentsComponent.Documents;
        this.PersonalDetails = this.PersonalDetailsComponent.PersonalDetails;
        this.OtherInformation = this.OtherInformationComponent.OtherInformation;

        this.staffIdToEdit = this.localStorageService.read('staffIdToEdit');
        this.employmentNumber = this.localStorageService.read('employmentNumber');
        this.localStorageService.unset('staffIdToEdit');

        this.CoreInformation.get('firstName').valueChanges.subscribe((value) => {
            let email = value.toLowerCase() + '.' + this.CoreInformation.get('lastName').value.toLowerCase()

            this.CommunicationDetailsComponent.CommunicationDetails.get('VUEmailID').setValue(email)
        })

        this.CoreInformation.get('lastName').valueChanges.subscribe((value) => {
            let email = this.CoreInformation.get('firstName').value.toLowerCase() + '.' + value.toLowerCase()

            this.CommunicationDetailsComponent.CommunicationDetails.get('VUEmailID').setValue(email)
        })

        if (this.staffIdToEdit == undefined && this.mode != "profile") {
            this.titleService.setTitle('Staff Add');

            this.codeGenerationService.generateEmployeeNumber().subscribe(res => {
                this.CoreInformationComponent.CoreInformation.controls.employmentNumber.setValue(res.employmentNumber);
                document.getElementById("employmentNumber").focus();
            })

        } else if (this.staffIdToEdit == undefined && this.mode == "profile") {
            this.titleService.setTitle('View / Edit Profile');
            this.staffMode()
            document.getElementById("VUEmailID").setAttribute('readonly', 'true');
            this.staffService
                .getStaffByEN(this.employmentNumber)
                .subscribe((data: Staff) => {
                    this.staffInfo = { ...data };
                    this.setStaffInfo()
                }, error => {
                    this.router.navigate(['/dashboard'])
                    console.log(error)
                });
        }
        else if (this.staffIdToEdit != undefined) {
            this.titleService.setTitle('Staff Edit');
            this.staffService
                .getStaff(this.staffIdToEdit)
                .subscribe((data: Staff) => {
                    this.staffInfo = { ...data };
                    this.setStaffInfo()
                });
        }
    }

    staffMode() {
        document.getElementById("employmentNumber").setAttribute('readonly', 'true');
    }

    setStaffInfo() {
        // console.log(this.staffInfo)
        // Set Core Information
        this.CoreInformationComponent.CoreInformation.controls.employmentNumber.setValue(this.staffInfo.employmentNumber);
        this.CoreInformationComponent.CoreInformation.controls.firstName.setValue(this.staffInfo.name[0].firstName);
        this.CoreInformationComponent.CoreInformation.controls.middleName.setValue(this.staffInfo.name[0].middleName);
        this.CoreInformationComponent.CoreInformation.controls.lastName.setValue(this.staffInfo.name[0].lastName);
        this.CoreInformationComponent.CoreInformation.controls.dateOfBirth.setValue(this.staffInfo.dateOfBirth);
        this.CoreInformationComponent.CoreInformation.controls.joiningDate.setValue(this.staffInfo.joiningDate);
        this.CoreInformationComponent.CoreInformation.controls.joiningDesignation.setValue(this.staffInfo.joiningDesignation);
        this.CoreInformationComponent.CoreInformation.controls.department.setValue(this.staffInfo.department.name);

        this.CoreInformationComponent.CoreInformation.controls.aadhaarNo.setValue(this.staffInfo.aadharNumber);
        this.CoreInformationComponent.CoreInformation.controls.dlNo.setValue(this.staffInfo.drivingLicense);
        this.CoreInformationComponent.CoreInformation.controls.panNo.setValue(this.staffInfo.pan);
        this.CoreInformationComponent.CoreInformation.controls.passportNo.setValue(this.staffInfo.passport);

        // this.PersonalDetailsComponent. .data = this.staffInfo.familyDetails

        // Set Communication Details
        this.CommunicationDetailsComponent.mobileNumbers = [...this.staffInfo.mobileNumbers];
        this.CommunicationDetailsComponent.emailIDs = [...this.staffInfo.emails];
        this.CommunicationDetailsComponent.CommunicationDetails.controls.VUEmailID.setValue(this.staffInfo.vuEmail.split('@vupune.ac.in')[0]);

        this.CommunicationDetailsComponent.dataSource.data =
            this.staffInfo.addresses.map((a: any) => {
                return {
                    AddressType: a.addressType,
                    HouseFlatNo: a.houseNumber,
                    StreetName: a.streetName,
                    LocationLandmark: a.landmark,
                    Pincode: a.pincode,
                    State: a.state,
                    District: a.district,
                    Tehsil: a.tehsil,
                    VillageTown: a.village,
                };
            });

        // set all qualification details values
        this.QualificationDetailsComponent.dataSource.data = this.staffInfo.qualificationDetails;

        // set all experience details values
        this.ExperienceDetailsComponent.dataSource.data = this.staffInfo.experienceDetails;

        // set all banking details values
        this.BankingDetailsComponent.dataSource.data =
            this.staffInfo.bankDetails.map((b: any) => {
                return {
                    bankName: b.bankName,
                    accountNumber: b.accountNumber,
                    branch: b.branch,
                    ifsc: b.ifsc,
                    nominee: b.nominee,
                };
            });

        // Set Personal Details       
        this.PersonalDetailsComponent.PersonalDetails.controls.bloodGroup.setValue(this.staffInfo.bloodGroup);
        this.PersonalDetailsComponent.PersonalDetails.controls.gender.setValue(this.staffInfo.gender);
        this.PersonalDetailsComponent.PersonalDetails.controls.caste.setValue(this.staffInfo.caste);
        this.PersonalDetailsComponent.PersonalDetails.controls.religion.setValue(this.staffInfo.religion);
        this.PersonalDetailsComponent.PersonalDetails.controls.category.setValue(this.staffInfo.category);
        this.PersonalDetailsComponent.PersonalDetails.controls.maritalStatus.setValue(this.staffInfo.maritalStatus);
        this.PersonalDetailsComponent.PersonalDetails.controls.noOfChildren.setValue(String(this.staffInfo.noOfChildren));

        this.PersonalDetailsComponent.accidentClaim.setValue(this.staffInfo.personalInsurance.accidentClaim)
        this.PersonalDetailsComponent.mediClaim.setValue(this.staffInfo.personalInsurance.mediClaim)
        this.PersonalDetailsComponent.termInsurance.setValue(this.staffInfo.personalInsurance.termInsurance)

        this.PersonalDetailsComponent.VUAccidentClaim.setValue(this.staffInfo.vuInsurance.accidentClaim)
        this.PersonalDetailsComponent.VUMediClaim.setValue(this.staffInfo.vuInsurance.mediClaim)
        this.PersonalDetailsComponent.VUTermInsurance.setValue(this.staffInfo.vuInsurance.termInsurance)
        // this.PersonalDetailsComponent.PersonalDetails.controls.physicalDisability.setValue(this.staffInfo.physicalDisability)

        // set all documents values

        this.DocumentsComponent.dataSource.data = this.staffInfo.documents.map((docs: any) => {
            return {
                Name: docs.docName,
                Details: docs.details,
                Filename: docs.path,
            }
        })

        // set all other information details values

        this.OtherInformationComponent.dataSource.data = this.staffInfo.otherInformation;
    }

    SubmitStaff() {
        let data = {};
        let coreInfo = this.CoreInformation.value;

        data['employmentNumber'] = coreInfo.employmentNumber;
        data['name'] = [];
        data['name'].push({
            firstName: coreInfo.firstName,
            middleName: coreInfo.middleName,
            lastName: coreInfo.lastName,
        });

        data['joiningDesignation'] = coreInfo.joiningDesignation;

        data['department'] = this.CoreInformationComponent.departmentId.value;
        data['faculty'] = this.CoreInformationComponent.facultyId.value;
        data['school'] = this.CoreInformationComponent.schoolId.value;

        data['aadharNumber'] = coreInfo.aadhaarNo;
        data['pan'] = coreInfo.panNo;
        data['drivingLicense'] = coreInfo.dlNo;
        data['passport'] = coreInfo.passportNo;

        let communicationDetails = this.CommunicationDetails.value;

        data['mobileNumbers'] = this.CommunicationDetailsComponent.mobileNumbers
        data['emails'] = this.CommunicationDetailsComponent.emailIDs
        data['vuEmail'] = communicationDetails.VUEmailID + '@vupune.ac.in';

        let addresses = this.CommunicationDetailsComponent.dataSource.data;

        data['address'] = addresses.map((address) => {
            return {
                addressType: address.AddressType,
                houseNumber: address.HouseFlatNo,
                streetName: address.StreetName,
                landmark: address.LocationLandmark,
                pincode: address.Pincode,
                state: address.State,
                district: address.District,
                tehsil: address.Tehsil,
                village: address.VillageTown,
            };
        });

        let qd = this.QualificationDetailsComponent.dataSource.data;

        data['qualificationDetails'] = qd.map((q) => {
            return {
                university: q.University,
                passingYear: q.PassingYear,
                marks: q.Marks,
                maxMarks: q.MaxMarks,
                percentage: q.Percentage,
                grade: q.Grade,
                class: q.Class,
                specialization: q.Specialization,
                remarks: q.Remarks,
            };
        });

        let ed = this.ExperienceDetailsComponent.dataSource.data;

        data['experienceDetails'] = ed.map((e) => {
            return {
                employer: e.NameOfEmployer,
                position: e.Position,
                salaryDrawn: e.LastSalaryDrawn,
                from: e.From,
                to: e.To,
                experienceType: e.ExperienceType,
                rolesAndresponsibility: e.RolesNResponsibilities,
                additionalInfo: e.AdditionalInformation,
                remarks: e.Remarks,
            };
        });

        let bd = this.BankingDetailsComponent.dataSource.data;

        data['bankDetails'] = bd.map((b) => {
            return {
                bankName: b.bankName,
                accountNumber: b.accountNumber,
                branch: b.branch,
                ifsc: b.ifsc,
                nominee: b.nominee,
            };
        });

        data['documents'] = this.DocumentsComponent.dataSource.data.map(doc => {
            return {
                path: doc.Filename,
                docName: doc.Name,
                details: doc.Details,
            }
        })

        let pd = this.PersonalDetails.value;

        data['bloodGroup'] = pd.bloodGroup;
        data['gender'] = pd.gender;
        data['caste'] = pd.caste;
        data['religion'] = pd.religion;
        data['category'] = pd.category;
        data['maritalStatus'] = pd.maritalStatus;
        data['noOfChildren'] = pd.noOfChildren;

        data['personalInsurance'] = {
            accidentClaim: this.PersonalDetailsComponent.accidentClaim.value,
            mediClaim: this.PersonalDetailsComponent.mediClaim.value,
            termInsurance: this.PersonalDetailsComponent.termInsurance.value,
        };

        data['vuInsurance'] = {
            accidentClaim: this.PersonalDetailsComponent.VUAccidentClaim.value,
            mediClaim: this.PersonalDetailsComponent.VUMediClaim.value,
            termInsurance: this.PersonalDetailsComponent.VUTermInsurance.value,
        };

        let emd = this.PersonalDetailsComponent.EmergencyDetailsDataSource.data;

        data['emergencyDetails'] = emd.map((em) => {
            return {
                name: em.Name,
                relation: em.Relation,
                mobileNumber: em.Mobile,
                email: em.Email,
                address: em.Address,
            };
        });

        let spd = this.PersonalDetailsComponent.SpouseDetailsDataSource.data;
        data['spouseDetails'] = spd.map((sp) => {
            return {
                name: sp.Name,
                working: sp.Working,
                mobileNumber: sp.Mobile,
                email: sp.Email,
                company: sp.Company,
            };
        });

        let otherInfo = this.OtherInformationComponent.dataSource.data;
        data['otherInformation'] = otherInfo.map((oi) => {
            return {
                infoType: oi.Type,
                details: oi.Details,
                remarks: oi.Remarks,
            };
        });

        if (this.staffIdToEdit == undefined && this.mode != "profile") {

            data['dateOfBirth'] = coreInfo.dateOfBirth.toISOString();
            data['joiningDate'] = coreInfo.joiningDate.toISOString();

            this.staffService.createStaff(data as Staff).subscribe((data) => {

                this.fileService.createFiles(this.DocumentsComponent.files).subscribe()
                this.notificationService.success('Staff added successfully')
                this.router.navigate(['/staff/view'])
            });
        } else {

            data['dateOfBirth'] = coreInfo.dateOfBirth;
            data['dateOfJoining'] = coreInfo.dateOfJoining;

            if (this.mode == "profile") {
                this.staffService
                    .updateStaffByEN(this.employmentNumber, data as Staff)
                    .subscribe(() => {
                        this.fileService.createFiles(this.DocumentsComponent.files).subscribe()

                        this.notificationService.success('Profile updated successfully')
                        
                    });
            } else {
                this.staffService
                    .updateStaff(this.staffIdToEdit, data as Staff)
                    .subscribe(() => {
                        this.fileService.createFiles(this.DocumentsComponent.files).subscribe()

                        this.notificationService.success('Staff details updated successfully')
                        
                        this.router.navigate(['/staff/view'])
                    });
            }
        }

        this.localStorageService.unset('staffIdToEdit');
    }
}
