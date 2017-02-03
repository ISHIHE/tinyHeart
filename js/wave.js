var waveObj = function(){
    this.x = [];//圆圈的位置
    this.y = [];
    this.alive = [];
    this.r = [];//半径
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
    ctx1.lineWidth = 2;//圆圈线宽
    ctx1.shadowBlur = 10;//圆圈阴影模糊度
    ctx1.shadowColor = "white";//圆圈阴影颜色
    for (var i = 0; i < this.num; i++) {
        if(this.alive[i]){
            this.r[i] += deltaTime * 0.04;//控制圆圈变大的速度
            if(this.r[i] > 40){//控制圆圈最大半径
                this.alive[i] = false;
                break;
            }
            var alpha = 1 - this.r[i] / 40;//控制颜色透明度 圆圈半径越大颜色越浅，圆圈最大颜色消失
            //draw画圆
            ctx1.beginPath();
            ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI * 2);//画圆
            ctx1.closePath();
            ctx1.strokeStyle = "rgba(255,255,255," + alpha +")";//颜色
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