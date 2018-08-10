import {Component} from '@angular/core';
import {Device, HappnService, User} from '../happn.service';
import {MapClickEvent} from '../profile/google-maps.component';

@Component({
  selector: 'app-profile',
  template: `
    <ng-template [ngIf]="user && device">
      <app-google-maps
        [latitude]="device.position.latitude" [longitude]="device.position.longitude"
        (longClick)="changeLocation($event)"></app-google-maps>
    </ng-template>
  `,
  styles: [`
    app-google-maps {
      display: block;
      width: 80%;
      height: 500px; /* TODO 50%*width */
    }
  `]
})
export class MeComponent {

  user: User;

  device: Device;

  constructor(private happnService: HappnService) {
    this.happnService.getProfile('me').subscribe(it =>
      this.user = it
    );
    this.refreshDevice();
  }

  private refreshDevice() {
    this.happnService.getDevices().subscribe(it => {
      if (it && it.length > 0) {
        this.device = it[0]; // TODO solution for multi-device?
      }
    });
  }

  changeLocation(event: MapClickEvent) {
    this.happnService.setPosition(this.device.id, {latitude: event.latLng.lat(), longitude: event.latLng.lng()}).subscribe(() => {
      this.refreshDevice();
    });
  }

}
