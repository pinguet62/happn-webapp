import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
// noinspection ES6UnusedImports
import {} from '@types/googlemaps';
import Circle = google.maps.Circle;
import LatLng = google.maps.LatLng;
import Map = google.maps.Map;
import MapOptions = google.maps.MapOptions;
import MapTypeId = google.maps.MapTypeId;
import Marker = google.maps.Marker;

// https://developers.google.com/maps/documentation/javascript/tutorial

@Component({
  selector: 'app-google-maps',
  template: `
    <div #gmap style="height: 100%; width: 100%;"></div>
  `
})
export class GoogleMapsComponent implements OnInit {

  @Input() latitude: number;
  @Input() longitude: number;

  // @ViewChild('gmap')
  gmapElement: ElementRef;

  map: Map;

  constructor(private elementRef: ElementRef) {
    this.gmapElement = this.elementRef;
  }

  ngOnInit() {
    const position = new LatLng(this.latitude, this.longitude);
    const mapOptions: MapOptions = {
      center: position,
      zoom: 15,
      mapTypeId: MapTypeId.ROADMAP
    };
    this.map = new Map(this.gmapElement.nativeElement, mapOptions);
    new Marker({map: this.map, position});
    new Circle({map: this.map, center: position, radius: 250/*m*/});
  }

}
