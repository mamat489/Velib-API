import { Injectable } from '@angular/core';
import { Subject,Observable }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceSelectStationService {
	myMethod$: Observable<any>;
    private myMethodSubject = new Subject<any>();

  constructor() { 
  	this.myMethod$ = this.myMethodSubject.asObservable();
   }

   myMethod(data) {
        console.log(data+"est de type dans le service :"+typeof data);
        this.myMethodSubject.next(data); //envoie
    }
    
}
