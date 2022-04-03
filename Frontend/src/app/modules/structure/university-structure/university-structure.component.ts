import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TitleServiceService } from 'src/app/common/services/title/title-service.service';
import { MatDialog } from '@angular/material/dialog';
import { FacultyService } from 'src/app/common/services/faculty/faculty.service';
import { SchoolService } from 'src/app/common/services/school/school.service';
import { DepartmentService } from 'src/app/common/services/department/department.service';
import { ProgrammeService } from 'src/app/common/services/programme/programme.service';
import { ProgrammeServiceDataYearly } from 'src/app/common/services/programmedatayearly/programmedatayearly.service';

//app\common\services\programmedatayearly\programmedatayearly.service.ts

// dialogBoxes
import { FacultyComponent } from 'src/app/dialogBoxes/structure/faculty/faculty.component';
import { SchoolComponent } from 'src/app/dialogBoxes/structure/school/school.component';
import { DepartmentComponent } from 'src/app/dialogBoxes/structure/department/department.component';
import { ProgrammeComponent } from 'src/app/dialogBoxes/structure/programme/programme.component';
import { ProgrammeDataYearlyComponent } from 'src/app/dialogBoxes/structure/programmedatayearly/programmedatayearly.component';

//src/app/dialogBoxes/structure/programmedatayearly/programmedatayearly.component

import { NotificationServiceService } from 'src/app/common/services/notification/notification-service.service';
import { StructureService } from '../structure.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-university-structure',
    templateUrl: './university-structure.component.html',
    styleUrls: ['./university-structure.component.scss']
})
export class UniversityStructureComponent implements OnInit {

    treeData = []

    displayedColumns: string[] = ['SanctionedIntake', 'TotalAdmittedStudents','Fees','AcademicYear'];
    //AcademicYear: "2019-2020" Fees: 125000 SanctionedIntakeSanctionedIntake: 150 TotalAdmittedStudents: 150 duration

    facultyDialog = FacultyComponent
    schoolDialog = SchoolComponent
    departmentDialog = DepartmentComponent
    programmeDialog = ProgrammeComponent
    programmeDataYearlyDialog = ProgrammeDataYearlyComponent

    getObjectEntries(object: JSON) {

        return Object.entries(object).filter(oE =>
            oE[0] != "_id" &&
            oE[0] != "__v" &&
            oE[0] != "name" &&
            oE[0] != "type" &&
            oE[0] != "faculty" &&
            oE[0] != "school" &&
            oE[0] != "department" &&
            oE[0] != "programme"
        ).sort()
    }

    getHeaderForTable(object: JSON) {

        return Object.entries(object).filter(oE => {

            if (oE[0] == "AcademicYear" || oE[0] == "Fees" || oE[0] == "SanctionedIntake" ||
                oE[0] == "TotalAdmittedStudents") {
                return oE[1];
            }
            return false;
        })
    }

    treeFilter = new FormControl('');

    selected = 'faculty'

    treeControl = new NestedTreeControl<any>(node => node.children);

    dataSource = new MatTreeNestedDataSource<any>();

    constructor(private titleService: TitleServiceService,
        public dialog: MatDialog,
        private changeDetectorRef: ChangeDetectorRef,
        private structureService: StructureService,
        private facultyService: FacultyService,
        private schoolService: SchoolService,
        private departmentService: DepartmentService,
        private programmeService: ProgrammeService,
        private programmeServiceDataYearly: ProgrammeServiceDataYearly,
        private notificationService: NotificationServiceService
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle("University Structure")

        this.fetchData()
    }

    fetchData() {

        let expansionModel = this.treeControl.expansionModel.selected
        console.log(this.treeControl.dataNodes)

        let organization = []
        let collegeList = []
        let facultyList = []
        let schoolsList = []
        let departmentsList = []
        let programmesList = []
        let programmesListYearwise = []

        this.programmeServiceDataYearly.getProgrammesyearly().subscribe(programmesDataYearly => {

            programmesListYearwise = programmesDataYearly;

            console.log(programmesListYearwise);

            this.programmeService.getProgrammes().subscribe(programmes => {
                // programmesList = programmes

                programmes.forEach(p => {
                    programmesList.push({ ...p, type: "Programme", children: programmesListYearwise.filter(py => py.programme._id == p._id).map(e => { return { ...e, type: "ProgrammeDataYearly" } }) })
                });

                this.departmentService.getDepartments().subscribe(departments => {

                    departments.forEach(d => {
                        departmentsList.push({ ...d, type: "Department", children: programmesList.filter(p => p.department._id == d._id).map(e => { return { ...e, type: "Programme" } }) })
                    });

                    this.schoolService.getSchools().subscribe(schools => {
                        schools.forEach(s => {
                            schoolsList.push({ ...s, type: "School", children: departmentsList.filter(d => d.school._id == s._id) })
                        });

                        this.facultyService.getFaculties().subscribe(faculties => {
                            faculties.forEach(f => {
                                facultyList.push({ ...f, type: "Faculty", children: schoolsList.filter(d => d.faculty._id == f._id) })
                            });

                            this.structureService.getUniversityStructure().subscribe(university => {

                                collegeList = [{
                                    _id: "611f84462e4f0e09f5832256",
                                    name: "VU, Kondhwa",
                                    type: "College",
                                    children: facultyList
                                }]

                                organization = [{
                                    name: "Vishwakarma Institutes",
                                    type: "Organization",
                                    children: collegeList
                                }]

                                this.treeData = organization
                                this.dataSource.data = this.treeData
                                this.treeControl.dataNodes = this.dataSource.data
                                this.treeControl.collapseAll();

                                setTimeout(() => {
                                    expansionModel.forEach(object => {
                                        this.treeControl.expand(object)
                                    });
                                }, 1000);
                            })
                        })
                    })
                })
            })
        }) // programmes yearly 
    }

