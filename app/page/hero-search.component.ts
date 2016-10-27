import {Component,OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";                //Observable:不具备多路推送数据能力
import {Subject} from "rxjs/Subject";                       //Subject是一种可以多路推送的可观察对象；Subject可以向多个Observable多路推送数据；使Observable单路推送变成多路推送
import {HeroSearchService} from "./hero-search.service";
import {Hero} from "./hero";


@Component({
  selector:"search-hero",
  templateUrl:"app/page/hero-search.component.html",
  styles:[`

  `],
  providers:[HeroSearchService]                                  //providers提供数据服务的注入；在当前目录下注入；只能在当前组件中使用
})

export class HeroSearchComponent implements OnInit{
  heroes:Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(private _heroSearch :HeroSearchService,
              private _router:Router){}
  search(term:string){
    this.searchTerms.next(term);                                 //
  }
  ngOnInit(){
      this.heroes = this.searchTerms
      .debounceTime(300)                                        //在最终输入框等待300ms没有发生变化，发出请求；如果连续输入不会触发请求
      .distinctUntilChanged()                                  //distinctUntilChanged():确保过滤条件发生改变时，才发出请求
      .switchMap(term => term ?                                  //switchMap():保留原始请求顺序，并返回最近一次http调用返回的可观察这对象；因为之前调用都被取消或丢弃
          this._heroSearch.search(term) :
          Observable.of<Hero[]>([]))
      .catch(error =>{                                            //捕获请求失败的Observble对象
          console.log(error);
          return Observable.of<Hero[]>([])
      })
  }
  getHero(hero:Hero){
      this._router.navigate(["/detail",hero.id])
  }
}
