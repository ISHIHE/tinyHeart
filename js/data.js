var dataObj = function(){
    this.fruitNum = 0;//果实个数
    this.double = 1;//是否迟到了蓝色果实，吃到了为2，没吃到为1
    this.score = 0;
    this.gameOver = false;//游戏状态
    this.alpha = 0;
}

dataObj.prototype.draw = function(){
    var w = can1.width;
    var h = can1.height;
    //使定义的样式只适用于save与restroe之间，出了这个范围就没有作用了
    ctx1.save();
    ctx1.shadowBlur = 10;//阴影模糊度
    ctx1.shadowColor = "white";//阴影
    ctx1.fillStyle = "white";//文字颜色
    ctx1.fillText("SCORE: " + this.score,w * 0.5,h - 550);
    ctx1.drawImage(orangePic,w * 0.5 - 40,h - 50);
    ctx1.drawImage(bluePic,w * 0.5 + 20,h - 50);
    ctx1.fillText(this.double,w * 0.5,h - 60);
    if(this.gameOver){
        this.alpha += deltaTime * 0.0005;
        if(this.alpha > 1){
            this.alpha = 1;
        }
        ctx1.fillStyle = "rgba(255,255,255," + this.alpha +")";//文字颜色
        ctx1.fillText("Game Over",w * 0.5,h * 0.5);
        //点击画布任意位置重新开始
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