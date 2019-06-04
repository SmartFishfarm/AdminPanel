import { ManageService } from './../../shared/services/manage.service';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {} from 'googlemaps';

declare var daum: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('mapCanvas') mapElement: ElementRef;

  constructor(
    private manageService: ManageService,
  ) {

  }

  ngOnInit(): void {

    this.manageService.locService().subscribe((mapData: any) => {
    
      const mapEle = this.mapElement.nativeElement;
      const options = {
        center: new daum.maps.LatLng(33.450701, 126.570667),
        level: 3
      };
      const map = new daum.maps.Map(mapEle, options);
      const geocoder = new daum.maps.services.Geocoder();

      mapData.forEach((markerData: any) => {
      
        geocoder.addressSearch(markerData.address, function(result, status) {

          if (status === daum.maps.services.Status.OK) {

              var coords = new daum.maps.LatLng(result[0].y, result[0].x);
              var marker = new daum.maps.Marker({
                  map: map,
                  position: coords,
                  title: markerData.company,
                  draggable: true,
              });
      
              var infowindow = new daum.maps.InfoWindow({
                  content: `
                  <div style="width:150px;text-align:center;padding:6px 0;">
                    ${markerData.company}
                  </div>`
              });

              marker.addListener('click', () => {
                infowindow.open(map, marker);
              });

              map.setCenter(coords);
          } 
        });

      });

    });

    /*
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
    */

  }


}

