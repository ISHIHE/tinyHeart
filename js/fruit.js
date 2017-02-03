var fruitObj = function(){
    this.alive = [];//boolֵ �Ƿ����
    this.x = [];
    this.y = [];
    this.aneNo = [];//��������
    this.l = [];//ͼƬ���ȣ�ͨ������ͼƬ���������ƹ�ʵ�������
    this.spd = [];//�ٶȣ�ʹ��ͬ��ʵ���в�ͬ���ٶ�
    this.fruitType = [];//��ʵ����  ������������
    this.orange = new Image();
    this.blue = new Image();
}
//���ù�ʵ����
fruitObj.prototype.num = 30;
//��ʼ��
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
    //��ȡ��ʵͼƬ��Դ
    this.orange.src = "./src/fruit.png";
    this.blue.src = "./src/blue.png";
}
//���ƹ�ʵ���ù�ʵ�ϸ�
fruitObj.prototype.draw = function(){
    for (var i = 0; i < this.num; i++) {
      //draw
      //��һ������  grow  fly up
        //�����ʵ״̬Ϊtrue������ƹ�ʵ����������
        if(this.alive[i]){
            //�жϹ�ʵ����
            if(this.fruitType[i] == "blue"){
                var pic = this.blue;
            }else{
                pic = this.orange;
            }
            //  ���ƹ�ʵ����С
            if(this.l[i] <= 14){
                var No = this.aneNo[i];
                this.x[i] = ane.headx[No];
                this.y[i] = ane.heady[No];
                this.l[i] += this.spd[i] * deltaTime;//�ù�ʵ��ʱ����������
            }else{
                this.y[i] -= this.spd[i] * 7 * deltaTime;//����ʵ����һ���̶Ⱥ����������Ʈ
            }
            ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,this.l[i],this.l[i]);
            //��ʵ�����߶ȴ���10����Ĺ�ʵ״̬Ϊfalse
            if(this.y[i] < 10){
                this.alive[i] = false;
            }
        }
    }

}
//��һ������ �ù�ʵ����
fruitObj.prototype.born = function(i){
    this.aneNo[i] = Math.floor(Math.random() * ane.num);//��ʵ�����һ����������
    this.l[i] = 0;//��ʵ����ʱ����Ϊ0  ��������
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


//���ƹ�ʵ����
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
//���ƹ�ʵ����
function sendFruit(){
    for (var i = 0; i < fruit.num; i++) {
        if(!fruit.alive[i]){
          fruit.born(i);
          return;
      }
    }
}
