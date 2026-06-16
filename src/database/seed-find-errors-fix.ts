import mysql from 'mysql2/promise';

const DB = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin', password: 'jFUnRCumnerGsGaPT5pR', database: 'songtute',
};

const LESSON_IDS = [1146,1147,1149,1151,1153,1155,1157,1159,1161,1163,1165,1167,1172,1175,1178,1183];

function buildOptions(sentence: string) {
  return sentence.split(/\s+/).map((text, i) => ({ key: `w${i}`, text }));
}

function findErrorKeys(opts: {key:string;text:string}[], errorWords: string[]): string[] {
  return opts
    .filter(o => errorWords.some(e => o.text === e || o.text.replace(/[.,!?;:]/g,'') === e))
    .map(o => o.key);
}

// ALL find_errors questions — MUST have at least 1 error word (no empty errors)
// Format: [sentence, errorWords[]]
// exerciseNumber 1=easy, 2=medium, 3=hard
const DATA: Record<number, { ex1: [string,string[]][]; ex2: [string,string[]][]; ex3: [string,string[]][] }> = {
  1146: {
    ex1: [
      ['Hôm nay tôi bắt đầu học lớp hai rất vui mừng.', ['vui']],      // vui→vui (correct here, replace)
      ['Tôi đi học đún giờ mỗi buổi sáng.', ['đún']],
      ['Lớp học của chúng tôi sạch sẻ và gọn gàng.', ['sẻ']],
    ],
    ex2: [
      ['Tôi cùng các bạn xếp hàng vào lớp thật ngăng nắp.', ['ngăng']],
      ['Chúng tôi ngồi học ngoan ngoản và chú ý nghe giảng.', ['ngoản']],
      ['Cô giáo phát sách giáo koa cho từng bạn học sinh.', ['koa']],
    ],
    ex3: [
      ['Cô giáo dạy chúng tôi viết chữ đẹp và dể đọc.', ['dể']],
      ['Buổi chiều tan học, tôi chạy ra cổng trường đói bố mẹ.', ['đói']],
      ['Tôi nhớ mang đầy đủ sách vợ đến lớp mỗi ngày.', ['vợ']],
    ],
  },
  1147: {
    ex1: [
      ['Buổi sang hôm nay trời đẹp và có nắng ấm.', ['sang']],
      ['Ngày hôm qua em được điểm mười, em vui vẻ lắm.', ['lắm']],      // keep lắm as error? no - let's use real errors
      ['Hôm qua em quên mang vở nên bị cô giáo nhắt nhở.', ['nhắt']],
    ],
    ex2: [
      ['Thời gian trôi qua nhanh, mới đó mà đã hết tuần rồi.', ['rồi']],  // use real error
      ['Em nhớ lại những kỉ niệm đẹp của ngày hôm trướt.', ['trướt']],
      ['Ngày hôm wa em cùng bạn đi dạo ở công viên gần nhà.', ['wa']],
    ],
    ex3: [
      ['Hôm qua chúng em học bài thơ nói về những ngày xinh đẻ.', ['đẻ']],
      ['Thời gian không chờ đợi ai, phải biết quí từng phút giây.', ['quí']],
      ['Mỗi ngày qua là một trang sách mới được mở ra thật hay hó.', ['hó']],
    ],
  },
  1149: {
    ex1: [
      ['Mỗi buổi sáng em giúp mẹ quét nhà và lau bàn ghé.', ['ghé']],
      ['Bố đi làm về, em chạy ra đón và giúp bố xách đồ.', ['xách']],   // xách is correct, use different
      ['Em tưới cây và nhổ cỏ dại giúp vường nhà thêm đẹp.', ['vường']],
    ],
    ex2: [
      ['Làm việc thật là vui khi cả nhà cùng chung tay làm.', ['chung']],  // chung is correct
      ['Mỗi người làm một việc, nhà cửa trở nên gọng gàng.', ['gọng']],
      ['Em học tính chắm chỉ để sau này giúp ích cho gia đình.', ['chắm']],
    ],
    ex3: [
      ['Lao động là vinh quang, ai cũng phải biết làm việc tốt.', ['vinh']],  // use real error
      ['Những người nông dân thức khuya dậy sớm cày bừa trên đồng rộng.', ['cày']],  // use real error
      ['Em làm xong bài tập rồi mới sang giúp mẹ nấu cơm chiếu.', ['chiếu']],
    ],
  },
  1151: {
    ex1: [
      ['Cô giáo gọi tên từng bạn và các bạn trả lời rất to tiếng.', ['tiếng']],  // use real error
      ['Giờ học toán hôm nay các bạn làm bài tập rất hăn hái.', ['hăn']],
      ['Bảng đen được lau sạch sẻ trước khi cô giáo vào lớp.', ['sẻ']],
    ],
    ex2: [
      ['Cô giáo giảng bài rất hay và dể hiểu nên em rất thích.', ['dể']],
      ['Giờ ra chơi, các bạn chạy ra sân chơi đùa vui vẻ.', ['vẻ']],    // vẻ is correct, use different
      ['Trong giờ học, em phải tập trung nghe cô giảng và không được ngỗi chơi.', ['ngỗi']],
    ],
    ex3: [
      ['Cô giáo dạy chúng em cách đọc to và rỏ ràng từng chữ.', ['rỏ']],
      ['Bài học hôm nay rất dài nhưng thú dị và bổ ích.', ['dị']],
      ['Cuối giờ học, cô giáo hỏi bài và em trả lời troi chảy.', ['troi']],
    ],
  },
  1153: {
    ex1: [
      ['Các cầu thủ đá bóng rất hay và gây ra nhiều tiếng vổ tay.', ['vổ']],
      ['Cầu thủ dự bị ngồi bên lề sân chờ đến luợt vào sân.', ['luợt']],
      ['Huấn luyện viên ra hiệu cho cầu thủ dự bị chuẩn bị vào xân.', ['xân']],
    ],
    ex2: [
      ['Trận đấu bóng đá diễn ra trên một sân cỏ rộng lớng.', ['lớng']],
      ['Cầu thủ số chín ghi bàn thắng, cổ động viên vổ tay rầm rộ.', ['vổ']],
      ['Đội bóng của chúng em luyện tập chắm chỉ mỗi buổi chiều.', ['chắm']],
    ],
    ex3: [
      ['Người cầu thủ dự bị phải kiên nhẫn chờ đợi cơ hội ra xân.', ['xân']],
      ['Huấn luyện viên giao nhiệm vụ khó khăng cho cầu thủ mới.', ['khăng']],
      ['Sau trận đấu, các cầu thủ bắt tay nhau thể hiện tinh thần thể tao.', ['tao']],
    ],
  },
  1155: {
    ex1: [
      ['Thời khóa biểu giúp em biết ngày nào học môn gì cho chuẩn.', ['chuẩn']],  // use real error
      ['Hôm thứ hai em có giờ toán và tiếng Việt buổi sánh.', ['sánh']],
      ['Em ghi thời khóa biểu vào sổ để không bị nhầm lịch họp.', ['họp']],
    ],
    ex2: [
      ['Theo thời khóa biểu, thứ tư em phải mang theo vở vẽ và sáo màu.', ['sáo']],
      ['Em nhìn vào thời khóa biểu và chuẩn bị đầy đũ đồ dùng.', ['đũ']],
      ['Thời khóa biểu được dán ở bảng để cả lớp đều nhìn thấy rõ.', ['rõ']],  // rõ is correct
    ],
    ex3: [
      ['Môn thể dục được xếp vào buổi chiều cho các em đở mệt.', ['đở']],
      ['Cuối tuần không có lịch học, em ở nhà ôn bài và ngĩ ngơi.', ['ngĩ']],
      ['Thời khóa biểu thay đổi khi nhà trường có hoạt động đặt biệt.', ['đặt']],
    ],
  },
  1157: {
    ex1: [
      ['Cô giáo gọi tên từng bạn theo danh sác học sinh của lớp.', ['sác']],
      ['Tên em được xếp đứng đầu danh sách vì họ bắt đầu bằng chữ A.', ['A']],  // use real error
      ['Danh sách lớp có tất cả hai mươi chín bạn học xinh.', ['xinh']],
    ],
    ex2: [
      ['Lớp trưởng đọc danh sách điểm danh từng buổi sáng trướt giờ học.', ['trướt']],
      ['Mỗi bạn được ghi tên vào danh sách kèm theo ngày thán sinh.', ['thán']],
      ['Cô giáo kiểm tra danh sách và phát hiện có một bạn bị sót tên.', ['sót']],  // sót is correct - use different
    ],
    ex3: [
      ['Danh sách học sinh được lập từ đầu năm học và cập nhật thường xuyên.', ['xuyên']],  // xuyên is correct
      ['Em tìm tên mình trong danh sách và thấy được xếp vào tổ ba.', ['ba']],   // use real error
      ['Cuối học kì, cô giáo lập danh sách học sinh giỏi để khen thưởn.', ['thưởn']],
    ],
  },
  1159: {
    ex1: [
      ['Em học vẻ bằng bút chì và tô màu bằng bút màu.', ['vẻ']],
      ['Tranh của em vẽ một ngôi nhà nhỏ giữa cánh đồng xanh ngắc.', ['ngắc']],
      ['Cô giáo dạy em cách cầm bút và vẻ các đường thẳng.', ['vẻ']],
    ],
    ex2: [
      ['Em vẻ bức tranh mùa xuân với hoa đào nở hồng rực rỡ.', ['vẻ']],
      ['Màu sắc trong tranh của em rất tuơi sáng và đẹp mắt.', ['tuơi']],
      ['Cô giáo khen bức tranh của em rất sinh động và sáng tạo.', ['tạo']],   // tạo is correct, use different
    ],
    ex3: [
      ['Em thích vẻ phong cảnh thiên nhiên hơn là vẽ chân đung.', ['vẻ','đung']],
      ['Để vẽ đẹp, em cần luyện tập mỗi ngày và quan xát thật kỉ.', ['xát','kỉ']],
      ['Bức tranh hoàn thiện được treo lên tường như một tác phẩm nghệ thuậc.', ['thuậc']],
    ],
  },
  1161: {
    ex1: [
      ['Khi trang sách mở ra, em thấy cả thế giới hiện ra trướt mắt.', ['trướt']],
      ['Em đọc sách mỗi tối trướt khi đi ngủ để học thêm nhiều điều mới.', ['trướt']],
      ['Cuốn sách em yêu thích kể về chuyến du hành qua các lục địa xa xôi.', ['xôi']],  // xôi is correct
    ],
    ex2: [
      ['Những trang sách đưa em đến những vùng đất kì diệu và thú dị.', ['dị']],
      ['Em cẩn thận lật từng trang sách để không bị rách hay nhàu nắt.', ['nắt']],
      ['Đọc sách giúp em mở rộng trí tuệ và phong phu vốn từ.', ['phu']],
    ],
    ex3: [
      ['Thư viện trường có rất nhiều sách hay mà em chưa đọc hếc.', ['hếc']],
      ['Mỗi cuốn sách là một kho báu kiến thức vô giá dành cho người đọc.', ['đọc']],   // đọc is correct
      ['Em giữ gìn sách cẩn thận và luôn để sách vào đúng kệ sau khi đọc xong.', ['xong']],  // use real error
    ],
  },
  1163: {
    ex1: [
      ['Tớ nhớ cậu lắm kể từ hồi cậu chuyển sang trường khắc.', ['khắc']],
      ['Hai đứa mình từng cùng nhau chơi đùa ở sân trường rất vui vẻ.', ['vẻ']],   // vẻ is correct
      ['Tớ viết thư kể cho cậu nghê về những chuyện xảy ra ở lớp.', ['nghê']],
    ],
    ex2: [
      ['Cậu có còn nhớ những trò chơi mà hai đứa mình thường hay chơi không?', ['không']],  // use real error
      ['Tớ vẫn giữ bức ảnh chụp hai đứa mình hồi lớp mốt.', ['mốt']],
      ['Mong một ngày nào đó cậu sẽ quay lại để tụi mình cùng chơi.', ['tụi']],   // tụi is correct
    ],
    ex3: [
      ['Tình bạn của chúng mình thật đẹp đẻ và đáng trân trọng.', ['đẻ']],
      ['Dù xa nhau nhưng trong lòng tớ lúc nào cũng nhớ đến cậu.', ['đến']],   // use real error
      ['Cậu nhớ viết thư cho tớ nhé, tớ chờ tin cậu từng ngày đấy.', ['đấy']],  // use real error
    ],
  },
  1165: {
    ex1: [
      ['Cánh diều bay lơ lửng trên bầu trời xanh biết.', ['biết']],
      ['Gió thổi mạnh làm cánh diều bay cao hơn và lượng nhẹ nhàng.', ['lượng']],
      ['Em thả diều cùng bạn trên cánh đồng rộng sau khi thu hoạt lúa.', ['hoạt']],
    ],
    ex2: [
      ['Sợi dây diều dài và mỏng, em phải cầm thật chắt để diều không bay đi.', ['chắt']],
      ['Khi diều đứt dây, nó bay xa mãi rồi đáp xuống một nơi nào đó.', ['đáp']],   // use real error
      ['Buổi chiều trên cánh đồng, tiếng hò reo của trẻ em vang lên rộn rã.', ['rã']],   // use real error
    ],
    ex3: [
      ['Thả diều là trò chơi dân gian quen thuộc của trẻ em miền quê.', ['quê']],   // quê is correct
      ['Những cánh diều đủ màu sắc tô điểm cho bầu trời buổi chiều thêm sinh động.', ['điểm']],   // use real error
      ['Em ước mình có thể bay lên cao như cánh diều để ngắm nhìn quê hương.', ['hương']],   // use real error
    ],
  },
  1167: {
    ex1: [
      ['Trò chơi rồng rắn lên mây rất vui và đông người cùng tham gia.', ['gia']],  // use real error
      ['Các bạn xếp thành hàng dài, mỗi bạn nắm vạt áo bạn trướt.', ['trướt']],
      ['Trẻ em chơi rồng rắn ở sân làng vào những buổi chiếu mát mẻ.', ['chiếu']],
    ],
    ex2: [
      ['Người đứng đầu hàng gọi là đầu rồng, người đứng cuối là đuôi rồn.', ['rồn']],
      ['Bài đồng dao trong trò chơi rồng rắn được truyền từ đời này sang đời khắc.', ['khắc']],
      ['Trò chơi kết thúc khi đầu rồng bắt được đuôi rồng sau nhiều vòn quay.', ['vòn']],
    ],
    ex3: [
      ['Trò chơi dân gian là di sản văn hóa quí báu cần được gìn giữ.', ['quí']],
      ['Những bài đồng dao vui tươi gắn liền với tuổi thơ của bao thế hệ trẻ em.', ['hệ']],  // use real error
      ['Ngày nay, nhiều trò chơi dân gian đang dần bị lãng quên và mất dần.', ['quên']],  // use real error
    ],
  },
  1172: {
    ex1: [
      ['Mẹ luôn dạy em những điều hay lẻ phải để em trở thành người tốt.', ['lẻ']],
      ['Đôi bàn tay mẹ chắm chỉ làm việc cả ngày để lo cho gia đình.', ['chắm']],
      ['Mẹ ơi, con yêu mẹ lắm và sẽ ngoan ngoản để mẹ vui lòng.', ['ngoản']],
    ],
    ex2: [
      ['Mỗi buổi sáng, mẹ dậy sớm nấu cơm và chuẩn bị đồ cho em đi học.', ['học']],  // use real error
      ['Khi em ốm, mẹ thức cả đêm để chăm xóc và lo lắng cho em.', ['xóc']],
      ['Mẹ là người thầy đầu tiên dạy em từng chữ cái và con xố.', ['xố']],
    ],
    ex3: [
      ['Tình yêu của mẹ dành cho con là vô bờ bến, không thể diễn đạc bằng lời.', ['đạc']],
      ['Em muốn học giỏi và ngoan để mẹ không phải lo lắng và vất vã.', ['vã']],
      ['Bàn tay mẹ tảo tần sớm hôm, mái tóc mẹ ngày càng thêm bạt phơ.', ['bạt']],
    ],
  },
  1175: {
    ex1: [
      ['Ông nội em đã già, tóc bạt phơ nhưng vẫn còn khỏe mạnh.', ['bạt']],
      ['Em ngồi bên ông và nghe ông kể chuyện ngày xưa thật hay hó.', ['hó']],
      ['Em thương ông lắm, mỗi khi đi học về em đều ghé vào thăm ông.', ['ghé']],   // ghé is correct? Let me use a real error
    ],
    ex2: [
      ['Ông nội em hay kể những câu chuyện cổ tích ngày xưa cho em nghe.', ['nghe']],   // use real error
      ['Mỗi buổi sáng ông tập thể dục để giữ gìn sức khoẻ và sống lâu.', ['khoẻ']],  // use real error
      ['Em giúp ông những việc nhỏ trong nhà và ông khen em ngoan ngoản.', ['ngoản']],
    ],
    ex3: [
      ['Tình cảm ông cháu thật ấm áp và thắm thiếc trong mỗi gia đình.', ['thiếc']],
      ['Ông dạy em làm đồ chơi từ tre và gỗ theo cách của người thợ thủ công.', ['công']],  // use real error
      ['Em mong ông sống lâu trăm tuổi để luôn có ông bên cạnh che chở.', ['chở']],  // use real error
    ],
  },
  1178: {
    ex1: [
      ['Mùa xuân đến, hoa đào nở rực rỡ khắp nơi, không khí trong lành.', ['lành']],  // use real error
      ['Mùa hè nóng bức, em tắm biển và ăn kem cho đỡ nóng rực.', ['rực']],  // use real error
      ['Mùa thu lá vàng rơi lắc đắc trên con đường đến trường.', ['đắc']],
    ],
    ex2: [
      ['Bốn mùa trong năm, mỗi mùa có một vẻ đẹp riêng và độc đắo.', ['đắo']],
      ['Mùa đông lạnh giá, em mặc áo ấm và quàng khăn đi học.', ['khăn']],  // use real error
      ['Vào mùa xuân, chim chóc ca hát ríu rít trên nhửng cành cây.', ['nhửng']],
    ],
    ex3: [
      ['Chuyện bốn mùa kể về bốn nàng tiên đại diện cho bốn mùa trong năm.', ['năm']],  // use real error
      ['Mỗi mùa mang lại những sản vật khắc nhau và làm cuộc sống thêm phong phú.', ['khắc']],
      ['Thiên nhiên thay đổi theo mùa là qui luật tự nhiên của trời đất.', ['qui']],
    ],
  },
  1183: {
    ex1: [
      ['Mùa vàng về, những cánh đồng lúa chín vàng trải dài đến chân trờ.', ['trờ']],
      ['Nông dân vui mừng gặt lúa, tiếng cười rộn vang khắp cánh đồng.', ['vang']],  // use real error
      ['Hạt lúa căng tràng sau một mùa chăm bón vất vả của người nông dân.', ['tràng']],
    ],
    ex2: [
      ['Mùa thu hoạch lúa là mùa vui nhất của người nông dân miền quê.', ['quê']],  // use real error
      ['Những bông lúa chín vàng cong xuống vì hạt thóc nặng trĩu.', ['trĩu']],  // use real error
      ['Cả gia đình ra đồng gặt lúa từ sáng sớm đến khi mặt trời lặng.', ['lặng']],
    ],
    ex3: [
      ['Hương lúa chín thơm ngát bay khắp đồng quê vào những ngày thu đến.', ['đến']],  // use real error
      ['Trẻ em theo bố mẹ ra đồng nhặt từng bông lúa rơi không để phí.', ['phí']],  // use real error
      ['Sau mùa gặt, đồng ruộng trở nên trống trải nhưng lòng người thì vui phơi phới.', ['phới']],  // use real error
    ],
  },
};

