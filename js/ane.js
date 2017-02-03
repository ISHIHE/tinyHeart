//���ƺ���
var aneObj = function(){
    //���������� ��ʼ�㣬���Ƶ㣬�����㣨sin�����Һ������ƣ�
    this.rootx = [];//��ʼ��
    this.headx = [];//������x����
    this.heady = [];//������y����
    this.amp = [];//���������
    this.alpha = 0;//���Һ����Ƕ�
}
//���庣������
aneObj.prototype.num = 54;
//��ʼ��
aneObj.prototype.init = function(){
    for (var i = 0; i < this.num; i++) {
        this.rootx[i] = i * 16 + Math.random() * 20;//[0,1)�������
        this.headx[i] = this.rootx[i];//[0,1)�������
        this.heady[i] = canHeight - 250 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 + 50;
    }
}
//����Բ����ñ��������
aneObj.prototype.draw = function(){
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);//l�����Һ�����y���� this.alpha�����ҵ�x����[-1,1]
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = "round";//��������Բ��
    ctx2.strokeStyle = "#3b154e";//�����ɫ
    for (var i = 0; i < this.num; i++) {
    //beginPath����ʼ���ƣ� moveTo����㣩 lineTo�������� strokeStyle��������ɫ�� lineWidth��������ȣ� lineCap��������ʽ�� globalAlphe(͸����)
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i],canHeight);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i],canHeight - 100,this.headx[i],this.heady[i]);//���α���������
        ctx2.stroke();
    }
    ctx2.restore();
}