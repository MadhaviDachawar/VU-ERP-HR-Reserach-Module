import { SelectionModel } from '@angular/cdk/collections';
import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/common/services/common/common.service';
import { FacultyService } from 'src/app/common/services/faculty/faculty.service';
import { LocalstorageService } from 'src/app/common/services/localStorage/localstorage.service';
import { SchoolService } from 'src/app/common/services/school/school.service';
import { TitleServiceService } from 'src/app/common/services/title/title-service.service';
import { DepartmentService } from '../../../common/services/department/department.service';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

interface StudentTable {
    _id?: string;
    srnNumber: string;
    prnNumber: string;
    name: string;
    contact: string;
    email: string;
    dateOfBirth: string;
    programme: string;
    faculty: string;
    school: string;
    department: string;
    gender: string;
    nationality: string;
    religion: string;
    category: string;
    admissionCategory: string;
    state: string;
    district: string;
}

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
})

export class ViewComponent implements OnInit, OnDestroy {
    matPaginatorLength = 0

    students = [];
    allStudents = [];

    faculties = [];

    schools: { _id: string; schoolName: string; facultyId: string }[];
    allSchools: { _id: string; schoolName: string; facultyId: string }[];

    departments: {
        _id: string;
        departmentName: string;
        facultyId: string;
        schoolId: string;
    }[];
    allDepartments: {
        _id: string;
        departmentName: string;
        facultyId: string;
        schoolId: string;
    }[];

    facultySub: Subscription;
    schoolSub: Subscription;
    departmentSub: Subscription;
    studentSub: Subscription;

    displayedColumns: string[] = [
        'select',
        'srNo',
        'srnNumber',
        'prnNumber',
        'name',
        'contact',
        'email',
        'dateOfBirth',
        'programme',
        'faculty',
        'school',
        'department',
        'gender',
        'nationality',
        'religion',
        'category',
        'admissionCategory',
        'state',
        'district',
        // 'view',
        'edit'
    ];

    dataSource: MatTableDataSource<StudentTable>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    selection = new SelectionModel<StudentTable>(true, []);

    facultyId: FormControl;
    schoolId: FormControl;
    departmentId: FormControl;

    constructor(
        private commonService: CommonService,
        private localStorageService: LocalstorageService,
        private router: Router,
        private titleService: TitleServiceService,
        private studentService: StudentService,
        private facultyService: FacultyService,
        private schoolService: SchoolService,
        private departmentService: DepartmentService
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle('Student View');

        this.studentSub = this.studentService.getStudents().subscribe((data) => {
            this.matPaginatorLength = data.length

            this.students = [...data];
            this.allStudents = [...data];
            this.dataSource = new MatTableDataSource(
                data.map((s) => {
                    return {
                        _id: s._id,
                        srnNumber: s.srnNumber,
                        prnNumber: s.prnNumber,
                        name: this.getFullName(s),
                        contact: s.mobileNumbers[0],
                        email: s.emails[0],
                        dateOfBirth: this.commonService.getDateFromISO(s.dateOfBirth),
                        programme: s.programme.name,
                        faculty: s.faculty.name,
                        school: s.school.name,
                        department: s.department.name,
                        gender: s.gender,
                        nationality: s.nationality,
                        religion: s.religion,
                        category: s.category,
                        admissionCategory: s.admissionCategory,
                        state: !!s.address ? s.address[0].state : "",
                        district: !!s.address ? s.address[0].district : "",
                    };
                })
            );

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.facultyId = new FormControl('');
        this.schoolId = new FormControl('');
        this.departmentId = new FormControl('');
    }

    ngOnDestroy(): void {
        this.studentSub.unsubscribe();
    }

    toggleRow(row: any, index: number) {
        this.selection.toggle(row);
        // this.exporter.toggleRow(index);
    }

    private isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    checkboxLabel(row?: StudentTable, index?: number): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${index + 1
            }`;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onChange(eventType: string, event: MatSelectChange): void {
        let value: string = (event.source.selected as MatOption).value;
        let data: Student[];
        if (eventType === 'faculty') {
            if (value !== '0') {
                this.schools = [
                    ...this.allSchools.filter((school) => school.facultyId === value),
                ];
                this.departments = [
                    ...this.allDepartments.filter(
                        (department) => department.facultyId === value
                    ),
                ];
                data = [
                    ...this.allStudents.filter((staff) => staff.faculty._id === value),
                ];
            } else {
                this.schools = [...this.allSchools];
                this.departments = [...this.allDepartments];
                data = [...this.allStudents];
            }
        } else if (eventType === 'school') {
            if (value !== '0') {
                this.departments = [
                    ...this.allDepartments.filter(
                        (department) => department.schoolId === value
                    ),
                ];
                data = [
                    ...this.allStudents.filter((staff) => staff.school._id === value),
                ];
            } else {
                this.departments = [...this.allDepartments];
                data = [...this.allStudents];
            }
        } else if (eventType === 'department') {
            if (value !== '0') {
                data = [
                    ...this.allStudents.filter((staff) => staff.department._id === value),
                ];
            } else {
                data = [...this.allStudents];
            }
        }
        // this.table.renderRows();
    }

    getFullName(element: Student): string {
        let name = element.name[element.name.length - 1];
        return `${name.firstName} ${name.middleName} ${name.lastName}`;
    }

    editStudent(id: number) {
        this.localStorageService.write("studentIdToEdit", id)
        this.router.navigate(['/student/add'])
    }
}
