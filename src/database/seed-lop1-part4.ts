// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('/Users/phamvannam/nam/demo-php/api-hoccungbe/node_modules/mysql2/promise');

const DB = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

type Question = {
  lessonId: number;
  exerciseNumber: number;
  questionType: string;
  questionText: string;
  optionsJson: any;
  correctAnswerJson: any;
  explanation?: string;
};

function j(v: any) { return JSON.stringify(v); }

// ── helpers ──────────────────────────────────────────────────────────────────

function singleChoice(lessonId: number, ex: number, q: string, opts: {key:string,text:string}[], ans: string): Question {
  return { lessonId, exerciseNumber: ex, questionType: 'single_choice', questionText: q, optionsJson: opts, correctAnswerJson: ans };
}
function trueFalse(lessonId: number, ex: number, q: string, ans: boolean): Question {
  return { lessonId, exerciseNumber: ex, questionType: 'true_false', questionText: q, optionsJson: [], correctAnswerJson: ans };
}
function fillBlank(lessonId: number, ex: number, q: string, blanks: {key:string,text:string}[], ans: Record<string,string>): Question {
  return { lessonId, exerciseNumber: ex, questionType: 'fill_blank', questionText: q, optionsJson: blanks, correctAnswerJson: ans };
}
function counting(lessonId: number, ex: number, q: string, items: {key:string,text:string}[], ans: string): Question {
  return { lessonId, exerciseNumber: ex, questionType: 'counting', questionText: q, optionsJson: items, correctAnswerJson: ans };
}
function sorting(lessonId: number, ex: number, q: string, opts: {key:string,text:string}[], ans: string[]): Question {
  return { lessonId, exerciseNumber: ex, questionType: 'sorting', questionText: q, optionsJson: opts, correctAnswerJson: ans };
}
function crossOut(lessonId: number, ex: number, q: string, opts: {key:string,text:string}[], ans: string[]): Question {
  return { lessonId, exerciseNumber: ex, questionType: 'cross_out', questionText: q, optionsJson: opts, correctAnswerJson: ans };
}
function multipleChoice(lessonId: number, ex: number, q: string, opts: {key:string,text:string}[], ans: string[]): Question {
  return { lessonId, exerciseNumber: ex, questionType: 'multiple_choice', questionText: q, optionsJson: opts, correctAnswerJson: ans };
}
function matching(lessonId: number, ex: number, q: string, opts: {key:string,text:string}[], ans: Record<string,string>): Question {
  return { lessonId, exerciseNumber: ex, questionType: 'matching', questionText: q, optionsJson: opts, correctAnswerJson: ans };
}
function dragDrop(lessonId: number, ex: number, q: string, opts: {key:string,text:string}[], ans: string[]): Question {
  return { lessonId, exerciseNumber: ex, questionType: 'drag_drop', questionText: q, optionsJson: opts, correctAnswerJson: ans };
}
function tableFill(lessonId: number, ex: number, q: string, opts: {key:string,text:string}[], ans: Record<string,string>): Question {
  return { lessonId, exerciseNumber: ex, questionType: 'table_fill', questionText: q, optionsJson: opts, correctAnswerJson: ans };
}
function numberLine(lessonId: number, ex: number, q: string, opts: {key:string,text:string}[], ans: string[]): Question {
  return { lessonId, exerciseNumber: ex, questionType: 'number_line', questionText: q, optionsJson: opts, correctAnswerJson: ans };
}
function puzzle(lessonId: number, ex: number, q: string, opts: {key:string,text:string}[], ans: Record<string,string>): Question {
  return { lessonId, exerciseNumber: ex, questionType: 'puzzle', questionText: q, optionsJson: opts, correctAnswerJson: ans };
}
function game(lessonId: number, ex: number, q: string, opts: {key:string,text:string,pair?:string}[]): Question {
  return { lessonId, exerciseNumber: ex, questionType: 'game', questionText: q, optionsJson: opts, correctAnswerJson: {} };
}

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 153 — Phép trừ số có hai chữ số với số có một chữ số (e.g. 27-4=23)
// ═══════════════════════════════════════════════════════════════════════════
const lesson153: Question[] = [
  // Exercise 1 — easy
  singleChoice(153,1,'27 - 4 = ?',[{key:'A',text:'22'},{key:'B',text:'23'},{key:'C',text:'24'}],'B'),
  singleChoice(153,1,'35 - 3 = ?',[{key:'A',text:'31'},{key:'B',text:'32'},{key:'C',text:'33'}],'B'),
  singleChoice(153,1,'48 - 6 = ?',[{key:'A',text:'42'},{key:'B',text:'43'},{key:'C',text:'44'}],'A'),
  trueFalse(153,1,'29 - 5 = 24. Đúng hay sai?',true),
  trueFalse(153,1,'36 - 4 = 33. Đúng hay sai?',false),
  fillBlank(153,1,'56 - [b1] = 53',[{key:'b1',text:''}],{b1:'3'}),
  fillBlank(153,1,'47 - [b1] = 41',[{key:'b1',text:''}],{b1:'6'}),
  counting(153,1,'Đếm số quả táo rồi trừ đi 3. Kết quả là bao nhiêu?',[{key:'d1',text:'🍎'},{key:'d2',text:'🍎'},{key:'d3',text:'🍎'},{key:'d4',text:'🍎'},{key:'d5',text:'🍎'},{key:'d6',text:'🍎'},{key:'d7',text:'🍎'},{key:'d8',text:'🍎'}],'5'),
  sorting(153,1,'Sắp xếp từ bé đến lớn: 63-2, 55-3, 78-4',[{key:'1',text:'63-2=61'},{key:'2',text:'55-3=52'},{key:'3',text:'78-4=74'}],['2','1','3']),
  crossOut(153,1,'Gạch bỏ phép tính SAI:',[{key:'A',text:'37-5=32'},{key:'B',text:'44-3=42'},{key:'C',text:'58-6=52'}],['B']),

  // Exercise 2 — medium
  singleChoice(153,2,'65 - 4 = ?',[{key:'A',text:'60'},{key:'B',text:'61'},{key:'C',text:'62'}],'B'),
  singleChoice(153,2,'73 - 2 = ?',[{key:'A',text:'71'},{key:'B',text:'72'},{key:'C',text:'70'}],'A'),
  multipleChoice(153,2,'Phép tính nào có kết quả là 30?',[{key:'A',text:'37-7'},{key:'B',text:'35-5'},{key:'C',text:'38-6'},{key:'D',text:'34-4'}],['A','B','D']),
  multipleChoice(153,2,'Phép tính nào có kết quả lớn hơn 40?',[{key:'A',text:'45-3'},{key:'B',text:'43-2'},{key:'C',text:'38-1'},{key:'D',text:'49-4'}],['A','B','D']),
  matching(153,2,'Nối phép tính với kết quả:',[{key:'37-4',text:'37-4'},{key:'55-2',text:'55-2'},{key:'68-5',text:'68-5'},{key:'49-6',text:'49-6'}],{'37-4':'33','55-2':'53','68-5':'63','49-6':'43'}),
  matching(153,2,'Ghép phép tính với kết quả đúng:',[{key:'86-3',text:'86-3'},{key:'74-2',text:'74-2'},{key:'93-1',text:'93-1'},{key:'57-4',text:'57-4'}],{'86-3':'83','74-2':'72','93-1':'92','57-4':'53'}),
  dragDrop(153,2,'Sắp xếp phép tính theo thứ tự kết quả từ nhỏ đến lớn:',[{key:'a',text:'48-5=43'},{key:'b',text:'26-3=23'},{key:'c',text:'67-4=63'},{key:'d',text:'35-2=33'}],['b','d','a','c']),
  tableFill(153,2,'Điền kết quả vào bảng:',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'29-6|_r1c1'},{key:'r2',text:'47-3|_r2c1'}],{r1c1:'23',r2c1:'44'}),
  numberLine(153,2,'Tìm số còn thiếu trên tia số: 50 - 3 = ?',[{key:'min',text:'40'},{key:'max',text:'50'},{key:'step',text:'1'},{key:'marks',text:'40|41|42|43|44|45|46|47|48|49|50'},{key:'hidden',text:'47'}],['47']),
  puzzle(153,2,'Ghép ô để hoàn thành phép tính 38 - 5 = ?',[{key:'slot_tens',text:'Chục'},{key:'slot_ones',text:'Đơn vị'},{key:'tok3',text:'3'},{key:'tok3b',text:'3'}],{slot_tens:'tok3',slot_ones:'tok3b'}),

  // Exercise 3 — hard
  fillBlank(153,3,'[b1] - 4 = 25',[{key:'b1',text:''}],{b1:'29'}),
  fillBlank(153,3,'74 - [b1] = 70',[{key:'b1',text:''}],{b1:'4'}),
  puzzle(153,3,'Hoàn thành: 96 - 3 = [slot1]',[{key:'slot1',text:'?'},{key:'t93',text:'93'},{key:'t92',text:'92'},{key:'t94',text:'94'}],{slot1:'t93'}),
  puzzle(153,3,'Hoàn thành: 87 - 5 = [slot1]',[{key:'slot1',text:'?'},{key:'t82',text:'82'},{key:'t83',text:'83'},{key:'t81',text:'81'}],{slot1:'t82'}),
  game(153,3,'Nối cặp phép tính cùng kết quả:',[{key:'g1a',text:'57-4',pair:'53'},{key:'g1b',text:'60-7',pair:'53'},{key:'g2a',text:'48-5',pair:'43'},{key:'g2b',text:'50-7',pair:'43'},{key:'g3a',text:'69-6',pair:'63'},{key:'g3b',text:'70-7',pair:'63'}]),
  sorting(153,3,'Sắp xếp từ lớn đến bé: 89-5, 76-3, 94-2, 65-4',[{key:'1',text:'84'},{key:'2',text:'73'},{key:'3',text:'92'},{key:'4',text:'61'}],['3','1','2','4']),
  matching(153,3,'Nối phép tính khó với kết quả:',[{key:'98-6',text:'98-6'},{key:'85-3',text:'85-3'},{key:'76-4',text:'76-4'},{key:'67-5',text:'67-5'}],{'98-6':'92','85-3':'82','76-4':'72','67-5':'62'}),
  multipleChoice(153,3,'Chọn tất cả phép tính có kết quả là số chẵn:',[{key:'A',text:'37-5=32'},{key:'B',text:'48-4=44'},{key:'C',text:'55-3=52'},{key:'D',text:'66-2=64'}],['A','B','C','D']),
  multipleChoice(153,3,'Phép tính nào SAI?',[{key:'A',text:'89-7=82'},{key:'B',text:'74-3=71'},{key:'C',text:'65-4=62'},{key:'D',text:'58-6=52'}],['C']),
  dragDrop(153,3,'Điền vào ô trống để tạo phép tính đúng: 6? - 4 = 63',[{key:'a',text:'7'},{key:'b',text:'6'},{key:'c',text:'5'},{key:'d',text:'8'}],['a']),
];

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 154 — Phép trừ số có hai chữ số với số có hai chữ số (e.g. 47-23=24)
// ═══════════════════════════════════════════════════════════════════════════
const lesson154: Question[] = [
  // Exercise 1
  singleChoice(154,1,'47 - 23 = ?',[{key:'A',text:'24'},{key:'B',text:'25'},{key:'C',text:'26'}],'A'),
  singleChoice(154,1,'58 - 34 = ?',[{key:'A',text:'22'},{key:'B',text:'23'},{key:'C',text:'24'}],'C'),
  singleChoice(154,1,'75 - 42 = ?',[{key:'A',text:'31'},{key:'B',text:'33'},{key:'C',text:'35'}],'B'),
  trueFalse(154,1,'69 - 35 = 34. Đúng hay sai?',true),
  trueFalse(154,1,'84 - 51 = 34. Đúng hay sai?',false),
  fillBlank(154,1,'67 - [b1] = 25',[{key:'b1',text:''}],{b1:'42'}),
  fillBlank(154,1,'95 - [b1] = 32',[{key:'b1',text:''}],{b1:'63'}),
  counting(154,1,'Có 15 chiếc bút, lấy đi 12 chiếc. Còn lại bao nhiêu?',[{key:'d1',text:'✏️'},{key:'d2',text:'✏️'},{key:'d3',text:'✏️'},{key:'d4',text:'✏️'},{key:'d5',text:'✏️'},{key:'d6',text:'✏️'},{key:'d7',text:'✏️'},{key:'d8',text:'✏️'},{key:'d9',text:'✏️'},{key:'d10',text:'✏️'},{key:'d11',text:'✏️'},{key:'d12',text:'✏️'},{key:'d13',text:'✏️'},{key:'d14',text:'✏️'},{key:'d15',text:'✏️'}],'3'),
  sorting(154,1,'Sắp xếp kết quả từ bé đến lớn: 98-54, 76-23, 85-41',[{key:'1',text:'44'},{key:'2',text:'53'},{key:'3',text:'44'}],['1','3','2']),
  crossOut(154,1,'Gạch bỏ phép tính SAI:',[{key:'A',text:'56-23=33'},{key:'B',text:'78-45=34'},{key:'C',text:'89-56=33'}],['B']),

  // Exercise 2
  singleChoice(154,2,'88 - 44 = ?',[{key:'A',text:'43'},{key:'B',text:'44'},{key:'C',text:'45'}],'B'),
  singleChoice(154,2,'97 - 63 = ?',[{key:'A',text:'34'},{key:'B',text:'35'},{key:'C',text:'36'}],'A'),
  multipleChoice(154,2,'Phép tính nào bằng 20?',[{key:'A',text:'54-34'},{key:'B',text:'65-45'},{key:'C',text:'72-52'},{key:'D',text:'83-61'}],['A','B','C']),
  multipleChoice(154,2,'Kết quả nào lớn hơn 50?',[{key:'A',text:'87-34=53'},{key:'B',text:'76-23=53'},{key:'C',text:'95-42=53'},{key:'D',text:'64-11=53'}],['A','B','C','D']),
  matching(154,2,'Nối phép tính với kết quả:',[{key:'47-24',text:'47-24'},{key:'68-35',text:'68-35'},{key:'79-46',text:'79-46'},{key:'85-52',text:'85-52'}],{'47-24':'23','68-35':'33','79-46':'33','85-52':'33'}),
  matching(154,2,'Ghép phép tính với kết quả:',[{key:'96-43',text:'96-43'},{key:'87-54',text:'87-54'},{key:'75-32',text:'75-32'},{key:'64-21',text:'64-21'}],{'96-43':'53','87-54':'33','75-32':'43','64-21':'43'}),
  dragDrop(154,2,'Sắp xếp từ nhỏ đến lớn:',[{key:'a',text:'78-35=43'},{key:'b',text:'56-23=33'},{key:'c',text:'97-64=33'},{key:'d',text:'89-46=43'}],['b','c','a','d']),
  tableFill(154,2,'Điền kết quả:',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'77-44|_r1c1'},{key:'r2',text:'88-55|_r2c1'}],{r1c1:'33',r2c1:'33'}),
  numberLine(154,2,'Tìm số trên tia số: 80 - 30 = ?',[{key:'min',text:'40'},{key:'max',text:'80'},{key:'step',text:'10'},{key:'marks',text:'40|50|60|70|80'},{key:'hidden',text:'50'}],['50']),
  puzzle(154,2,'Tính 59 - 27 = ?',[{key:'slot1',text:'?'},{key:'t32',text:'32'},{key:'t33',text:'33'},{key:'t31',text:'31'}],{slot1:'t32'}),

  // Exercise 3
  fillBlank(154,3,'[b1] - 31 = 45',[{key:'b1',text:''}],{b1:'76'}),
  fillBlank(154,3,'82 - [b1] = 41',[{key:'b1',text:''}],{b1:'41'}),
  puzzle(154,3,'Hoàn thành: 96 - 53 = [slot1]',[{key:'slot1',text:'?'},{key:'t43',text:'43'},{key:'t44',text:'44'},{key:'t42',text:'42'}],{slot1:'t43'}),
  puzzle(154,3,'Hoàn thành: 87 - 64 = [slot1]',[{key:'slot1',text:'?'},{key:'t23',text:'23'},{key:'t24',text:'24'},{key:'t22',text:'22'}],{slot1:'t23'}),
  game(154,3,'Nối cặp có cùng kết quả:',[{key:'g1a',text:'75-32',pair:'43'},{key:'g1b',text:'88-45',pair:'43'},{key:'g2a',text:'96-53',pair:'43'},{key:'g2b',text:'67-24',pair:'43'},{key:'g3a',text:'58-15',pair:'43'},{key:'g3b',text:'99-56',pair:'43'}]),
  sorting(154,3,'Sắp xếp từ lớn đến bé:',[{key:'1',text:'97-43=54'},{key:'2',text:'85-52=33'},{key:'3',text:'76-24=52'},{key:'4',text:'64-11=53'}],['1','4','3','2']),
  matching(154,3,'Nối phép tính với kết quả:',[{key:'99-66',text:'99-66'},{key:'88-55',text:'88-55'},{key:'77-44',text:'77-44'},{key:'66-33',text:'66-33'}],{'99-66':'33','88-55':'33','77-44':'33','66-33':'33'}),
  multipleChoice(154,3,'Phép tính nào có kết quả là số lẻ?',[{key:'A',text:'79-34=45'},{key:'B',text:'86-43=43'},{key:'C',text:'95-52=43'},{key:'D',text:'68-25=43'}],['A','B','C','D']),
  multipleChoice(154,3,'Phép nào SAI?',[{key:'A',text:'78-36=42'},{key:'B',text:'89-47=43'},{key:'C',text:'97-54=44'},{key:'D',text:'65-23=42'}],['C']),
  dragDrop(154,3,'Điền số thích hợp: ?8 - 35 = 43',[{key:'a',text:'7'},{key:'b',text:'8'},{key:'c',text:'6'},{key:'d',text:'9'}],['a']),
];

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 155 — Luyện tập cộng trừ số có hai chữ số
// ═══════════════════════════════════════════════════════════════════════════
const lesson155: Question[] = [
  // Exercise 1
  singleChoice(155,1,'34 + 25 = ?',[{key:'A',text:'58'},{key:'B',text:'59'},{key:'C',text:'60'}],'B'),
  singleChoice(155,1,'67 - 34 = ?',[{key:'A',text:'33'},{key:'B',text:'34'},{key:'C',text:'35'}],'A'),
  singleChoice(155,1,'45 + 32 = ?',[{key:'A',text:'76'},{key:'B',text:'77'},{key:'C',text:'78'}],'B'),
  trueFalse(155,1,'53 + 26 = 79. Đúng hay sai?',true),
  trueFalse(155,1,'84 - 32 = 53. Đúng hay sai?',false),
  fillBlank(155,1,'43 + [b1] = 67',[{key:'b1',text:''}],{b1:'24'}),
  fillBlank(155,1,'75 - [b1] = 42',[{key:'b1',text:''}],{b1:'33'}),
  counting(155,1,'Đếm số ngôi sao rồi cộng thêm 12:',[{key:'d1',text:'⭐'},{key:'d2',text:'⭐'},{key:'d3',text:'⭐'},{key:'d4',text:'⭐'},{key:'d5',text:'⭐'},{key:'d6',text:'⭐'},{key:'d7',text:'⭐'},{key:'d8',text:'⭐'},{key:'d9',text:'⭐'},{key:'d10',text:'⭐'}],'22'),
  sorting(155,1,'Sắp xếp từ bé đến lớn: 23+45, 56+21, 34+32',[{key:'1',text:'68'},{key:'2',text:'77'},{key:'3',text:'66'}],['3','1','2']),
  crossOut(155,1,'Gạch bỏ phép tính SAI:',[{key:'A',text:'32+45=77'},{key:'B',text:'56+31=88'},{key:'C',text:'64+23=87'}],['B']),

  // Exercise 2
  singleChoice(155,2,'86 - 43 + 10 = ?',[{key:'A',text:'53'},{key:'B',text:'54'},{key:'C',text:'52'}],'A'),
  singleChoice(155,2,'25 + 34 - 12 = ?',[{key:'A',text:'46'},{key:'B',text:'47'},{key:'C',text:'48'}],'B'),
  multipleChoice(155,2,'Phép tính nào bằng 50?',[{key:'A',text:'30+20'},{key:'B',text:'75-25'},{key:'C',text:'45+5'},{key:'D',text:'63-12'}],['A','B','C']),
  multipleChoice(155,2,'Kết quả nào nhỏ hơn 40?',[{key:'A',text:'62-25=37'},{key:'B',text:'53-16=37'},{key:'C',text:'78-42=36'},{key:'D',text:'45+10=55'}],['A','B','C']),
  matching(155,2,'Nối:',[{key:'23+45',text:'23+45'},{key:'78-35',text:'78-35'},{key:'34+29',text:'34+29'},{key:'95-52',text:'95-52'}],{'23+45':'68','78-35':'43','34+29':'63','95-52':'43'}),
  matching(155,2,'Ghép kết quả:',[{key:'41+37',text:'41+37'},{key:'93-50',text:'93-50'},{key:'25+53',text:'25+53'},{key:'86-43',text:'86-43'}],{'41+37':'78','93-50':'43','25+53':'78','86-43':'43'}),
  dragDrop(155,2,'Sắp xếp theo thứ tự tăng dần:',[{key:'a',text:'45+12=57'},{key:'b',text:'33+24=57'},{key:'c',text:'78-21=57'},{key:'d',text:'90-33=57'}],['a','b','c','d']),
  tableFill(155,2,'Điền kết quả:',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'36+42|_r1c1'},{key:'r2',text:'91-48|_r2c1'}],{r1c1:'78',r2c1:'43'}),
  numberLine(155,2,'Tìm số: 40 + 20 = ?',[{key:'min',text:'40'},{key:'max',text:'100'},{key:'step',text:'10'},{key:'marks',text:'40|50|60|70|80|90|100'},{key:'hidden',text:'60'}],['60']),
  puzzle(155,2,'Tính 38 + 24 = ?',[{key:'slot1',text:'?'},{key:'t62',text:'62'},{key:'t63',text:'63'},{key:'t61',text:'61'}],{slot1:'t62'}),

  // Exercise 3
  fillBlank(155,3,'[b1] + 34 = 77',[{key:'b1',text:''}],{b1:'43'}),
  fillBlank(155,3,'92 - [b1] = 45',[{key:'b1',text:''}],{b1:'47'}),
  puzzle(155,3,'56 + 27 = [slot1]',[{key:'slot1',text:'?'},{key:'t83',text:'83'},{key:'t84',text:'84'},{key:'t82',text:'82'}],{slot1:'t83'}),
  puzzle(155,3,'74 - 36 = [slot1]',[{key:'slot1',text:'?'},{key:'t38',text:'38'},{key:'t39',text:'39'},{key:'t37',text:'37'}],{slot1:'t38'}),
  game(155,3,'Nối cặp có kết quả bằng nhau:',[{key:'g1a',text:'45+23',pair:'68'},{key:'g1b',text:'90-22',pair:'68'},{key:'g2a',text:'37+45',pair:'82'},{key:'g2b',text:'99-17',pair:'82'},{key:'g3a',text:'56+31',pair:'87'},{key:'g3b',text:'100-13',pair:'87'}]),
  sorting(155,3,'Sắp xếp từ lớn đến bé: kết quả của 67+21, 43+38, 55+24, 76+12',[{key:'1',text:'88'},{key:'2',text:'81'},{key:'3',text:'79'},{key:'4',text:'88'}],['1','4','2','3']),
  matching(155,3,'Nối phép tính với kết quả:',[{key:'38+47',text:'38+47'},{key:'56+29',text:'56+29'},{key:'93-38',text:'93-38'},{key:'77-22',text:'77-22'}],{'38+47':'85','56+29':'85','93-38':'55','77-22':'55'}),
  multipleChoice(155,3,'Phép tính có kết quả bằng 100?',[{key:'A',text:'45+55'},{key:'B',text:'63+37'},{key:'C',text:'72+28'},{key:'D',text:'81+20'}],['A','B','C']),
  multipleChoice(155,3,'Phép nào SAI?',[{key:'A',text:'34+56=90'},{key:'B',text:'67+23=90'},{key:'C',text:'45+44=89'},{key:'D',text:'78+12=90'}],['C']),
  dragDrop(155,3,'Điền số thích hợp vào ô trống: 4? + 35 = 82',[{key:'a',text:'7'},{key:'b',text:'6'},{key:'c',text:'8'},{key:'d',text:'5'}],['a']),
];

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 156 — Bài toán có lời văn (word problems, addition/subtraction ≤100)
// ═══════════════════════════════════════════════════════════════════════════
const lesson156: Question[] = [
  // Exercise 1
  singleChoice(156,1,'Lan có 35 cái kẹo, Minh có 24 cái kẹo. Hai bạn có tất cả bao nhiêu cái kẹo?',[{key:'A',text:'58'},{key:'B',text:'59'},{key:'C',text:'60'}],'B'),
  singleChoice(156,1,'Có 48 con chim trên cây, bay đi 15 con. Còn lại bao nhiêu con?',[{key:'A',text:'32'},{key:'B',text:'33'},{key:'C',text:'34'}],'B'),
  singleChoice(156,1,'Rổ có 27 quả cam và 32 quả quýt. Rổ có tất cả bao nhiêu quả?',[{key:'A',text:'57'},{key:'B',text:'58'},{key:'C',text:'59'},{key:'D',text:'60'}],'C'),
  trueFalse(156,1,'Lớp có 23 bạn nam và 25 bạn nữ. Lớp có 48 bạn. Đúng hay sai?',true),
  trueFalse(156,1,'Có 56 bông hoa, cắm vào bình 23 bông. Còn lại 34 bông. Đúng hay sai?',false),
  fillBlank(156,1,'Mẹ mua 45 quả trứng, dùng 23 quả. Còn lại [b1] quả.',[{key:'b1',text:''}],{b1:'22'}),
  fillBlank(156,1,'Thư viện có 62 cuốn sách, mượn thêm 17 cuốn. Có tất cả [b1] cuốn.',[{key:'b1',text:''}],{b1:'79'}),
  counting(156,1,'Vườn có bao nhiêu bông hoa?',[{key:'d1',text:'🌸'},{key:'d2',text:'🌸'},{key:'d3',text:'🌸'},{key:'d4',text:'🌸'},{key:'d5',text:'🌸'},{key:'d6',text:'🌸'},{key:'d7',text:'🌸'},{key:'d8',text:'🌸'},{key:'d9',text:'🌸'},{key:'d10',text:'🌸'},{key:'d11',text:'🌸'},{key:'d12',text:'🌸'}],'12'),
  sorting(156,1,'Sắp xếp các bước giải toán: Tính, Đọc đề, Viết phép tính, Trả lời',[{key:'1',text:'Tính'},{key:'2',text:'Đọc đề'},{key:'3',text:'Viết phép tính'},{key:'4',text:'Trả lời'}],['2','3','1','4']),
  crossOut(156,1,'Gạch bỏ phép tính không phù hợp: "Có 30 quả, ăn 12 quả, còn lại bao nhiêu?"',[{key:'A',text:'30-12=18'},{key:'B',text:'30+12=42'},{key:'C',text:'12+18=30'}],['B']),

  // Exercise 2
  singleChoice(156,2,'Thùng thứ nhất có 45 lít nước, thùng thứ hai có 33 lít. Hỏi cả hai thùng có bao nhiêu lít?',[{key:'A',text:'77'},{key:'B',text:'78'},{key:'C',text:'79'}],'B'),
  singleChoice(156,2,'Bác nông dân thu hoạch được 76 kg lúa, bán đi 43 kg. Còn lại bao nhiêu kg?',[{key:'A',text:'32'},{key:'B',text:'33'},{key:'C',text:'34'}],'B'),
  multipleChoice(156,2,'Bài toán nào dùng phép cộng?',[{key:'A',text:'Có 30, thêm 20 vào'},{key:'B',text:'Có 50, lấy đi 15'},{key:'C',text:'Tổng của 25 và 35'},{key:'D',text:'Hiệu của 40 và 20'}],['A','C']),
  multipleChoice(156,2,'Bài toán nào dùng phép trừ?',[{key:'A',text:'Bớt đi 15'},{key:'B',text:'Còn lại bao nhiêu sau khi lấy đi'},{key:'C',text:'Cộng thêm vào'},{key:'D',text:'Nhiều hơn bao nhiêu'}],['A','B']),
  matching(156,2,'Nối bài toán với phép tính:',[{key:'q1',text:'25 thêm 34'},{key:'q2',text:'60 bớt 25'},{key:'q3',text:'Tổng 33 và 45'},{key:'q4',text:'Hiệu 80 và 37'}],{q1:'25+34=59',q2:'60-25=35',q3:'33+45=78',q4:'80-37=43'}),
  matching(156,2,'Ghép câu hỏi với đáp án:',[{key:'q1',text:'Có 55 và thêm 23'},{key:'q2',text:'Có 90 bớt 46'},{key:'q3',text:'Tổng 47 và 32'},{key:'q4',text:'Hiệu 75 và 31'}],{q1:'78',q2:'44',q3:'79',q4:'44'}),
  dragDrop(156,2,'Sắp xếp các bước giải bài toán: "Lớp có 24 nam và 23 nữ, có bao nhiêu học sinh?"',[{key:'a',text:'Trả lời: Lớp có 47 học sinh'},{key:'b',text:'Đọc đề bài'},{key:'c',text:'24 + 23 = 47'},{key:'d',text:'Tóm tắt: Nam: 24, Nữ: 23, Tất cả: ?'}],['b','d','c','a']),
  tableFill(156,2,'Điền kết quả bài toán:',[{key:'headers',text:'Có|Thêm/Bớt|Kết quả'},{key:'r1',text:'45|+32|_r1c1'},{key:'r2',text:'78|-34|_r2c1'}],{r1c1:'77',r2c1:'44'}),
  numberLine(156,2,'Bắt đầu từ 30, thêm 25 bước. Đến số nào?',[{key:'min',text:'30'},{key:'max',text:'60'},{key:'step',text:'5'},{key:'marks',text:'30|35|40|45|50|55|60'},{key:'hidden',text:'55'}],['55']),
  puzzle(156,2,'Ghép để hoàn thành: "Có 38 bạn, thêm 25 bạn. Có tất cả [slot1] bạn."',[{key:'slot1',text:'?'},{key:'t63',text:'63'},{key:'t64',text:'64'},{key:'t62',text:'62'}],{slot1:'t63'}),

  // Exercise 3
  fillBlank(156,3,'Vườn có [b1] cây cam, trồng thêm 24 cây. Có tất cả 67 cây. Vườn có bao nhiêu cây cam ban đầu?',[{key:'b1',text:''}],{b1:'43'}),
  fillBlank(156,3,'Mua 85 kg gạo, đã dùng [b1] kg, còn lại 42 kg. Đã dùng bao nhiêu kg?',[{key:'b1',text:''}],{b1:'43'}),
  puzzle(156,3,'Bài toán: "Lớp có 27 bạn, thêm 14 bạn. Có tất cả [slot1] bạn."',[{key:'slot1',text:'?'},{key:'t41',text:'41'},{key:'t42',text:'42'},{key:'t40',text:'40'}],{slot1:'t41'}),
  puzzle(156,3,'Bài toán: "Có 63 quả bóng, lấy đi 21. Còn [slot1] quả."',[{key:'slot1',text:'?'},{key:'t42',text:'42'},{key:'t43',text:'43'},{key:'t41',text:'41'}],{slot1:'t42'}),
  game(156,3,'Nối bài toán với đáp án:',[{key:'g1a',text:'Có 40 thêm 35',pair:'75'},{key:'g1b',text:'Tổng của 40 và 35',pair:'75'},{key:'g2a',text:'Có 80 bớt 37',pair:'43'},{key:'g2b',text:'Hiệu của 80 và 37',pair:'43'},{key:'g3a',text:'Có 55 thêm 28',pair:'83'},{key:'g3b',text:'55 cộng 28',pair:'83'}]),
  sorting(156,3,'Sắp xếp các bước giải: "Kho A có 45 tấn, kho B có 34 tấn. Cả hai kho có bao nhiêu?"',[{key:'1',text:'Kho A và B: 45+34=79 tấn'},{key:'2',text:'Đọc và tóm tắt'},{key:'3',text:'Trả lời: Cả hai kho có 79 tấn'},{key:'4',text:'Lập phép tính'}],['2','4','1','3']),
  matching(156,3,'Nối bài toán với kết quả đúng:',[{key:'q1',text:'Có 56, thêm 27'},{key:'q2',text:'Có 95, bớt 52'},{key:'q3',text:'Tổng 48 và 35'},{key:'q4',text:'Hiệu 87 và 44'}],{q1:'83',q2:'43',q3:'83',q4:'43'}),
  multipleChoice(156,3,'Bài toán nào có đáp án là 54?',[{key:'A',text:'Có 30, thêm 24'},{key:'B',text:'Có 79, bớt 25'},{key:'C',text:'Tổng 27 và 27'},{key:'D',text:'Hiệu 98 và 44'}],['A','B','D']),
  multipleChoice(156,3,'Phép tính nào SAI khi giải bài toán "Có 67 quyển, dùng 34 quyển"?',[{key:'A',text:'67-34=33'},{key:'B',text:'67+34=101'},{key:'C',text:'34+33=67'},{key:'D',text:'33+34=67'}],['B']),
  dragDrop(156,3,'Điền số vào bài toán: "Có 4? quả, ăn 23 quả, còn 21 quả. Số ? là:"',[{key:'a',text:'4'},{key:'b',text:'3'},{key:'c',text:'5'},{key:'d',text:'6'}],['a']),
];

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 157 — Đồng hồ (telling time — giờ đúng)
// ═══════════════════════════════════════════════════════════════════════════
const lesson157: Question[] = [
  // Exercise 1
  singleChoice(157,1,'Kim ngắn chỉ số 3, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?',[{key:'A',text:'2 giờ'},{key:'B',text:'3 giờ'},{key:'C',text:'4 giờ'}],'B'),
  singleChoice(157,1,'Kim ngắn chỉ số 7, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?',[{key:'A',text:'6 giờ'},{key:'B',text:'7 giờ'},{key:'C',text:'8 giờ'}],'B'),
  singleChoice(157,1,'Buổi sáng đi học lúc 7 giờ. Kim ngắn chỉ số mấy?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B'),
  trueFalse(157,1,'Kim dài chỉ số 12 là giờ đúng. Đúng hay sai?',true),
  trueFalse(157,1,'10 giờ đúng: kim ngắn chỉ 10, kim dài chỉ 6. Đúng hay sai?',false),
  fillBlank(157,1,'Kim ngắn chỉ số [b1], kim dài chỉ số 12 → 5 giờ đúng.',[{key:'b1',text:''}],{b1:'5'}),
  fillBlank(157,1,'8 giờ đúng: kim ngắn chỉ số [b1], kim dài chỉ số 12.',[{key:'b1',text:''}],{b1:'8'}),
  counting(157,1,'Đếm số giờ từ 1 giờ đến 6 giờ:',[{key:'d1',text:'1 giờ'},{key:'d2',text:'2 giờ'},{key:'d3',text:'3 giờ'},{key:'d4',text:'4 giờ'},{key:'d5',text:'5 giờ'},{key:'d6',text:'6 giờ'}],'6'),
  sorting(157,1,'Sắp xếp theo thứ tự buổi sáng đến tối: ngủ dậy, ăn sáng, đi học, ăn tối',[{key:'1',text:'ăn tối'},{key:'2',text:'ngủ dậy'},{key:'3',text:'đi học'},{key:'4',text:'ăn sáng'}],['2','4','3','1']),
  crossOut(157,1,'Gạch bỏ câu SAI về đồng hồ:',[{key:'A',text:'6 giờ: kim ngắn ở số 6'},{key:'B',text:'9 giờ: kim dài ở số 9'},{key:'C',text:'12 giờ: cả hai kim ở số 12'}],['B']),

  // Exercise 2
  singleChoice(157,2,'Buổi chiều, đồng hồ chỉ 3 giờ. Đó là mấy giờ?',[{key:'A',text:'3 giờ chiều'},{key:'B',text:'15 giờ'},{key:'C',text:'Cả A và B'}],'C'),
  singleChoice(157,2,'Học sinh ăn trưa lúc 11 giờ. Kim ngắn chỉ số mấy?',[{key:'A',text:'10'},{key:'B',text:'11'},{key:'C',text:'12'}],'B'),
  multipleChoice(157,2,'Đồng hồ chỉ giờ đúng khi:',[{key:'A',text:'Kim dài ở số 12'},{key:'B',text:'Kim ngắn ở một số bất kỳ'},{key:'C',text:'Cả hai kim thẳng hàng ở số 12'},{key:'D',text:'Kim dài ở đúng số 12'}],['A','D']),
  multipleChoice(157,2,'Chọn đồng hồ chỉ 8 giờ đúng:',[{key:'A',text:'Kim ngắn ở 8, kim dài ở 12'},{key:'B',text:'Kim ngắn ở 12, kim dài ở 8'},{key:'C',text:'Cả hai kim ở 8'},{key:'D',text:'Kim dài ở 12, kim ngắn ở 8'}],['A','D']),
  matching(157,2,'Nối hoạt động với giờ phù hợp:',[{key:'Ngủ dậy',text:'Ngủ dậy'},{key:'Đi học',text:'Đi học'},{key:'Ăn trưa',text:'Ăn trưa'},{key:'Đi ngủ',text:'Đi ngủ'}],{'Ngủ dậy':'6 giờ','Đi học':'7 giờ','Ăn trưa':'11 giờ','Đi ngủ':'9 giờ'}),
  matching(157,2,'Nối mô tả đồng hồ với giờ:',[{key:'Kim ngắn ở 4',text:'Kim ngắn ở 4'},{key:'Kim ngắn ở 9',text:'Kim ngắn ở 9'},{key:'Kim ngắn ở 1',text:'Kim ngắn ở 1'},{key:'Kim ngắn ở 11',text:'Kim ngắn ở 11'}],{'Kim ngắn ở 4':'4 giờ','Kim ngắn ở 9':'9 giờ','Kim ngắn ở 1':'1 giờ','Kim ngắn ở 11':'11 giờ'}),
  dragDrop(157,2,'Sắp xếp các hoạt động theo giờ từ sớm đến muộn:',[{key:'a',text:'7 giờ: đi học'},{key:'b',text:'6 giờ: ngủ dậy'},{key:'c',text:'12 giờ: ăn trưa'},{key:'d',text:'9 giờ: đi ngủ'}],['b','a','c','d']),
  tableFill(157,2,'Điền giờ vào bảng:',[{key:'headers',text:'Kim ngắn|Giờ đúng'},{key:'r1',text:'số 5|_r1c1'},{key:'r2',text:'số 10|_r2c1'}],{r1c1:'5 giờ',r2c1:'10 giờ'}),
  numberLine(157,2,'Đồng hồ hiện tại 6 giờ, sau 3 tiếng là mấy giờ?',[{key:'min',text:'1'},{key:'max',text:'12'},{key:'step',text:'1'},{key:'marks',text:'1|2|3|4|5|6|7|8|9|10|11|12'},{key:'hidden',text:'9'}],['9']),
  puzzle(157,2,'Ghép để hoàn thành: "Kim ngắn ở [slot1], kim dài ở 12 → 2 giờ đúng"',[{key:'slot1',text:'?'},{key:'t2',text:'số 2'},{key:'t3',text:'số 3'},{key:'t1',text:'số 1'}],{slot1:'t2'}),

  // Exercise 3
  fillBlank(157,3,'Sau 4 giờ sáng [b1] tiếng là 7 giờ sáng.',[{key:'b1',text:''}],{b1:'3'}),
  fillBlank(157,3,'Bắt đầu học lúc 7 giờ, học 2 tiếng. Kết thúc lúc [b1] giờ.',[{key:'b1',text:''}],{b1:'9'}),
  puzzle(157,3,'Đồng hồ: kim ngắn giữa 11 và 12, kim dài ở 12 → [slot1]',[{key:'slot1',text:'?'},{key:'t11',text:'11 giờ'},{key:'t12',text:'12 giờ'},{key:'t10',text:'10 giờ'}],{slot1:'t11'}),
  puzzle(157,3,'Nếu bây giờ là 5 giờ, thêm 6 tiếng là [slot1]',[{key:'slot1',text:'?'},{key:'t11',text:'11 giờ'},{key:'t12',text:'12 giờ'},{key:'t10',text:'10 giờ'}],{slot1:'t11'}),
  game(157,3,'Nối hoạt động với giờ thích hợp:',[{key:'g1a',text:'Ăn sáng',pair:'7 giờ'},{key:'g1b',text:'7 giờ sáng',pair:'7 giờ'},{key:'g2a',text:'Giờ ra chơi',pair:'9 giờ'},{key:'g2b',text:'9 giờ sáng',pair:'9 giờ'},{key:'g3a',text:'Ăn tối',pair:'6 giờ'},{key:'g3b',text:'6 giờ chiều',pair:'6 giờ'}]),
  sorting(157,3,'Sắp xếp theo thứ tự: 12 giờ trưa, 6 giờ sáng, 3 giờ chiều, 9 giờ tối',[{key:'1',text:'12 giờ trưa'},{key:'2',text:'6 giờ sáng'},{key:'3',text:'3 giờ chiều'},{key:'4',text:'9 giờ tối'}],['2','1','3','4']),
  matching(157,3,'Nối mô tả với giờ đúng:',[{key:'q1',text:'Nửa đêm'},{key:'q2',text:'Chính ngọ'},{key:'q3',text:'Bình minh'},{key:'q4',text:'Hoàng hôn'}],{q1:'12 giờ đêm',q2:'12 giờ trưa',q3:'6 giờ sáng',q4:'6 giờ chiều'}),
  multipleChoice(157,3,'Đồng hồ nào chỉ cùng một giờ với 3 giờ chiều?',[{key:'A',text:'Kim ngắn ở 3, kim dài ở 12'},{key:'B',text:'15 giờ'},{key:'C',text:'Kim ngắn ở 15, kim dài ở 12'},{key:'D',text:'3 giờ'}],['A','B','D']),
  multipleChoice(157,3,'Chọn phát biểu ĐÚNG về đồng hồ:',[{key:'A',text:'Kim dài quay nhanh hơn kim ngắn'},{key:'B',text:'Kim ngắn chỉ giờ'},{key:'C',text:'Kim dài chỉ phút'},{key:'D',text:'Giờ đúng: kim dài ở 12'}],['A','B','C','D']),
  dragDrop(157,3,'Sắp xếp theo thứ tự giờ tăng dần: 11 giờ, 2 giờ, 8 giờ, 5 giờ',[{key:'a',text:'2 giờ'},{key:'b',text:'5 giờ'},{key:'c',text:'8 giờ'},{key:'d',text:'11 giờ'}],['a','b','c','d']),
];

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 158 — Ngày, tháng, năm (calendar)
// ═══════════════════════════════════════════════════════════════════════════
const lesson158: Question[] = [
  // Exercise 1
  singleChoice(158,1,'Một tuần có bao nhiêu ngày?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B'),
  singleChoice(158,1,'Tháng 1 có bao nhiêu ngày?',[{key:'A',text:'28'},{key:'B',text:'30'},{key:'C',text:'31'}],'C'),
  singleChoice(158,1,'Ngày nào đứng sau thứ Tư?',[{key:'A',text:'Thứ Ba'},{key:'B',text:'Thứ Tư'},{key:'C',text:'Thứ Năm'}],'C'),
  trueFalse(158,1,'Một năm có 12 tháng. Đúng hay sai?',true),
  trueFalse(158,1,'Tháng 2 luôn có 30 ngày. Đúng hay sai?',false),
  fillBlank(158,1,'Sau thứ Sáu là thứ [b1].',[{key:'b1',text:''}],{b1:'Bảy'}),
  fillBlank(158,1,'Tháng có 28 hoặc 29 ngày là tháng [b1].',[{key:'b1',text:''}],{b1:'2'}),
  counting(158,1,'Đếm số ngày trong tuần:',[{key:'d1',text:'Thứ Hai'},{key:'d2',text:'Thứ Ba'},{key:'d3',text:'Thứ Tư'},{key:'d4',text:'Thứ Năm'},{key:'d5',text:'Thứ Sáu'},{key:'d6',text:'Thứ Bảy'},{key:'d7',text:'Chủ Nhật'}],'7'),
  sorting(158,1,'Sắp xếp các ngày theo thứ tự trong tuần: Thứ Tư, Thứ Hai, Thứ Sáu, Thứ Ba',[{key:'1',text:'Thứ Tư'},{key:'2',text:'Thứ Hai'},{key:'3',text:'Thứ Sáu'},{key:'4',text:'Thứ Ba'}],['2','4','1','3']),
  crossOut(158,1,'Gạch bỏ thứ KHÔNG thuộc ngày trong tuần:',[{key:'A',text:'Thứ Hai'},{key:'B',text:'Thứ Mười'},{key:'C',text:'Thứ Bảy'}],['B']),

  // Exercise 2
  singleChoice(158,2,'Tháng mấy là tháng cuối năm?',[{key:'A',text:'Tháng 10'},{key:'B',text:'Tháng 11'},{key:'C',text:'Tháng 12'}],'C'),
  singleChoice(158,2,'Ngày 30 tháng 4 là ngày lễ gì?',[{key:'A',text:'Quốc khánh'},{key:'B',text:'Giải phóng miền Nam'},{key:'C',text:'Quốc tế Lao động'}],'B'),
  multipleChoice(158,2,'Tháng nào có 31 ngày?',[{key:'A',text:'Tháng 1'},{key:'B',text:'Tháng 3'},{key:'C',text:'Tháng 4'},{key:'D',text:'Tháng 5'}],['A','B','D']),
  multipleChoice(158,2,'Ngày nào thuộc cuối tuần?',[{key:'A',text:'Thứ Sáu'},{key:'B',text:'Thứ Bảy'},{key:'C',text:'Chủ Nhật'},{key:'D',text:'Thứ Hai'}],['B','C']),
  matching(158,2,'Nối tháng với số ngày:',[{key:'Tháng 1',text:'Tháng 1'},{key:'Tháng 2',text:'Tháng 2'},{key:'Tháng 4',text:'Tháng 4'},{key:'Tháng 7',text:'Tháng 7'}],{'Tháng 1':'31 ngày','Tháng 2':'28 ngày','Tháng 4':'30 ngày','Tháng 7':'31 ngày'}),
  matching(158,2,'Ghép ngày lễ với ngày tháng:',[{key:'Tết Dương lịch',text:'Tết Dương lịch'},{key:'Quốc khánh',text:'Quốc khánh'},{key:'Quốc tế Lao động',text:'Quốc tế Lao động'},{key:'Thiếu nhi',text:'Thiếu nhi'}],{'Tết Dương lịch':'1/1','Quốc khánh':'2/9','Quốc tế Lao động':'1/5','Thiếu nhi':'1/6'}),
  dragDrop(158,2,'Sắp xếp tháng theo thứ tự: Tháng 3, Tháng 1, Tháng 6, Tháng 4',[{key:'a',text:'Tháng 1'},{key:'b',text:'Tháng 3'},{key:'c',text:'Tháng 4'},{key:'d',text:'Tháng 6'}],['a','b','c','d']),
  tableFill(158,2,'Điền thông tin:',[{key:'headers',text:'Tháng|Số ngày'},{key:'r1',text:'Tháng 6|_r1c1'},{key:'r2',text:'Tháng 8|_r2c1'}],{r1c1:'30',r2c1:'31'}),
  numberLine(158,2,'Đếm từ tháng 3 đến tháng 8 có bao nhiêu tháng?',[{key:'min',text:'1'},{key:'max',text:'12'},{key:'step',text:'1'},{key:'marks',text:'1|2|3|4|5|6|7|8|9|10|11|12'},{key:'hidden',text:'6'}],['6']),
  puzzle(158,2,'Ghép: "Tháng có 30 ngày gồm [slot1], 6, 9, 11"',[{key:'slot1',text:'?'},{key:'t4',text:'4'},{key:'t3',text:'3'},{key:'t5',text:'5'}],{slot1:'t4'}),

  // Exercise 3
  fillBlank(158,3,'Ngày 25 tháng 12 năm [b1] — điền năm hiện tại: 2024',[{key:'b1',text:''}],{b1:'2024'}),
  fillBlank(158,3,'Từ tháng 9 đến tháng 12 có [b1] tháng.',[{key:'b1',text:''}],{b1:'4'}),
  puzzle(158,3,'Hoàn thành: "Tháng 4 có [slot1] ngày."',[{key:'slot1',text:'?'},{key:'t30',text:'30'},{key:'t31',text:'31'},{key:'t28',text:'28'}],{slot1:'t30'}),
  puzzle(158,3,'Ngày đầu tuần là [slot1]',[{key:'slot1',text:'?'},{key:'tHai',text:'Thứ Hai'},{key:'tBa',text:'Thứ Ba'},{key:'tTu',text:'Thứ Tư'}],{slot1:'tHai'}),
  game(158,3,'Nối tháng với đặc điểm:',[{key:'g1a',text:'Tháng 2',pair:'ít ngày nhất'},{key:'g1b',text:'Tháng ngắn nhất',pair:'ít ngày nhất'},{key:'g2a',text:'Tháng 12',pair:'tháng cuối năm'},{key:'g2b',text:'Tháng cuối',pair:'tháng cuối năm'},{key:'g3a',text:'Tháng 1',pair:'đầu năm'},{key:'g3b',text:'Tháng đầu',pair:'đầu năm'}]),
  sorting(158,3,'Sắp xếp: Tháng 12, Tháng 5, Tháng 8, Tháng 2',[{key:'1',text:'Tháng 12'},{key:'2',text:'Tháng 5'},{key:'3',text:'Tháng 8'},{key:'4',text:'Tháng 2'}],['4','2','3','1']),
  matching(158,3,'Nối thứ với số thứ tự trong tuần (Thứ Hai = 1):',[{key:'Thứ Tư',text:'Thứ Tư'},{key:'Thứ Sáu',text:'Thứ Sáu'},{key:'Chủ Nhật',text:'Chủ Nhật'},{key:'Thứ Năm',text:'Thứ Năm'}],{'Thứ Tư':'3','Thứ Sáu':'5','Chủ Nhật':'7','Thứ Năm':'4'}),
  multipleChoice(158,3,'Năm 2024 tháng 2 có 29 ngày (năm nhuận). Chọn phát biểu ĐÚNG:',[{key:'A',text:'Năm nhuận có 366 ngày'},{key:'B',text:'Tháng 2 năm nhuận có 29 ngày'},{key:'C',text:'Năm nhuận xảy ra mỗi 4 năm'},{key:'D',text:'Năm 2024 là năm nhuận'}],['A','B','C','D']),
  multipleChoice(158,3,'Tháng nào có 30 ngày?',[{key:'A',text:'Tháng 4'},{key:'B',text:'Tháng 6'},{key:'C',text:'Tháng 9'},{key:'D',text:'Tháng 11'}],['A','B','C','D']),
  dragDrop(158,3,'Sắp xếp 4 tháng mùa hè: Tháng 7, Tháng 5, Tháng 8, Tháng 6',[{key:'a',text:'Tháng 5'},{key:'b',text:'Tháng 6'},{key:'c',text:'Tháng 7'},{key:'d',text:'Tháng 8'}],['a','b','c','d']),
];

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 159 — Luyện tập chung (time + calendar)
// ═══════════════════════════════════════════════════════════════════════════
const lesson159: Question[] = [
  // Exercise 1
  singleChoice(159,1,'Hôm nay là thứ Ba, ngày mai là thứ mấy?',[{key:'A',text:'Thứ Hai'},{key:'B',text:'Thứ Tư'},{key:'C',text:'Thứ Ba'}],'B'),
  singleChoice(159,1,'Bây giờ là 8 giờ sáng. 3 tiếng nữa là mấy giờ?',[{key:'A',text:'10 giờ'},{key:'B',text:'11 giờ'},{key:'C',text:'12 giờ'}],'B'),
  singleChoice(159,1,'Một năm có bao nhiêu tháng?',[{key:'A',text:'10'},{key:'B',text:'11'},{key:'C',text:'12'}],'C'),
  trueFalse(159,1,'Thứ Bảy và Chủ Nhật là ngày nghỉ. Đúng hay sai?',true),
  trueFalse(159,1,'6 giờ đúng: kim ngắn ở số 12, kim dài ở số 6. Đúng hay sai?',false),
  fillBlank(159,1,'Tháng 10 có [b1] ngày.',[{key:'b1',text:''}],{b1:'31'}),
  fillBlank(159,1,'Bây giờ 9 giờ, [b1] tiếng sau là 12 giờ.',[{key:'b1',text:''}],{b1:'3'}),
  counting(159,1,'Đếm số tháng từ tháng 1 đến tháng 6:',[{key:'d1',text:'Tháng 1'},{key:'d2',text:'Tháng 2'},{key:'d3',text:'Tháng 3'},{key:'d4',text:'Tháng 4'},{key:'d5',text:'Tháng 5'},{key:'d6',text:'Tháng 6'}],'6'),
  sorting(159,1,'Sắp xếp theo thứ tự: 3 giờ chiều, 9 giờ sáng, 6 giờ tối, 12 giờ trưa',[{key:'1',text:'3 giờ chiều'},{key:'2',text:'9 giờ sáng'},{key:'3',text:'6 giờ tối'},{key:'4',text:'12 giờ trưa'}],['2','4','1','3']),
  crossOut(159,1,'Gạch bỏ thông tin SAI:',[{key:'A',text:'Thứ Hai là ngày đầu tuần'},{key:'B',text:'Tháng 2 có 31 ngày'},{key:'C',text:'Một tuần có 7 ngày'}],['B']),

  // Exercise 2
  singleChoice(159,2,'Hôm nay là ngày 28 tháng 2. Ngày mai là ngày mấy (không phải năm nhuận)?',[{key:'A',text:'1 tháng 2'},{key:'B',text:'29 tháng 2'},{key:'C',text:'1 tháng 3'}],'C'),
  singleChoice(159,2,'Đồng hồ chỉ 11 giờ đúng buổi sáng. 1 tiếng nữa là mấy giờ?',[{key:'A',text:'11 giờ'},{key:'B',text:'12 giờ'},{key:'C',text:'1 giờ'}],'B'),
  multipleChoice(159,2,'Chọn thông tin ĐÚNG:',[{key:'A',text:'1 tuần = 7 ngày'},{key:'B',text:'1 năm = 12 tháng'},{key:'C',text:'1 ngày = 24 giờ'},{key:'D',text:'Tháng 11 có 30 ngày'}],['A','B','C','D']),
  multipleChoice(159,2,'Tháng nào có 31 ngày?',[{key:'A',text:'Tháng 7'},{key:'B',text:'Tháng 8'},{key:'C',text:'Tháng 9'},{key:'D',text:'Tháng 10'}],['A','B','D']),
  matching(159,2,'Nối đơn vị thời gian với số:',[{key:'1 tuần',text:'1 tuần'},{key:'1 năm',text:'1 năm'},{key:'1 ngày',text:'1 ngày'},{key:'Nửa ngày',text:'Nửa ngày'}],{'1 tuần':'7 ngày','1 năm':'12 tháng','1 ngày':'24 giờ','Nửa ngày':'12 giờ'}),
  matching(159,2,'Nối hoạt động với thời điểm phù hợp:',[{key:'Đi học',text:'Đi học'},{key:'Ăn trưa',text:'Ăn trưa'},{key:'Đi ngủ',text:'Đi ngủ'},{key:'Ngủ dậy',text:'Ngủ dậy'}],{'Đi học':'7 giờ sáng','Ăn trưa':'12 giờ trưa','Đi ngủ':'9 giờ tối','Ngủ dậy':'6 giờ sáng'}),
  dragDrop(159,2,'Sắp xếp tháng theo thứ tự: Tháng 9, Tháng 6, Tháng 12, Tháng 3',[{key:'a',text:'Tháng 3'},{key:'b',text:'Tháng 6'},{key:'c',text:'Tháng 9'},{key:'d',text:'Tháng 12'}],['a','b','c','d']),
  tableFill(159,2,'Điền thông tin vào bảng:',[{key:'headers',text:'Thứ|Số thứ tự (Thứ Hai=1)'},{key:'r1',text:'Thứ Năm|_r1c1'},{key:'r2',text:'Chủ Nhật|_r2c1'}],{r1c1:'4',r2c1:'7'}),
  numberLine(159,2,'Từ tháng 4 đến tháng 10 có bao nhiêu tháng?',[{key:'min',text:'1'},{key:'max',text:'12'},{key:'step',text:'1'},{key:'marks',text:'1|2|3|4|5|6|7|8|9|10|11|12'},{key:'hidden',text:'7'}],['7']),
  puzzle(159,2,'Kim ngắn ở số [slot1], kim dài ở 12 → 6 giờ đúng',[{key:'slot1',text:'?'},{key:'t6',text:'6'},{key:'t7',text:'7'},{key:'t5',text:'5'}],{slot1:'t6'}),

  // Exercise 3
  fillBlank(159,3,'Học kỳ 1 bắt đầu tháng 9, kết thúc tháng 1. Có [b1] tháng.',[{key:'b1',text:''}],{b1:'5'}),
  fillBlank(159,3,'Từ 7 giờ sáng đến 11 giờ trưa có [b1] tiếng.',[{key:'b1',text:''}],{b1:'4'}),
  puzzle(159,3,'Hôm nay thứ Sáu. Cuối tuần là [slot1]',[{key:'slot1',text:'?'},{key:'tBay',text:'Thứ Bảy'},{key:'tCN',text:'Chủ Nhật'},{key:'tHai',text:'Thứ Hai'}],{slot1:'tBay'}),
  puzzle(159,3,'Tháng 11 có [slot1] ngày',[{key:'slot1',text:'?'},{key:'t30',text:'30'},{key:'t31',text:'31'},{key:'t28',text:'28'}],{slot1:'t30'}),
  game(159,3,'Nối câu hỏi với đáp án về thời gian:',[{key:'g1a',text:'Sau thứ Tư là gì?',pair:'Thứ Năm'},{key:'g1b',text:'Thứ Năm',pair:'Thứ Năm'},{key:'g2a',text:'Tháng sau tháng 6?',pair:'Tháng 7'},{key:'g2b',text:'Tháng 7',pair:'Tháng 7'},{key:'g3a',text:'8 giờ + 2 tiếng?',pair:'10 giờ'},{key:'g3b',text:'10 giờ',pair:'10 giờ'}]),
  sorting(159,3,'Sắp xếp theo thứ tự thời gian: Tháng 2, Tháng 11, Tháng 5, Tháng 8',[{key:'1',text:'Tháng 2'},{key:'2',text:'Tháng 11'},{key:'3',text:'Tháng 5'},{key:'4',text:'Tháng 8'}],['1','3','4','2']),
  matching(159,3,'Nối câu hỏi với câu trả lời:',[{key:'q1',text:'Số ngày trong 1 tuần?'},{key:'q2',text:'Số tháng trong 1 năm?'},{key:'q3',text:'Số ngày tháng 4?'},{key:'q4',text:'Số ngày tháng 7?'}],{q1:'7',q2:'12',q3:'30',q4:'31'}),
  multipleChoice(159,3,'Chọn tất cả phát biểu ĐÚNG:',[{key:'A',text:'Tháng 6 có 30 ngày'},{key:'B',text:'Một năm có 365 hoặc 366 ngày'},{key:'C',text:'Thứ Hai là ngày đầu tuần'},{key:'D',text:'Tháng 12 có 31 ngày'}],['A','B','C','D']),
  multipleChoice(159,3,'Tháng nào có 30 ngày?',[{key:'A',text:'Tháng 4'},{key:'B',text:'Tháng 6'},{key:'C',text:'Tháng 7'},{key:'D',text:'Tháng 9'}],['A','B','D']),
  dragDrop(159,3,'Sắp xếp theo thứ tự buổi trong ngày: buổi chiều, buổi sáng, buổi tối, buổi trưa',[{key:'a',text:'buổi sáng'},{key:'b',text:'buổi trưa'},{key:'c',text:'buổi chiều'},{key:'d',text:'buổi tối'}],['a','b','c','d']),
];

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 160 — Ôn tập số học (review addition/subtraction ≤100)
// ═══════════════════════════════════════════════════════════════════════════
const lesson160: Question[] = [
  // Exercise 1
  singleChoice(160,1,'52 + 34 = ?',[{key:'A',text:'85'},{key:'B',text:'86'},{key:'C',text:'87'}],'B'),
  singleChoice(160,1,'76 - 43 = ?',[{key:'A',text:'33'},{key:'B',text:'34'},{key:'C',text:'35'}],'A'),
  singleChoice(160,1,'28 + 51 = ?',[{key:'A',text:'79'},{key:'B',text:'80'},{key:'C',text:'78'}],'A'),
  trueFalse(160,1,'45 + 45 = 90. Đúng hay sai?',true),
  trueFalse(160,1,'100 - 34 = 67. Đúng hay sai?',false),
  fillBlank(160,1,'[b1] + 37 = 70',[{key:'b1',text:''}],{b1:'33'}),
  fillBlank(160,1,'84 - [b1] = 41',[{key:'b1',text:''}],{b1:'43'}),
  counting(160,1,'Đếm số khối rồi nhân đôi:',[{key:'d1',text:'🟦'},{key:'d2',text:'🟦'},{key:'d3',text:'🟦'},{key:'d4',text:'🟦'},{key:'d5',text:'🟦'},{key:'d6',text:'🟦'},{key:'d7',text:'🟦'},{key:'d8',text:'🟦'},{key:'d9',text:'🟦'},{key:'d10',text:'🟦'}],'20'),
  sorting(160,1,'Sắp xếp kết quả từ bé đến lớn: 67+21, 34+53, 89-22, 48+39',[{key:'1',text:'88'},{key:'2',text:'87'},{key:'3',text:'67'},{key:'4',text:'87'}],['3','2','4','1']),
  crossOut(160,1,'Gạch bỏ phép tính SAI:',[{key:'A',text:'45+35=80'},{key:'B',text:'67+23=91'},{key:'C',text:'78+12=90'}],['B']),

  // Exercise 2
  singleChoice(160,2,'100 - 37 = ?',[{key:'A',text:'62'},{key:'B',text:'63'},{key:'C',text:'64'}],'B'),
  singleChoice(160,2,'(45 + 23) - 18 = ?',[{key:'A',text:'49'},{key:'B',text:'50'},{key:'C',text:'51'}],'B'),
  multipleChoice(160,2,'Phép tính nào bằng 100?',[{key:'A',text:'55+45'},{key:'B',text:'67+33'},{key:'C',text:'78+22'},{key:'D',text:'89+12'}],['A','B','C']),
  multipleChoice(160,2,'Phép tính có kết quả nhỏ hơn 50?',[{key:'A',text:'87-45=42'},{key:'B',text:'63-21=42'},{key:'C',text:'95-52=43'},{key:'D',text:'76+12=88'}],['A','B','C']),
  matching(160,2,'Nối phép tính với kết quả:',[{key:'63+27',text:'63+27'},{key:'45+45',text:'45+45'},{key:'100-10',text:'100-10'},{key:'75+15',text:'75+15'}],{'63+27':'90','45+45':'90','100-10':'90','75+15':'90'}),
  matching(160,2,'Ghép cặp bằng nhau:',[{key:'50+30',text:'50+30'},{key:'100-20',text:'100-20'},{key:'45+35',text:'45+35'},{key:'60+20',text:'60+20'}],{'50+30':'80','100-20':'80','45+35':'80','60+20':'80'}),
  dragDrop(160,2,'Sắp xếp theo thứ tự giảm dần:',[{key:'a',text:'95-23=72'},{key:'b',text:'68+15=83'},{key:'c',text:'47+38=85'},{key:'d',text:'54+32=86'}],['d','c','b','a']),
  tableFill(160,2,'Điền kết quả:',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'56+34|_r1c1'},{key:'r2',text:'78-45|_r2c1'}],{r1c1:'90',r2c1:'33'}),
  numberLine(160,2,'50 + 30 = ?',[{key:'min',text:'0'},{key:'max',text:'100'},{key:'step',text:'10'},{key:'marks',text:'0|10|20|30|40|50|60|70|80|90|100'},{key:'hidden',text:'80'}],['80']),
  puzzle(160,2,'Tính 47 + 36 = [slot1]',[{key:'slot1',text:'?'},{key:'t83',text:'83'},{key:'t84',text:'84'},{key:'t82',text:'82'}],{slot1:'t83'}),

  // Exercise 3
  fillBlank(160,3,'[b1] + [b1] = 90 (hai số bằng nhau)',[{key:'b1',text:''}],{b1:'45'}),
  fillBlank(160,3,'100 - [b1] = 56',[{key:'b1',text:''}],{b1:'44'}),
  puzzle(160,3,'Tính 83 - 47 = [slot1]',[{key:'slot1',text:'?'},{key:'t36',text:'36'},{key:'t37',text:'37'},{key:'t35',text:'35'}],{slot1:'t36'}),
  puzzle(160,3,'Tính 59 + 38 = [slot1]',[{key:'slot1',text:'?'},{key:'t97',text:'97'},{key:'t98',text:'98'},{key:'t96',text:'96'}],{slot1:'t97'}),
  game(160,3,'Nối cặp phép tính có kết quả bằng nhau:',[{key:'g1a',text:'45+35',pair:'80'},{key:'g1b',text:'100-20',pair:'80'},{key:'g2a',text:'37+46',pair:'83'},{key:'g2b',text:'97-14',pair:'83'},{key:'g3a',text:'58+35',pair:'93'},{key:'g3b',text:'100-7',pair:'93'}]),
  sorting(160,3,'Sắp xếp từ lớn đến bé: 56+34, 78+12, 45+45, 67+23',[{key:'1',text:'90'},{key:'2',text:'90'},{key:'3',text:'90'},{key:'4',text:'90'}],['1','2','3','4']),
  matching(160,3,'Nối phép tính với kết quả:',[{key:'83+9',text:'83+9'},{key:'75+17',text:'75+17'},{key:'96-4',text:'96-4'},{key:'68+24',text:'68+24'}],{'83+9':'92','75+17':'92','96-4':'92','68+24':'92'}),
  multipleChoice(160,3,'Phép tính có kết quả là 75?',[{key:'A',text:'48+27'},{key:'B',text:'50+25'},{key:'C',text:'90-15'},{key:'D',text:'83-8'}],['A','B','C','D']),
  multipleChoice(160,3,'Phép nào SAI?',[{key:'A',text:'67+25=92'},{key:'B',text:'84-37=47'},{key:'C',text:'56+45=101'},{key:'D',text:'93-48=45'}],['C']),
  dragDrop(160,3,'Điền số: ?4 + 38 = 92. Chữ số chục là:',[{key:'a',text:'5'},{key:'b',text:'4'},{key:'c',text:'6'},{key:'d',text:'3'}],['a']),
];

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 161 — Ôn tập đo lường (cm, time, calendar)
// ═══════════════════════════════════════════════════════════════════════════
const lesson161: Question[] = [
  // Exercise 1
  singleChoice(161,1,'1 dm = ? cm',[{key:'A',text:'1'},{key:'B',text:'10'},{key:'C',text:'100'}],'B'),
  singleChoice(161,1,'Chiếc bút dài 15 cm, chiếc thước dài 30 cm. Thước dài hơn bút bao nhiêu cm?',[{key:'A',text:'14'},{key:'B',text:'15'},{key:'C',text:'16'}],'B'),
  singleChoice(161,1,'Đơn vị đo độ dài nhỏ nhất trong các đơn vị sau là:',[{key:'A',text:'m'},{key:'B',text:'dm'},{key:'C',text:'cm'}],'C'),
  trueFalse(161,1,'20 cm = 2 dm. Đúng hay sai?',true),
  trueFalse(161,1,'1 giờ = 60 giây. Đúng hay sai?',false),
  fillBlank(161,1,'Đoạn thẳng AB dài [b1] cm, đoạn BC dài 12 cm. AB và BC hợp lại dài 25 cm.',[{key:'b1',text:''}],{b1:'13'}),
  fillBlank(161,1,'3 dm = [b1] cm.',[{key:'b1',text:''}],{b1:'30'}),
  counting(161,1,'Đếm số cm trên thước từ 0 đến 8:',[{key:'d1',text:'0'},{key:'d2',text:'1'},{key:'d3',text:'2'},{key:'d4',text:'3'},{key:'d5',text:'4'},{key:'d6',text:'5'},{key:'d7',text:'6'},{key:'d8',text:'7'},{key:'d9',text:'8'}],'8'),
  sorting(161,1,'Sắp xếp độ dài từ ngắn đến dài: 25 cm, 1 dm, 30 cm, 2 dm',[{key:'1',text:'1 dm = 10 cm'},{key:'2',text:'25 cm'},{key:'3',text:'2 dm = 20 cm'},{key:'4',text:'30 cm'}],['1','3','2','4']),
  crossOut(161,1,'Gạch bỏ phép đo SAI:',[{key:'A',text:'10 cm = 1 dm'},{key:'B',text:'2 dm = 25 cm'},{key:'C',text:'30 cm = 3 dm'}],['B']),

  // Exercise 2
  singleChoice(161,2,'Cây cột điện cao 8 m. Cây cột điện cao bao nhiêu dm?',[{key:'A',text:'80 dm'},{key:'B',text:'800 dm'},{key:'C',text:'8 dm'}],'A'),
  singleChoice(161,2,'Bạn An cao 1 m 20 cm. Bạn Bình cao 1 m 35 cm. Bình cao hơn An bao nhiêu cm?',[{key:'A',text:'14'},{key:'B',text:'15'},{key:'C',text:'16'}],'B'),
  multipleChoice(161,2,'Đơn vị nào dùng để đo chiều dài?',[{key:'A',text:'cm'},{key:'B',text:'dm'},{key:'C',text:'m'},{key:'D',text:'kg'}],['A','B','C']),
  multipleChoice(161,2,'Phát biểu nào ĐÚNG về đo độ dài?',[{key:'A',text:'1 m = 10 dm'},{key:'B',text:'1 dm = 10 cm'},{key:'C',text:'1 m = 100 cm'},{key:'D',text:'2 dm = 20 cm'}],['A','B','C','D']),
  matching(161,2,'Nối đơn vị với số cm tương đương:',[{key:'1 dm',text:'1 dm'},{key:'2 dm',text:'2 dm'},{key:'5 dm',text:'5 dm'},{key:'10 dm',text:'10 dm'}],{'1 dm':'10 cm','2 dm':'20 cm','5 dm':'50 cm','10 dm':'100 cm'}),
  matching(161,2,'Ghép đồ vật với đơn vị đo phù hợp:',[{key:'Chiều dài sân trường',text:'Chiều dài sân trường'},{key:'Chiều dài tờ giấy',text:'Chiều dài tờ giấy'},{key:'Chiều cao cây bút',text:'Chiều cao cây bút'},{key:'Độ dày cuốn sách',text:'Độ dày cuốn sách'}],{'Chiều dài sân trường':'m','Chiều dài tờ giấy':'cm','Chiều cao cây bút':'cm','Độ dày cuốn sách':'cm'}),
  dragDrop(161,2,'Sắp xếp từ ngắn đến dài:',[{key:'a',text:'5 cm'},{key:'b',text:'2 dm'},{key:'c',text:'1 m'},{key:'d',text:'15 cm'}],['a','d','b','c']),
  tableFill(161,2,'Đổi đơn vị:',[{key:'headers',text:'dm|cm'},{key:'r1',text:'4|_r1c1'},{key:'r2',text:'7|_r2c1'}],{r1c1:'40',r2c1:'70'}),
  numberLine(161,2,'Đo độ dài đoạn thẳng: bắt đầu 0, kết thúc ở vạch mấy? (12 cm)',[{key:'min',text:'0'},{key:'max',text:'20'},{key:'step',text:'1'},{key:'marks',text:'0|2|4|6|8|10|12|14|16|18|20'},{key:'hidden',text:'12'}],['12']),
  puzzle(161,2,'Điền vào chỗ trống: 45 cm + 35 cm = [slot1] cm',[{key:'slot1',text:'?'},{key:'t80',text:'80'},{key:'t79',text:'79'},{key:'t81',text:'81'}],{slot1:'t80'}),

  // Exercise 3
  fillBlank(161,3,'Đoạn thẳng AB = 24 cm, BC = [b1] cm. AB + BC = 45 cm.',[{key:'b1',text:''}],{b1:'21'}),
  fillBlank(161,3,'5 dm 3 cm = [b1] cm.',[{key:'b1',text:''}],{b1:'53'}),
  puzzle(161,3,'Chu vi hình vuông cạnh 12 cm = [slot1] cm',[{key:'slot1',text:'?'},{key:'t48',text:'48'},{key:'t46',text:'46'},{key:'t50',text:'50'}],{slot1:'t48'}),
  puzzle(161,3,'Đổi đơn vị: 6 dm 8 cm = [slot1] cm',[{key:'slot1',text:'?'},{key:'t68',text:'68'},{key:'t78',text:'78'},{key:'t58',text:'58'}],{slot1:'t68'}),
  game(161,3,'Nối số đo tương đương:',[{key:'g1a',text:'20 cm',pair:'2dm'},{key:'g1b',text:'2 dm',pair:'2dm'},{key:'g2a',text:'50 cm',pair:'5dm'},{key:'g2b',text:'5 dm',pair:'5dm'},{key:'g3a',text:'100 cm',pair:'10dm'},{key:'g3b',text:'10 dm',pair:'10dm'}]),
  sorting(161,3,'Sắp xếp từ dài đến ngắn: 3 dm, 25 cm, 4 dm, 15 cm',[{key:'1',text:'4 dm=40 cm'},{key:'2',text:'3 dm=30 cm'},{key:'3',text:'25 cm'},{key:'4',text:'15 cm'}],['1','2','3','4']),
  matching(161,3,'Nối phép tính đo lường với kết quả:',[{key:'q1',text:'45 cm + 25 cm'},{key:'q2',text:'3 dm - 1 dm'},{key:'q3',text:'80 cm - 35 cm'},{key:'q4',text:'2 dm + 4 dm'}],{q1:'70 cm',q2:'2 dm',q3:'45 cm',q4:'6 dm'}),
  multipleChoice(161,3,'Chọn phát biểu ĐÚNG:',[{key:'A',text:'1 m = 100 cm'},{key:'B',text:'50 cm = 5 dm'},{key:'C',text:'1 m = 10 dm'},{key:'D',text:'30 cm = 3 dm'}],['A','B','C','D']),
  multipleChoice(161,3,'Vật nào đo bằng cm phù hợp hơn?',[{key:'A',text:'Chiều dài sách giáo khoa'},{key:'B',text:'Chiều dài cây bút'},{key:'C',text:'Chiều cao bàn học'},{key:'D',text:'Độ dày tờ giấy'}],['A','B']),
  dragDrop(161,3,'Sắp xếp theo thứ tự tăng dần: 8 dm, 65 cm, 1 m, 45 cm',[{key:'a',text:'45 cm'},{key:'b',text:'65 cm'},{key:'c',text:'8 dm=80 cm'},{key:'d',text:'1 m=100 cm'}],['a','b','c','d']),
];

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 162 — Ôn tập tổng hợp (comprehensive final review Grade 1)
// ═══════════════════════════════════════════════════════════════════════════
const lesson162: Question[] = [
  // Exercise 1
  singleChoice(162,1,'Số liền sau của 99 là:',[{key:'A',text:'98'},{key:'B',text:'100'},{key:'C',text:'101'}],'B'),
  singleChoice(162,1,'56 + 24 = ?',[{key:'A',text:'79'},{key:'B',text:'80'},{key:'C',text:'81'}],'B'),
  singleChoice(162,1,'Hình vuông có mấy cạnh bằng nhau?',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],'C'),
  trueFalse(162,1,'Số 75 > 57. Đúng hay sai?',true),
  trueFalse(162,1,'Hình tam giác có 4 góc. Đúng hay sai?',false),
  fillBlank(162,1,'Số lớn nhất có hai chữ số là [b1].',[{key:'b1',text:''}],{b1:'99'}),
  fillBlank(162,1,'63 + [b1] = 100',[{key:'b1',text:''}],{b1:'37'}),
  counting(162,1,'Đếm tổng số đồ vật:',[{key:'d1',text:'🍎'},{key:'d2',text:'🍎'},{key:'d3',text:'🍊'},{key:'d4',text:'🍊'},{key:'d5',text:'🍊'},{key:'d6',text:'🍇'},{key:'d7',text:'🍇'},{key:'d8',text:'🍇'},{key:'d9',text:'🍇'},{key:'d10',text:'🍇'}],'10'),
  sorting(162,1,'Sắp xếp từ bé đến lớn: 87, 45, 63, 99, 21',[{key:'1',text:'87'},{key:'2',text:'45'},{key:'3',text:'63'},{key:'4',text:'99'},{key:'5',text:'21'}],['5','2','3','1','4']),
  crossOut(162,1,'Gạch bỏ số KHÔNG phải số có hai chữ số:',[{key:'A',text:'35'},{key:'B',text:'7'},{key:'C',text:'100'}],['B','C']),

  // Exercise 2
  singleChoice(162,2,'Trong các số: 34, 67, 89, 12. Số nào lớn nhất?',[{key:'A',text:'67'},{key:'B',text:'89'},{key:'C',text:'34'}],'B'),
  singleChoice(162,2,'Hình chữ nhật có mấy cạnh?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B'),
  multipleChoice(162,2,'Số nào lớn hơn 50?',[{key:'A',text:'67'},{key:'B',text:'45'},{key:'C',text:'83'},{key:'D',text:'99'}],['A','C','D']),
  multipleChoice(162,2,'Phép tính nào bằng 50?',[{key:'A',text:'25+25'},{key:'B',text:'75-25'},{key:'C',text:'100-50'},{key:'D',text:'30+21'}],['A','B','C']),
  matching(162,2,'Nối kiến thức lớp 1:',[{key:'Hình vuông',text:'Hình vuông'},{key:'Hình tròn',text:'Hình tròn'},{key:'Hình tam giác',text:'Hình tam giác'},{key:'Hình chữ nhật',text:'Hình chữ nhật'}],{'Hình vuông':'4 cạnh bằng nhau','Hình tròn':'không có cạnh','Hình tam giác':'3 cạnh','Hình chữ nhật':'4 cạnh, 2 cặp bằng nhau'}),
  matching(162,2,'Ghép phép tính với kết quả:',[{key:'45+55',text:'45+55'},{key:'100-37',text:'100-37'},{key:'78+22',text:'78+22'},{key:'56+44',text:'56+44'}],{'45+55':'100','100-37':'63','78+22':'100','56+44':'100'}),
  dragDrop(162,2,'Sắp xếp theo thứ tự tăng dần: 100, 75, 50, 25',[{key:'a',text:'25'},{key:'b',text:'50'},{key:'c',text:'75'},{key:'d',text:'100'}],['a','b','c','d']),
  tableFill(162,2,'Điền kết quả ôn tập:',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'67+23|_r1c1'},{key:'r2',text:'85-42|_r2c1'}],{r1c1:'90',r2c1:'43'}),
  numberLine(162,2,'Số nào nằm giữa 60 và 80?',[{key:'min',text:'0'},{key:'max',text:'100'},{key:'step',text:'10'},{key:'marks',text:'0|10|20|30|40|50|60|70|80|90|100'},{key:'hidden',text:'70'}],['70']),
  puzzle(162,2,'Hoàn thành: 36 + 47 = [slot1]',[{key:'slot1',text:'?'},{key:'t83',text:'83'},{key:'t84',text:'84'},{key:'t82',text:'82'}],{slot1:'t83'}),

  // Exercise 3
  fillBlank(162,3,'Số lớn nhất có 2 chữ số khác nhau là [b1].',[{key:'b1',text:''}],{b1:'98'}),
  fillBlank(162,3,'Tổng của 3 số liên tiếp: 9 + 10 + 11 = [b1].',[{key:'b1',text:''}],{b1:'30'}),
  puzzle(162,3,'Tính: 76 + 17 = [slot1]',[{key:'slot1',text:'?'},{key:'t93',text:'93'},{key:'t94',text:'94'},{key:'t92',text:'92'}],{slot1:'t93'}),
  puzzle(162,3,'Tính: 100 - 45 = [slot1]',[{key:'slot1',text:'?'},{key:'t55',text:'55'},{key:'t56',text:'56'},{key:'t54',text:'54'}],{slot1:'t55'}),
  game(162,3,'Nối phép tính với kết quả:',[{key:'g1a',text:'55+37',pair:'92'},{key:'g1b',text:'100-8',pair:'92'},{key:'g2a',text:'46+38',pair:'84'},{key:'g2b',text:'97-13',pair:'84'},{key:'g3a',text:'29+54',pair:'83'},{key:'g3b',text:'96-13',pair:'83'}]),
  sorting(162,3,'Sắp xếp theo giá trị giảm dần: 100, 87, 95, 72, 63',[{key:'1',text:'100'},{key:'2',text:'87'},{key:'3',text:'95'},{key:'4',text:'72'},{key:'5',text:'63'}],['1','3','2','4','5']),
  matching(162,3,'Ôn tập tổng hợp — nối câu hỏi với đáp án:',[{key:'q1',text:'Số chẵn nhỏ nhất có 2 chữ số?'},{key:'q2',text:'Số lẻ lớn nhất có 2 chữ số?'},{key:'q3',text:'Tổng lớn nhất 2 số có 1 chữ số?'},{key:'q4',text:'Hiệu lớn nhất trong 100?'}],{q1:'10',q2:'99',q3:'18',q4:'99'}),
  multipleChoice(162,3,'Chọn tất cả số chẵn trong: 34, 57, 82, 91, 46',[{key:'A',text:'34'},{key:'B',text:'82'},{key:'C',text:'57'},{key:'D',text:'46'}],['A','B','D']),
  multipleChoice(162,3,'Phép tính nào SAI?',[{key:'A',text:'99+1=100'},{key:'B',text:'50+50=100'},{key:'C',text:'75+26=101'},{key:'D',text:'88+12=100'}],['C']),
  dragDrop(162,3,'Sắp xếp từ bé đến lớn: 46+37, 55+28, 39+44, 67+16',[{key:'a',text:'83'},{key:'b',text:'83'},{key:'c',text:'83'},{key:'d',text:'83'}],['a','b','c','d']),
];

// ── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  const conn = await mysql.createConnection(DB);

  const allLessons: { id: number; questions: Question[] }[] = [
    { id: 153, questions: lesson153 },
    { id: 154, questions: lesson154 },
    { id: 155, questions: lesson155 },
    { id: 156, questions: lesson156 },
    { id: 157, questions: lesson157 },
    { id: 158, questions: lesson158 },
    { id: 159, questions: lesson159 },
    { id: 160, questions: lesson160 },
    { id: 161, questions: lesson161 },
    { id: 162, questions: lesson162 },
  ];

  for (const { id, questions } of allLessons) {
    await conn.execute('DELETE FROM quizzes WHERE lessonId = ?', [id]);

    for (const q of questions) {
      await conn.execute(
        `INSERT INTO quizzes (lessonId, exerciseNumber, questionType, questionText, optionsJson, correctAnswerJson, explanation, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          q.lessonId,
          q.exerciseNumber,
          q.questionType,
          q.questionText,
          j(q.optionsJson),
          j(q.correctAnswerJson),
          q.explanation ?? null,
        ]
      );
    }

    const [rows]: any = await conn.execute('SELECT COUNT(*) as cnt FROM quizzes WHERE lessonId = ?', [id]);
    console.log(`✅ lessonId ${id}: ${rows[0].cnt} questions`);
  }

  await conn.end();
  console.log('Done!');
}

main().catch(err => { console.error(err); process.exit(1); });
