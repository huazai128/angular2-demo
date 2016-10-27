import { Component,OnInit} from '@angular/core';        //OnInit：生命周期钩子在初始化加载
import{ Router } from "@angular/router";                //Router：路由
import { Hero } from "./hero";                           //数据类型
import { HeroService } from "./hero.service";           //数据服务可以在多个组件中共享

@Component({                                                //组件
    selector: 'heroes-list',                             //这令通过指令的注入到元素立面
    templateUrl: "app/page/heroesComponent.html",    //模板
    styleUrls:["app/page/style.css"]                   //模板样式
})
export class HeroesComponent implements OnInit{         //实现一个OnInit；就是初始化的时候就加载
    heroes : Hero[];                                       //定义类型为Hero数组类型
    selectedHero:Hero;                                    //selectedHero:公有变量：属性类型是Hero
    addingHero = false ;
    error:any;
    constructor(private _heroService:HeroService,private _router:Router){}      //构造函数
    onSelect(hero : Hero){
        this.selectedHero = hero;
    }
                                                             //初始化加载
    ngOnInit(){                                              //表示生命周期的钩子，在初始化时调用
        this._heroService.getHeroes().then( heroes => this.heroes = heroes);  //一旦获取成功，就会把回调函数作为参数传递给then()函数  箭头函数的this永远指向构造函数
    }
                                                             //根据ID显示详情页面
    getDetail(){                                             //这本身是已经选中的hero对象所以在点击的时候不需要传递当前hero对象
        this._router.navigate(["/detail",this.selectedHero.id]);
    }
                                                             //增加英雄数据
    addHero(){
        this.addingHero = true;
        this.selectedHero = null;
    }
    close(savedHero:Hero){
        this.addingHero = false;
        if(savedHero){
          this._heroService.getHeroes().then( heroes => this.heroes = heroes);
        }
    }
                                                              //根据ID删除当前Hero对象数据
    deleteHero(hero : Hero,event: any){
        event.stopPropagation();                             //阻止事件冒泡，停止事件传播
        this._heroService.deleteHero(hero)
            .then(res => {
                this.heroes = this.heroes.filter(h => h !==hero);  //更新heroes数据；filter():过滤掉hero对象；
                if(this.selectedHero === hero){           //判断当前hero是否等于selectedHero
                    this.selectedHero === null;           //重新给selectedHero赋值
                }
            })
            .catch(error => console.log("出错啦"));           //catch是用来捕获Promise的异常
    }
}
