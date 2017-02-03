var can1;
var can2;
var canHeight;
var canWidth;
var ctx1;
var ctx2;
var lastTime;//上一帧执行时间
var deltaTime;//两帧之间间隔时间差
var bgPic = new Image();//背景图片]
var ane;
var fruit;
var mom;
var mx;//鼠标位置x
var my;//鼠标位置y
var baby;
var babyTail = [];//小鱼动画  尾巴系列的数组
var babyEye = [];//小鱼动画  眼睛系列的数组
var babyFade = [];//小鱼动画  身体系列的数组
var bigTail = [];//大鱼动画  尾巴系列的数组
var bigEye = [];//大鱼动画  眼睛系列的数组
var data;//数值计算
var bigSwim = [];//大鱼动画  身体系列的数组
var bigSwimBlue = [];//大鱼动画  身体系列的数组 吃到蓝色果实时
var wave;//大鱼吃果实时产生的特效 白色圆圈
var halo;//大鱼喂小鱼特效
var dust;//漂浮物绘制
var dustPic = [];//存放漂浮物的图片
var orangePic = new Image();//底部显示黄色果实图片
var bluePic = new Image();//底部显示蓝色果实图片


//body内容加载完成后执行game函数。即将game函数作为执行入口
document.body.onload = game;

//function startGame(){
//    can3 = document.getElementById("canvas1");//绘制开始游戏的界面
//    ctx3 = can3.getContext('2d');
//    ctx3.fillRect(0,0,can3.width,can3.height);
//    ctx3.fillStyle = "black";
//    ctx3.fillStyle = "rgba(255,255,255,0.5)";
//    can3.addEventListener('click',function(){
//        console.log(1);
//        ctx3.clearRect(0,0,can3.width,can3.height);
//        game();
//    });//添加事件监测鼠标位置
//}

function game(){
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

//初始化
function init(){
//    获得canvas context
    can1 = document.getElementById("canvas1");//fishes dust ui circle
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById("canvas2");//background ane fruits
    ctx2 = can2.getContext('2d');

    can1.addEventListener('mousemove',onMouseMove,false);//添加事件监测鼠标位置

    //加载背景图片
    bgPic.src = "./src/background.jpg";
    //获取画布的宽高作为背景图片的渲染大小
    canWidth = can1.width;
    canHeight = can1.height;
    //声明海葵并初始化
    ane = new aneObj();
    ane.init();
    //声明果实并初始化
    fruit = new fruitObj();
    fruit.init();
    //声明大鱼并初始化
    mom = new momObj();
    mom.init();
    //获得画布中心点坐标
    mx = canWidth * 0.5;
    my = canHeight * 0.5;
    //声明小鱼并初始化
    baby = new babyObj();
    baby.init();
    //小鱼动画  初始化尾巴系列的数组
    for (var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "./src/bigTail" + i + ".png";
    }
    //小鱼动画  初始化眼睛系列的数组
    for (var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }
    //小鱼动画  初始化身体系列的数组
    for (var i = 0; i < 20; i++) {
        babyFade[i] = new Image();
        babyFade[i].src = "./src/babyFade" + i + ".png";
    }
    //大鱼动画  初始化尾巴系列的数组
    for (var i = 0; i < 8; i++) {
        bigTail[i] = new Image();
        bigTail[i].src = "./src/bigTail" + i + ".png";
    }
    //大鱼动画  初始化眼睛系列的数组
    for (var i = 0; i < 2; i++) {
        bigEye[i] = new Image();
        bigEye[i].src = "./src/bigEye" + i + ".png";
    }

    data = new dataObj();

    //大鱼动画  初始化身体系列的数组
    for (var i = 0; i < 8; i++) {
        bigSwim[i] = new Image();
        bigSwim[i].src = "./src/bigSwim" + i + ".png";
        bigSwimBlue[i] = new Image();
        bigSwimBlue[i].src = "./src/bigSwimBlue" + i + ".png";//大鱼动画  初始化身体系列的数组 蓝色
    }

    ctx1.font = "30px Verdana";//文字字体
    ctx1.textAlign = "center";//默认left

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

//让游戏动起来，即不停地刷新，让小鱼在每一帧中位移增加或减少
function gameloop(){
   requestAnimFrame(gameloop);//requestAnimFrame 一个 API，比setInterval与setTimeout更科学，frame per second
                              //原理：当前绘制完成后根据机器性能来确定间隔多长时间绘制下一帧，智能计算
                              //不同浏览器需要不同的配适
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    //当网页处于关闭状态再打开始时deltaTime的值会很大，但是果实大小是与deltaTime值成正比的，所以在此硬性限制deltaTime大小
    if(deltaTime > 40){
        deltaTime = 40;
    }
    drawBackground();//绘制背景
    ane.draw();//绘制海葵
    fruitMonitor();//控制绘制果实个数
    fruit.draw();//绘制果实
    ctx1.clearRect(0,0,canWidth,canHeight);//ctx1在上，除绘制位置其他地方是透明的，每次绘制都叠加，所以需清除之前帧的内容在进行下一次绘制
    mom.draw();//绘制大鱼
    momFruitsCollision();//大鱼与果实碰撞检测
    momBabyCollision();//大鱼与小鱼碰撞检测
    baby.draw();//绘制小鱼
    data.draw();//绘制分值数据
    wave.draw();//绘制大鱼吃果实特效
    halo.draw();//绘制大鱼喂小鱼特效
    dust.draw();//绘制漂浮物
}

function onMouseMove(e){
    if(!data.gameOver){
        if(e.offsetX || e.offsetY){
            mx = e.offsetX == undefined ? e.layerX : e.offsetX;
            my = e.offsetY == undefined ? e.layerY : e.offsetY;
        }
    }
}
