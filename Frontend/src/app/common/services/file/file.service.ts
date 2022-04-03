import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FileService {

    private readonly url: string = "/api/files";

    constructor(private http: HttpClient) { }

    getFile(filename): Observable<any> {
        return this.http.get<any>(`${this.url}/${filename}`);
    }

    // createFiles(files): Observable<any> {
    //   const headers = new HttpHeaders();
    //   headers.append("enctype", "multipart/form-data");
    //   return this.http.post<any>(this.url + '/saveFiles', files, { headers: headers });
    // }

    createFiles(files: any[]): Observable<any> {
        const formData: FormData = new FormData()

        files.forEach(file => {
            // let splitFileName = file['file'].name.split('.')
            // let randFileName = file.fileName + '.' + splitFileName[splitFileName.length - 1]

            formData.append('files', file.file, file.fileName)
        });

        const headers = new HttpHeaders();
        headers.append("enctype", "multipart/form-data");
        return this.http.post(this.url + '/savefiles', formData, { headers: headers });
    }

}