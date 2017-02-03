//绘制海葵
var aneObj = function(){
    //贝塞尔曲线 起始点，控制点，结束点（sin由正弦函数控制）
    this.rootx = [];//起始点
    this.headx = [];//结束点x坐标
    this.heady = [];//结束点y坐标
    this.amp = [];//海葵的振幅
    this.alpha = 0;//正弦函数角度
}
//定义海葵数量
aneObj.prototype.num = 54;
//初始化
aneObj.prototype.init = function(){
    for (var i = 0; i < this.num; i++) {
        this.rootx[i] = i * 16 + Math.random() * 20;//[0,1)海葵间距
        this.headx[i] = this.rootx[i];//[0,1)海葵间距
        this.heady[i] = canHeight - 250 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 + 50;
    }
}
//绘制圆形线帽当做海葵
aneObj.prototype.draw = function(){
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);//l是正弦函数的y坐标 this.alpha是正弦的x坐标[-1,1]
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = "round";//线条顶端圆形
    ctx2.strokeStyle = "#3b154e";//描边颜色
    for (var i = 0; i < this.num; i++) {
    //beginPath（开始绘制） moveTo（起点） lineTo（线条） strokeStyle（线条颜色） lineWidth（线条宽度） lineCap（线条样式） globalAlphe(透明度)
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i],canHeight);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i],canHeight - 100,this.headx[i],this.heady[i]);//二次贝塞尔曲线
        ctx2.stroke();
    }
    ctx2.restore();
}