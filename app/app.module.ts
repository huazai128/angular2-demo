import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule}     from "@angular/forms";                      //引用FormsModule组件用于实现数据的双向绑定
import {HttpModule}      from "@angular/http";                       //http服务全局注入

import { InMemoryWebApiModule } from 'angular2-in-memory-web-api'; //这是将http客户端从Mork服务中获取数据和保存数据
import { InMemoryDataService }  from './page/hero-data.service';   //

import {AppComponent}  from './app.component';
import {HeroDetailComponent} from "./page/hero-detail.component";
import {HeroesComponent} from "./page/heroes.component";
import {DashboardComponent} from "./page/dash-board.component";
import {HeroService} from "./page/hero.service";
import {routing} from "./router/router.component";                 //把路由常量routing添加到根模块中
import {HeroSearchComponent} from "./page/hero-search.component";


@NgModule({                                                              //NgModule装饰器：全局配置，可以在所有组件中调用
                                                                         //imports:可以在外部模块引用到列表中
  imports: [ BrowserModule ,FormsModule,HttpModule,routing,            //FormsModule:导入到NgModuel中就可以实现数据的双向绑定；routing：路由配置组件的引入
    InMemoryWebApiModule.forRoot(InMemoryDataService)                    //InMemoryWebApiModule:将默认负责与远程服务器交流的辅助http服务替换成内存WEBAPI服务
  ],
  declarations: [ AppComponent,HeroDetailComponent,HeroesComponent,DashboardComponent,HeroSearchComponent],   //declarations: 用于自定义组件、管道、指令的注入 路由配置的组件都要放在这里

  providers:[HeroService],                                             //提供服务，用于数据的注入；在根目录下注入;可以在子组件使用
  bootstrap: [ AppComponent ]
})
export class AppModule { }
