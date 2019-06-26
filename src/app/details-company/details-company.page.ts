import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, Marker} from '@ionic-native/google-maps';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-details-company',
  templateUrl: './details-company.page.pug',
  styleUrls: ['./details-company.page.scss'],
})
export class DetailsCompanyPage implements OnInit {

  map: GoogleMap;
  public company;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private platform: Platform
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.company = this.router.getCurrentNavigation().extras.state.company;
      }
    });
  }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    await this.platform.ready();
    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: parseFloat(this.company.latitude),
          lng: parseFloat(this.company.longitude)
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    const marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'green',
      animation: 'DROP',
      position: {
        lat: parseFloat(this.company.latitude),
        lng: parseFloat(this.company.longitude)
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      // alert('clicked');
    });
  }
}
