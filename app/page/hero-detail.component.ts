import {Component,EventEmitter,OnInit,Input,Output} from "@angular/core";  //EventEmitter:自定义事件
import {ActivatedRoute,Params } from "@angular/router";  //Params:用于获取路由地址栏的参数；nodejs中获取GET地址啦的参数:req.query.；ActivatedRoute服务的可观察对象params中获取请求地址参数
import {HeroService} from "./hero.service";              //是根据ID来查询数据；所以需要数据服务
import {Hero} from "./hero";                              //数据类型

@Component({                                                 //组件
    selector:"hero-detail",
    templateUrl:"app/page/hero-detail.component.html",
    styles:[`
      .form-in{margin: 15px 0;}
    `]
})

//英雄详情组件
export class HeroDetailComponent implements OnInit{        //实现OnInit接口；在初始化的时候调用
    @Input()                                                  //[hero]：从父组件的属性绑定中取得hero数据
        hero: Hero;                                          //Input:表示输入属性   hero：属性指标是从app.component.ts模板传递过来是获取父组件app.component.ts中选中的属性
    @Output() close = new EventEmitter();                   //输出一个自定义事件
    error:any;                                              //公有属性：参数类型为any,可以接受任何数据类型
    navigated = false;
    //构造函数
    constructor(                                           //构造函数接受两个参数；
        private _heroService:HeroService,
        private _route:ActivatedRoute                       //ActivatedRoute：当前显示路由
    ){}
    //初始化数据
    ngOnInit(){                                               //初始化调用函数；生命周期钩子
        this._route.params.forEach((params: Params) => {    //params：获取路由配置地址参数；也就是请求链接参数
            if(params['id'] !== undefined ){                //如果请求地址参数id 存在表示修改数据
                let id  = +params['id'];                    //获取请求地址参数
                this.navigated = true;
                this._heroService.getHero(id).then(         //根据参数查询数据
                        hero => this.hero = hero           //返回查询结果
                )
            }else{
                this.navigated = false;
                this.hero = new Hero();                   //添加新的数据，就初始化一个hero空对象
            }
        })
    }
    //返回上一步
    goBack(savedHero:Hero = null):void{
        this.close.emit(savedHero);                       //使用自定义事件；emit：触发事件
        if(this.navigated){
            window.history.back();                       //保存成功返回上一个页面
        }
    }
    //保存
    saved():void{
        this._heroService.saveHero(this.hero).then(hero =>{
            this.hero = hero;
            this.goBack(hero);
        })
        .catch(error => this.error = error );            //用于捕获保存失败错误
    }
}
