import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/common/services/common/common.service';
import { LocalstorageService } from 'src/app/common/services/localStorage/localstorage.service';
import { AccountsService } from '../../accounts.service';

interface feeStructureTable {
    _id?: string;
    academicYear: string;
    programme: string;
    faculty: string;
    school: string;
    department: string;
    year: string;
    configurationName: string;
    total: Number
}

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, AfterViewInit {

    matPaginatorLength = 0

    displayedColumns: string[] = [
        'select',
        'academicYear',
        'programme',
        'faculty',
        'school',
        'department',
        'year',
        'configurationName',
        'total',
        'edit'
    ];

    dataSource: MatTableDataSource<feeStructureTable>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    selection = new SelectionModel<feeStructureTable>(true, []);

    facultyId: FormControl;
    schoolId: FormControl;
    departmentId: FormControl;

    constructor(
        private localStorageService: LocalstorageService,
        private router: Router,
        private accountsService: AccountsService,
        private commonService: CommonService,
    ) { }

    feeStructureSub: Subscription

    ngOnInit(): void {
        this.setData()
    }

    setData() {
        this.feeStructureSub = this.accountsService.getFeeStructures().subscribe((data) => {

            this.matPaginatorLength = data.length

            this.dataSource = new MatTableDataSource(
                data.map((fs) => {
                    return {
                        _id: fs._id,
                        academicYear: fs.academicYear.slice(0, 4) + '-' + fs.academicYear.slice(4),
                        programme: fs.programme.name,
                        faculty: fs.faculty.name,
                        school: fs.school.name,
                        department: fs.department.name,
                        year: this.commonService.numberToWords(fs.year + 1) + ' Year',
                        configurationName: fs.configurationName,
                        total: fs.structure.map(t => t.amount).reduce((acc, value) => Number(acc) + Number(value), 0)
                    };
                })
            );

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    ngAfterViewInit(): void { }

    ngOnDestroy(): void {
        this.feeStructureSub.unsubscribe();
    }

    toggleRow(row: any, index: number) {
        this.selection.toggle(row);
    }

    private isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    checkboxLabel(row?: feeStructureTable, index?: number): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${index + 1
            }`;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase()
        this.dataSource.data = this.dataSource.filteredData

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    editStudent(id: number) {
        this.localStorageService.write("studentIdToEdit", id)
        this.router.navigate(['/student/add'])
    }

    export(type: String) {
        console.log(this.dataSource.filteredData)
    }
}