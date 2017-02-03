var can1;
var can2;
var canHeight;
var canWidth;
var ctx1;
var ctx2;
var lastTime;//��һִ֡��ʱ��
var deltaTime;//��֮֡����ʱ���
var bgPic = new Image();//����ͼƬ]
var ane;
var fruit;
var mom;
var mx;//���λ��x
var my;//���λ��y
var baby;
var babyTail = [];//С�㶯��  β��ϵ�е�����
var babyEye = [];//С�㶯��  �۾�ϵ�е�����
var babyFade = [];//С�㶯��  ����ϵ�е�����
var bigTail = [];//���㶯��  β��ϵ�е�����
var bigEye = [];//���㶯��  �۾�ϵ�е�����
var data;//��ֵ����
var bigSwim = [];//���㶯��  ����ϵ�е�����
var bigSwimBlue = [];//���㶯��  ����ϵ�е����� �Ե���ɫ��ʵʱ
var wave;//����Թ�ʵʱ��������Ч ��ɫԲȦ
var halo;//����ιС����Ч
var dust;//Ư�������
var dustPic = [];//���Ư�����ͼƬ
var orangePic = new Image();//�ײ���ʾ��ɫ��ʵͼƬ
var bluePic = new Image();//�ײ���ʾ��ɫ��ʵͼƬ


//body���ݼ�����ɺ�ִ��game����������game������Ϊִ�����
document.body.onload = game;

//function startGame(){
//    can3 = document.getElementById("canvas1");//���ƿ�ʼ��Ϸ�Ľ���
//    ctx3 = can3.getContext('2d');
//    ctx3.fillRect(0,0,can3.width,can3.height);
//    ctx3.fillStyle = "black";
//    ctx3.fillStyle = "rgba(255,255,255,0.5)";
//    can3.addEventListener('click',function(){
//        console.log(1);
//        ctx3.clearRect(0,0,can3.width,can3.height);
//        game();
//    });//����¼�������λ��
//}

function game(){
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

//��ʼ��
function init(){
//    ���canvas context
    can1 = document.getElementById("canvas1");//fishes dust ui circle
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById("canvas2");//background ane fruits
    ctx2 = can2.getContext('2d');

    can1.addEventListener('mousemove',onMouseMove,false);//����¼�������λ��

    //���ر���ͼƬ
    bgPic.src = "./src/background.jpg";
    //��ȡ�����Ŀ����Ϊ����ͼƬ����Ⱦ��С
    canWidth = can1.width;
    canHeight = can1.height;
    //������������ʼ��
    ane = new aneObj();
    ane.init();
    //������ʵ����ʼ��
    fruit = new fruitObj();
    fruit.init();
    //�������㲢��ʼ��
    mom = new momObj();
    mom.init();
    //��û������ĵ�����
    mx = canWidth * 0.5;
    my = canHeight * 0.5;
    //����С�㲢��ʼ��
    baby = new babyObj();
    baby.init();
    //С�㶯��  ��ʼ��β��ϵ�е�����
    for (var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "./src/bigTail" + i + ".png";
    }
    //С�㶯��  ��ʼ���۾�ϵ�е�����
    for (var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }
    //С�㶯��  ��ʼ������ϵ�е�����
    for (var i = 0; i < 20; i++) {
        babyFade[i] = new Image();
        babyFade[i].src = "./src/babyFade" + i + ".png";
    }
    //���㶯��  ��ʼ��β��ϵ�е�����
    for (var i = 0; i < 8; i++) {
        bigTail[i] = new Image();
        bigTail[i].src = "./src/bigTail" + i + ".png";
    }
    //���㶯��  ��ʼ���۾�ϵ�е�����
    for (var i = 0; i < 2; i++) {
        bigEye[i] = new Image();
        bigEye[i].src = "./src/bigEye" + i + ".png";
    }

    data = new dataObj();

    //���㶯��  ��ʼ������ϵ�е�����
    for (var i = 0; i < 8; i++) {
        bigSwim[i] = new Image();
        bigSwim[i].src = "./src/bigSwim" + i + ".png";
        bigSwimBlue[i] = new Image();
        bigSwimBlue[i].src = "./src/bigSwimBlue" + i + ".png";//���㶯��  ��ʼ������ϵ�е����� ��ɫ
    }

    ctx1.font = "30px Verdana";//��������
    ctx1.textAlign = "center";//Ĭ��left

    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();

    for (var i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = "./src/dust" + i + ".png";
    }
    dust = new dustObj();
    dust.init();

    orangePic.src = "./src/fruit.png";
    bluePic.src = "./src/blue.png";
}

//����Ϸ������������ͣ��ˢ�£���С����ÿһ֡��λ�����ӻ����
function gameloop(){
   requestAnimFrame(gameloop);//requestAnimFrame һ�� API����setInterval��setTimeout����ѧ��frame per second
                              //ԭ����ǰ������ɺ���ݻ���������ȷ������೤ʱ�������һ֡�����ܼ���
                              //��ͬ�������Ҫ��ͬ������
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    //����ҳ���ڹر�״̬�ٴ�ʼʱdeltaTime��ֵ��ܴ󣬵��ǹ�ʵ��С����deltaTimeֵ�����ȵģ������ڴ�Ӳ������deltaTime��С
    if(deltaTime > 40){
        deltaTime = 40;
    }
    drawBackground();//���Ʊ���
    ane.draw();//���ƺ���
    fruitMonitor();//���ƻ��ƹ�ʵ����
    fruit.draw();//���ƹ�ʵ
    ctx1.clearRect(0,0,canWidth,canHeight);//ctx1���ϣ�������λ�������ط���͸���ģ�ÿ�λ��ƶ����ӣ����������֮ǰ֡�������ڽ�����һ�λ���
    mom.draw();//���ƴ���
    momFruitsCollision();//�������ʵ��ײ���
    momBabyCollision();//������С����ײ���
    baby.draw();//����С��
    data.draw();//���Ʒ�ֵ����
    wave.draw();//���ƴ���Թ�ʵ��Ч
    halo.draw();//���ƴ���ιС����Ч
    dust.draw();//����Ư����
}

function onMouseMove(e){
    if(!data.gameOver){
        if(e.offsetX || e.offsetY){
            mx = e.offsetX == undefined ? e.layerX : e.offsetX;
            my = e.offsetY == undefined ? e.layerY : e.offsetY;
        }
    }
}
