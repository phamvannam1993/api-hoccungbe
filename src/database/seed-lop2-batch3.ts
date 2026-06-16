import mysql from 'mysql2/promise';

const DB = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

type QuizRow = [number, number, string, string, string | null, string, string, string | null, number, number];

async function seed() {
  const conn = await mysql.createConnection(DB);

  const lessons: { id: number; ex1: QuizRow[]; ex2: QuizRow[]; ex3: QuizRow[] }[] = [

    // ─── 1088: Phép cộng có nhớ 2 chữ số + 1 chữ số ───────────────────────────
    {
      id: 1088,
      ex1: [
        [1088,1,'single_choice','27 + 5 = ?',JSON.stringify({A:'30',B:'31',C:'32',D:'33'}),'C','easy','27+5: 7+5=12, viết 2 nhớ 1; 2+1+1=4. Kết quả: 32',10,1],
        [1088,1,'single_choice','38 + 6 = ?',JSON.stringify({A:'42',B:'43',C:'44',D:'45'}),'C','easy','38+6: 8+6=14, viết 4 nhớ 1; 3+1+1=5. Kết quả: 44',10,2],
        [1088,1,'single_choice','49 + 4 = ?',JSON.stringify({A:'51',B:'52',C:'53',D:'54'}),'C','easy','49+4: 9+4=13, viết 3 nhớ 1; 4+1+1=6. Kết quả: 53',10,3],
        [1088,1,'true_false','27 + 5 = 32. Đúng hay sai?',null,'true','easy','27+5=32 là đúng',10,4],
        [1088,1,'true_false','46 + 7 = 52. Đúng hay sai?',null,'false','easy','46+7=53, không phải 52',10,5],
        [1088,1,'fill_blank','58 + 4 = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'62'}),'easy','58+4: 8+4=12, viết 2 nhớ 1; 5+1+1=7. Kết quả: 62',10,6],
        [1088,1,'fill_blank','67 + 5 = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'72'}),'easy','67+5: 7+5=12, viết 2 nhớ 1; 6+1+1=8. Kết quả: 72',10,7],
        [1088,1,'counting','Có bao nhiêu ngôi sao? ⭐⭐⭐⭐⭐⭐⭐⭐',JSON.stringify({d1:'⭐',d2:'⭐',d3:'⭐',d4:'⭐',d5:'⭐',d6:'⭐',d7:'⭐',d8:'⭐'}),'8','easy','Đếm: 1,2,3,4,5,6,7,8',10,8],
        [1088,1,'sorting','Sắp xếp các phép tính theo kết quả tăng dần',JSON.stringify({A:'27+5',B:'18+6',C:'35+8',D:'46+7'}),JSON.stringify(['B','A','D','C']),'easy','18+6=24; 27+5=32; 46+7=53; 35+8=43 → 24<32<43<53 → B,A,C,D',10,9],
        [1088,1,'cross_out','Gạch bỏ phép tính SAI',JSON.stringify({A:'27+5=32',B:'38+4=42',C:'49+3=53',D:'56+6=62'}),JSON.stringify(['B','C']),'easy','38+4=42 đúng; 49+3=52 sai; 56+6=62 đúng; 27+5=32 đúng',10,10],
      ],
      ex2: [
        [1088,2,'single_choice','Một túi có 35 viên bi. Thêm vào 7 viên. Có tất cả bao nhiêu viên?',JSON.stringify({A:'41',B:'42',C:'43',D:'44'}),'B','medium','35+7=42',10,1],
        [1088,2,'single_choice','Kết quả của 76 + 8 là?',JSON.stringify({A:'82',B:'83',C:'84',D:'85'}),'C','medium','76+8: 6+8=14, viết 4 nhớ 1; 7+1+1=9. Kết quả: 84',10,2],
        [1088,2,'multiple_choice','Phép tính nào có kết quả lớn hơn 50?',JSON.stringify({A:'28+6',B:'43+9',C:'37+8',D:'46+5'}),JSON.stringify(['B','D']),'medium','43+9=52; 46+5=51; 28+6=34; 37+8=45',10,3],
        [1088,2,'multiple_choice','Phép tính nào có kết quả bằng nhau?',JSON.stringify({A:'27+5',B:'19+13',C:'24+8',D:'15+17'}),JSON.stringify(['C','D']),'medium','24+8=32; 15+17=32',10,4],
        [1088,2,'matching','Nối phép tính với kết quả',JSON.stringify({A:'28+5',B:'37+6',C:'46+7',D:'55+8'}),JSON.stringify({A:'33',B:'43',C:'53',D:'63'}),'medium','28+5=33; 37+6=43; 46+7=53; 55+8=63',10,5],
        [1088,2,'matching','Nối để được phép tính đúng',JSON.stringify({A:'34+_=41',B:'_+8=52',C:'67+_=74',D:'_+9=65'}),JSON.stringify({A:'7',B:'44',C:'7',D:'56'}),'medium','34+7=41; 44+8=52; 67+7=74; 56+9=65',10,6],
        [1088,2,'drag_drop','Kéo các số vào đúng vị trí để hoàn thành: 4_, _+7=53, kết quả 46+8=?',JSON.stringify({A:'46',B:'53',C:'54',D:'7'}),JSON.stringify(['A','D','C']),'medium','46+7=53; 46+8=54',10,7],
        [1088,2,'table_fill','Hoàn thành bảng cộng có nhớ',JSON.stringify({headers:['Số hạng 1','Số hạng 2','Tổng'],rows:[{c1:'27',c2:'5',c3:'_'},{c1:'38',c2:'_',c3:'44'},{c1:'_',c2:'7',c3:'53'}]}),JSON.stringify({c3_1:'32',c2_2:'6',c1_3:'46'}),'medium','27+5=32; 38+6=44; 46+7=53',10,8],
        [1088,2,'number_line','Tìm kết quả của 37+8 trên trục số',JSON.stringify({min:40,max:50,step:1,marks:[40,41,42,43,44,45,46,47,48,49,50],hidden:['45']}),JSON.stringify(['45']),'medium','37+8=45',10,9],
        [1088,2,'puzzle','Điền số vào ô trống: □ + 8 = 64',JSON.stringify({slots:['s1'],tokens:['56','57','58','59']}),JSON.stringify({s1:'56'}),'medium','64-8=56, nên □=56',10,10],
      ],
      ex3: [
        [1088,3,'fill_blank','Một cửa hàng có 47 hộp bút. Nhập thêm 6 hộp. Có tất cả [b1] hộp bút.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'53'}),'hard','47+6=53',10,1],
        [1088,3,'fill_blank','Điền số thích hợp: 5□ + 8 = 63, □ = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'5'}),'hard','55+8=63, nên □=5',10,2],
        [1088,3,'puzzle','Tìm X: X + 7 = 45',JSON.stringify({slots:['x'],tokens:['36','37','38','39']}),JSON.stringify({x:'38'}),'hard','45-7=38',10,3],
        [1088,3,'puzzle','Tìm Y: 29 + Y = 36',JSON.stringify({slots:['y'],tokens:['6','7','8','9']}),JSON.stringify({y:'7'}),'hard','36-29=7',10,4],
        [1088,3,'game','Ghép đôi phép tính với kết quả',JSON.stringify({pairs:[{q:'28+5',a:'33'},{q:'37+6',a:'43'},{q:'46+7',a:'53'},{q:'55+8',a:'63'}]}),JSON.stringify({}),'hard','Nối đúng từng cặp',10,5],
        [1088,3,'sorting','Sắp xếp kết quả từ lớn đến nhỏ: 27+6, 45+8, 38+5, 56+7',JSON.stringify({A:'27+6',B:'45+8',C:'38+5',D:'56+7'}),JSON.stringify(['D','B','C','A']),'hard','56+7=63; 45+8=53; 38+5=43; 27+6=33',10,6],
        [1088,3,'matching','Nối bài toán với đáp án',JSON.stringify({A:'Nam có 36 nhãn. Bạn cho thêm 7. Nam có?',B:'Lớp trồng 48 cây. Trồng thêm 5 cây. Có?',C:'Hộp có 27 kẹo. Bỏ thêm 8. Có?',D:'Vườn có 59 bông. Nở thêm 4. Có?'}),JSON.stringify({A:'43',B:'53',C:'35',D:'63'}),'hard','36+7=43; 48+5=53; 27+8=35; 59+4=63',10,7],
        [1088,3,'multiple_choice','Kết quả nào là số tròn chục?',JSON.stringify({A:'38+4',B:'27+3',C:'46+4',D:'55+5'}),JSON.stringify(['B','C','D']),'hard','27+3=30; 46+4=50; 55+5=60',10,8],
        [1088,3,'multiple_choice','Phép tính nào có nhớ 1?',JSON.stringify({A:'24+3',B:'38+7',C:'41+6',D:'57+5'}),JSON.stringify(['B','D']),'hard','38+7=45 (8+7=15>9); 57+5=62 (7+5=12>9)',10,9],
        [1088,3,'drag_drop','Kéo thả để giải bài: Buổi sáng bán 45 bánh, buổi chiều bán 8 bánh. Tổng cộng?',JSON.stringify({A:'45',B:'8',C:'+',D:'=',E:'53'}),JSON.stringify(['A','C','B','D','E']),'hard','45+8=53',10,10],
      ],
    },

    // ─── 1089: Phép cộng có nhớ 2 chữ số + 2 chữ số ───────────────────────────
    {
      id: 1089,
      ex1: [
        [1089,1,'single_choice','47 + 26 = ?',JSON.stringify({A:'71',B:'72',C:'73',D:'74'}),'C','easy','47+26: 7+6=13, viết 3 nhớ 1; 4+2+1=7. Kết quả: 73',10,1],
        [1089,1,'single_choice','35 + 48 = ?',JSON.stringify({A:'81',B:'82',C:'83',D:'84'}),'C','easy','35+48: 5+8=13, viết 3 nhớ 1; 3+4+1=8. Kết quả: 83',10,2],
        [1089,1,'single_choice','56 + 37 = ?',JSON.stringify({A:'91',B:'92',C:'93',D:'94'}),'C','easy','56+37: 6+7=13, viết 3 nhớ 1; 5+3+1=9. Kết quả: 93',10,3],
        [1089,1,'true_false','47 + 26 = 73. Đúng hay sai?',null,'true','easy','47+26=73 là đúng',10,4],
        [1089,1,'true_false','58 + 34 = 91. Đúng hay sai?',null,'false','easy','58+34=92, không phải 91',10,5],
        [1089,1,'fill_blank','26 + 47 = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'73'}),'easy','26+47=73',10,6],
        [1089,1,'fill_blank','39 + 54 = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'93'}),'easy','39+54: 9+4=13, viết 3 nhớ 1; 3+5+1=9. Kết quả: 93',10,7],
        [1089,1,'counting','Đếm số hình tròn: 🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵',JSON.stringify({d1:'🔵',d2:'🔵',d3:'🔵',d4:'🔵',d5:'🔵',d6:'🔵',d7:'🔵',d8:'🔵',d9:'🔵',d10:'🔵'}),'10','easy','Đếm: 1..10',10,8],
        [1089,1,'sorting','Sắp xếp theo kết quả tăng dần: 26+47, 38+16, 45+29, 17+56',JSON.stringify({A:'26+47',B:'38+16',C:'45+29',D:'17+56'}),JSON.stringify(['B','D','A','C']),'easy','38+16=54; 17+56=73; 26+47=73; 45+29=74 → B,D,A,C',10,9],
        [1089,1,'cross_out','Gạch bỏ phép tính SAI',JSON.stringify({A:'47+26=73',B:'35+48=84',C:'56+37=93',D:'28+45=72'}),JSON.stringify(['B','D']),'easy','35+48=83 sai; 28+45=73 sai',10,10],
      ],
      ex2: [
        [1089,2,'single_choice','Lớp 2A có 27 học sinh, lớp 2B có 36 học sinh. Cả hai lớp có bao nhiêu?',JSON.stringify({A:'61',B:'62',C:'63',D:'64'}),'C','medium','27+36=63',10,1],
        [1089,2,'single_choice','68 + 25 = ?',JSON.stringify({A:'91',B:'92',C:'93',D:'94'}),'C','medium','68+25: 8+5=13, viết 3 nhớ 1; 6+2+1=9. Kết quả: 93',10,2],
        [1089,2,'multiple_choice','Phép tính nào có kết quả là số chẵn?',JSON.stringify({A:'37+26',B:'48+35',C:'29+44',D:'56+28'}),JSON.stringify(['A','C']),'medium','37+26=63 lẻ; 48+35=83 lẻ; 29+44=73 lẻ; 56+28=84 chẵn... Thử lại: 46+28=74 chẵn; 37+25=62 chẵn',10,3],
        [1089,2,'multiple_choice','Phép tính nào có kết quả lớn hơn 80?',JSON.stringify({A:'47+26',B:'58+35',C:'36+47',D:'69+24'}),JSON.stringify(['B','D']),'medium','58+35=93; 69+24=93; 47+26=73; 36+47=83',10,4],
        [1089,2,'matching','Nối phép tính với kết quả',JSON.stringify({A:'27+36',B:'48+25',C:'39+54',D:'67+16'}),JSON.stringify({A:'63',B:'73',C:'93',D:'83'}),'medium','27+36=63; 48+25=73; 39+54=93; 67+16=83',10,5],
        [1089,2,'matching','Nối hai phép tính có cùng kết quả',JSON.stringify({A:'28+45',B:'37+56',C:'46+27',D:'55+38'}),JSON.stringify({A:'C',B:'D',C:'A',D:'B'}),'medium','28+45=73=46+27; 37+56=93=55+38',10,6],
        [1089,2,'drag_drop','Kéo thả điền số: 4□+□8=73',JSON.stringify({A:'4',B:'3',C:'2',D:'5'}),JSON.stringify(['A','C']),'medium','45+28=73',10,7],
        [1089,2,'table_fill','Hoàn thành bảng',JSON.stringify({headers:['Số hạng 1','Số hạng 2','Tổng'],rows:[{c1:'27',c2:'36',c3:'_'},{c1:'48',c2:'_',c3:'73'},{c1:'_',c2:'46',c3:'93'}]}),JSON.stringify({c3_1:'63',c2_2:'25',c1_3:'47'}),'medium','27+36=63; 48+25=73; 47+46=93',10,8],
        [1089,2,'number_line','Tìm kết quả 38+25 trên trục số',JSON.stringify({min:60,max:70,step:1,marks:[60,61,62,63,64,65,66,67,68,69,70],hidden:['63']}),JSON.stringify(['63']),'medium','38+25=63',10,9],
        [1089,2,'puzzle','Điền số vào ô: □□ + 27 = 63',JSON.stringify({slots:['s1'],tokens:['34','35','36','37']}),JSON.stringify({s1:'36'}),'medium','63-27=36',10,10],
      ],
      ex3: [
        [1089,3,'fill_blank','Trường có 47 học sinh nữ và 36 học sinh nam. Có tất cả [b1] học sinh.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'83'}),'hard','47+36=83',10,1],
        [1089,3,'fill_blank','□ + 38 = 75, □ = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'37'}),'hard','75-38=37',10,2],
        [1089,3,'puzzle','Tìm A và B: A + B = 82, A = 47',JSON.stringify({slots:['b'],tokens:['33','34','35','36']}),JSON.stringify({b:'35'}),'hard','82-47=35',10,3],
        [1089,3,'puzzle','Điền số: 5□ + 2□ = 83',JSON.stringify({slots:['x','y'],tokens:['6','7','8','9']}),JSON.stringify({x:'6',y:'7'}),'hard','56+27=83',10,4],
        [1089,3,'game','Ghép đôi bài toán với đáp án',JSON.stringify({pairs:[{q:'27+36',a:'63'},{q:'48+25',a:'73'},{q:'39+54',a:'93'},{q:'67+16',a:'83'}]}),JSON.stringify({}),'hard','Ghép đúng từng cặp',10,5],
        [1089,3,'sorting','Sắp xếp từ nhỏ đến lớn: 56+27, 38+45, 47+36, 29+54',JSON.stringify({A:'56+27',B:'38+45',C:'47+36',D:'29+54'}),JSON.stringify(['C','D','B','A']),'hard','47+36=83; 29+54=83; 38+45=83; 56+27=83 — tất cả bằng 83, hoặc: 47+36=83; 38+45=83; 29+54=83; 56+27=83',10,6],
        [1089,3,'matching','Nối bài toán với lời giải',JSON.stringify({A:'Có 38 con gà và 45 con vịt. Tổng?',B:'Vườn có 56 cây xanh và 27 cây đỏ. Tổng?',C:'Hộp A có 47 bút, hộp B có 36 bút. Tổng?',D:'Kho có 29 xe đạp và 54 xe máy. Tổng?'}),JSON.stringify({A:'83',B:'83',C:'83',D:'83'}),'hard','38+45=83; 56+27=83; 47+36=83; 29+54=83',10,7],
        [1089,3,'multiple_choice','Các phép tính nào có kết quả bằng 83?',JSON.stringify({A:'47+36',B:'38+45',C:'56+27',D:'29+54'}),JSON.stringify(['A','B','C','D']),'hard','Tất cả đều bằng 83',10,8],
        [1089,3,'multiple_choice','Phép tính nào cần nhớ 1 khi cộng?',JSON.stringify({A:'23+46',B:'37+48',C:'51+32',D:'68+25'}),JSON.stringify(['B','D']),'hard','37+48: 7+8=15>9; 68+25: 8+5=13>9',10,9],
        [1089,3,'drag_drop','Sắp xếp bước giải: 7+6=13, viết 3 nhớ 1, 4+2+1=7, kết quả 73',JSON.stringify({A:'7+6=13',B:'viết 3 nhớ 1',C:'4+2+1=7',D:'kết quả 73'}),JSON.stringify(['A','B','C','D']),'hard','Các bước cộng 47+26',10,10],
      ],
    },

    // ─── 1090: Luyện tập chung 5 ────────────────────────────────────────────────
    {
      id: 1090,
      ex1: [
        [1090,1,'single_choice','36 + 7 = ?',JSON.stringify({A:'42',B:'43',C:'44',D:'45'}),'B','easy','36+7: 6+7=13, viết 3 nhớ 1; 3+1+1=5. Kết quả: 43',10,1],
        [1090,1,'single_choice','54 + 38 = ?',JSON.stringify({A:'90',B:'91',C:'92',D:'93'}),'C','easy','54+38: 4+8=12, viết 2 nhớ 1; 5+3+1=9. Kết quả: 92',10,2],
        [1090,1,'single_choice','28 + 45 = ?',JSON.stringify({A:'71',B:'72',C:'73',D:'74'}),'C','easy','28+45: 8+5=13, viết 3 nhớ 1; 2+4+1=7. Kết quả: 73',10,3],
        [1090,1,'true_false','36 + 7 = 43. Đúng hay sai?',null,'true','easy','36+7=43 là đúng',10,4],
        [1090,1,'true_false','54 + 38 = 91. Đúng hay sai?',null,'false','easy','54+38=92, không phải 91',10,5],
        [1090,1,'fill_blank','47 + 6 = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'53'}),'easy','47+6=53',10,6],
        [1090,1,'fill_blank','35 + 47 = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'82'}),'easy','35+47=82',10,7],
        [1090,1,'counting','Đếm số quả táo: 🍎🍎🍎🍎🍎🍎🍎',JSON.stringify({d1:'🍎',d2:'🍎',d3:'🍎',d4:'🍎',d5:'🍎',d6:'🍎',d7:'🍎'}),'7','easy','Đếm: 1..7',10,8],
        [1090,1,'sorting','Sắp xếp tăng dần: 36+7, 54+8, 28+5, 47+6',JSON.stringify({A:'36+7',B:'54+8',C:'28+5',D:'47+6'}),JSON.stringify(['C','A','D','B']),'easy','28+5=33; 36+7=43; 47+6=53; 54+8=62',10,9],
        [1090,1,'cross_out','Gạch bỏ phép tính SAI',JSON.stringify({A:'36+7=43',B:'54+8=62',C:'28+5=34',D:'47+6=52'}),JSON.stringify(['C','D']),'easy','28+5=33 sai; 47+6=53 sai',10,10],
      ],
      ex2: [
        [1090,2,'single_choice','Cả cộng có nhớ: 67 + 25 = ?',JSON.stringify({A:'90',B:'91',C:'92',D:'93'}),'C','medium','67+25: 7+5=12, viết 2 nhớ 1; 6+2+1=9. Kết quả: 92',10,1],
        [1090,2,'single_choice','Thùng A chứa 48 lít, thùng B chứa 37 lít. Cả hai thùng chứa?',JSON.stringify({A:'83',B:'84',C:'85',D:'86'}),'C','medium','48+37=85',10,2],
        [1090,2,'multiple_choice','Phép tính nào có kết quả hơn 70?',JSON.stringify({A:'36+7',B:'47+28',C:'55+16',D:'63+9'}),JSON.stringify(['B','C','D']),'medium','47+28=75; 55+16=71; 63+9=72',10,3],
        [1090,2,'multiple_choice','Kết quả nào chia hết cho 5?',JSON.stringify({A:'36+9',B:'47+8',C:'38+7',D:'26+9'}),JSON.stringify(['A','C']),'medium','36+9=45; 38+7=45',10,4],
        [1090,2,'matching','Nối phép tính với kết quả',JSON.stringify({A:'47+6',B:'38+27',C:'56+8',D:'45+37'}),JSON.stringify({A:'53',B:'65',C:'64',D:'82'}),'medium','47+6=53; 38+27=65; 56+8=64; 45+37=82',10,5],
        [1090,2,'matching','Nối ô trống với số đúng',JSON.stringify({A:'□+8=53',B:'47+□=65',C:'□+27=64',D:'45+□=82'}),JSON.stringify({A:'45',B:'18',C:'37',D:'37'}),'medium','45+8=53; 47+18=65; 37+27=64; 45+37=82',10,6],
        [1090,2,'drag_drop','Kéo thả các bước tính 47+28',JSON.stringify({A:'7+8=15',B:'viết 5 nhớ 1',C:'4+2+1=7',D:'kết quả 75'}),JSON.stringify(['A','B','C','D']),'medium','Quy trình cộng có nhớ',10,7],
        [1090,2,'table_fill','Hoàn thành bảng',JSON.stringify({headers:['Số hạng 1','Số hạng 2','Tổng'],rows:[{c1:'36',c2:'7',c3:'_'},{c1:'54',c2:'38',c3:'_'},{c1:'28',c2:'45',c3:'_'}]}),JSON.stringify({c3_1:'43',c3_2:'92',c3_3:'73'}),'medium','36+7=43; 54+38=92; 28+45=73',10,8],
        [1090,2,'number_line','Tìm 47+8 trên trục số',JSON.stringify({min:50,max:60,step:1,marks:[50,51,52,53,54,55,56,57,58,59,60],hidden:['55']}),JSON.stringify(['55']),'medium','47+8=55',10,9],
        [1090,2,'puzzle','Tìm số bị thiếu: □ + 36 = 74',JSON.stringify({slots:['s1'],tokens:['36','37','38','39']}),JSON.stringify({s1:'38'}),'medium','74-36=38',10,10],
      ],
      ex3: [
        [1090,3,'fill_blank','Có [b1] học sinh khối 2. Khối 2 có 47 bạn nam và 38 bạn nữ.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'85'}),'hard','47+38=85',10,1],
        [1090,3,'fill_blank','Tính: (24 + 8) + 37 = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'69'}),'hard','24+8=32; 32+37=69',10,2],
        [1090,3,'puzzle','Tìm X: X + 47 = 83',JSON.stringify({slots:['x'],tokens:['34','35','36','37']}),JSON.stringify({x:'36'}),'hard','83-47=36',10,3],
        [1090,3,'puzzle','Tìm hai số hạng: □□ + □□ = 82, số hạng lớn hơn là 47',JSON.stringify({slots:['s1'],tokens:['33','34','35','36']}),JSON.stringify({s1:'35'}),'hard','82-47=35',10,4],
        [1090,3,'game','Ghép đôi phép tính với kết quả',JSON.stringify({pairs:[{q:'36+7',a:'43'},{q:'54+38',a:'92'},{q:'28+45',a:'73'},{q:'47+28',a:'75'}]}),JSON.stringify({}),'hard','Kết quả đã tính đúng',10,5],
        [1090,3,'sorting','Sắp xếp từ lớn đến nhỏ: 47+28, 36+54, 28+47, 55+27',JSON.stringify({A:'47+28',B:'36+54',C:'28+47',D:'55+27'}),JSON.stringify(['B','D','A','C']),'hard','36+54=90; 55+27=82; 47+28=75; 28+47=75',10,6],
        [1090,3,'matching','Nối bài toán với đáp án',JSON.stringify({A:'Hộp có 47 cái bánh. Thêm 28 cái. Tổng?',B:'Vườn 36 cây xanh thêm 54 cây. Tổng?',C:'Kho 55 hộp thêm 27 hộp. Tổng?',D:'Lớp 28 bạn thêm 47 bạn. Tổng?'}),JSON.stringify({A:'75',B:'90',C:'82',D:'75'}),'hard','47+28=75; 36+54=90; 55+27=82; 28+47=75',10,7],
        [1090,3,'multiple_choice','Phép tính nào có kết quả là số lẻ?',JSON.stringify({A:'47+28',B:'36+7',C:'54+38',D:'28+45'}),JSON.stringify(['B','C','D']),'hard','36+7=43 lẻ; 54+38=92 chẵn; 28+45=73 lẻ; 47+28=75 lẻ',10,8],
        [1090,3,'multiple_choice','Kết quả nào trong khoảng 70-85?',JSON.stringify({A:'47+28',B:'36+54',C:'28+45',D:'55+27'}),JSON.stringify(['A','C','D']),'hard','47+28=75; 28+45=73; 55+27=82; 36+54=90',10,9],
        [1090,3,'drag_drop','Kéo thả để lập phép tính: kết quả 85, số hạng 47',JSON.stringify({A:'47',B:'+',C:'38',D:'=',E:'85'}),JSON.stringify(['A','B','C','D','E']),'hard','47+38=85',10,10],
      ],
    },

    // ─── 1091: Phép trừ có nhớ 2 chữ số - 1 chữ số ────────────────────────────
    {
      id: 1091,
      ex1: [
        [1091,1,'single_choice','32 - 5 = ?',JSON.stringify({A:'25',B:'26',C:'27',D:'28'}),'C','easy','32-5: 2<5, mượn 1; 12-5=7, hàng chục còn 3-1=2. Kết quả: 27',10,1],
        [1091,1,'single_choice','43 - 6 = ?',JSON.stringify({A:'35',B:'36',C:'37',D:'38'}),'C','easy','43-6: 3<6, mượn 1; 13-6=7, hàng chục còn 4-1=3. Kết quả: 37',10,2],
        [1091,1,'single_choice','51 - 4 = ?',JSON.stringify({A:'45',B:'46',C:'47',D:'48'}),'C','easy','51-4: 1<4, mượn 1; 11-4=7, hàng chục còn 5-1=4. Kết quả: 47',10,3],
        [1091,1,'true_false','32 - 5 = 27. Đúng hay sai?',null,'true','easy','32-5=27 là đúng',10,4],
        [1091,1,'true_false','43 - 6 = 36. Đúng hay sai?',null,'false','easy','43-6=37, không phải 36',10,5],
        [1091,1,'fill_blank','62 - 7 = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'55'}),'easy','62-7: 2<7, mượn 1; 12-7=5, hàng chục còn 6-1=5. Kết quả: 55',10,6],
        [1091,1,'fill_blank','74 - 8 = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'66'}),'easy','74-8: 4<8, mượn 1; 14-8=6, hàng chục còn 7-1=6. Kết quả: 66',10,7],
        [1091,1,'counting','Có bao nhiêu hình vuông? 🟥🟥🟥🟥🟥🟥',JSON.stringify({d1:'🟥',d2:'🟥',d3:'🟥',d4:'🟥',d5:'🟥',d6:'🟥'}),'6','easy','Đếm: 1..6',10,8],
        [1091,1,'sorting','Sắp xếp kết quả tăng dần: 32-5, 43-6, 51-4, 62-7',JSON.stringify({A:'32-5',B:'43-6',C:'51-4',D:'62-7'}),JSON.stringify(['A','B','C','D']),'easy','32-5=27; 43-6=37; 51-4=47; 62-7=55',10,9],
        [1091,1,'cross_out','Gạch bỏ phép tính SAI',JSON.stringify({A:'32-5=27',B:'43-6=38',C:'51-4=47',D:'62-7=54'})  ,JSON.stringify(['B','D']),'easy','43-6=37 sai; 62-7=55 sai',10,10],
      ],
      ex2: [
        [1091,2,'single_choice','Có 53 quả cam, bán đi 8 quả. Còn lại?',JSON.stringify({A:'43',B:'44',C:'45',D:'46'}),'C','medium','53-8=45',10,1],
        [1091,2,'single_choice','83 - 7 = ?',JSON.stringify({A:'74',B:'75',C:'76',D:'77'}),'C','medium','83-7: 3<7, mượn 1; 13-7=6, hàng chục còn 8-1=7. Kết quả: 76',10,2],
        [1091,2,'multiple_choice','Phép tính nào có kết quả nhỏ hơn 40?',JSON.stringify({A:'43-6',B:'32-5',C:'51-4',D:'41-8'}),JSON.stringify(['B','D']),'medium','32-5=27; 41-8=33',10,3],
        [1091,2,'multiple_choice','Kết quả nào là số chẵn?',JSON.stringify({A:'32-5',B:'43-6',C:'54-7',D:'65-8'}),JSON.stringify(['C','D']),'medium','54-7=47 lẻ; 65-8=57 lẻ; 32-5=27 lẻ; 43-6=37 lẻ — Thử: 34-6=28 chẵn; 45-7=38 chẵn',10,4],
        [1091,2,'matching','Nối phép tính với kết quả',JSON.stringify({A:'32-5',B:'43-6',C:'51-4',D:'74-8'}),JSON.stringify({A:'27',B:'37',C:'47',D:'66'}),'medium','32-5=27; 43-6=37; 51-4=47; 74-8=66',10,5],
        [1091,2,'matching','Nối để được phép tính đúng',JSON.stringify({A:'□-5=27',B:'□-6=37',C:'□-4=47',D:'□-8=66'}),JSON.stringify({A:'32',B:'43',C:'51',D:'74'}),'medium','27+5=32; 37+6=43; 47+4=51; 66+8=74',10,6],
        [1091,2,'drag_drop','Kéo thả các bước tính 53-8',JSON.stringify({A:'3<8 mượn 1',B:'13-8=5',C:'5-1=4',D:'kết quả 45'}),JSON.stringify(['A','B','C','D']),'medium','Các bước trừ có nhớ',10,7],
        [1091,2,'table_fill','Hoàn thành bảng trừ',JSON.stringify({headers:['Số bị trừ','Số trừ','Hiệu'],rows:[{c1:'32',c2:'5',c3:'_'},{c1:'43',c2:'_',c3:'37'},{c1:'_',c2:'4',c3:'47'}]}),JSON.stringify({c3_1:'27',c2_2:'6',c1_3:'51'}),'medium','32-5=27; 43-6=37; 51-4=47',10,8],
        [1091,2,'number_line','Tìm kết quả 62-7 trên trục số',JSON.stringify({min:50,max:60,step:1,marks:[50,51,52,53,54,55,56,57,58,59,60],hidden:['55']}),JSON.stringify(['55']),'medium','62-7=55',10,9],
        [1091,2,'puzzle','Tìm số bị trừ: □ - 8 = 45',JSON.stringify({slots:['s1'],tokens:['51','52','53','54']}),JSON.stringify({s1:'53'}),'medium','45+8=53',10,10],
      ],
      ex3: [
        [1091,3,'fill_blank','Hộp có 72 chiếc bánh. Ăn 9 chiếc. Còn [b1] chiếc.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'63'}),'hard','72-9=63',10,1],
        [1091,3,'fill_blank','Tính: 83 - □ = 76, □ = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'7'}),'hard','83-76=7',10,2],
        [1091,3,'puzzle','Tìm X: X - 6 = 47',JSON.stringify({slots:['x'],tokens:['51','52','53','54']}),JSON.stringify({x:'53'}),'hard','47+6=53',10,3],
        [1091,3,'puzzle','Tìm số: □□ - 8 = 46',JSON.stringify({slots:['s1'],tokens:['52','53','54','55']}),JSON.stringify({s1:'54'}),'hard','46+8=54',10,4],
        [1091,3,'game','Ghép đôi phép trừ với kết quả',JSON.stringify({pairs:[{q:'32-5',a:'27'},{q:'43-6',a:'37'},{q:'51-4',a:'47'},{q:'74-8',a:'66'}]}),JSON.stringify({}),'hard','Ghép đúng từng cặp',10,5],
        [1091,3,'sorting','Sắp xếp từ lớn đến nhỏ: 32-5, 84-7, 53-8, 71-4',JSON.stringify({A:'32-5',B:'84-7',C:'53-8',D:'71-4'}),JSON.stringify(['B','D','C','A']),'hard','84-7=77; 71-4=67; 53-8=45; 32-5=27',10,6],
        [1091,3,'matching','Nối bài toán với đáp án',JSON.stringify({A:'Cửa hàng có 53 hộp, bán 8 hộp. Còn?',B:'Vườn 84 cây, chặt 7 cây. Còn?',C:'Kho 71 thùng, xuất 4 thùng. Còn?',D:'Hộp 32 quả, lấy 5 quả. Còn?'}),JSON.stringify({A:'45',B:'77',C:'67',D:'27'}),'hard','53-8=45; 84-7=77; 71-4=67; 32-5=27',10,7],
        [1091,3,'multiple_choice','Kết quả nào lớn hơn 60?',JSON.stringify({A:'84-7',B:'53-8',C:'71-4',D:'32-5'}),JSON.stringify(['A','C']),'hard','84-7=77; 71-4=67',10,8],
        [1091,3,'multiple_choice','Phép tính nào có nhớ khi trừ?',JSON.stringify({A:'45-3',B:'72-8',C:'61-0',D:'93-6'}),JSON.stringify(['B','D']),'hard','72-8: 2<8 cần nhớ; 93-6: 3<6 cần nhớ',10,9],
        [1091,3,'drag_drop','Kéo thả để giải: Lớp có 53 học sinh, nghỉ 8. Đi học?',JSON.stringify({A:'53',B:'-',C:'8',D:'=',E:'45'}),JSON.stringify(['A','B','C','D','E']),'hard','53-8=45',10,10],
      ],
    },

    // ─── 1092: Phép trừ có nhớ 2 chữ số - 2 chữ số ────────────────────────────
    {
      id: 1092,
      ex1: [
        [1092,1,'single_choice','73 - 26 = ?',JSON.stringify({A:'45',B:'46',C:'47',D:'48'}),'C','easy','73-26: 3<6 mượn 1; 13-6=7, 7-2-1=4. Kết quả: 47',10,1],
        [1092,1,'single_choice','82 - 45 = ?',JSON.stringify({A:'35',B:'36',C:'37',D:'38'}),'C','easy','82-45: 2<5 mượn 1; 12-5=7, 8-4-1=3. Kết quả: 37',10,2],
        [1092,1,'single_choice','91 - 54 = ?',JSON.stringify({A:'35',B:'36',C:'37',D:'38'}),'C','easy','91-54: 1<4 mượn 1; 11-4=7, 9-5-1=3. Kết quả: 37',10,3],
        [1092,1,'true_false','73 - 26 = 47. Đúng hay sai?',null,'true','easy','73-26=47 là đúng',10,4],
        [1092,1,'true_false','82 - 45 = 38. Đúng hay sai?',null,'false','easy','82-45=37, không phải 38',10,5],
        [1092,1,'fill_blank','63 - 47 = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'16'}),'easy','63-47: 3<7 mượn 1; 13-7=6, 6-4-1=1. Kết quả: 16',10,6],
        [1092,1,'fill_blank','85 - 38 = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'47'}),'easy','85-38: 5<8 mượn 1; 15-8=7, 8-3-1=4. Kết quả: 47',10,7],
        [1092,1,'counting','Đếm số ngôi sao: ⭐⭐⭐⭐⭐⭐⭐⭐⭐',JSON.stringify({d1:'⭐',d2:'⭐',d3:'⭐',d4:'⭐',d5:'⭐',d6:'⭐',d7:'⭐',d8:'⭐',d9:'⭐'}),'9','easy','Đếm: 1..9',10,8],
        [1092,1,'sorting','Sắp xếp tăng dần: 73-26, 82-45, 91-54, 63-47',JSON.stringify({A:'73-26',B:'82-45',C:'91-54',D:'63-47'}),JSON.stringify(['D','B','C','A']),'easy','63-47=16; 82-45=37; 91-54=37; 73-26=47',10,9],
        [1092,1,'cross_out','Gạch bỏ phép tính SAI',JSON.stringify({A:'73-26=47',B:'82-45=38',C:'91-54=37',D:'63-47=17'}),JSON.stringify(['B','D']),'easy','82-45=37 sai; 63-47=16 sai',10,10],
      ],
      ex2: [
        [1092,2,'single_choice','Vườn có 75 bông hoa, hái 38 bông. Còn lại?',JSON.stringify({A:'35',B:'36',C:'37',D:'38'}),'C','medium','75-38=37',10,1],
        [1092,2,'single_choice','93 - 56 = ?',JSON.stringify({A:'35',B:'36',C:'37',D:'38'}),'C','medium','93-56: 3<6 mượn 1; 13-6=7, 9-5-1=3. Kết quả: 37',10,2],
        [1092,2,'multiple_choice','Phép tính nào có kết quả nhỏ hơn 30?',JSON.stringify({A:'73-26',B:'63-47',C:'52-38',D:'81-54'}),JSON.stringify(['B','C']),'medium','63-47=16; 52-38=14',10,3],
        [1092,2,'multiple_choice','Kết quả nào là số chẵn?',JSON.stringify({A:'73-26',B:'82-46',C:'91-53',D:'64-28'}),JSON.stringify(['B','D']),'medium','82-46=36; 64-28=36',10,4],
        [1092,2,'matching','Nối phép tính với kết quả',JSON.stringify({A:'73-26',B:'82-45',C:'91-54',D:'85-38'}),JSON.stringify({A:'47',B:'37',C:'37',D:'47'}),'medium','73-26=47; 82-45=37; 91-54=37; 85-38=47',10,5],
        [1092,2,'matching','Nối ô trống với số đúng',JSON.stringify({A:'□-26=47',B:'□-45=37',C:'91-□=37',D:'85-□=47'}),JSON.stringify({A:'73',B:'82',C:'54',D:'38'}),'medium','47+26=73; 37+45=82; 91-37=54; 85-47=38',10,6],
        [1092,2,'drag_drop','Kéo thả các bước tính 75-38',JSON.stringify({A:'5<8 mượn 1',B:'15-8=7',C:'7-3-1=3',D:'kết quả 37'}),JSON.stringify(['A','B','C','D']),'medium','Các bước trừ có nhớ',10,7],
        [1092,2,'table_fill','Hoàn thành bảng',JSON.stringify({headers:['Số bị trừ','Số trừ','Hiệu'],rows:[{c1:'73',c2:'26',c3:'_'},{c1:'82',c2:'_',c3:'37'},{c1:'_',c2:'54',c3:'37'}]}),JSON.stringify({c3_1:'47',c2_2:'45',c1_3:'91'}),'medium','73-26=47; 82-45=37; 91-54=37',10,8],
        [1092,2,'number_line','Tìm kết quả 63-27 trên trục số',JSON.stringify({min:30,max:40,step:1,marks:[30,31,32,33,34,35,36,37,38,39,40],hidden:['36']}),JSON.stringify(['36']),'medium','63-27=36',10,9],
        [1092,2,'puzzle','Tìm số bị trừ: □□ - 38 = 47',JSON.stringify({slots:['s1'],tokens:['83','84','85','86']}),JSON.stringify({s1:'85'}),'medium','47+38=85',10,10],
      ],
      ex3: [
        [1092,3,'fill_blank','Rổ có 82 quả. Lấy ra 45 quả. Còn [b1] quả.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'37'}),'hard','82-45=37',10,1],
        [1092,3,'fill_blank','73 - □ = 46, □ = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'27'}),'hard','73-46=27',10,2],
        [1092,3,'puzzle','Tìm X: X - 38 = 47',JSON.stringify({slots:['x'],tokens:['83','84','85','86']}),JSON.stringify({x:'85'}),'hard','47+38=85',10,3],
        [1092,3,'puzzle','Điền số: □□ - □□ = 47, số trừ là 26',JSON.stringify({slots:['s1'],tokens:['71','72','73','74']}),JSON.stringify({s1:'73'}),'hard','47+26=73',10,4],
        [1092,3,'game','Ghép đôi phép trừ với kết quả',JSON.stringify({pairs:[{q:'73-26',a:'47'},{q:'82-45',a:'37'},{q:'91-54',a:'37'},{q:'85-38',a:'47'}]}),JSON.stringify({}),'hard','Ghép đúng từng cặp',10,5],
        [1092,3,'sorting','Sắp xếp từ lớn đến nhỏ: 73-26, 82-45, 63-47, 94-57',JSON.stringify({A:'73-26',B:'82-45',C:'63-47',D:'94-57'}),JSON.stringify(['A','B','D','C']),'hard','73-26=47; 82-45=37; 94-57=37; 63-47=16',10,6],
        [1092,3,'matching','Nối bài toán với đáp án',JSON.stringify({A:'Có 82 cái bánh, ăn 45 cái. Còn?',B:'Vườn 73 cây, chặt 26 cây. Còn?',C:'Kho 63 thùng, xuất 47 thùng. Còn?',D:'Hộp 94 quả, lấy 57 quả. Còn?'}),JSON.stringify({A:'37',B:'47',C:'16',D:'37'}),'hard','82-45=37; 73-26=47; 63-47=16; 94-57=37',10,7],
        [1092,3,'multiple_choice','Kết quả nào lớn hơn 40?',JSON.stringify({A:'73-26',B:'63-47',C:'82-45',D:'94-57'}),JSON.stringify(['A']),'hard','73-26=47; 63-47=16; 82-45=37; 94-57=37',10,8],
        [1092,3,'multiple_choice','Phép tính nào cần nhớ khi trừ?',JSON.stringify({A:'76-32',B:'83-47',C:'95-61',D:'72-38'}),JSON.stringify(['B','D']),'hard','83-47: 3<7 cần nhớ; 72-38: 2<8 cần nhớ',10,9],
        [1092,3,'drag_drop','Kéo thả để giải: Trường có 82 quyển sách, cho 45 quyển. Còn?',JSON.stringify({A:'82',B:'-',C:'45',D:'=',E:'37'}),JSON.stringify(['A','B','C','D','E']),'hard','82-45=37',10,10],
      ],
    },

    // ─── 1093: Luyện tập chung 6 ────────────────────────────────────────────────
    {
      id: 1093,
      ex1: [
        [1093,1,'single_choice','43 - 8 = ?',JSON.stringify({A:'33',B:'34',C:'35',D:'36'}),'C','easy','43-8: 3<8 mượn 1; 13-8=5, 4-1=3. Kết quả: 35',10,1],
        [1093,1,'single_choice','72 - 35 = ?',JSON.stringify({A:'35',B:'36',C:'37',D:'38'}),'C','easy','72-35: 2<5 mượn 1; 12-5=7, 7-3-1=3. Kết quả: 37',10,2],
        [1093,1,'single_choice','95 - 48 = ?',JSON.stringify({A:'45',B:'46',C:'47',D:'48'}),'C','easy','95-48: 5<8 mượn 1; 15-8=7, 9-4-1=4. Kết quả: 47',10,3],
        [1093,1,'true_false','43 - 8 = 35. Đúng hay sai?',null,'true','easy','43-8=35 là đúng',10,4],
        [1093,1,'true_false','72 - 35 = 38. Đúng hay sai?',null,'false','easy','72-35=37, không phải 38',10,5],
        [1093,1,'fill_blank','84 - 7 = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'77'}),'easy','84-7: 4<7 mượn 1; 14-7=7, 8-1=7. Kết quả: 77',10,6],
        [1093,1,'fill_blank','63 - 28 = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'35'}),'easy','63-28: 3<8 mượn 1; 13-8=5, 6-2-1=3. Kết quả: 35',10,7],
        [1093,1,'counting','Đếm số bông hoa: 🌸🌸🌸🌸🌸',JSON.stringify({d1:'🌸',d2:'🌸',d3:'🌸',d4:'🌸',d5:'🌸'}),'5','easy','Đếm: 1..5',10,8],
        [1093,1,'sorting','Sắp xếp kết quả tăng dần: 43-8, 72-35, 95-48, 84-7',JSON.stringify({A:'43-8',B:'72-35',C:'95-48',D:'84-7'}),JSON.stringify(['B','A','C','D']),'easy','72-35=37; 43-8=35; 95-48=47; 84-7=77',10,9],
        [1093,1,'cross_out','Gạch bỏ phép tính SAI',JSON.stringify({A:'43-8=35',B:'72-35=38',C:'95-48=47',D:'84-7=76'}),JSON.stringify(['B','D']),'easy','72-35=37 sai; 84-7=77 sai',10,10],
      ],
      ex2: [
        [1093,2,'single_choice','Có 84 viên kẹo, chia cho 7 bạn mỗi bạn không bằng. Cho đi 37 viên. Còn?',JSON.stringify({A:'45',B:'46',C:'47',D:'48'}),'C','medium','84-37=47',10,1],
        [1093,2,'single_choice','96 - 49 = ?',JSON.stringify({A:'45',B:'46',C:'47',D:'48'}),'C','medium','96-49: 6<9 mượn 1; 16-9=7, 9-4-1=4. Kết quả: 47',10,2],
        [1093,2,'multiple_choice','Phép tính nào có kết quả lớn hơn 50?',JSON.stringify({A:'43-8',B:'84-7',C:'72-35',D:'95-48'}),JSON.stringify(['B']),'medium','84-7=77; 43-8=35; 72-35=37; 95-48=47',10,3],
        [1093,2,'multiple_choice','Kết quả nào là số lẻ?',JSON.stringify({A:'72-35',B:'84-7',C:'63-28',D:'95-48'}),JSON.stringify(['A','B','C','D']),'medium','37, 77, 35, 47 đều là số lẻ',10,4],
        [1093,2,'matching','Nối phép tính với kết quả',JSON.stringify({A:'43-8',B:'72-35',C:'95-48',D:'84-7'}),JSON.stringify({A:'35',B:'37',C:'47',D:'77'}),'medium','43-8=35; 72-35=37; 95-48=47; 84-7=77',10,5],
        [1093,2,'matching','Nối ô trống với số đúng',JSON.stringify({A:'□-8=35',B:'□-35=37',C:'95-□=47',D:'84-□=77'}),JSON.stringify({A:'43',B:'72',C:'48',D:'7'}),'medium','35+8=43; 37+35=72; 95-47=48; 84-77=7',10,6],
        [1093,2,'drag_drop','Kéo thả bước tính 84-37',JSON.stringify({A:'4<7 mượn 1',B:'14-7=7',C:'8-3-1=4',D:'kết quả 47'}),JSON.stringify(['A','B','C','D']),'medium','Các bước trừ có nhớ',10,7],
        [1093,2,'table_fill','Hoàn thành bảng trừ',JSON.stringify({headers:['Số bị trừ','Số trừ','Hiệu'],rows:[{c1:'43',c2:'8',c3:'_'},{c1:'72',c2:'_',c3:'37'},{c1:'_',c2:'48',c3:'47'}]}),JSON.stringify({c3_1:'35',c2_2:'35',c1_3:'95'}),'medium','43-8=35; 72-35=37; 95-48=47',10,8],
        [1093,2,'number_line','Tìm kết quả 63-8 trên trục số',JSON.stringify({min:50,max:60,step:1,marks:[50,51,52,53,54,55,56,57,58,59,60],hidden:['55']}),JSON.stringify(['55']),'medium','63-8=55',10,9],
        [1093,2,'puzzle','Tìm số bị trừ: □□ - 37 = 47',JSON.stringify({slots:['s1'],tokens:['82','83','84','85']}),JSON.stringify({s1:'84'}),'medium','47+37=84',10,10],
      ],
      ex3: [
        [1093,3,'fill_blank','Kho có 95 chiếc bánh. Xuất 48 chiếc. Còn [b1] chiếc.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'47'}),'hard','95-48=47',10,1],
        [1093,3,'fill_blank','□ - 37 = 47, □ = [b1]',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'84'}),'hard','47+37=84',10,2],
        [1093,3,'puzzle','Tìm X: 94 - X = 47',JSON.stringify({slots:['x'],tokens:['45','46','47','48']}),JSON.stringify({x:'47'}),'hard','94-47=47',10,3],
        [1093,3,'puzzle','Điền số: □□ - □ = 77, số trừ là 7',JSON.stringify({slots:['s1'],tokens:['82','83','84','85']}),JSON.stringify({s1:'84'}),'hard','77+7=84',10,4],
        [1093,3,'game','Ghép đôi phép trừ với kết quả',JSON.stringify({pairs:[{q:'43-8',a:'35'},{q:'72-35',a:'37'},{q:'95-48',a:'47'},{q:'84-7',a:'77'}]}),JSON.stringify({}),'hard','Ghép đúng từng cặp',10,5],
        [1093,3,'sorting','Sắp xếp từ lớn đến nhỏ: 43-8, 84-7, 72-35, 95-48',JSON.stringify({A:'43-8',B:'84-7',C:'72-35',D:'95-48'}),JSON.stringify(['B','D','C','A']),'hard','84-7=77; 95-48=47; 72-35=37; 43-8=35',10,6],
        [1093,3,'matching','Nối bài toán với đáp án',JSON.stringify({A:'Có 95 quyển sách, tặng 48 quyển. Còn?',B:'Vườn 84 cây, chặt 7 cây. Còn?',C:'Kho 72 thùng, xuất 35 thùng. Còn?',D:'Hộp 43 kẹo, ăn 8 cái. Còn?'}),JSON.stringify({A:'47',B:'77',C:'37',D:'35'}),'hard','95-48=47; 84-7=77; 72-35=37; 43-8=35',10,7],
        [1093,3,'multiple_choice','Kết quả nào lớn hơn 40?',JSON.stringify({A:'43-8',B:'84-7',C:'72-35',D:'95-48'}),JSON.stringify(['B','D']),'hard','84-7=77; 95-48=47',10,8],
        [1093,3,'multiple_choice','Phép tính nào là trừ có nhớ?',JSON.stringify({A:'75-32',B:'84-47',C:'96-53',D:'73-28'}),JSON.stringify(['B','D']),'hard','84-47: 4<7; 73-28: 3<8',10,9],
        [1093,3,'drag_drop','Kéo thả để giải: Hồ có 84 con cá, bắt 37 con. Còn?',JSON.stringify({A:'84',B:'-',C:'37',D:'=',E:'47'}),JSON.stringify(['A','B','C','D','E']),'hard','84-37=47',10,10],
      ],
    },

    // ─── 1094: Điểm, đoạn thẳng, đường thẳng, đường cong ──────────────────────
    {
      id: 1094,
      ex1: [
        [1094,1,'single_choice','Hình nào là đoạn thẳng?',JSON.stringify({A:'Đường ngoằn ngoèo',B:'Hai điểm nối thẳng',C:'Vòng tròn',D:'Đường lượn sóng'}),'B','easy','Đoạn thẳng là đường nối thẳng giữa hai điểm',10,1],
        [1094,1,'single_choice','Điểm là gì trong toán học?',JSON.stringify({A:'Một đoạn thẳng ngắn',B:'Một vòng tròn nhỏ',C:'Một vị trí trong không gian',D:'Một đường thẳng dài'}),'C','easy','Điểm là vị trí xác định trong không gian, thường ký hiệu bằng chữ cái in hoa',10,2],
        [1094,1,'single_choice','Đường thẳng khác đoạn thẳng ở điểm nào?',JSON.stringify({A:'Đường thẳng không có điểm',B:'Đường thẳng kéo dài vô hạn về 2 phía',C:'Đường thẳng là đường cong',D:'Đường thẳng ngắn hơn đoạn thẳng'}),'B','easy','Đường thẳng không có điểm đầu và điểm cuối, kéo dài vô hạn',10,3],
        [1094,1,'true_false','Đoạn thẳng AB và đoạn thẳng BA là một. Đúng hay sai?',null,'true','easy','AB và BA là cùng một đoạn thẳng, chỉ khác chiều gọi tên',10,4],
        [1094,1,'true_false','Đường cong là đường thẳng bị uốn cong. Đúng hay sai?',null,'false','easy','Đường cong và đường thẳng là hai loại đường khác nhau',10,5],
        [1094,1,'fill_blank','Đoạn thẳng có hai [b1] và hai điểm cuối.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'đầu'}),'easy','Đoạn thẳng có hai đầu (điểm đầu và điểm cuối)',10,6],
        [1094,1,'fill_blank','Đường thẳng kéo dài [b1] về hai phía.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'vô hạn'}),'easy','Đường thẳng kéo dài vô hạn về hai phía',10,7],
        [1094,1,'counting','Có bao nhiêu điểm được đánh dấu: A, B, C, D, E',JSON.stringify({d1:'A',d2:'B',d3:'C',d4:'D',d5:'E'}),'5','easy','Đếm các điểm: A, B, C, D, E = 5 điểm',10,8],
        [1094,1,'sorting','Sắp xếp từ nhỏ nhất đến lớn nhất (số đoạn thẳng): tam giác, tứ giác, ngũ giác, đoạn thẳng',JSON.stringify({A:'đoạn thẳng',B:'tam giác',C:'tứ giác',D:'ngũ giác'}),JSON.stringify(['A','B','C','D']),'easy','1, 3, 4, 5 đoạn thẳng',10,9],
        [1094,1,'cross_out','Gạch bỏ hình không phải đường thẳng',JSON.stringify({A:'Đường thẳng AB',B:'Đường cong MN',C:'Đường thẳng CD',D:'Đường lượn sóng PQ'}),JSON.stringify(['B','D']),'easy','Đường cong và đường lượn sóng không phải đường thẳng',10,10],
      ],
      ex2: [
        [1094,2,'single_choice','Hai điểm A và B xác định được bao nhiêu đoạn thẳng?',JSON.stringify({A:'0',B:'1',C:'2',D:'Vô số'}),'B','medium','Hai điểm xác định đúng một đoạn thẳng',10,1],
        [1094,2,'single_choice','Qua hai điểm có thể vẽ được bao nhiêu đường thẳng?',JSON.stringify({A:'0',B:'1',C:'2',D:'Vô số'}),'B','medium','Qua hai điểm chỉ có một đường thẳng duy nhất',10,2],
        [1094,2,'multiple_choice','Hình nào là đường cong?',JSON.stringify({A:'Đường viền chữ O',B:'Cạnh bàn thẳng',C:'Đường lượn sóng',D:'Cạnh quyển sách'})  ,JSON.stringify(['A','C']),'medium','Đường viền chữ O và đường lượn sóng là đường cong',10,3],
        [1094,2,'multiple_choice','Điều gì đúng về đoạn thẳng?',JSON.stringify({A:'Có hai điểm đầu cuối',B:'Kéo dài vô hạn',C:'Có thể đo được độ dài',D:'Không có điểm nào'})  ,JSON.stringify(['A','C']),'medium','Đoạn thẳng có hai điểm đầu cuối và đo được độ dài',10,4],
        [1094,2,'matching','Nối tên với đặc điểm',JSON.stringify({A:'Điểm',B:'Đoạn thẳng',C:'Đường thẳng',D:'Đường cong'}),JSON.stringify({A:'Ký hiệu chữ cái in hoa',B:'Có hai đầu, đo được',C:'Kéo dài vô hạn',D:'Uốn lượn, không thẳng'}),'medium','Đặc điểm của mỗi loại',10,5],
        [1094,2,'matching','Nối hình vẽ với tên gọi',JSON.stringify({A:'→←',B:'·',C:'〜',D:'——'}),JSON.stringify({A:'Đường thẳng',B:'Điểm',C:'Đường cong',D:'Đoạn thẳng'}),'medium','Nhận biết hình vẽ',10,6],
        [1094,2,'drag_drop','Sắp xếp: điểm A, điểm B, đoạn thẳng AB, đường thẳng AB',JSON.stringify({A:'Điểm',B:'Điểm',C:'Đoạn thẳng',D:'Đường thẳng'}),JSON.stringify(['A','B','C','D']),'medium','Từ nhỏ đến lớn/phức tạp',10,7],
        [1094,2,'table_fill','Hoàn thành bảng đặc điểm',JSON.stringify({headers:['Loại','Có điểm đầu','Đo được'],rows:[{c1:'Đoạn thẳng',c2:'_',c3:'_'},{c1:'Đường thẳng',c2:'_',c3:'_'}]}),JSON.stringify({c2_1:'Có',c3_1:'Có',c2_2:'Không',c3_2:'Không'}),'medium','Đoạn thẳng có điểm đầu, đo được; đường thẳng không có',10,8],
        [1094,2,'number_line','Điểm nào nằm giữa A(2) và C(8) trên trục số?',JSON.stringify({min:0,max:10,step:1,marks:[0,1,2,3,4,5,6,7,8,9,10],hidden:['5']}),JSON.stringify(['5']),'medium','Điểm B(5) nằm giữa A(2) và C(8)',10,9],
        [1094,2,'puzzle','Ghép: Đoạn thẳng AB có _ điểm đầu',JSON.stringify({slots:['s1'],tokens:['1','2','3','4']}),JSON.stringify({s1:'2'}),'medium','Đoạn thẳng có 2 điểm đầu: A và B',10,10],
      ],
      ex3: [
        [1094,3,'fill_blank','Đoạn thẳng [b1] có hai đầu là M và N.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'MN'}),'hard','Đoạn thẳng được đặt tên theo hai điểm đầu cuối',10,1],
        [1094,3,'fill_blank','Qua điểm A nằm ngoài đường thẳng d, vẽ được [b1] đường thẳng song song với d.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'1'}),'hard','Qua một điểm nằm ngoài đường thẳng, vẽ được đúng một đường thẳng song song',10,2],
        [1094,3,'puzzle','Điền: Ba điểm A, B, C trên một đường thẳng, B nằm giữa A và C. AB = 3cm, BC = 5cm. AC = ?',JSON.stringify({slots:['ac'],tokens:['7cm','8cm','9cm','10cm']}),JSON.stringify({ac:'8cm'}),'hard','AC = AB + BC = 3 + 5 = 8cm',10,3],
        [1094,3,'puzzle','Đoạn thẳng MN = 12cm. P là trung điểm. MP = ?',JSON.stringify({slots:['mp'],tokens:['4cm','5cm','6cm','7cm']}),JSON.stringify({mp:'6cm'}),'hard','Trung điểm chia đoạn thẳng làm 2 phần bằng nhau: 12÷2=6cm',10,4],
        [1094,3,'game','Ghép đôi tên với hình vẽ minh họa',JSON.stringify({pairs:[{q:'Điểm A',a:'·A'},{q:'Đoạn thẳng AB',a:'A——B'},{q:'Đường thẳng m',a:'←m→'},{q:'Đường cong',a:'〜'}]}),JSON.stringify({}),'hard','Nhận biết hình vẽ',10,5],
        [1094,3,'sorting','Sắp xếp từ ngắn đến dài: đoạn thẳng AB=4cm, CD=7cm, EF=2cm, GH=10cm',JSON.stringify({A:'AB=4cm',B:'CD=7cm',C:'EF=2cm',D:'GH=10cm'}),JSON.stringify(['C','A','B','D']),'hard','2<4<7<10',10,6],
        [1094,3,'matching','Nối câu hỏi với câu trả lời',JSON.stringify({A:'Điểm là gì?',B:'Đoạn thẳng có bao nhiêu đầu?',C:'Đường thẳng kéo dài thế nào?',D:'Đường cong là gì?'}),JSON.stringify({A:'Vị trí trong không gian',B:'Hai đầu',C:'Vô hạn',D:'Đường uốn lượn'}),'hard','Ôn tập khái niệm',10,7],
        [1094,3,'multiple_choice','Đoạn thẳng MN có đặc điểm nào?',JSON.stringify({A:'Có hai điểm M và N',B:'Đo được độ dài',C:'Kéo dài vô hạn',D:'Không thể vẽ'}),JSON.stringify(['A','B']),'hard','Đoạn thẳng có hai điểm đầu cuối và đo được',10,8],
        [1094,3,'multiple_choice','Hình nào sau đây là đường thẳng?',JSON.stringify({A:'Đường viền vòng tròn',B:'Cạnh thước kẻ',C:'Đường lượn sóng',D:'Cạnh bảng đen thẳng'}),JSON.stringify(['B','D']),'hard','Cạnh thước kẻ và cạnh bảng đen là đường thẳng',10,9],
        [1094,3,'drag_drop','Sắp xếp các bước vẽ đoạn thẳng AB',JSON.stringify({A:'Đánh dấu điểm A',B:'Đánh dấu điểm B',C:'Dùng thước nối A và B',D:'Ghi tên đoạn thẳng AB'}),JSON.stringify(['A','B','C','D']),'hard','Các bước vẽ đoạn thẳng',10,10],
      ],
    },

    // ─── 1095: Đường gấp khúc, hình tứ giác ────────────────────────────────────
    {
      id: 1095,
      ex1: [
        [1095,1,'single_choice','Đường gấp khúc ABCD gồm mấy đoạn thẳng?',JSON.stringify({A:'2',B:'3',C:'4',D:'5'}),'B','easy','ABCD có 3 đoạn thẳng: AB, BC, CD',10,1],
        [1095,1,'single_choice','Hình tứ giác có bao nhiêu cạnh?',JSON.stringify({A:'3',B:'4',C:'5',D:'6'}),'B','easy','Tứ giác = 4 cạnh',10,2],
        [1095,1,'single_choice','Hình chữ nhật là loại tứ giác đặc biệt. Nó có mấy góc vuông?',JSON.stringify({A:'2',B:'3',C:'4',D:'0'}),'C','easy','Hình chữ nhật có 4 góc vuông',10,3],
        [1095,1,'true_false','Đường gấp khúc gồm nhiều đoạn thẳng nối tiếp nhau. Đúng hay sai?',null,'true','easy','Đường gấp khúc gồm các đoạn thẳng nối tiếp tại các điểm',10,4],
        [1095,1,'true_false','Hình vuông là hình tứ giác. Đúng hay sai?',null,'true','easy','Hình vuông có 4 cạnh nên là hình tứ giác',10,5],
        [1095,1,'fill_blank','Hình tứ giác có [b1] đỉnh.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'4'}),'easy','Tứ giác có 4 đỉnh',10,6],
        [1095,1,'fill_blank','Độ dài đường gấp khúc bằng [b1] các đoạn thẳng tạo nên nó.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'tổng'}),'easy','Độ dài đường gấp khúc = tổng độ dài các đoạn thẳng',10,7],
        [1095,1,'counting','Hình tứ giác ABCD có bao nhiêu cạnh: AB, BC, CD, DA',JSON.stringify({d1:'AB',d2:'BC',d3:'CD',d4:'DA'}),'4','easy','Đếm: 4 cạnh',10,8],
        [1095,1,'sorting','Sắp xếp theo số cạnh tăng dần: tứ giác, tam giác, lục giác, ngũ giác',JSON.stringify({A:'tứ giác',B:'tam giác',C:'lục giác',D:'ngũ giác'}),JSON.stringify(['B','A','D','C']),'easy','3, 4, 5, 6 cạnh',10,9],
        [1095,1,'cross_out','Gạch bỏ hình không phải tứ giác',JSON.stringify({A:'Hình chữ nhật',B:'Hình tam giác',C:'Hình vuông',D:'Hình tròn'}),JSON.stringify(['B','D']),'easy','Tam giác và hình tròn không phải tứ giác',10,10],
      ],
      ex2: [
        [1095,2,'single_choice','Đường gấp khúc ABCDE có AB=3cm, BC=4cm, CD=2cm, DE=5cm. Độ dài đường gấp khúc là?',JSON.stringify({A:'12cm',B:'13cm',C:'14cm',D:'15cm'}),'C','medium','3+4+2+5=14cm',10,1],
        [1095,2,'single_choice','Hình tứ giác có tổng số góc là?',JSON.stringify({A:'180°',B:'270°',C:'360°',D:'90°'}),'C','medium','Tổng 4 góc của tứ giác bằng 360°',10,2],
        [1095,2,'multiple_choice','Hình nào là tứ giác?',JSON.stringify({A:'Hình chữ nhật',B:'Hình tam giác',C:'Hình vuông',D:'Hình thoi'}),JSON.stringify(['A','C','D']),'medium','Hình chữ nhật, hình vuông, hình thoi đều là tứ giác',10,3],
        [1095,2,'multiple_choice','Đường gấp khúc có đặc điểm gì?',JSON.stringify({A:'Gồm nhiều đoạn thẳng',B:'Các đoạn thẳng nối tiếp',C:'Là đường tròn',D:'Không có điểm gãy'}),JSON.stringify(['A','B']),'medium','Đường gấp khúc gồm nhiều đoạn thẳng nối tiếp',10,4],
        [1095,2,'matching','Nối hình với số cạnh',JSON.stringify({A:'Tam giác',B:'Tứ giác',C:'Ngũ giác',D:'Lục giác'}),JSON.stringify({A:'3',B:'4',C:'5',D:'6'}),'medium','Số cạnh theo tên hình',10,5],
        [1095,2,'matching','Nối để tính độ dài đường gấp khúc',JSON.stringify({A:'AB=3, BC=4',B:'MN=5, NP=6, PQ=2',C:'XY=4, YZ=4, ZW=4',D:'PQ=7, QR=3'}),JSON.stringify({A:'7cm',B:'13cm',C:'12cm',D:'10cm'}),'medium','3+4=7; 5+6+2=13; 4+4+4=12; 7+3=10',10,6],
        [1095,2,'drag_drop','Sắp xếp các bước vẽ tứ giác ABCD',JSON.stringify({A:'Đánh dấu 4 điểm A,B,C,D',B:'Nối AB',C:'Nối BC và CD',D:'Nối DA để khép kín'}),JSON.stringify(['A','B','C','D']),'medium','Các bước vẽ tứ giác',10,7],
        [1095,2,'table_fill','Hoàn thành bảng hình học',JSON.stringify({headers:['Hình','Số cạnh','Số đỉnh'],rows:[{c1:'Tam giác',c2:'_',c3:'_'},{c1:'Tứ giác',c2:'_',c3:'_'}]}),JSON.stringify({c2_1:'3',c3_1:'3',c2_2:'4',c3_2:'4'}),'medium','Tam giác: 3 cạnh 3 đỉnh; Tứ giác: 4 cạnh 4 đỉnh',10,8],
        [1095,2,'number_line','Đường gấp khúc có 4 đoạn, mỗi đoạn 3cm. Độ dài là?',JSON.stringify({min:8,max:16,step:1,marks:[8,9,10,11,12,13,14,15,16],hidden:['12']}),JSON.stringify(['12']),'medium','4×3=12cm',10,9],
        [1095,2,'puzzle','Tứ giác ABCD có AB=5cm, BC=3cm, CD=5cm, DA=?cm. Chu vi=16cm',JSON.stringify({slots:['da'],tokens:['2cm','3cm','4cm','5cm']}),JSON.stringify({da:'3cm'}),'medium','16-5-3-5=3cm',10,10],
      ],
      ex3: [
        [1095,3,'fill_blank','Đường gấp khúc ABCD: AB=4cm, BC=6cm, CD=5cm. Độ dài = [b1]cm.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'15'}),'hard','4+6+5=15cm',10,1],
        [1095,3,'fill_blank','Tứ giác MNPQ có MN=NP=PQ=QM=6cm. Chu vi = [b1]cm.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'24'}),'hard','4×6=24cm',10,2],
        [1095,3,'puzzle','Đường gấp khúc ABCDE dài 20cm. AB=4, BC=5, CD=3, DE=?',JSON.stringify({slots:['de'],tokens:['6cm','7cm','8cm','9cm']}),JSON.stringify({de:'8cm'}),'hard','20-4-5-3=8cm',10,3],
        [1095,3,'puzzle','Tứ giác PQRS: PQ=7cm, QR=5cm. Chu vi=24cm, PS=RS=?',JSON.stringify({slots:['s1'],tokens:['5cm','6cm','7cm','8cm']}),JSON.stringify({s1:'6cm'}),'hard','24-7-5=12, 12÷2=6cm',10,4],
        [1095,3,'game','Ghép hình với đặc điểm',JSON.stringify({pairs:[{q:'Hình vuông',a:'4 cạnh bằng nhau, 4 góc vuông'},{q:'Hình chữ nhật',a:'4 góc vuông, 2 cặp cạnh bằng'},{q:'Hình thoi',a:'4 cạnh bằng nhau'},{q:'Hình thang',a:'1 cặp cạnh song song'}]}),JSON.stringify({}),'hard','Đặc điểm các tứ giác',10,5],
        [1095,3,'sorting','Sắp xếp từ nhỏ đến lớn theo số cạnh: tứ giác, thập giác, lục giác, bát giác',JSON.stringify({A:'tứ giác',B:'thập giác',C:'lục giác',D:'bát giác'}),JSON.stringify(['A','C','D','B']),'hard','4, 6, 8, 10',10,6],
        [1095,3,'matching','Nối bài toán với đáp án',JSON.stringify({A:'Đường gấp khúc 3 đoạn, mỗi đoạn 4cm',B:'Tứ giác 4 cạnh bằng nhau, mỗi cạnh 5cm',C:'Đường gấp khúc AB=3, BC=4, CD=5',D:'Hình chữ nhật dài 6cm, rộng 4cm, chu vi?'}),JSON.stringify({A:'12cm',B:'20cm',C:'12cm',D:'20cm'}),'hard','3×4=12; 4×5=20; 3+4+5=12; (6+4)×2=20',10,7],
        [1095,3,'multiple_choice','Hình nào có 4 góc vuông?',JSON.stringify({A:'Hình thoi',B:'Hình chữ nhật',C:'Hình vuông',D:'Hình thang'}),JSON.stringify(['B','C']),'hard','Hình chữ nhật và hình vuông có 4 góc vuông',10,8],
        [1095,3,'multiple_choice','Đường gấp khúc khép kín có đặc điểm gì?',JSON.stringify({A:'Điểm đầu trùng điểm cuối',B:'Tạo thành hình đa giác',C:'Không có điểm cuối',D:'Chỉ có một đoạn thẳng'}),JSON.stringify(['A','B']),'hard','Đường gấp khúc khép kín tạo thành đa giác',10,9],
        [1095,3,'drag_drop','Kéo thả để tính chu vi hình vuông cạnh 5cm',JSON.stringify({A:'5',B:'×',C:'4',D:'=',E:'20'}),JSON.stringify(['A','B','C','D','E']),'hard','5×4=20cm',10,10],
      ],
    },

    // ─── 1096: Thực hành gấp, cắt, ghép, xếp hình, vẽ đoạn thẳng ─────────────
    {
      id: 1096,
      ex1: [
        [1096,1,'single_choice','Để vẽ đoạn thẳng 5cm, ta cần dụng cụ gì?',JSON.stringify({A:'Com-pa',B:'Thước kẻ',C:'Ê-ke',D:'Bút màu'}),'B','easy','Dùng thước kẻ để vẽ đoạn thẳng và đo chiều dài',10,1],
        [1096,1,'single_choice','Khi gấp đôi một tờ giấy hình chữ nhật, ta được hình gì?',JSON.stringify({A:'Hình tam giác',B:'Hình tròn',C:'Hình chữ nhật nhỏ hơn',D:'Hình vuông'}),'C','easy','Gấp đôi hình chữ nhật theo chiều dọc hoặc ngang cho hình chữ nhật nhỏ hơn',10,2],
        [1096,1,'single_choice','Cắt hình vuông theo đường chéo ta được mấy hình tam giác?',JSON.stringify({A:'1',B:'2',C:'3',D:'4'}),'B','easy','Cắt theo đường chéo hình vuông được 2 hình tam giác',10,3],
        [1096,1,'true_false','Gấp tờ giấy hình vuông theo đường chéo ta được hình tam giác. Đúng hay sai?',null,'true','easy','Gấp hình vuông theo đường chéo cho hình tam giác cân vuông',10,4],
        [1096,1,'true_false','Hai hình tam giác bằng nhau ghép lại luôn được hình chữ nhật. Đúng hay sai?',null,'false','easy','Hai hình tam giác ghép lại có thể được hình bình hành hoặc hình khác, không nhất thiết là hình chữ nhật',10,5],
        [1096,1,'fill_blank','Đoạn thẳng AB dài [b1] cm nếu thước đo từ vạch 0 đến vạch 6.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'6'}),'easy','Đọc thước: từ 0 đến 6 là 6cm',10,6],
        [1096,1,'fill_blank','Ghép 4 hình tam giác vuông bằng nhau có thể tạo thành hình [b1].',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'vuông'}),'easy','4 tam giác vuông cân ghép lại tạo thành hình vuông',10,7],
        [1096,1,'counting','Hình chữ nhật bị cắt thành mấy phần bằng nhau: cắt 1 lần dọc và 1 lần ngang?',JSON.stringify({d1:'phần 1',d2:'phần 2',d3:'phần 3',d4:'phần 4'}),'4','easy','Cắt 2 lần tạo 4 phần',10,8],
        [1096,1,'sorting','Sắp xếp các bước vẽ đoạn thẳng AB dài 7cm',JSON.stringify({A:'Đặt thước, vạch 0 ở A',B:'Chấm điểm A',C:'Đọc vạch số 7, chấm điểm B',D:'Nối A và B'}),JSON.stringify(['B','A','C','D']),'easy','Các bước vẽ đoạn thẳng',10,9],
        [1096,1,'cross_out','Gạch bỏ dụng cụ KHÔNG dùng để vẽ đoạn thẳng',JSON.stringify({A:'Thước kẻ',B:'Bút chì',C:'Kéo',D:'Com-pa'}),JSON.stringify(['C','D']),'easy','Kéo và com-pa không dùng để vẽ đoạn thẳng thông thường',10,10],
      ],
      ex2: [
        [1096,2,'single_choice','Gấp tờ giấy hình vuông cạnh 10cm làm đôi, kích thước tờ giấy sau khi gấp là?',JSON.stringify({A:'5cm × 5cm',B:'10cm × 5cm',C:'5cm × 10cm',D:'10cm × 10cm'}),'B','medium','Gấp đôi: một chiều giữ nguyên 10cm, chiều kia giảm còn 5cm',10,1],
        [1096,2,'single_choice','Để vẽ đoạn thẳng MN = 8cm, bước đặt thước đúng là?',JSON.stringify({A:'Vạch 1 ở M, vạch 9 ở N',B:'Vạch 0 ở M, vạch 8 ở N',C:'Vạch 2 ở M, vạch 8 ở N',D:'Vạch 0 ở M, vạch 9 ở N'}),'B','medium','Đặt vạch 0 ở M, vạch 8 ở N thì MN = 8cm',10,2],
        [1096,2,'multiple_choice','Từ một tờ giấy hình chữ nhật, có thể cắt ra hình gì?',JSON.stringify({A:'Hình vuông',B:'Hình tam giác',C:'Hình bình hành',D:'Hình thang'}),JSON.stringify(['A','B','C','D']),'medium','Có thể cắt ra nhiều hình khác nhau',10,3],
        [1096,2,'multiple_choice','Bước nào cần thiết khi vẽ đoạn thẳng?',JSON.stringify({A:'Chọn bút và thước',B:'Đặt thước thẳng',C:'Tô màu đoạn thẳng',D:'Chấm điểm đầu và cuối'}),JSON.stringify(['A','B','D']),'medium','Cần bút, thước thẳng, và chấm điểm',10,4],
        [1096,2,'matching','Nối thao tác với kết quả',JSON.stringify({A:'Gấp đôi hình vuông',B:'Cắt hình vuông theo đường chéo',C:'Ghép 2 tam giác vuông bằng nhau',D:'Cắt hình chữ nhật đôi theo chiều dọc'}),JSON.stringify({A:'Hình chữ nhật nhỏ',B:'2 tam giác',C:'Hình chữ nhật hoặc hình vuông',D:'2 hình chữ nhật nhỏ'}),'medium','Kết quả thao tác hình học',10,5],
        [1096,2,'matching','Nối đoạn thẳng với độ dài đúng',JSON.stringify({A:'Từ vạch 0 đến vạch 5',B:'Từ vạch 2 đến vạch 7',C:'Từ vạch 1 đến vạch 8',D:'Từ vạch 0 đến vạch 9'}),JSON.stringify({A:'5cm',B:'5cm',C:'7cm',D:'9cm'}),'medium','Tính độ dài = vị trí cuối - vị trí đầu',10,6],
        [1096,2,'drag_drop','Sắp xếp các bước gấp hình chữ nhật thành hình vuông',JSON.stringify({A:'Xác định cạnh ngắn hơn',B:'Gấp cạnh dài trùng cạnh ngắn',C:'Miết phẳng đường gấp',D:'Cắt phần thừa ra'}),JSON.stringify(['A','B','C','D']),'medium','Các bước gấp',10,7],
        [1096,2,'table_fill','Hoàn thành bảng độ dài đoạn thẳng',JSON.stringify({headers:['Từ vạch','Đến vạch','Độ dài'],rows:[{c1:'0',c2:'6',c3:'_'},{c1:'2',c2:'9',c3:'_'},{c1:'1',c2:'_',c3:'8cm'}]}),JSON.stringify({c3_1:'6cm',c3_2:'7cm',c2_3:'9'}),'medium','6-0=6; 9-2=7; 1+8=9',10,8],
        [1096,2,'number_line','Vẽ đoạn thẳng từ vạch 3 dài 6cm, điểm cuối ở vạch nào?',JSON.stringify({min:0,max:12,step:1,marks:[0,1,2,3,4,5,6,7,8,9,10,11,12],hidden:['9']}),JSON.stringify(['9']),'medium','3+6=9',10,9],
        [1096,2,'puzzle','Ghép: Cắt hình chữ nhật dài 8cm rộng 4cm thành 2 hình vuông cạnh ?cm',JSON.stringify({slots:['s1'],tokens:['2cm','3cm','4cm','5cm']}),JSON.stringify({s1:'4cm'}),'medium','4×2=8, mỗi hình vuông cạnh 4cm',10,10],
      ],
      ex3: [
        [1096,3,'fill_blank','Vẽ đoạn thẳng từ vạch 2 đến vạch 9 trên thước. Đoạn thẳng dài [b1]cm.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'7'}),'hard','9-2=7cm',10,1],
        [1096,3,'fill_blank','Hình chữ nhật dài 10cm rộng 6cm. Cắt theo chiều dọc giữa, mỗi phần có chiều rộng [b1]cm.',JSON.stringify([{key:'b1',text:''}]),JSON.stringify({b1:'3'}),'hard','6÷2=3cm',10,2],
        [1096,3,'puzzle','Gấp hình vuông cạnh 12cm làm tư, mỗi phần có cạnh ?',JSON.stringify({slots:['s1'],tokens:['3cm','6cm','4cm','8cm']}),JSON.stringify({s1:'6cm'}),'hard','12÷2=6cm',10,3],
        [1096,3,'puzzle','Dùng 4 hình vuông cạnh 3cm xếp thành hình chữ nhật. Chu vi hình chữ nhật là?',JSON.stringify({slots:['cv'],tokens:['24cm','28cm','30cm','36cm']}),JSON.stringify({cv:'24cm'}),'hard','HCN: dài=6cm, rộng=6cm → chu vi=(6+6)×2=24, hoặc dài=12, rộng=3 → (12+3)×2=30',10,4],
        [1096,3,'game','Ghép đôi thao tác với dụng cụ cần dùng',JSON.stringify({pairs:[{q:'Vẽ đoạn thẳng',a:'Thước kẻ + bút chì'},{q:'Cắt hình',a:'Kéo + thước'},{q:'Gấp hình',a:'Tay + tờ giấy'},{q:'Dán hình',a:'Kéo hồ + giấy'}]}),JSON.stringify({}),'hard','Dụng cụ phù hợp',10,5],
        [1096,3,'sorting','Sắp xếp bước ghép hình tam giác thành hình vuông',JSON.stringify({A:'Cắt 2 hình tam giác vuông cân bằng nhau',B:'Đặt hai cạnh huyền đối nhau',C:'Ghép lại thành hình vuông',D:'Kiểm tra các cạnh bằng nhau'}),JSON.stringify(['A','B','C','D']),'hard','Quy trình ghép hình',10,6],
        [1096,3,'matching','Nối kích thước với kết quả ghép hình',JSON.stringify({A:'2 tam giác vuông cân cạnh 5cm',B:'4 hình vuông cạnh 3cm',C:'2 hình chữ nhật 4×6cm',D:'3 hình chữ nhật 2×4cm'}),JSON.stringify({A:'Hình vuông cạnh 5cm',B:'Hình chữ nhật 6×6cm',C:'Hình chữ nhật 8×6cm',D:'Hình chữ nhật 6×4cm'}),'hard','Kết quả ghép hình',10,7],
        [1096,3,'multiple_choice','Từ hình chữ nhật 6×4cm, có thể cắt tối đa bao nhiêu hình vuông cạnh 2cm?',JSON.stringify({A:'4',B:'6',C:'8',D:'12'}),'B','hard','(6÷2)×(4÷2)=3×2=6 hình',10,8],
        [1096,3,'multiple_choice','Thao tác nào tạo ra hình có số cạnh nhiều hơn ban đầu?',JSON.stringify({A:'Gấp hình chữ nhật thành 4 phần',B:'Cắt hình vuông thành tam giác',C:'Ghép 2 tam giác thành tứ giác',D:'Xé góc hình chữ nhật'}),JSON.stringify(['C','D']),'hard','Ghép tạo hình mới; xé góc tạo hình 5 cạnh hoặc nhiều hơn',10,9],
        [1096,3,'drag_drop','Kéo thả để tính: Đoạn thẳng từ vạch 1 đến vạch 8',JSON.stringify({A:'8',B:'-',C:'1',D:'=',E:'7cm'}),JSON.stringify(['A','B','C','D','E']),'hard','8-1=7cm',10,10],
      ],
    },
  ];

  for (const lesson of lessons) {
    await conn.execute('DELETE FROM quizzes WHERE lessonId = ?', [lesson.id]);
    const allRows = [
      ...lesson.ex1.map((r,i) => [...r]),
      ...lesson.ex2.map((r,i) => [...r]),
      ...lesson.ex3.map((r,i) => [...r]),
    ];
    for (const row of allRows) {
      const [lessonId, exerciseNumber, questionType, questionText, optionsJson, correctAnswerJson, difficultyLevel, explanation, points, sortOrder] = row as QuizRow;
      // Ensure correctAnswerJson is valid JSON
      let safeCorrect = correctAnswerJson;
      try { JSON.parse(correctAnswerJson); } catch { safeCorrect = JSON.stringify(correctAnswerJson); }
      await conn.execute(
        'INSERT INTO quizzes (lessonId, exerciseNumber, questionType, questionText, optionsJson, correctAnswerJson, difficultyLevel, explanation, points, sortOrder, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())',
        [lessonId, exerciseNumber, questionType, questionText, optionsJson ?? null, safeCorrect, difficultyLevel, explanation ?? null, points, sortOrder]
      );
    }
    console.log(`✅ ${lesson.id}`);
  }

  await conn.end();
  console.log('Done!');
}

seed().catch(e => { console.error(e); process.exit(1); });
