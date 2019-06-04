import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },

            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'map', loadChildren: './map/map.module#MapModule' },
            { path: 'statistic', loadChildren: './statistic/statistic.module#StatisticModule' },
            { path: 'type-info', loadChildren: './type-info/type-info.module#TypeInfoModule' },
            {
              path: 'management',
              children: [
                {
                  path: '',
                  loadChildren: './management/management.module#ManagementModule'
                },
                {
                  path: 'details/:companyId',
                  loadChildren: './details/details.module#DetailsModule'
                },
              ]
            },
            {
                path: 'add',
                children: [
                  {
                    path: '',
                    loadChildren: './add/add.module#AddModule'
                  },
                  {
                    path: 'add-company',
                    loadChildren: './add-company/add-company.module#AddCompanyModule'
                  },
                  {
                    path: 'add-analyzer',
                    loadChildren: './add-analyzer/add-analyzer.module#AddAnalyzerModule'
                  },
                ]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
