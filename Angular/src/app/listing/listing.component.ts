import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IListing, ListingService } from '../services/listing.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent implements OnInit {
  id: string = '';
  isOpen: boolean = false;
  data: IListing | undefined = undefined;
  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.listingService.getListings().subscribe((listings) => {
      this.data = listings.find((each) => each._id.toString() === this.id);
    });
    console.log(this.id);
  }

  handleToggle() {
    this.isOpen = this.isOpen ? false : true;
  }
}
