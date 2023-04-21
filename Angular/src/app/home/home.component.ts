import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HelperService } from '../services/helper.service';
import { IListing, ListingService } from '../services/listing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listings: IListing[] = [];
  constructor(private helperService: HelperService) {}

  ngOnInit(): void {
    this.helperService.listings$.subscribe((data) => (this.listings = data));
  }
}
