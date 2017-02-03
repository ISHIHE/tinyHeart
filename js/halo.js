var haloObj = function(){
    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = [];
}
haloObj.prototype.num = 5;
//��ʼ��
haloObj.prototype.init = function(){
    for (var i = 0; i < this.num; i++) {
        this.x[i] = 0;
        this.y[i] = 0;
        this.alive[i] = false;
        this.r[i] = 0;
    }
}
haloObj.prototype.draw = function(){
    ctx1.save();
    ctx1.lineWidth = 2;//ԲȦ�߿�
    ctx1.shadowBlur = 10;//ԲȦ��Ӱģ����
    ctx1.shadowColor = "rgba(203,91,0,1)";//ԲȦ��Ӱ��ɫ
    for (var i = 0; i < this.num; i++) {
        if(this.alive[i]){
            //draw
            this.r[i] += deltaTime * 0.05;//����ԲȦ�����ٶ�
            if(this.r[i] > 100){//����ԲȦ���뾶
                this.alive[i] = false;
                break;
            }
            var alpha = 1 - this.r[i] / 100;//������ɫ͸���� ԲȦ�뾶Խ����ɫԽǳ��ԲȦ�����ɫ��ʧ
            //draw��Բ
            ctx1.beginPath();
            ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI * 2);//��Բ
            ctx1.closePath();
            ctx1.strokeStyle = "rgba(203,91,0," + alpha +")";//��ɫ
            ctx1.stroke();
        }
    }
    ctx1.restore();
}
haloObj.prototype.born = function(x,y){
    for (var i = 0; i < this.num; i++) {
        if(!this.alive[i]){
            this.x[i] = x;
            this.y[i] = y;
            this.r[i] = 10;
            this.alive[i] = true;
        }
    }
}