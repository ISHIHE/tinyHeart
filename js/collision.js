//�������ʵ����ײ���
//�жϴ������ʵ�ľ������жϹ�ʵ�Ƿ񱻴���Ե�
function momFruitsCollision(){
    if(!data.gameOver){
        for (var i = 0; i < fruit.num; i++) {
            if(fruit.alive[i]){
                //calculate  length
                var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);//�����ʵ�����ľ���
                if(l < 900){
                    //fruit���Ե�
                    fruit.dead(i);
                    data.fruitNum++;//�Ե��Ĺ�ʵ����++
                    mom.bigSwimCount++;//�����������++
                    if(mom.bigSwimCount > 7){
                        mom.bigSwimCount = 7;
                    }
                    if(fruit.fruitType[i] == "blue"){
                        data.double = 2;
                    }//�Ե���ɫ��ʵ�ӱ�
                    wave.born(fruit.x[i],fruit.y[i]);
                }
            }
        }
    }
}
//�жϴ�����С��ľ���
function momBabyCollision(){
    if(!data.gameOver){
        //��������ʱ�Ե�����ʵ�ſ��Ժ�С�������Ч��ײ
        if(data.fruitNum > 0){
            var l = calLength2(mom.x,mom.y,baby.x,baby.y);//����С�������ľ���
            if(l < 900){
                baby.babyFadeCount = 0;//С�������0
                mom.bigSwimCount = 0;//�������������0
                //���㲢���µ÷�
                data.addScore();
                //����ԲȦ��Ч
                halo.born(baby.x,baby.y);
            }
        }
    }
}