    openDialog(dataToSend: {}, component: any): void {
        this.changeDetectorRef.detach()
        const dialogRef = this.dialog.open(component, {
            data: dataToSend,
        });
        dialogRef.afterClosed().subscribe(result => {
            this.changeDetectorRef.reattach()

            if (result == undefined) return

            if (result.action == "add") {
                console.log(result)
                if (result.type == "College") {
                    this.facultyService.createFaculty(result).subscribe(() => {
                        this.notificationService.success("Added successfully")
                    })
                } else if (result.type == "Faculty") {
                    this.schoolService.createSchool(result).subscribe(() => {
                        this.notificationService.success("Added successfully")
                    })
                } else if (result.type == "School") {
                    this.departmentService.createDepartment(result).subscribe(() => {
                        this.notificationService.success("Added successfully")
                    })
                }
                else if (result.type == "Department") {
                    this.programmeService.createProgramme(result).subscribe(() => {
                        this.notificationService.success("Added successfully")
                    })
                }
                else if (result.type == "Programme") {
                    this.programmeServiceDataYearly.createProgrammeyearly(result).subscribe(() => {
                        this.notificationService.success("Added successfully")
                    })
                }
            }
            else {
                if (result.type == "Faculty") {
                    this.facultyService.updateFaculty(result._id, result).subscribe(() => {
                        this.notificationService.success("Updated successfully")
                    })
                } else if (result.type == "School") {
                    this.schoolService.updateSchool(result._id, result).subscribe(() => {
                        this.notificationService.success("Updated successfully")
                    })
                } else if (result.type == "Department") {
                    this.departmentService.updateDepartment(result._id, result).subscribe(() => {
                        this.notificationService.success("Updated successfully")
                    })
                } else if (result.type == "Programme") {
                    this.programmeService.updateProgramme(result._id, result).subscribe(() => {
                        this.notificationService.success("Updated successfully")
                    })
                }
            }

            this.fetchData()
        });
    }

    searchChildren(node) {
        return node.filter(x => !x.name.toLowerCase().search(this.treeFilter.value.toLowerCase()))
    }

    recursiveSearch(tree) {
        let filteredTree = tree

        filteredTree = this.searchChildren(tree)

        return filteredTree
    }

    filterTree() {
        let filterString = this.treeFilter.value.toLowerCase()
        let filteredTree = this.treeData

        if (filterString != "") {

            this.recursiveSearch(this.treeData)

            filteredTree.forEach(element => {
                this.treeControl.expandDescendants(element)
            });
        }
        else {
            filteredTree = this.treeData
            this.treeControl.collapseAll()
        }
    }

    hasChild = (_: number, node: any) => !!node.children && node.children.length >= 0;

    isLastChild = (_: number, node: any) => {

        console.log(node)

        // return !!node.AcademicYear && node.AcademicYear;
        return true;
    }

    findColumnValue = (element: unknown, column: string) => {
        // eval(`element.${column}`);
        console.log(element)
        console.log(column)
    }

    add(node: any) {

        console.log(node.type);

        if (node.type.toLowerCase() == "college") {
            this.openDialog({ action: "add", ...node }, this.facultyDialog)
        }
        else if (node.type.toLowerCase() == "faculty") {
            this.openDialog({ action: "add", ...node }, this.schoolDialog)
        }
        else if (node.type.toLowerCase() == "school") {
            this.openDialog({ action: "add", ...node }, this.departmentDialog)
        }
        else if (node.type.toLowerCase() == "department") {
            this.openDialog({ action: "add", ...node }, this.programmeDialog)
        }
        else if (node.type.toLowerCase() == "programme") {
            this.openDialog({ action: "add", ...node }, this.programmeDataYearlyDialog)
        }
    }

    edit(node: any) {
        if (node.type.toLowerCase() == "faculty") {
            this.openDialog({ action: "edit", ...node }, this.facultyDialog)
        }
        else if (node.type.toLowerCase() == "school") {
            this.openDialog({ action: "edit", ...node }, this.schoolDialog)
        }
        else if (node.type.toLowerCase() == "department") {
            this.openDialog({ action: "edit", ...node }, this.departmentDialog)
        }
        else if (node.type.toLowerCase() == "programme") {
            this.openDialog({ action: "edit", ...node }, this.programmeDialog)
        }
    }

    disable(node: any) {

    }

    expandAll() {
        this.treeControl.expandAll()
    }

    collapseAll() {
        this.treeControl.collapseAll()
    }
}