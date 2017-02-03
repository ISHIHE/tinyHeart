var fruitObj = function(){
    this.alive = [];//bool值 是否活着
    this.x = [];
    this.y = [];
    this.aneNo = [];//海葵代号
    this.l = [];//图片长度，通过控制图片长度来控制果实慢慢变大
    this.spd = [];//速度，使不同果实具有不同的速度
    this.fruitType = [];//果实类型  有蓝、黄两种
    this.orange = new Image();
    this.blue = new Image();
}
//设置果实数量
fruitObj.prototype.num = 30;
//初始化
fruitObj.prototype.init = function(){
    for (var i = 0; i < this.num; i++) {
      this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNo[i] = 0;
        this.l[i] = 0;
        this.spd[i] = Math.random() * 0.017 + 0.003;//[0.005,0.015)
        this.fruitType[i] = "";
        //this.born(i);
    }
    //获取果实图片资源
    this.orange.src = "./src/fruit.png";
    this.blue.src = "./src/blue.png";
}
//绘制果实并让果实上浮
fruitObj.prototype.draw = function(){
    for (var i = 0; i < this.num; i++) {
      //draw
      //找一个海葵  grow  fly up
        //如果果实状态为true，则绘制果实并慢慢长大
        if(this.alive[i]){
            //判断果实类型
            if(this.fruitType[i] == "blue"){
                var pic = this.blue;
            }else{
                pic = this.orange;
            }
            //  限制果实最大大小
            if(this.l[i] <= 14){
                var No = this.aneNo[i];
                this.x[i] = ane.headx[No];
                this.y[i] = ane.heady[No];
                this.l[i] += this.spd[i] * deltaTime;//让果实随时间慢慢长大
            }else{
                this.y[i] -= this.spd[i] * 7 * deltaTime;//当果实长到一定程度后就慢慢向上飘
            }
            ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,this.l[i],this.l[i]);
            //果实上升高度大于10则更改果实状态为false
            if(this.y[i] < 10){
                this.alive[i] = false;
            }
        }
    }

}
//找一个海葵 让果实出生
fruitObj.prototype.born = function(i){
    this.aneNo[i] = Math.floor(Math.random() * ane.num);//果实随机找一个海葵出生
    this.l[i] = 0;//果实出生时长度为0  慢慢长大
    this.alive[i] = true;
    var ran = Math.random();
    if(ran<0.2){
        this.fruitType[i] = "blue";//orange blue
    }else{
        this.fruitType[i] = "orange";//orange blue
    }
}

fruitObj.prototype.dead = function(i){
    this.alive[i] = false;
}


//控制果实个数
function fruitMonitor(){
    var num = 0;
    for (var i = 0; i < fruit.num; i++) {
      if(fruit.alive[i]){
          num++;
      }
    }
    if(num < 15){
        //send fruit
        sendFruit();
        return ;
    }
}
//控制果实出生
function sendFruit(){
    for (var i = 0; i < fruit.num; i++) {
        if(!fruit.alive[i]){
          fruit.born(i);
          return;
      }
    }
}
