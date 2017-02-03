var dustObj = function(){
    this.x = [];
    this.y = [];
    this.amp = [];//���
    this.No = [];//��ǰƯ������7��ͼƬ�е���һ��
    this.alpha;//Ư���Ƕ�
}
dustObj.prototype.num = 30;
dustObj.prototype.init = function(){
    for (var i = 0; i < this.num; i++) {
        this.x[i] = Math.random() * canWidth;
        this.y[i] = Math.random() * canHeight;
        this.amp[i] = 20 + Math.random() * 25;
        this.No[i] = Math.floor(Math.random() * 7);//[0,7)������ֵ
    }
    this.alpha = 0;
}
dustObj.prototype.draw = function(){
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);
    for (var i = 0; i < this.num; i++) {
        var no = this.No[i];
        ctx1.drawImage(dustPic[no],this.x[i] + this.amp[i] * l,this.y[i]);
    }
}