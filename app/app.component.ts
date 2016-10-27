import { Component} from '@angular/core';
import "./page/rxjs"

@Component({                      //组件
    selector: 'my-app',
    template:`
        <h1>{{title}}</h1>
        <nav>
        <!-- routerLinkActive:指在当前页面是时，导航增加css样式 -->
            <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
            <a routerLink="/dashboard" routerLinkActive="active">DashBoard</a>
        </nav>
        <!-- router-outlet:路由的输出 -->
        <router-outlet></router-outlet>
    `,
    styles:[`
       nav a{color: #000;text-decoration: none;font-size: 16px;transition: 0.1s;text-align:center;}
       nav a:hover{color: #1db19e;}
       nav a.active{background:  #1db19e; color: #fff;}
    `]
})
export class AppComponent{      //实现一个OnInit；就是初始化的时候就加载
    title = "Angular2";        //定义属性
}
