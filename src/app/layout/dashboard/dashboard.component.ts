import { ManageService } from './../../shared/services/manage.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public sliders: Array<any> = [];

    count: any;

    constructor(
    ) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: '실시간 모니터링',
                text: '계측기·센서 정보 및 서비스 제공, 알림정보'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: '장거리 무선 통신',
                text: '차세대 LPWA망 사용을 통한 LTE수준 저전력(~5years), 장거리 송신(~30km)'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: '클라우드 플랫폼',
                text:
                    '가용성(HA) 장애 복구 및 유지보수, 자동백업, 탄력적인 확장성 및 비용절감'
            }
        );

    }

    ngOnInit() {

    }



}
