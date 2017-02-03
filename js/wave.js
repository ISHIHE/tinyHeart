var waveObj = function(){
    this.x = [];//ԲȦ��λ��
    this.y = [];
    this.alive = [];
    this.r = [];//�뾶
}

waveObj.prototype.num = 10;
waveObj.prototype.init = function(){
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.r[i] = 0;
    }
}
waveObj.prototype.draw = function(){
    ctx1.save();
    ctx1.lineWidth = 2;//ԲȦ�߿�
    ctx1.shadowBlur = 10;//ԲȦ��Ӱģ����
    ctx1.shadowColor = "white";//ԲȦ��Ӱ��ɫ
    for (var i = 0; i < this.num; i++) {
        if(this.alive[i]){
            this.r[i] += deltaTime * 0.04;//����ԲȦ�����ٶ�
            if(this.r[i] > 40){//����ԲȦ���뾶
                this.alive[i] = false;
                break;
            }
            var alpha = 1 - this.r[i] / 40;//������ɫ͸���� ԲȦ�뾶Խ����ɫԽǳ��ԲȦ�����ɫ��ʧ
            //draw��Բ
            ctx1.beginPath();
            ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI * 2);//��Բ
            ctx1.closePath();
            ctx1.strokeStyle = "rgba(255,255,255," + alpha +")";//��ɫ
            ctx1.stroke();
        }
    }
    ctx1.restore();
}
waveObj.prototype.born = function(x,y){
    for (var i = 0; i < this.num; i++) {
        if(!this.alive[i]){
            this.alive[i] = true;
            this.r[i] = 10;
            this.x[i] = x;
            this.y[i] = y;
            //born
            return;
        }
    }

}