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
                    path: 'add-channel',
                    loadChildren: './add-channel/add-channel.module#AddChannelModule'
                  },
                  {
                    path: 'add-analyzer',
                    loadChildren: './add-analyzer/add-analyzer.module#AddAnalyzerModule'
                  },
                  {
                    path: 'add-schedule',
                    loadChildren: './add-schedule/add-schedule.module#AddScheduleModule'
                  },
                ]
            },

            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            //{ path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