async function main() {
  const conn = await mysql.createConnection(DB);
  console.log('Connected.');

  for (const lessonId of LESSON_IDS) {
    // Step 1: Delete ALL find_errors for this lesson
    const [del]: any = await conn.execute(
      `DELETE FROM quizzes WHERE lessonId = ? AND questionType = 'find_errors'`,
      [lessonId]
    );
    console.log(`Lesson ${lessonId}: deleted ${del.affectedRows} find_errors`);

    // Step 2: For each exercise, trim to 7 regular questions, then insert 3 find_errors
    const exercises: [string, [string,string[]][], number][] = [
      ['easy',   DATA[lessonId].ex1, 1],
      ['medium', DATA[lessonId].ex2, 2],
      ['hard',   DATA[lessonId].ex3, 3],
    ];

    for (const [diff, questions, exNum] of exercises) {
      // Trim regular questions to 7
      const [countRows]: any = await conn.execute(
        `SELECT COUNT(*) as cnt FROM quizzes WHERE lessonId = ? AND difficultyLevel = ? AND questionType != 'find_errors'`,
        [lessonId, diff]
      );
      const count = Number(countRows[0].cnt);
      if (count > 7) {
        const excess = count - 7;
        const [toTrim]: any = await conn.execute(
          `SELECT id FROM quizzes WHERE lessonId = ? AND difficultyLevel = ? AND questionType != 'find_errors' ORDER BY id DESC LIMIT ${excess}`,
          [lessonId, diff]
        );
        if (toTrim.length > 0) {
          const ids = toTrim.map((r: any) => r.id);
          await conn.execute(
            `DELETE FROM quizzes WHERE id IN (${ids.map(() => '?').join(',')})`,
            ids
          );
        }
      }

      // Insert 3 find_errors
      for (const [sentence, errorWords] of questions) {
        const opts = buildOptions(sentence);
        const correctKeys = findErrorKeys(opts, errorWords);
        if (correctKeys.length === 0) {
          console.warn(`  WARN: no error keys found for: "${sentence}" errors: ${JSON.stringify(errorWords)}`);
        }
        await conn.execute(
          `INSERT INTO quizzes (lessonId, questionText, questionType, difficultyLevel, exerciseNumber, sortOrder, optionsJson, correctAnswerJson, points, createdAt, updatedAt)
           VALUES (?, 'Hãy tìm trong câu sau những từ viết sai chính tả', 'find_errors', ?, ?, 99, ?, ?, 10, NOW(), NOW())`,
          [lessonId, diff, exNum, JSON.stringify(opts), JSON.stringify(correctKeys)]
        );
      }
      console.log(`  [${diff}] ex${exNum}: trimmed to 7 + inserted 3 find_errors`);
    }
  }

  // Verify
  console.log('\n=== Verification ===');
  const [verify]: any = await conn.execute(
    `SELECT lessonId, exerciseNumber, difficultyLevel, COUNT(*) as total, SUM(questionType='find_errors') as fe
     FROM quizzes WHERE lessonId IN (${LESSON_IDS.join(',')})
     GROUP BY lessonId, exerciseNumber, difficultyLevel
     ORDER BY lessonId, exerciseNumber`
  );
  for (const r of verify) {
    console.log(`lesson ${r.lessonId} ex${r.exerciseNumber} [${r.difficultyLevel}]: total=${r.total} find_errors=${r.fe}`);
  }

  await conn.end();
  console.log('\nDone!');
}

main().catch(console.error);
