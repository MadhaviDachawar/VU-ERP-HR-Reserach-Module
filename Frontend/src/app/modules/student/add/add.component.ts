import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Student } from '../student.model';

// Child Components
import { CoreInformationComponent } from './core-information/core-information.component';
import { CommunicationDetailsComponent } from './communication-details/communication-details.component';
import { QualificationDetailsComponent } from './academic-details/qualification-details.component';
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
import { StudentService } from '../student.service';
import { LocalstorageService } from 'src/app/common/services/localStorage/localstorage.service';
import { TitleServiceService } from 'src/app/common/services/title/title-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/common/services/file/file.service';
import { CodeGenerationService } from 'src/app/common/services/codeGeneration/code-generation.service';
import { NotificationServiceService } from 'src/app/common/services/notification/notification-service.service';
import { CommonService } from 'src/app/common/services/common/common.service';

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

    studentIdToEdit = undefined;
    srnNumber = undefined;
    studentInfo: any;

    iconNames: string[] = [
        'info',
        'accessibility_new',
        'contact_phone',
        'school',
        'collections_bookmark',
        'account_balance',
        'file_copy',
        'more',
    ];

    @ViewChild(CoreInformationComponent)
    private CoreInformationComponent!: CoreInformationComponent;

    @ViewChild(PersonalDetailsComponent)
    private PersonalDetailsComponent!: PersonalDetailsComponent;

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

    @ViewChild(OtherInformationComponent)
    private OtherInformationComponent!: OtherInformationComponent;

    stepperOrientation: Observable<StepperOrientation>;

    CoreInformation!: FormGroup;
    PersonalDetails!: FormGroup;
    CommunicationDetails!: FormGroup;
    QualificationDetails!: FormGroup;
    ExperienceDetails!: FormGroup;
    BankingDetails!: FormGroup;
    Documents!: FormGroup;
    OtherInformation!: FormGroup;

    constructor(
        private activatedRoute: ActivatedRoute,
        breakpointObserver: BreakpointObserver,
        private _snackBar: MatSnackBar,
        private titleService: TitleServiceService,
        private studentService: StudentService,
        private router: Router,
        private commonService: CommonService,
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

        this.studentIdToEdit = this.localStorageService.read('studentIdToEdit');
        this.srnNumber = this.localStorageService.read('srnNumber');
        this.localStorageService.unset('studentIdToEdit');

        this.CoreInformation.get('srnNumber').valueChanges.subscribe((value) => {
            this.CommunicationDetailsComponent.CommunicationDetails.get('VUEmailID').setValue(value)
        })

        if (this.studentIdToEdit == undefined && this.srnNumber == undefined) {
            this.titleService.setTitle('Student Add');

            this.codeGenerationService.generateSRN().subscribe(res => {
                this.CoreInformationComponent.CoreInformation.controls.srnNumber.setValue(res.srn);
                document.getElementById("srnNumber").focus();
            })
        } else if (this.studentIdToEdit == undefined && this.srnNumber != undefined) {
            this.titleService.setTitle('View / Edit Profile');
            this.studentMode()
            document.getElementById("VUEmailID").setAttribute('readonly', 'true');
            this.studentService
                .getStudentBySRN(this.srnNumber)
                .subscribe((data: Student) => {
                    this.studentInfo = { ...data };
                    this.setStudentInfo()
                });
        }
        else if (this.studentIdToEdit != undefined) {
            this.titleService.setTitle('Student Edit');
            this.studentService
                .getStudent(this.studentIdToEdit)
                .subscribe((data: Student) => {
                    this.studentInfo = { ...data };
                    this.setStudentInfo()
                });
        }
    }

    studentMode() {
        document.getElementById("srnNumber").setAttribute('readonly', 'true');
    }

    setStudentInfo() {

        // console.log(this.studentInfo)
        // Set Core Information
        this.CoreInformationComponent.CoreInformation.controls.srnNumber.setValue(this.studentInfo.srnNumber);
        this.CoreInformationComponent.CoreInformation.controls.prnNumber.setValue(this.studentInfo.prnNumber);
        this.CoreInformationComponent.CoreInformation.controls.firstName.setValue(this.studentInfo.name[0].firstName);
        this.CoreInformationComponent.CoreInformation.controls.middleName.setValue(this.studentInfo.name[0].middleName);
        this.CoreInformationComponent.CoreInformation.controls.lastName.setValue(this.studentInfo.name[0].lastName);
        this.CoreInformationComponent.CoreInformation.controls.dateOfBirth.setValue(this.studentInfo.dateOfBirth);
        this.CoreInformationComponent.CoreInformation.controls.admissionDate.setValue(this.studentInfo.admissionDate);
        this.CoreInformationComponent.CoreInformation.controls.candidateQualifyingMarksheetName.setValue(this.studentInfo.candidateQualifyingMarksheetName);
        this.CoreInformationComponent.CoreInformation.controls.candidateQualifyingMarksheetNameDevnagiri.setValue(this.studentInfo.candidateQualifyingMarksheetNameDevnagiri);
        this.CoreInformationComponent.CoreInformation.controls.programme.setValue(this.studentInfo.programme.name);
        this.CoreInformationComponent.CoreInformation.controls.admissionIntoYear.setValue(Number(this.studentInfo.admissionIntoYear))

        // Set Communication Details
        this.CommunicationDetailsComponent.mobileNumbers = [...this.studentInfo.mobileNumbers];
        this.CommunicationDetailsComponent.emailIDs = [...this.studentInfo.emails];
        this.CommunicationDetailsComponent.CommunicationDetails.controls.VUEmailID.setValue(this.studentInfo.vuEmail.split('@vupune.ac.in')[0]);
        this.CommunicationDetailsComponent.CommunicationDetails.controls.emergencyContactName.setValue(this.studentInfo.emergencyContactName);
        this.CommunicationDetailsComponent.CommunicationDetails.controls.emergencyContactNumber.setValue(this.studentInfo.emergencyContactNumber);

        this.CommunicationDetailsComponent.dataSource.data =
            this.studentInfo.addresses.map((a: any) => {
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

        // Set Personal Details       
        this.PersonalDetailsComponent.PersonalDetails.controls.bloodGroup.setValue(this.studentInfo.bloodGroup);
        this.PersonalDetailsComponent.PersonalDetails.controls.motherTongue.setValue(this.studentInfo.motherTongue);
        this.PersonalDetailsComponent.PersonalDetails.controls.gender.setValue(this.studentInfo.gender);
        this.PersonalDetailsComponent.PersonalDetails.controls.placeOfBirth.setValue(this.studentInfo.placeOfBirth);
        this.PersonalDetailsComponent.PersonalDetails.controls.nationality.setValue(this.studentInfo.nationality);
        this.PersonalDetailsComponent.PersonalDetails.controls.domicileState.setValue(this.studentInfo.domicileState);
        this.PersonalDetailsComponent.PersonalDetails.controls.caste.setValue(this.studentInfo.caste);
        this.PersonalDetailsComponent.PersonalDetails.controls.subCaste.setValue(this.studentInfo.subCaste);
        this.PersonalDetailsComponent.PersonalDetails.controls.religion.setValue(this.studentInfo.religion);
        this.PersonalDetailsComponent.PersonalDetails.controls.category.setValue(this.studentInfo.category);
        this.PersonalDetailsComponent.PersonalDetails.controls.admissionCategory.setValue(this.studentInfo.admissionCategory);
        this.PersonalDetailsComponent.PersonalDetails.controls.maritalStatus.setValue(this.studentInfo.maritalStatus);
        this.PersonalDetailsComponent.PersonalDetails.controls.noOfChildren.setValue(String(this.studentInfo.noOfChildren));
        this.PersonalDetailsComponent.PersonalDetails.controls.covidVaccinated.setValue(this.studentInfo.covidVaccinated)
        this.PersonalDetailsComponent.PersonalDetails.controls.physicalDisability.setValue(this.studentInfo.physicalDisability)
        this.PersonalDetailsComponent.PersonalDetails.controls.physicalDisabilityPercentage.setValue(this.studentInfo.physicalDisabilityPercentage)
        this.PersonalDetailsComponent.FamilyDetailsDataSource.data = this.studentInfo.familyDetails

        // set all qualification details values
        this.QualificationDetailsComponent.dataSource.data = this.studentInfo.qualificationDetails;

        // set all experience details values
        this.ExperienceDetailsComponent.dataSource.data = this.studentInfo.experienceDetails;

        // set all banking details values
        this.BankingDetailsComponent.dataSource.data =
            this.studentInfo.bankDetails.map((b: any) => {
                return {
                    bankName: b.bankName,
                    accountNumber: b.accountNumber,
                    branch: b.branch,
                    ifsc: b.ifsc,
                    nominee: b.nominee,
                };
            });

        // set all documents values

        this.DocumentsComponent.dataSource.data = this.studentInfo.documents.map((docs: any) => {
            return {
                Name: docs.docName,
                Number: docs.docNumber,
                Details: docs.details,
                Filename: docs.path,
            }
        })

        // set all other information details values

        this.OtherInformationComponent.dataSource.data = this.studentInfo.otherInformation;
    }

    SubmitStudent() {
        let data = {};
        let coreInfo = this.CoreInformation.value;

        data['srnNumber'] = coreInfo.srnNumber;
        data['prnNumber'] = coreInfo.prnNumber;
        data['name'] = [];
        data['name'].push({
            firstName: coreInfo.firstName,
            middleName: coreInfo.middleName,
            lastName: coreInfo.lastName,
        });

        data['candidateQualifyingMarksheetName'] = coreInfo.candidateQualifyingMarksheetName
        data['candidateQualifyingMarksheetNameDevnagiri'] = coreInfo.candidateQualifyingMarksheetNameDevnagiri

        data['programme'] = this.CoreInformationComponent.programmeId.value;
        data['admissionIntoYear'] = coreInfo.admissionIntoYear;
        data['feeStructures'] = []

        for (const year of this.CoreInformationComponent.years) {
            data['feeStructures'][this.CoreInformationComponent.years.indexOf(year)] = this.CoreInformation.get(
                this.commonService.camelize(year)
            ).value
        }

        data['faculty'] = this.CoreInformationComponent.facultyId.value;
        data['school'] = this.CoreInformationComponent.schoolId.value;
        data['department'] = this.CoreInformationComponent.departmentId.value;

        let pd = this.PersonalDetails.value;

        data['bloodGroup'] = pd.bloodGroup
        data['motherTongue'] = pd.motherTongue
        data['gender'] = pd.gender
        data['placeOfBirth'] = pd.placeOfBirth
        data['nationality'] = pd.nationality
        data['domicileState'] = pd.domicileState
        data['caste'] = pd.caste
        data['subCaste'] = pd.subCaste
        data['religion'] = pd.religion
        data['admissionCategory'] = pd.admissionCategory
        data['category'] = pd.category
        data['maritalStatus'] = pd.maritalStatus
        data['noOfChildren'] = pd.noOfChildren
        data['covidVaccinated'] = pd.covidVaccinated
        data['physicalDisability'] = pd.physicalDisability
        data['physicalDisabilityPercentage'] = pd.physicalDisabilityPercentage

        let fmd = this.PersonalDetailsComponent.FamilyDetailsDataSource.data;

        data['familyDetails'] = fmd

        let communicationDetails = this.CommunicationDetails.value;

        data['mobileNumbers'] = this.CommunicationDetailsComponent.mobileNumbers
        data['emails'] = this.CommunicationDetailsComponent.emailIDs
        data['vuEmail'] = communicationDetails.VUEmailID + '@vupune.ac.in';

        data['emergencyContactName'] = communicationDetails.emergencyContactName;
        data['emergencyContactNumber'] = communicationDetails.emergencyContactNumber;

        let addresses = this.CommunicationDetailsComponent.dataSource.data;

        data['addresses'] = addresses.map((address) => {
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
                docNumber: doc.Number,
                details: doc.Details,
            }
        })

        let otherInfo = this.OtherInformationComponent.dataSource.data;
        data['otherInformation'] = otherInfo.map((oi) => {
            return {
                infoType: oi.Type,
                details: oi.Details,
                remarks: oi.Remarks,
            };
        });

        // console.log(data)

        if (this.studentIdToEdit == undefined && this.mode != 'profile') {

            data['dateOfBirth'] = coreInfo.dateOfBirth.toISOString();
            data['admissionDate'] = coreInfo.admissionDate.toISOString();

            this.studentService.createStudent(data).subscribe((data) => {

                this.fileService.createFiles(this.DocumentsComponent.files).subscribe()

                this.notificationService.success('Student added successfully')
                this.router.navigate(['/student/view'])
            });
        } else {

            data['dateOfBirth'] = coreInfo.dateOfBirth;
            data['admissionDate'] = coreInfo.admissionDate;

            if (this.mode == "profile") {
                this.studentService
                    .updateStudentBySrn(this.srnNumber, data)
                    .subscribe(() => {
                        this.fileService.createFiles(this.DocumentsComponent.files).subscribe()

                        this.notificationService.success('Profile updated successfully')
                        // this.router.navigate(['/student/view'])
                    });
            } else {
                this.studentService
                    .updateStudent(this.studentIdToEdit, data)
                    .subscribe(() => {
                        this.fileService.createFiles(this.DocumentsComponent.files).subscribe()
                        this.notificationService.success('Student details updated successfully')
                        this.router.navigate(['/student/view'])
                    });
            }
        }

        this.localStorageService.unset('studentIdToEdit');
    }
}
