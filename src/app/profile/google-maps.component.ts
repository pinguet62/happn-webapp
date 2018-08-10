import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
// noinspection ES6UnusedImports
import {} from '@types/googlemaps';
import Circle = google.maps.Circle;
import LatLng = google.maps.LatLng;
import Map = google.maps.Map;
import MapOptions = google.maps.MapOptions;
import MapTypeId = google.maps.MapTypeId;
import Marker = google.maps.Marker;
import event = google.maps.event;

// https://developers.google.com/maps/documentation/javascript/tutorial

export interface MapClickEvent {
  ka: { x: number; y: number; };
  latLng: google.maps.LatLng;
  pixel: { x: number; y: number; };
  va: MouseEvent;
}

@Component({
  selector: 'app-google-maps',
  template: ``
})
export class GoogleMapsComponent implements OnInit {

  @Input() latitude: number;
  @Input() longitude: number;

  @Output() longClick: EventEmitter<MapClickEvent> = new EventEmitter<MapClickEvent>();

  map: Map;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.init();
    this.detectLongClick();
  }

  private init() {
    const position = new LatLng(this.latitude, this.longitude);
    const mapOptions: MapOptions = {
      center: position,
      zoom: 15,
      mapTypeId: MapTypeId.ROADMAP
    };
    this.map = new Map(this.elementRef.nativeElement, mapOptions);
    new Marker({map: this.map, position});
    new Circle({map: this.map, center: position, radius: 250/*m*/});
  }

  private detectLongClick(timeout: number = 500) {
    let mousePressed = false;
    event.addListener(this.map, 'mousedown', (evt: MapClickEvent) => {
      mousePressed = true;
      setTimeout(() => {
        if (mousePressed) {
          this.longClick.emit(evt);
        }
      }, timeout);
    });
    event.addListener(this.map, 'mouseup', () => {
      mousePressed = false;
    });
  }

}
