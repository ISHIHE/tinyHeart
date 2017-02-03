//绘制小鱼
var babyObj = function(){
    this.x;
    this.y;
    this.angle;

    this.babyTailTimer = 0;//小鱼尾巴变化计时器
    this.babyTailCount = 0;//记录小鱼尾巴当前进行到第几帧

    this.babyEyeTimer = 0;//小鱼眼睛变化计时器
    this.babyEyeCount = 0;//记录小鱼眼睛当前进行到第几帧
    this.babyEyeInterval = 1000;//当前图片需持续播放时间

    this.babyFadeTimer = 0;//小鱼身体变化计时器
    this.babyFadeCount = 0;//记录小鱼身体当前进行到第几帧
}

babyObj.prototype.init = function(){
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;
}

babyObj.prototype.draw = function(){
    //lerp让某一值趋向于目标值 x y =>让小鱼跟随大鱼移动
    this.x = lerpDistance(mom.x,this.x,0.98);
    this.y = lerpDistance(mom.y,this.y,0.98);

    //delta angle每一帧都要计算角度差  Math.atan2(y,x)反正切函数
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY,deltaX)+ Math.PI;//鼠标与大鱼间角度差 返回值（-PI,+PI）

    //lerp angle 让大鱼角度趋向于鼠标角度
    this.angle = lerpAngle(beta,this.angle,0.6);

    //babyTail进行到第几帧计数
    this.babyTailTimer += deltaTime;
    if(this.babyTailTimer > 50){
        this.babyTailCount = (this.babyTailCount + 1) % 8;//0——7之间循环
        this.babyTailTimer %= 50;//对计数器进行复原
    }

    //babyEye进行到第几帧计数
    this.babyEyeTimer += deltaTime;
    if(this.babyEyeTimer > this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;//0——7之间循环
        this.babyEyeTimer %= this.babyEyeInterval;//对计数器进行复原
        //当小鱼咪着眼睛时，让她之后睁着眼睛的时间更长一些,反之让其在眯眼睛状态下时间短一点
        if(this.babyEyeCount == 0){
            this.babyEyeInterval = Math.random() * 1500 + 2000;//[2000,3500)
        }else{
            this.babyEyeInterval = 200;
        }
    }
    //babyFade进行到第几帧计数
    this.babyFadeTimer += deltaTime;
    if(this.babyFadeTimer > 300){
        this.babyFadeCount = this.babyFadeCount + 1;
        this.babyFadeTimer %= 300;//对计数器进行复原
        //当身体变到最白时，小鱼死掉，game over
        if(this.babyFadeCount > 19){
            this.babyFadeCount = 19;
            //game over
            data.gameOver = true;
        }
    }
    //只适用于小鱼，所以用save 与 restore来控制
    ctx1.save();
    ctx1.translate(this.x,this.y);//设置相对原点
    ctx1.rotate(this.angle);//跟随鼠标旋转角度

    var babyTailCount = this.babyTailCount;
    var babyEyeCount = this.babyEyeCount;
    var babyFadeCount = this.babyFadeCount;
    ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width * 0.5 + 23,-babyTail[babyTailCount].height * 0.5);
    ctx1.drawImage(babyFade[babyFadeCount],-babyFade[babyFadeCount].width * 0.5,-babyFade[babyFadeCount].height * 0.5);
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width * 0.5,-babyEye[babyEyeCount].height * 0.5);
    ctx1.restore();
}