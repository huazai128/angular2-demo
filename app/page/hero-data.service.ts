import { Hero } from "./hero";                                   //数据
import {InMemoryDbService} from "angular2-in-memory-web-api"; //让http客服端从一个Mock服务中获取和保存数据

export class InMemoryDataService  implements InMemoryDbService{   //实现InMemoryDbService服务
  createDb(){
    let heroes = [
      {id: 11,name:"HuaZai"},
      {id: 12,name:"Mini"},
      {id: 13,name:"KeKe"},
      {id: 14,name:"Jame"},
      {id: 15,name:"LiLi"},
      {id: 16,name:"Pass"},
      {id: 17,name:"No bor"},
      {id: 18,name:"Heroes"},
      {id: 19,name:"Kimi"},
      {id: 20,name:"Boss"}
    ];
    return {heroes};
  }
}



