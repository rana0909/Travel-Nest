import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Observable, tap } from 'rxjs';

export interface IListing {
  _id: string;
  id: number;
  name: string;
  description: string;
  propertyType: string;
  cancellationPolicy: string;
  accommodates: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  price: number;
  guestsIncluded: number;
  numberOfReviews: number;
  rating: number;
  amenities: string[];
  images: IImage;
  hostInfo: IHost;
  location: ILocation;
  address: IAddress;
  rules: string;
}

interface IImage {
  pictureUrl: string;
  thumbnailUrl: string;
}

interface IAddress {
  building: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

interface IHost {
  name: string;
  id: number;
  address: IAddress;
  contactNo: string;
  hostIdentityVerified: boolean;
}

interface ILocation {
  lat: string;
  lng: string;
}

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  constructor(private http: HttpClient) {}
  getListings(): Observable<IListing[]> {
    return this.http.get<IListing[]>('http://localhost:5500/api/properties');
  }

  addListing(form: FormGroup): Observable<IListing> {
    const token = localStorage.getItem('token') || '';
    const data = {
      name: form.value.name,
      propertyType: form.value.propertyType,
      cancellationPolicy: form.value.cancellationPolicy,
      description: form.value.description,
      accomodates: form.value.accomodates,
      bedrooms: form.value.bedrooms,
      beds: form.value.beds,
      bathrooms: form.value.bathrooms,
      price: form.value.price,
      rules: form.value.rules,
      images: {
        pictureUrl: form.value.imageUrl,
      },
      address: {
        building: form.value.building,
        street: form.value.street,
        city: form.value.city,
        state: form.value.state,
        country: form.value.country,
      },
    };
    return this.http
      .post<IListing>('http://localhost:5500/api/properties', data, {
        headers: new HttpHeaders({
          token: token,
        }),
      })
      .pipe(
        tap((response: any) => {
          console.log(response);
        })
      );
  }
}
