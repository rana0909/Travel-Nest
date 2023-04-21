import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IListing, ListingService } from './listing.service';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private _listings$ = new BehaviorSubject<IListing[]>([]);
  private listingsList: IListing[] = [];
  listings$ = this._listings$.asObservable();
  constructor(private listingService: ListingService) {
    this.listingService.getListings().subscribe((data) => {
      this._listings$.next(data);
      this.listingsList = data;
    });
  }
  filterListings(searchText: string) {
    if (searchText.length > 0) {
      this._listings$.next(
        this.listingsList.filter((each) => each.name.includes(searchText))
      );
    } else {
      this._listings$.next(this.listingsList);
    }
  }
}
