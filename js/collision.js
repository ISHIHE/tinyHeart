//大鱼与果实的碰撞检测
//判断大鱼与果实的距离来判断果实是否被大鱼吃掉
function momFruitsCollision(){
    if(!data.gameOver){
        for (var i = 0; i < fruit.num; i++) {
            if(fruit.alive[i]){
                //calculate  length
                var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);//计算果实与大鱼的距离
                if(l < 900){
                    //fruit被吃掉
                    fruit.dead(i);
                    data.fruitNum++;//吃掉的果实数量++
                    mom.bigSwimCount++;//大鱼身体计数++
                    if(mom.bigSwimCount > 7){
                        mom.bigSwimCount = 7;
                    }
                    if(fruit.fruitType[i] == "blue"){
                        data.double = 2;
                    }//吃到蓝色果实加倍
                    wave.born(fruit.x[i],fruit.y[i]);
                }
            }
        }
    }
}
//判断大鱼与小鱼的距离
function momBabyCollision(){
    if(!data.gameOver){
        //如果大鱼此时吃到过果实才可以和小鱼产生有效碰撞
        if(data.fruitNum > 0){
            var l = calLength2(mom.x,mom.y,baby.x,baby.y);//计算小鱼与大鱼的距离
            if(l < 900){
                baby.babyFadeCount = 0;//小鱼计数归0
                mom.bigSwimCount = 0;//大鱼身体计数清0
                //计算并更新得分
                data.addScore();
                //绘制圆圈特效
                halo.born(baby.x,baby.y);
            }
        }
    }
}