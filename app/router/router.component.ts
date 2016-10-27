//路由的配置必须在index.html文件中设置<base href="/">标签
import { ModuleWithProviders }  from '@angular/core';       //
import { Routes, RouterModule } from '@angular/router';     //Routes:表示路由的配置；RouterModule：表示路由的服务

import {HeroesComponent} from "./../page/heroes.component";
import {DashboardComponent} from "./../page/dash-board.component";
import {HeroDetailComponent} from "./../page/hero-detail.component";

const  appRoutes :Routes = [                                  //Routes提供路由的配置
    { path:"",redirectTo:"/dashboard",pathMatch:"full"}, //redirectTo:路由的重定向
    { path:"heroes",component:HeroesComponent},              //path:路由器会用来匹配路由中指定的路径和浏览器地址栏的中的当前路径；  component:路由组件
    { path:"dashboard",component:DashboardComponent},
    { path:"detail/:id",component:HeroDetailComponent}
];

//RouterModule.forRoot():是导出包含路由数组的routing的常量；并加入到根NgModule组件中
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);  //forRoot():提供了路由所需要的服务提供和指令
