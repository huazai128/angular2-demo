import {Injectable} from "@angular/core";         //Injectable()：注射器
import {Http,Headers,Response} from "@angular/http";   //引入Http组件,Headers对象
import {Hero} from "./hero";                       //数据类型
import "rxjs/add/operator/toPromise";           //引用toPromise():因为angular2没有提供toPromise()

@Injectable()                                         //注射装饰器：会记录本服务的元数据
export class HeroService{                           //数据服务

    private heroesUrl = "app/heroes";            //http请求连接

    constructor(private _http: Http){}             //构造函数

    private handleError(error:any):Promise<any>{    //私有方法是用来处理Promise对象异常；只能在本身的类中访问，其他类中访问会报错
        console.error("An error occurred",error);
        return Promise.reject(error.message || error); //reject()方法用于处理Promise对象失败
    }

    //请求所有的数据
    getHeroes():Promise<Hero[]>{                      //请求所有数据；这种数据获取都是使用Promise对象来处理；处理的数据可以在任何组件中使用；
        return  this._http.get(this.heroesUrl)    //Promise.resolve():表示请求成功就会返回一个回调函数 ES6
            .toPromise()                            //toPromise()：是把Observable对象转换成Promise对象;Observable对象是一个管理异步数据流强有力的方式
            .then(res => res.json().data as Hero[])  //then():方法接受一个回调函数，回调函数提取http请求参数
            .catch(this.handleError);                //catch():方法是用来捕获Promise对象中的异常；因为Promise对象处理异步是无法把异常抛出，只能通过回调函数或者catch()方法捕获；如果http请求失败抛出错误，就会被catch()方法所捕获
    }

    //根据ID获取当前点击对象的数据
    getHero(id: number):Promise<Hero>{               //根据ID获取；ID： 是number
        return this.getHeroes()                     //Promise对象
            .then(heroes => heroes.find              //返回所有数据；在根据ID查找
            (hero=> hero.id === id));                //返回查找结果
    }

    //添加新的数据
    private addHero(hero:Hero):Promise<Hero>{
        let headers = new Headers({                  //设置请求头
            "Content-Type":"application/json"
        });
        return this._http.post(this.heroesUrl,    //返回请求数据
            JSON.stringify(hero),{headers:headers}  //JSON.stringify(): 获取表单数据转换成JSON字符串
        )
            .toPromise()                            //toPromise(); 把Observable()对象装换成Promise对象就可以使用then()和catch()方法
            .then(res => res.json().data)
            .catch(this.handleError);               //catch():用来捕获错误异常
    }

    //修改数据；根据ID修改
    private updateHero(hero:Hero):Promise<Hero>{
        let headers = new Headers();
        headers.append("Content-Type","application/json");
        let url = `${this.heroesUrl}/${hero.id}`; //根据ID请求连接修改参数
        return this._http.post(                     //post请求包含请求连接，参数，请求头等等
            url,JSON.stringify(hero),{headers:headers}
        )
            .toPromise()                            //一个观察者对象是一个事件流，可以用数组型操作符来处理
            .then(() => hero)
            .catch(this.handleError);
    }

    //根据ID删除数据
    deleteHero(hero:Hero):Promise<Response>{          //Promise：使用Response
        let headers = new Headers();                 //实例化请求头
        headers.append("Content-Type","application/json");   //添加请求头
        let url = `${this.heroesUrl}/${hero.id}`;              //链接参数
        return this._http.delete(url,{headers:headers})         //delete(url,option):请求删除数据
        .toPromise()                                             //toPromise()：是把Observable观察者模式装换成Promise对象
        .catch(this.handleError);                                 //catch捕获异常
    }

    //根据ID判断是添加数据还是修改数据
    saveHero(hero:Hero):Promise<Hero>{
        if(hero.id){                                //如果ID存在就修改数据，否则添加数据
            return this.updateHero(hero);
        }
        return this.addHero(hero);
    }

}
