var momObj = function(){
    this.x;
    this.y;
    this.angle;//定义大鱼角度

    this.bigTailTimer = 0;//大鱼尾巴变化计时器
    this.bigTailCount = 0;//记录大鱼尾巴当前进行到第几帧

    this.bigEyeTimer = 0;//大鱼眼睛变化计时器
    this.bigEyeCount = 0;//记录大鱼眼睛当前进行到第几帧
    this.bigEyeInterval = 1000;//当前图片需持续播放时间

    this.bigSwimCount = 0;//记录大鱼身体当前进行到第几帧
}

momObj.prototype.init = function(){
    this.x = canWidth  * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
}
momObj.prototype.draw = function(){
    //lerp让某一值趋向于目标值 x y =>让大鱼跟随鼠标移动
    this.x = lerpDistance(mx,this.x,0.96);
    this.y = lerpDistance(my,this.y,0.96);

    //delta angle每一帧都要计算角度差
    //Math.atan2(y,x)反正切函数
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;//鼠标与大鱼间角度差 返回值（-PI,+PI）

    //lerp angle 让大鱼角度趋向于鼠标角度
    this.angle = lerpAngle(beta,this.angle,0.6);

    //bigTail进行到第几帧计数
    this.bigTailTimer += deltaTime;
    if(this.bigTailTimer > 50){
        this.bigTailCount = (this.bigTailCount + 1) % 8;//0——7之间循环
        this.bigTailTimer %= 50;//对计数器进行复原
    }

    //babyEye进行到第几帧计数
    this.bigEyeTimer += deltaTime;
    if(this.bigEyeTimer > this.bigEyeInterval){
        this.bigEyeCount = (this.bigEyeCount + 1) % 2;//0——7之间循环
        this.bigEyeTimer %= this.bigEyeInterval;//对计数器进行复原
        //当小鱼咪着眼睛时，让她之后睁着眼睛的时间更长一些,反之让其在眯眼睛状态下时间短一点
        if(this.bigEyeCount == 0){
            this.bigEyeInterval = Math.random() * 1500 + 2000;//[2000,3500)
        }else{
            this.bigEyeInterval = 200;
        }
    }
    //babyFade进行到第几帧计数
    this.bigSwimTimer += deltaTime;
    if(this.bigSwimTimer > 300){
        this.bigSwimCount = this.bigSwimCount + 1;
        this.bigSwimTimer %= 300;//对计数器进行复原
        //当身体变到最白时，小鱼死掉，game over
        if(this.bigSwimCount > 7){
            this.bigSwimCount = 7;
            //game over
        }
    }

    //只适用于大鱼，所以用save 与 restore来控制
    ctx1.save();
    ctx1.translate(this.x,this.y);//设置相对原点
    ctx1.rotate(this.angle);//跟随鼠标旋转角度
    var bigTailCount = this.bigTailCount;
    var bigEyeCount = this.bigEyeCount;
    var bigSwimCount = this.bigSwimCount;
    ctx1.drawImage(bigTail[bigTailCount],-bigTail[bigTailCount].width * 0.5 + 30,-bigTail[bigTailCount].height * 0.5);
    //判断吃的果实颜色 调整大鱼身体相对应的颜色
    if(data.double == 1){
        ctx1.drawImage(bigSwim[bigSwimCount],-bigSwim[bigSwimCount].width * 0.5,-bigSwim[bigSwimCount].height * 0.5);
    }else{
        ctx1.drawImage(bigSwimBlue[bigSwimCount],-bigSwimBlue[bigSwimCount].width * 0.5,-bigSwimBlue[bigSwimCount].height * 0.5);
    }
    ctx1.drawImage(bigEye[bigEyeCount],-bigEye[bigEyeCount].width * 0.5,-bigEye[bigEyeCount].height * 0.5);
    ctx1.restore();
}