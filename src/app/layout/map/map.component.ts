import { ManageService } from './../../shared/services/manage.service';

import { Component, OnInit, ViewChild } from '@angular/core';

import {} from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('gmap') mapElement: any;
  // map: google.maps.Map;

  constructor(
    private manageService: ManageService,
  ) {

  }

  ngOnInit(): void {
    this.manageService.locService().subscribe((mapData: any) => {
      const mapEle = this.mapElement.nativeElement;

      const mapProperties = {
        center: new google.maps.LatLng(36.8260497, 126.8691687),
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      const map = new google.maps.Map(mapEle, mapProperties);

      mapData.forEach((markerData: any) => {
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <h5>${markerData.company}</h5>
          `
        });

        const marker = new google.maps.Marker({
          position: markerData,
          map,
          title: markerData.company,
          draggable: true,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

      });

    });
  }


}

