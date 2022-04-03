import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Staff } from '../staff_NonTeaching.model';

// Child Components
import { CoreInformationComponent } from './core-information/core-information.component';
import { CommunicationDetailsComponent } from './communication-details/communication-details.component';
import { QualificationDetailsComponent } from './qualification-details/qualification-details.component';
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
import { staff_NonTeachingService } from '../staff_NonTeaching.service';
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

    @ViewChild(BankingDetailsComponent)
    private BankingDetailsComponent!: BankingDetailsComponent;

    @ViewChild(DocumentsComponent)
    private DocumentsComponent!: DocumentsComponent;

    @ViewChild(PersonalDetailsComponent)
    private PersonalDetailsComponent!: PersonalDetailsComponent;

    @ViewChild(OtherInformationComponent)
    private OtherInformationComponent!: OtherInformationComponent;

    stepperOrientation: Observable<StepperOrientation>;

    // coreinformation forms
    CoreInformation!: FormGroup;
    NameDetails!: FormGroup;
    DesignationDetailsForm!: FormGroup;

    // communcation details
    CommunicationDetails!: FormGroup;
    AddressForm!: FormGroup;
    SpouseDetailsForm!: FormGroup;

    QualificationDetails!: FormGroup;
    BankingDetails!: FormGroup;
    Documents!: FormGroup;
    PersonalDetails!: FormGroup;
    OtherInformation!: FormGroup;

    constructor(
        private activatedRoute: ActivatedRoute,
        breakpointObserver: BreakpointObserver,
        private _snackBar: MatSnackBar,
        private titleService: TitleServiceService,
        private staffService: staff_NonTeachingService,
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

        // core information details
        // NameDetails , DesignationDetailsForm
        this.CoreInformation = this.CoreInformationComponent.CoreInformation;
        this.NameDetails = this.CoreInformationComponent.NameDetails;
        this.DesignationDetailsForm = this.CoreInformationComponent.DesignationDetailsForm;

        // NameDetails,DesignationDetailsForm
        this.CommunicationDetails = this.CommunicationDetailsComponent.CommunicationDetails;
        this.AddressForm = this.CommunicationDetailsComponent.AddressForm;
        this.SpouseDetailsForm = this.CommunicationDetailsComponent.SpouseDetailsForm;

        this.QualificationDetails = this.QualificationDetailsComponent.QualificationDetails;
        this.BankingDetails = this.BankingDetailsComponent.BankingDetails;
        this.Documents = this.DocumentsComponent.Documents;
        this.PersonalDetails = this.PersonalDetailsComponent.PersonalDetails;
        this.OtherInformation = this.OtherInformationComponent.OtherInformation;

        this.staffIdToEdit = this.localStorageService.read('staffIdToEdit');
        this.employmentNumber = this.localStorageService.read('employmentNumber');
        this.localStorageService.unset('staffIdToEdit');

        if (this.staffIdToEdit == undefined && this.mode != "profile") {
            this.titleService.setTitle('Staff (Non-Teaching) Add');

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
        console.log(this.staffInfo)
        // Set Core Information

        // employmentNumber,staff,section,joiningDate,ReleivingDate,remark,faculty,school ,department 
        this.CoreInformationComponent.CoreInformation.controls.employmentNumber.setValue(this.staffInfo.employmentNumber);
        this.CoreInformationComponent.CoreInformation.controls.staff.setValue(this.staffInfo.staff);
        this.CoreInformationComponent.CoreInformation.controls.section.setValue(this.staffInfo.section);
        this.CoreInformationComponent.CoreInformation.controls.joiningDate.setValue(this.staffInfo.joiningDate);
        this.CoreInformationComponent.CoreInformation.controls.ReleivingDate.setValue(this.staffInfo.ReleivingDate);
        this.CoreInformationComponent.CoreInformation.controls.remark.setValue(this.staffInfo.remark);
        this.CoreInformationComponent.CoreInformation.controls.faculty.setValue(this.staffInfo.faculty);
        this.CoreInformationComponent.CoreInformation.controls.school.setValue(this.staffInfo.school);
        this.CoreInformationComponent.CoreInformation.controls.department.setValue(this.staffInfo.department);

        // AtVu_FirstName,AtVu_MiddleName,AtVu_LastName, ,Earlier_MiddleName,Earlier_LastName,Change_before_FirstName,Change_before_MiddleName,Change_before_LastName,Change_after_FirstName,Change_after_MiddleName,Change_after_LastName
        this.CoreInformationComponent.NameDetails.controls.AtVu_FirstName.setValue(this.staffInfo.AtVu_FirstName);
        this.CoreInformationComponent.NameDetails.controls.AtVu_MiddleName.setValue(this.staffInfo.AtVu_MiddleName);
        this.CoreInformationComponent.NameDetails.controls.AtVu_LastName.setValue(this.staffInfo.AtVu_LastName);
        this.CoreInformationComponent.NameDetails.controls.Earlier_FirstName.setValue(this.staffInfo.Earlier_FirstName);
        this.CoreInformationComponent.NameDetails.controls.Earlier_MiddleName.setValue(this.staffInfo.Earlier_MiddleName);
        this.CoreInformationComponent.NameDetails.controls.Earlier_LastName.setValue(this.staffInfo.Earlier_LastName);
        this.CoreInformationComponent.NameDetails.controls.Change_before_FirstName.setValue(this.staffInfo.Change_before_FirstName);
        this.CoreInformationComponent.NameDetails.controls.Change_before_MiddleName.setValue(this.staffInfo.Change_before_MiddleName);
        this.CoreInformationComponent.NameDetails.controls.Change_before_LastName.setValue(this.staffInfo.Change_before_LastName);
        this.CoreInformationComponent.NameDetails.controls.Change_after_FirstName.setValue(this.staffInfo.Change_after_FirstName);
        this.CoreInformationComponent.NameDetails.controls.Change_after_MiddleName.setValue(this.staffInfo.Change_after_MiddleName);
        this.CoreInformationComponent.NameDetails.controls.Change_after_LastName.setValue(this.staffInfo.Change_after_LastName);

        // joiningDesignation,StartDate,EndDate,Designation_Role,Designation_Role_Start_Date,Designation_Role_End_Date
        this.CoreInformationComponent.DesignationDetailsForm.controls.joiningDesignation.setValue(this.staffInfo.joiningDesignation);
        this.CoreInformationComponent.DesignationDetailsForm.controls.StartDate.setValue(this.staffInfo.StartDate);
        this.CoreInformationComponent.DesignationDetailsForm.controls.EndDate.setValue(this.staffInfo.EndDate);
        this.CoreInformationComponent.DesignationDetailsForm.controls.Designation_Role.setValue(this.staffInfo.Designation_Role);
        this.CoreInformationComponent.DesignationDetailsForm.controls.Designation_Role_Start_Date.setValue(this.staffInfo.Designation_Role_Start_Date);
        this.CoreInformationComponent.DesignationDetailsForm.controls.Designation_Role_End_Date.setValue(this.staffInfo.Designation_Role_End_Date);

        // ----------core information form end --------

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

        this.CommunicationDetailsComponent.SpouseDetailsDataSource.data =
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
        this.PersonalDetailsComponent.PersonalDetails.controls.noOfChildrenMale.setValue(String(this.staffInfo.noOfChildrenMale));
        this.PersonalDetailsComponent.PersonalDetails.controls.noOfChildrenFemale.setValue(String(this.staffInfo.noOfChildrenFemale));

        // nominee details
        this.PersonalDetailsComponent.NomineeDetailsForm.controls.NomineeMobile.setValue(this.staffInfo.NomineeMobile);
        this.PersonalDetailsComponent.NomineeDetailsForm.controls.NomineeAddress.setValue(this.staffInfo.NomineeAddress);
        this.PersonalDetailsComponent.NomineeDetailsForm.controls.NomineeMobile.setValue(this.staffInfo.NomineeMobile);

        // emergency details
        this.PersonalDetailsComponent.EmergencyDetailsForm.controls.Name.setValue(this.staffInfo.Name);
        this.PersonalDetailsComponent.EmergencyDetailsForm.controls.Address.setValue(this.staffInfo.Address);
        this.PersonalDetailsComponent.EmergencyDetailsForm.controls.Mobile.setValue(this.staffInfo.Mobile);

        this.OtherInformationComponent.accidentClaim.setValue(this.staffInfo.personalInsurance.accidentClaim)
        this.OtherInformationComponent.mediClaim.setValue(this.staffInfo.personalInsurance.mediClaim)
        this.OtherInformationComponent.termInsurance.setValue(this.staffInfo.personalInsurance.termInsurance)

        this.OtherInformationComponent.VUAccidentClaim.setValue(this.staffInfo.vuInsurance.accidentClaim)
        this.OtherInformationComponent.VUMediClaim.setValue(this.staffInfo.vuInsurance.mediClaim)
        this.OtherInformationComponent.VUTermInsurance.setValue(this.staffInfo.vuInsurance.termInsurance)
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
        let NameDetails = this.NameDetails.value;
        let DesignationDetailsForm = this.DesignationDetailsForm.value;

        // NameDetails,DesignationDetailsForm
        console.log(coreInfo);
        console.log(NameDetails);
        console.log(DesignationDetailsForm);

        /*
        section: ""
        staff: ""

        AtVu_FirstName: ""
        AtVu_LastName: ""
        AtVu_MiddleName: ""
        Change_after_FirstName: ""
        Change_after_LastName: ""
        Change_after_MiddleName: ""
        Change_before_FirstName: ""
        Change_before_LastName: ""
        Change_before_MiddleName: ""
        Earlier_FirstName: ""
        Earlier_LastName: ""
        Earlier_MiddleName: ""
        */
        data['department'] = this.CoreInformationComponent.departmentId.value;
        data['faculty'] = this.CoreInformationComponent.facultyId.value;
        data['school'] = this.CoreInformationComponent.schoolId.value;

        data['employmentNumber'] = coreInfo.employmentNumber;
        data['joiningDate'] = coreInfo.joiningDate;
        data['ReleivingDate'] = coreInfo.ReleivingDate;
        data['remark'] = coreInfo.remark;

        data['joining_name'] = [];
        data['joining_name'].push({
            firstName: NameDetails.AtVu_FirstName,
            middleName: NameDetails.AtVu_MiddleName,
            lastName: NameDetails.AtVu_LastName,
        });

        data['earlier_name'] = [];
        data['earlier_name'].push({
            firstName: NameDetails.Earlier_FirstName,
            middleName: NameDetails.Earlier_MiddleName,
            lastName: NameDetails.Earlier_LastName,
        });

        data['before_joining_name'] = [];
        data['before_joining_name'].push({
            firstName: NameDetails.Change_before_FirstName,
            middleName: NameDetails.Change_before_MiddleName,
            lastName: NameDetails.Change_before_LastName,
        });

        data['after_joining_name'] = [];
        data['after_joining_name'].push({
            firstName: NameDetails.Change_after_FirstName,
            middleName: NameDetails.Change_after_MiddleName,
            lastName: NameDetails.Change_after_LastName,
        });

        data['joiningDesignation'] = DesignationDetailsForm.joiningDesignation;
        data['StartDate'] = DesignationDetailsForm.StartDate;
        data['EndDate'] = DesignationDetailsForm.EndDate;
        data['Designation_Role'] = coreInfo.Designation_Role;
        data['Designation_Role_Start_Date'] = coreInfo.Designation_Role_Start_Date;
        data['Designation_Role_End_Date'] = DesignationDetailsForm.Designation_Role_End_Date;

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

        let spouseDetails = this.CommunicationDetailsComponent.SpouseDetailsDataSource.data;
        console.log(spouseDetails);

        data['spouseDetails'] = spouseDetails.map((spouseDetail) => {
            return {
                Name: spouseDetail.Name,
                Email: spouseDetail.Email,
                Mobile: spouseDetail.Mobile
            };
        });

        let qd = this.QualificationDetailsComponent.dataSource.data;

        data['qualificationDetails'] = qd.map((q) => {
            return {
                university: q.University,
                passingYear: q.PassingYear,
                marks: q.Marks,
                percentage: q.Percentage,
                grade: q.Grade,
                class: q.Class,
                remarks: q.Remarks,
            };
        });

        let bd = this.BankingDetailsComponent.dataSource.data;

        data['bankDetails'] = bd.map((b) => {
            return {
                BankNameWithBranch: b.BankNameWithBranch,
                accountNumber: b.AccountNumber,
                Remarks: b.Remarks,
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
        data['noOfChildrenMale'] = pd.noOfChildrenMale;
        data['noOfChildrenFemale'] = pd.noOfChildrenFemale;

        data['personalInsurance'] = {
            accidentClaim: this.OtherInformationComponent.accidentClaim.value,
            mediClaim: this.OtherInformationComponent.mediClaim.value,
            termInsurance: this.OtherInformationComponent.termInsurance.value,
        };

        data['vuInsurance'] = {
            accidentClaim: this.OtherInformationComponent.VUAccidentClaim.value,
            mediClaim: this.OtherInformationComponent.VUMediClaim.value,
            termInsurance: this.OtherInformationComponent.VUTermInsurance.value,
        };

        if (this.staffIdToEdit == undefined && this.mode != "profile") {

            console.log(data);

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
