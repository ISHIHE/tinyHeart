//����С��
var babyObj = function(){
    this.x;
    this.y;
    this.angle;

    this.babyTailTimer = 0;//С��β�ͱ仯��ʱ��
    this.babyTailCount = 0;//��¼С��β�͵�ǰ���е��ڼ�֡

    this.babyEyeTimer = 0;//С���۾��仯��ʱ��
    this.babyEyeCount = 0;//��¼С���۾���ǰ���е��ڼ�֡
    this.babyEyeInterval = 1000;//��ǰͼƬ���������ʱ��

    this.babyFadeTimer = 0;//С������仯��ʱ��
    this.babyFadeCount = 0;//��¼С�����嵱ǰ���е��ڼ�֡
}

babyObj.prototype.init = function(){
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;
}

babyObj.prototype.draw = function(){
    //lerp��ĳһֵ������Ŀ��ֵ x y =>��С���������ƶ�
    this.x = lerpDistance(mom.x,this.x,0.98);
    this.y = lerpDistance(mom.y,this.y,0.98);

    //delta angleÿһ֡��Ҫ����ǶȲ�  Math.atan2(y,x)�����к���
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY,deltaX)+ Math.PI;//���������ǶȲ� ����ֵ��-PI,+PI��

    //lerp angle �ô���Ƕ����������Ƕ�
    this.angle = lerpAngle(beta,this.angle,0.6);

    //babyTail���е��ڼ�֡����
    this.babyTailTimer += deltaTime;
    if(this.babyTailTimer > 50){
        this.babyTailCount = (this.babyTailCount + 1) % 8;//0����7֮��ѭ��
        this.babyTailTimer %= 50;//�Լ��������и�ԭ
    }

    //babyEye���е��ڼ�֡����
    this.babyEyeTimer += deltaTime;
    if(this.babyEyeTimer > this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;//0����7֮��ѭ��
        this.babyEyeTimer %= this.babyEyeInterval;//�Լ��������и�ԭ
        //��С�������۾�ʱ������֮�������۾���ʱ�����һЩ,��֮���������۾�״̬��ʱ���һ��
        if(this.babyEyeCount == 0){
            this.babyEyeInterval = Math.random() * 1500 + 2000;//[2000,3500)
        }else{
            this.babyEyeInterval = 200;
        }
    }
    //babyFade���е��ڼ�֡����
    this.babyFadeTimer += deltaTime;
    if(this.babyFadeTimer > 300){
        this.babyFadeCount = this.babyFadeCount + 1;
        this.babyFadeTimer %= 300;//�Լ��������и�ԭ
        //������䵽���ʱ��С��������game over
        if(this.babyFadeCount > 19){
            this.babyFadeCount = 19;
            //game over
            data.gameOver = true;
        }
    }
    //ֻ������С�㣬������save �� restore������
    ctx1.save();
    ctx1.translate(this.x,this.y);//�������ԭ��
    ctx1.rotate(this.angle);//���������ת�Ƕ�

    var babyTailCount = this.babyTailCount;
    var babyEyeCount = this.babyEyeCount;
    var babyFadeCount = this.babyFadeCount;
    ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width * 0.5 + 23,-babyTail[babyTailCount].height * 0.5);
    ctx1.drawImage(babyFade[babyFadeCount],-babyFade[babyFadeCount].width * 0.5,-babyFade[babyFadeCount].height * 0.5);
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width * 0.5,-babyEye[babyEyeCount].height * 0.5);
    ctx1.restore();
}