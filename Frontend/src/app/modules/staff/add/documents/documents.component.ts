import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CodeGenerationService } from 'src/app/common/services/codeGeneration/code-generation.service';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

export interface Document {
    Name: string;
    Details: string;
    Filename: string;
}

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
    Documents!: FormGroup;
    objectURL: string;
    LatestUploadedFile: File;
    LatestUploadedFileRandomName: string;
    files = []

    options = [];
    filteredDocuments: Observable<any[]>;

    editPosition: number | undefined = undefined;

    displayedColumns: string[] = ['Name', 'Details', 'View', 'Edit', 'Delete'];

    dataSource: MatTableDataSource<Document>;

    // openDialog(): void {
    //   const dialogRef = this.dialog.open(ViewUploadedImageDialogComponent, {
    //     width: '250px',
    //     data: {name: "kljl", animal: "kjl"}
    //   });

    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed');
    //   });
    // }

    constructor(
        public sanitizer: DomSanitizer,
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
        private codeGenerationService: CodeGenerationService,
    ) {
        this.dataSource = new MatTableDataSource([]);
    }

    private _filter(value: string): string[] {
        if (value != null) {

            const filterValue = value.toLowerCase();

            return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
        }
        else
            return this.options

    }

    onFileUpload(fileInputEvent: any) {
        this.LatestUploadedFile = fileInputEvent.target.files[0];
        this.LatestUploadedFileRandomName = this.codeGenerationService.generateFileName() + '.' + this.LatestUploadedFile.name.split('.')[this.LatestUploadedFile.name.split('.').length - 1]
    }

    ngOnInit(): void {
        this.Documents = this._formBuilder.group({
            Name: [''],
            Details: [''],
        });

        this.options = [
            { name: "Passport size photograph", required: true },
            { name: "Signature", required: true },
            { name: "10th Examination Mark Sheet", required: true },
            { name: "10th Passing Certificate", required: true },
            { name: "12th Examination Mark Sheet", required: true },
            { name: "12th Passing Certificate", required: true },
            { name: "Domicile Certificate", required: true },
            { name: "Birth Certificate", required: true },
            { name: "School Leaving Certificate", required: true },
            { name: "Nationality Certificate" },
            { name: "Passport" },
            { name: "Entrance Test Score Card" },
            { name: "Transfer Certificate", required: true },
            { name: "Leaving Certificate", required: true },
            { name: "Migration Certificate" },
            { name: "Aadhaar Card" },
            { name: "PAN Card" },
            { name: "GAP Certificate" },
            { name: "Caste Certificate" },
            { name: "Caste Validity" },
            { name: "Non-Creamy Layer Certificate" },
            // {name: ""},
        ]

        this.filteredDocuments = this.Documents.controls.Name.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );

        this.Documents.controls.Name.valueChanges.subscribe(value => {

            let filteredArray = this.options.filter(x => x.name == value)
            // console.log(filteredArray)

            if (filteredArray.length != 0 && filteredArray.length != this.options.length) {
                setTimeout(() => {
                    document.getElementById("documentDetails").focus()
                }, 100);
            }
        })
    }

    editOtherInformation(pos: number): void {
        this.editPosition = pos;
        let doc: Document = this.dataSource.data[this.editPosition];
        this.Documents.setValue({
            Name: doc.Name,
            Details: doc.Details,
        });
        this.LatestUploadedFile = this.files[pos].file
    }

    addOtherInformation() {
        const newRow: Document = this.Documents.value

        if (this.editPosition !== undefined) {
            // newRow.Filename = generatedName + '.' + this.LatestUploadedFile.name.split('.')[this.LatestUploadedFile.name.split('.').length - 1]
            newRow.Filename = this.LatestUploadedFileRandomName
            this.dataSource.data[this.editPosition] = { ...newRow };

            this.files[this.editPosition].fileName = this.LatestUploadedFileRandomName
            this.files[this.editPosition].file = this.LatestUploadedFile

            this.editPosition = undefined;
        } else {
            // let generatedName = this.codeGenerationService.generateFileName()
            // newRow.Filename = generatedName + '.' +this.LatestUploadedFile.name.split('.')[this.LatestUploadedFile.name.split('.').length - 1]
            newRow.Filename = this.LatestUploadedFileRandomName
            this.dataSource.data.push(newRow);
            this.files.push({ fileName: this.LatestUploadedFileRandomName, file: this.LatestUploadedFile })
        }

        this.dataSource.filter = '';
        this.Documents.reset();
    }

    deleteOtherInformation(rowID: number) {
        this.dataSource.data.splice(rowID, 1);
        this.files.splice(rowID, 1)

        this.dataSource.filter = '';
    }

    ViewUploadedFile(rowID: number) {
        if (this.objectURL) {
            URL.revokeObjectURL(this.objectURL);
        }

        window.open(URL.createObjectURL(this.files[rowID].file))

        // return this.sanitizer.bypassSecurityTrustUrl(
        //     URL.createObjectURL(this.dataSource.data[rowID].File)
        // );
    }
}