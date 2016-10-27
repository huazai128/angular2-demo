//在搜索中，数据实时更新，而Promise是很难做到请求-取消请求-新请求；只能使用Observable对象来处理；Observable处理 请求-取消请求-新请求，却很简单
import {Injectable } from "@angular/core";         //引入Injectable 注入器；来保存元数据
import {Http,Response} from "@angular/http";       //
import {Observable} from "rxjs";                     //引入观察者模式

import {Hero} from "./hero";                        //引入数据类型

@Injectable()
export class HeroSearchService {                     //数据搜索服务组件
    constructor(private _http : Http){}             //构造函数
    search(term:string): Observable<Hero[]>{          //根据用户输入查询数据，是实时请求;Observable():这里使用观察者对象主是为了处理多请求的数据；
        return this._http                            //返回是一个Observable队形
            .get(`app/heroes/?name=${term}`)       //
            .map((r:Response) => r.json().data as Hero[]);  //map()：遍历数据
    }
}
