import {Component, OnInit} from "@angular/core";
import {Hero} from "./hero";                             //数据类型
import {HeroService} from "./hero.service";            //数据服务
import {Router} from "@angular/router";                //路由服务

@Component({
    selector:"dash-board",
    templateUrl:"app/page/dash-board.html",
    styleUrls:["app/page/dash.css"]
})
export class DashboardComponent  implements OnInit{     //接口的实现   初始化数据
    heroes: Hero[] = [];                                  //定义一个公开的属性  类型为Hero数组类型
    constructor(private _heroService:HeroService,private _router:Router){}     //构造函数接受一个参数
    ngOnInit(){                                            //生命周期钩子，初始化调用ngOnInit函数
        //this._heroService.getHeroes()：Promise使用then方法接受一个函数
        this._heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1,5));  //slice():是在已有数组中返回选定的元素；返回的是一个数组
    }
    getDetail(hero:Hero){                                  //点击当前hero时，获取hero对象
        var link = ["/detail",hero.id];                  //生成链接参数
        this._router.navigate(link);                      //根据ID导航到相应的heroDetail详情页
    }
}
