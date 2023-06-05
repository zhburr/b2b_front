import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class LoaderService {
  protected isLoading = new Subject<boolean>();
  constructor() {}
  watchStorage(): Observable<any> {
    return this.isLoading.asObservable();
  }

  show() {
    this.isLoading.next(true);
  }
  hide() {
    this.isLoading.next(false);
  }
}
