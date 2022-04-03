import { Injectable } from '@angular/core';

@Injectable({
     providedIn: 'root'
})
export class LocalstorageService {

     constructor() { }
     write(key: string, value: any) {
          if (value) {
               value = JSON.stringify(value);
          }
          localStorage.setItem(key, value);
     }

     read<T>(key: string): T | any {

          try {
               const value: string | null = localStorage.getItem(key);

               if (value && value !== 'undefined' && value !== 'null') {
                    return <T>JSON.parse(value);
               }

          } catch (error) {
               return null;
          }

     }

     unset(key: string){
          localStorage.removeItem(key)
     }
}