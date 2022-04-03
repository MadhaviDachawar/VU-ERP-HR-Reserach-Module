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
import { DepartmentService } from 'src/app/common/services/department/department.service';
import { FacultyService } from 'src/app/common/services/faculty/faculty.service';
import { LocalstorageService } from 'src/app/common/services/localStorage/localstorage.service';
import { SchoolService } from 'src/app/common/services/school/school.service';
import { TitleServiceService } from 'src/app/common/services/title/title-service.service';
import { Staff } from '../staff.model';
import { StaffService } from '../staff.service';

interface StaffTable {
    _id?: string;
    empNumber: string;
    name: string;
    contact: string;
    email: string;
}

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit, AfterViewInit, OnDestroy {
    matPaginatorLength = 0

    staffs: Staff[];
    allStaffs: Staff[];

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
    staffSub: Subscription;

    displayedColumns: string[] = [
        'select',
        'srNo',
        'empNumber',
        'name',
        'contact',
        'email',
        'edit'
    ];
    dataSource: MatTableDataSource<StaffTable>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    selection = new SelectionModel<StaffTable>(true, []);

    facultyId: FormControl;
    schoolId: FormControl;
    departmentId: FormControl;

    constructor(
        private localStorageService: LocalstorageService,
        private router: Router,
        private titleService: TitleServiceService,
        private staffService: StaffService,
        private facultyService: FacultyService,
        private schoolService: SchoolService,
        private departmentService: DepartmentService
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle('Staff View');

        this.staffSub = this.staffService.getStaffs().subscribe((data: any) => {

            this.matPaginatorLength = data.length

            this.staffs = [...data];
            this.allStaffs = [...data];
            this.dataSource = new MatTableDataSource(
                data.map((s) => {
                    return {
                        _id: s._id,
                        name: this.getFullName(s),
                        email: s.emails[0],
                        contact: s.mobileNumbers[0],
                        empNumber: s.employmentNumber,
                    };
                })
            );

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

        });
        this.facultySub = this.facultyService.getFaculties().subscribe((data) => {
            this.faculties = [{ _id: '0', facultyName: 'All' }, ...data];
        });
        this.schoolSub = this.schoolService.getSchools().subscribe((data) => {
            this.allSchools = data.map((data) => {
                return {
                    _id: data._id,
                    schoolName: data.schoolName,
                    facultyId: data.faculty._id,
                };
            });
            this.allSchools = [
                {
                    _id: '0',
                    schoolName: 'All',
                    facultyId: '0',
                },
                ...this.allSchools,
            ];
            this.schools = [...this.allSchools];
        });
        this.departmentSub = this.departmentService
            .getDepartments()
            .subscribe((data) => {
                this.allDepartments = data.map((data) => {
                    return {
                        _id: data._id,
                        departmentName: data.departmentName,
                        schoolId: data.school._id,
                        facultyId: data.faculty._id,
                    };
                });
                this.allDepartments = [
                    {
                        _id: '0',
                        departmentName: 'All',
                        schoolId: '0',
                        facultyId: '0',
                    },
                    ...this.allDepartments,
                ];
                this.departments = [...this.allDepartments];
            });

        this.facultyId = new FormControl('');
        this.schoolId = new FormControl('');
        this.departmentId = new FormControl('');
    }

    ngAfterViewInit(): void { }

    ngOnDestroy(): void {
        this.staffSub.unsubscribe();
        this.facultySub.unsubscribe();
        this.schoolSub.unsubscribe();
        this.departmentSub.unsubscribe();
    }

    toggleRow(row: any, index: number) {
        this.selection.toggle(row);
    }

    private isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    checkboxLabel(row?: StaffTable, index?: number): string {
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
        let data: Staff[];
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
                    ...this.allStaffs.filter((staff) => staff.faculty._id === value),
                ];
            } else {
                this.schools = [...this.allSchools];
                this.departments = [...this.allDepartments];
                data = [...this.allStaffs];
            }
        } else if (eventType === 'school') {
            if (value !== '0') {
                this.departments = [
                    ...this.allDepartments.filter(
                        (department) => department.schoolId === value
                    ),
                ];
                data = [
                    ...this.allStaffs.filter((staff) => staff.school._id === value),
                ];
            } else {
                this.departments = [...this.allDepartments];
                data = [...this.allStaffs];
            }
        } else if (eventType === 'department') {
            if (value !== '0') {
                data = [
                    ...this.allStaffs.filter((staff) => staff.department._id === value),
                ];
            } else {
                data = [...this.allStaffs];
            }
        }
        this.dataSource.data = data.map((s) => {
            return {
                _id: s._id,
                name: this.getFullName(s),
                email: s.emails[0],
                contact: s.mobileNumbers[0],
                empNumber: s.employmentNumber,
            };
        });
        // this.table.renderRows();
    }

    getFullName(element: Staff): string {
        let name = element.name[element.name.length - 1];
        return `${name.firstName} ${name.middleName} ${name.lastName}`;
    }

    editStaff(id: number) {
        this.localStorageService.write("staffIdToEdit", id)
        this.router.navigate(['/staff/add'])
    }
}
