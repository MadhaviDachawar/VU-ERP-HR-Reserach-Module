import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Excel from 'exceljs'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor() { }

    camelize(str: string): string {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    numberToWords(n) {
        var special = ['Zeroth', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelvth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth'];
        var deca = ['Twent', 'Thirt', 'Fourt', 'Fift', 'Sixt', 'Sevent', 'Eight', 'Ninet'];

        if (n < 20) return special[n];
        if (n % 10 === 0) return deca[Math.floor(n / 10) - 2] + 'ieth';
        return deca[Math.floor(n / 10) - 2] + 'y ' + special[n % 10];
    }

    ordinalSuffix(i: number) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    capitalizeString(sentence: string) {
        sentence = sentence.toLowerCase()
        let words = sentence.split(' ')
        let capitalizedString = ''
        for (let word of words) {
            if (word.length != 0 || !!word.search('')) {
                capitalizedString += word.charAt(0).toUpperCase() + word.slice(1)
                capitalizedString += ' '
            }
        }
        return capitalizedString.trimRight()
    }

    jsonToExcel(data: any) {
        const date = new Date()
            .toISOString()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/");
        console.log(date);
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet("My Sheet");

        worksheet.columns = [
            { header: "Id", key: "id", width: 10 },
            { header: "Name", key: "name", width: 32 },
            { header: "D.O.B.", key: "dob", width: 15 }
        ];

        worksheet.addRow({ id: 1, name: "John Doe", dob: new Date(1970, 1, 1) });
        worksheet.addRow({ id: 2, name: "Jane Doe", dob: new Date(1965, 1, 7) });

        workbook.xlsx.writeBuffer().then((data: any) => {
            const blob = new Blob([data], {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute("style", "display: none");
            a.href = url;
            a.download = "export.xlsx";
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        });
    }

    jsonToCSV(data: any) {

    }

    getDateFromISO(isoDate: string): string {
        let dateObj = new Date(isoDate)

        let day: any = dateObj.getDate()
        let month: any = dateObj.getMonth()
        let year: any = dateObj.getFullYear()

        if (day < 10) day = '0' + day
        if (month < 10) month = '0' + month

        return day + '/' + month + '/' + year
    }
}