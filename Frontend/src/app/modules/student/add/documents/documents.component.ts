import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { CodeGenerationService } from 'src/app/common/services/codeGeneration/code-generation.service';

export interface Document {
    Name: string;
    Number: string;
    Details: string;
    Filename: string;
}

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

    displayedColumns: string[] = ['Name', 'Number', 'Details', 'View', 'Edit', 'Delete'];

    dataSource: MatTableDataSource<Document>;

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
            Number: [''],
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
            { name: 'diploma' },
            { name: 'Under Graduation marksheet' },
            { name: 'Post Graduation markheet' },
            { name: 'Experience Certificate' },
            { name: 'UGC approved Experience Certificate' },
            { name: 'Industrial Experience Certificate' },
            { name: 'Document for change in Name' },
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
        ]

        this.filteredDocuments = this.Documents.controls.Name.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );

        this.Documents.controls.Name.valueChanges.subscribe(value => {
            let filteredArray = this.options.filter(x => x.name == value)

            if (filteredArray.length != 0 && filteredArray.length != this.options.length) {
                setTimeout(() => {
                    document.getElementById("documentNumber").focus()
                }, 100);
            }
        })
    }

    editOtherInformation(pos: number): void {
        this.editPosition = pos;
        let doc: Document = this.dataSource.data[this.editPosition];
        this.Documents.setValue({
            Name: doc.Name,
            Number: doc.Number,
            Details: doc.Details,
        });
        this.LatestUploadedFile = this.files[pos].file
    }

    addOtherInformation() {
        const newRow: Document = this.Documents.value

        if (this.editPosition !== undefined) {
            newRow.Filename = this.LatestUploadedFileRandomName
            this.dataSource.data[this.editPosition] = { ...newRow };

            this.files[this.editPosition].fileName = this.LatestUploadedFileRandomName
            this.files[this.editPosition].file = this.LatestUploadedFile

            this.editPosition = undefined;
        } else {
            newRow.Filename = this.LatestUploadedFileRandomName
            this.dataSource.data.push(newRow);
            this.files.push({ fileName: this.LatestUploadedFileRandomName, file: this.LatestUploadedFile })
        }

        this.dataSource.filter = '';
        this.Documents.reset();
    }

    deleteOtherInformation(rowID: number) {
        this.editPosition = undefined;
        this.dataSource.data.splice(rowID, 1);
        this.files.splice(rowID, 1)
        this.Documents.reset();
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
