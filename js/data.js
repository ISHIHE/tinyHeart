var dataObj = function(){
    this.fruitNum = 0;//��ʵ����
    this.double = 1;//�Ƿ�ٵ�����ɫ��ʵ���Ե���Ϊ2��û�Ե�Ϊ1
    this.score = 0;
    this.gameOver = false;//��Ϸ״̬
    this.alpha = 0;
}

dataObj.prototype.draw = function(){
    var w = can1.width;
    var h = can1.height;
    //ʹ�������ʽֻ������save��restroe֮�䣬���������Χ��û��������
    ctx1.save();
    ctx1.shadowBlur = 10;//��Ӱģ����
    ctx1.shadowColor = "white";//��Ӱ
    ctx1.fillStyle = "white";//������ɫ
    ctx1.fillText("SCORE: " + this.score,w * 0.5,h - 550);
    ctx1.drawImage(orangePic,w * 0.5 - 40,h - 50);
    ctx1.drawImage(bluePic,w * 0.5 + 20,h - 50);
    ctx1.fillText(this.double,w * 0.5,h - 60);
    if(this.gameOver){
        this.alpha += deltaTime * 0.0005;
        if(this.alpha > 1){
            this.alpha = 1;
        }
        ctx1.fillStyle = "rgba(255,255,255," + this.alpha +")";//������ɫ
        ctx1.fillText("Game Over",w * 0.5,h * 0.5);
        //�����������λ�����¿�ʼ
        can1.addEventListener("click",function(){
            window.location.reload();
    });
    }
    ctx1.restore();
}

dataObj.prototype.addScore = function(){
    this.score += this.fruitNum * 100 * this.double;
    this.fruitNum = 0;
    this.double = 1;
}