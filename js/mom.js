var momObj = function(){
    this.x;
    this.y;
    this.angle;//�������Ƕ�

    this.bigTailTimer = 0;//����β�ͱ仯��ʱ��
    this.bigTailCount = 0;//��¼����β�͵�ǰ���е��ڼ�֡

    this.bigEyeTimer = 0;//�����۾��仯��ʱ��
    this.bigEyeCount = 0;//��¼�����۾���ǰ���е��ڼ�֡
    this.bigEyeInterval = 1000;//��ǰͼƬ���������ʱ��

    this.bigSwimCount = 0;//��¼�������嵱ǰ���е��ڼ�֡
}

momObj.prototype.init = function(){
    this.x = canWidth  * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
}
momObj.prototype.draw = function(){
    //lerp��ĳһֵ������Ŀ��ֵ x y =>�ô����������ƶ�
    this.x = lerpDistance(mx,this.x,0.96);
    this.y = lerpDistance(my,this.y,0.96);

    //delta angleÿһ֡��Ҫ����ǶȲ�
    //Math.atan2(y,x)�����к���
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;//���������ǶȲ� ����ֵ��-PI,+PI��

    //lerp angle �ô���Ƕ����������Ƕ�
    this.angle = lerpAngle(beta,this.angle,0.6);

    //bigTail���е��ڼ�֡����
    this.bigTailTimer += deltaTime;
    if(this.bigTailTimer > 50){
        this.bigTailCount = (this.bigTailCount + 1) % 8;//0����7֮��ѭ��
        this.bigTailTimer %= 50;//�Լ��������и�ԭ
    }

    //babyEye���е��ڼ�֡����
    this.bigEyeTimer += deltaTime;
    if(this.bigEyeTimer > this.bigEyeInterval){
        this.bigEyeCount = (this.bigEyeCount + 1) % 2;//0����7֮��ѭ��
        this.bigEyeTimer %= this.bigEyeInterval;//�Լ��������и�ԭ
        //��С�������۾�ʱ������֮�������۾���ʱ�����һЩ,��֮���������۾�״̬��ʱ���һ��
        if(this.bigEyeCount == 0){
            this.bigEyeInterval = Math.random() * 1500 + 2000;//[2000,3500)
        }else{
            this.bigEyeInterval = 200;
        }
    }
    //babyFade���е��ڼ�֡����
    this.bigSwimTimer += deltaTime;
    if(this.bigSwimTimer > 300){
        this.bigSwimCount = this.bigSwimCount + 1;
        this.bigSwimTimer %= 300;//�Լ��������и�ԭ
        //������䵽���ʱ��С��������game over
        if(this.bigSwimCount > 7){
            this.bigSwimCount = 7;
            //game over
        }
    }

    //ֻ�����ڴ��㣬������save �� restore������
    ctx1.save();
    ctx1.translate(this.x,this.y);//�������ԭ��
    ctx1.rotate(this.angle);//���������ת�Ƕ�
    var bigTailCount = this.bigTailCount;
    var bigEyeCount = this.bigEyeCount;
    var bigSwimCount = this.bigSwimCount;
    ctx1.drawImage(bigTail[bigTailCount],-bigTail[bigTailCount].width * 0.5 + 30,-bigTail[bigTailCount].height * 0.5);
    //�жϳԵĹ�ʵ��ɫ ���������������Ӧ����ɫ
    if(data.double == 1){
        ctx1.drawImage(bigSwim[bigSwimCount],-bigSwim[bigSwimCount].width * 0.5,-bigSwim[bigSwimCount].height * 0.5);
    }else{
        ctx1.drawImage(bigSwimBlue[bigSwimCount],-bigSwimBlue[bigSwimCount].width * 0.5,-bigSwimBlue[bigSwimCount].height * 0.5);
    }
    ctx1.drawImage(bigEye[bigEyeCount],-bigEye[bigEyeCount].width * 0.5,-bigEye[bigEyeCount].height * 0.5);
    ctx1.restore();
}