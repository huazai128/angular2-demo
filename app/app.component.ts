import { Component} from '@angular/core';
import "./page/rxjs"

@Component({                      //���
    selector: 'my-app',
    template:`
        <h1>{{title}}</h1>
        <nav>
        <!-- routerLinkActive:ָ�ڵ�ǰҳ����ʱ����������css��ʽ -->
            <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
            <a routerLink="/dashboard" routerLinkActive="active">DashBoard</a>
        </nav>
        <!-- router-outlet:·�ɵ���� -->
        <router-outlet></router-outlet>
    `,
    styles:[`
       nav a{color: #000;text-decoration: none;font-size: 16px;transition: 0.1s;text-align:center;}
       nav a:hover{color: #1db19e;}
       nav a.active{background:  #1db19e; color: #fff;}
    `]
})
export class AppComponent{      //ʵ��һ��OnInit�����ǳ�ʼ����ʱ��ͼ���
    title = "Angular2";        //��������
}
