/**
 * Kho ngữ liệu cho bộ sinh câu hỏi Tiếng Việt / Tiếng Anh.
 *
 * Toán sinh được bằng công thức, ngôn ngữ thì không — phải có vốn từ và ngữ liệu
 * thật. Tách riêng file này để bổ sung nội dung mà không đụng vào logic sinh câu:
 * muốn thêm câu cho một kỹ năng, thêm dữ liệu ở đây là đủ.
 */

// ── Chữ cái & vần (Tiếng Việt lớp 1) ────────────────────────────────────
const CHU_CAI = 'a ă â b c d đ e ê g h i k l m n o ô ơ p q r s t u ư v x y'.split(' ');
const CHU_GHEP = ['ch', 'gh', 'gi', 'kh', 'ng', 'ngh', 'nh', 'ph', 'qu', 'th', 'tr'];

// Nhóm tiếng cùng vần — cho câu "tiếng nào cùng vần với...".
const VAN_NHOM = [
  { van: 'an', tieng: ['bàn', 'càn', 'nhàn', 'tan', 'lan'] },
  { van: 'ăn', tieng: ['băn', 'chăn', 'khăn', 'lăn', 'trăn'] },
  { van: 'ân', tieng: ['cân', 'sân', 'gần', 'nhân', 'tân'] },
  { van: 'on', tieng: ['con', 'bòn', 'nón', 'lon', 'tròn'] },
  { van: 'ôn', tieng: ['cồn', 'bốn', 'nôn', 'tôn', 'chồn'] },
  { van: 'ơn', tieng: ['cơn', 'sơn', 'lớn', 'hơn', 'trơn'] },
  { van: 'am', tieng: ['cam', 'làm', 'tám', 'nam', 'trám'] },
  { van: 'em', tieng: ['kem', 'đem', 'nem', 'thềm', 'xem'] },
  { van: 'ong', tieng: ['bong', 'cong', 'nong', 'vòng', 'trong'] },
  { van: 'ông', tieng: ['sông', 'bông', 'đông', 'trông', 'nông'] },
  { van: 'ung', tieng: ['bung', 'thùng', 'chung', 'rung', 'súng'] },
  { van: 'ang', tieng: ['bàng', 'sáng', 'vàng', 'trang', 'làng'] },
  { van: 'anh', tieng: ['anh', 'bánh', 'cành', 'nhanh', 'xanh'] },
  { van: 'inh', tieng: ['bình', 'kính', 'xinh', 'tính', 'mình'] },
  { van: 'ai', tieng: ['bài', 'cai', 'mai', 'tai', 'vai'] },
  { van: 'ay', tieng: ['bay', 'cày', 'may', 'tay', 'chạy'] },
  { van: 'oi', tieng: ['coi', 'nói', 'tôi', 'vòi', 'gói'] },
  { van: 'ui', tieng: ['bùi', 'cui', 'núi', 'vui', 'chui'] },
];

// ── Chính tả: cặp dễ nhầm — [viết ĐÚNG, viết SAI, luật] ─────────────────
const CHINH_TA = [
  ['nghe', 'nge', 'Trước e, ê, i thì viết "ngh"'],
  ['nghỉ', 'ngỉ', 'Trước e, ê, i thì viết "ngh"'],
  ['nghiêng', 'ngiêng', 'Trước e, ê, i thì viết "ngh"'],
  ['ngành', 'nghành', 'Trước a, o, u thì viết "ng"'],
  ['ngoan', 'nghoan', 'Trước a, o, u thì viết "ng"'],
  ['ghế', 'gế', 'Trước e, ê, i thì viết "gh"'],
  ['ghi chép', 'gi chép', 'Trước e, ê, i thì viết "gh"'],
  ['gánh', 'ghánh', 'Trước a, o, u thì viết "g"'],
  ['kẻ', 'cẻ', 'Trước e, ê, i thì viết "k"'],
  ['kim', 'cim', 'Trước e, ê, i thì viết "k"'],
  ['cá', 'ká', 'Trước a, o, u thì viết "c"'],
  ['con', 'kon', 'Trước a, o, u thì viết "c"'],
  ['sạch sẽ', 'xạch xẽ', 'Từ này viết với "s"'],
  ['xinh xắn', 'sinh sắn', 'Từ này viết với "x"'],
  ['trắng', 'chắng', 'Từ này viết với "tr"'],
  ['chăm chỉ', 'trăm chỉ', 'Từ này viết với "ch"'],
  ['dỗ dành', 'giỗ dành', 'Vỗ về thì viết "dỗ dành"'],
  ['giúp đỡ', 'dúp đỡ', 'Từ này viết với "gi"'],
  ['lo lắng', 'no lắng', 'Từ này viết với "l"'],
  ['nóng nực', 'lóng nực', 'Từ này viết với "n"'],
  ['nghiêm túc', 'ngiêm túc', 'Trước e, ê, i thì viết "ngh"'],
  ['ghép hình', 'gép hình', 'Trước e, ê, i thì viết "gh"'],
  ['kể chuyện', 'cể chuyện', 'Trước e, ê, i thì viết "k"'],
  ['củ khoai', 'kủ khoai', 'Trước a, o, u thì viết "c"'],
  ['suy nghĩ', 'xuy nghĩ', 'Từ này viết với "s"'],
  ['xe đạp', 'se đạp', 'Từ này viết với "x"'],
  ['trong veo', 'chong veo', 'Từ này viết với "tr"'],
  ['chải tóc', 'trải tóc', 'Chải đầu thì viết với "ch"'],
  ['dạy học', 'giạy học', 'Từ này viết với "d"'],
  ['giữ gìn', 'dữ gìn', 'Từ này viết với "gi"'],
  ['lành lặn', 'nành nặn', 'Từ này viết với "l"'],
  ['nước non', 'lước lon', 'Từ này viết với "n"'],
  ['rực rỡ', 'dực dỡ', 'Từ này viết với "r"'],
  ['bàn ghế', 'bàn gế', 'Trước e, ê, i thì viết "gh"'],
  ['nóng nực', 'lóng nực', 'Từ này viết với "n"'],
];

// ── Từ vựng ─────────────────────────────────────────────────────────────
const TRAI_NGHIA = [
  ['cao', 'thấp'], ['dài', 'ngắn'], ['to', 'nhỏ'], ['nhanh', 'chậm'],
  ['sáng', 'tối'], ['nóng', 'lạnh'], ['vui', 'buồn'], ['sạch', 'bẩn'],
  ['mới', 'cũ'], ['già', 'trẻ'], ['nặng', 'nhẹ'], ['rộng', 'hẹp'],
  ['no', 'đói'], ['khô', 'ướt'], ['chăm chỉ', 'lười biếng'],
  ['hiền', 'dữ'], ['gần', 'xa'], ['trước', 'sau'], ['trên', 'dưới'],
  ['dày', 'mỏng'], ['cứng', 'mềm'], ['ngọt', 'đắng'], ['thẳng', 'cong'],
  ['ồn ào', 'yên tĩnh'], ['rộng rãi', 'chật chội'], ['đông', 'vắng'], ['đúng', 'sai'],
  ['hiền', 'dữ'], ['gần', 'xa'], ['trước', 'sau'], ['trên', 'dưới'],
];

const CUNG_NGHIA = [
  ['chăm chỉ', 'siêng năng'], ['to lớn', 'khổng lồ'], ['xinh đẹp', 'xinh xắn'],
  ['vui vẻ', 'vui tươi'], ['nhanh nhẹn', 'lanh lợi'], ['hiền lành', 'hiền hậu'],
  ['thông minh', 'sáng dạ'], ['dũng cảm', 'gan dạ'], ['học sinh', 'học trò'],
  ['ba', 'bố'], ['má', 'mẹ'], ['quả', 'trái'], ['heo', 'lợn'], ['cọp', 'hổ'],
  ['bát', 'chén'], ['thuyền', 'ghe'], ['dứa', 'thơm'], ['mập', 'béo'],
  ['siêng', 'chăm'], ['buồn bã', 'rầu rĩ'], ['nhanh chóng', 'mau lẹ'], ['rực rỡ', 'lộng lẫy'],
  ['ba', 'bố'], ['má', 'mẹ'], ['quả', 'trái'], ['heo', 'lợn'], ['cọp', 'hổ'],
];

// Từ theo LOẠI — cho câu "từ nào chỉ sự vật / hoạt động / đặc điểm".
const LOAI_TU = {
  'sự vật': ['bàn', 'ghế', 'cây', 'nhà', 'sách', 'bút', 'hoa', 'chim', 'sông', 'núi'],
  'hoạt động': ['chạy', 'nhảy', 'đọc', 'viết', 'hát', 'quét', 'nấu', 'bơi', 'vẽ', 'cười'],
  'đặc điểm': ['xanh', 'đỏ', 'cao', 'thấp', 'tròn', 'ngoan', 'sạch', 'thơm', 'ngọt', 'chăm chỉ'],
};

// ── Luyện từ và câu — [câu, bộ phận "Ai", bộ phận "Làm gì"] ─────────────
const CAU_AI_LAM_GI = [
  ['Bé quét nhà giúp mẹ.', 'Bé', 'quét nhà giúp mẹ'],
  ['Đàn chim bay về tổ.', 'Đàn chim', 'bay về tổ'],
  ['Mẹ nấu cơm trong bếp.', 'Mẹ', 'nấu cơm trong bếp'],
  ['Các bạn chơi đá cầu.', 'Các bạn', 'chơi đá cầu'],
  ['Chú mèo nằm ngủ trên ghế.', 'Chú mèo', 'nằm ngủ trên ghế'],
  ['Ông tưới cây ngoài vườn.', 'Ông', 'tưới cây ngoài vườn'],
  ['Em gái tô màu bức tranh.', 'Em gái', 'tô màu bức tranh'],
  ['Bác nông dân gặt lúa.', 'Bác nông dân', 'gặt lúa'],
  ['Cô giáo giảng bài cho chúng em.', 'Cô giáo', 'giảng bài cho chúng em'],
  ['Bố sửa chiếc xe đạp.', 'Bố', 'sửa chiếc xe đạp'],
  ['Chú chó canh nhà rất giỏi.', 'Chú chó', 'canh nhà rất giỏi'],
  ['Đàn cá bơi tung tăng dưới ao.', 'Đàn cá', 'bơi tung tăng dưới ao'],
  ['Bà ngồi têm trầu ngoài hiên.', 'Bà', 'ngồi têm trầu ngoài hiên'],
  ['Anh trai em đá bóng ngoài sân.', 'Anh trai em', 'đá bóng ngoài sân'],
  ['Những bông hoa toả hương thơm ngát.', 'Những bông hoa', 'toả hương thơm ngát'],
  ['Bác nông dân gặt lúa.', 'Bác nông dân', 'gặt lúa'],
];

const KIEU_CAU = [
  ['Hôm nay trời rất đẹp.', 'câu kể'],
  ['Bạn đã làm bài xong chưa?', 'câu hỏi'],
  ['Hãy giữ trật tự nhé!', 'câu khiến'],
  ['Ôi, bông hoa đẹp quá!', 'câu cảm'],
  ['Em đi học lúc bảy giờ.', 'câu kể'],
  ['Mẹ đang nấu gì thế?', 'câu hỏi'],
  ['Con nhớ rửa tay trước khi ăn.', 'câu khiến'],
  ['Chao ôi, cảnh đẹp làm sao!', 'câu cảm'],
  ['Vườn nhà em có nhiều cây ăn quả.', 'câu kể'],
  ['Ai là người trực nhật hôm nay?', 'câu hỏi'],
  ['Đừng vứt rác ra sân!', 'câu khiến'],
  ['Ôi, trời hôm nay nóng quá!', 'câu cảm'],
  ['Bố em làm nghề thợ mộc.', 'câu kể'],
  ['Con đã ăn cơm chưa?', 'câu hỏi'],
  ['Các em hãy giữ gìn sách vở.', 'câu khiến'],
  ['Chao ôi, cảnh đẹp làm sao!', 'câu cảm'],
];

// ── Đọc hiểu: đoạn ngắn + câu hỏi ───────────────────────────────────────
const DOAN_DOC = [
  {
    text: 'Sáng sớm, Lan dậy sớm giúp mẹ quét sân. Sân nhà sạch bong. Mẹ khen Lan ngoan.',
    hoi: [
      ['Lan dậy sớm để làm gì?', 'Giúp mẹ quét sân', ['Đi học', 'Xem ti vi', 'Tưới cây']],
      ['Ai khen Lan ngoan?', 'Mẹ', ['Bố', 'Cô giáo', 'Bạn Lan']],
      ['Sân nhà sau khi quét thế nào?', 'Sạch bong', ['Bẩn', 'Ướt', 'Đầy lá']],
    ],
  },
  {
    text: 'Chú chim sâu bay quanh vườn. Chú bắt sâu cho cây. Nhờ có chú, cây trong vườn xanh tốt.',
    hoi: [
      ['Chú chim sâu làm gì trong vườn?', 'Bắt sâu cho cây', ['Hót líu lo', 'Làm tổ', 'Ăn quả']],
      ['Nhờ chú chim, cây trong vườn thế nào?', 'Xanh tốt', ['Héo úa', 'Rụng lá', 'Khô cằn']],
      ['Bài đọc khuyên ta điều gì?', 'Yêu quý loài chim có ích', ['Bắt chim về nuôi', 'Chặt cây đi', 'Ngại làm việc']],
    ],
  },
  {
    text: 'Trời mưa to. Nam mang áo mưa cho bạn Hoa vì Hoa quên mang. Hai bạn cùng về nhà.',
    hoi: [
      ['Vì sao Nam mang áo mưa cho Hoa?', 'Vì Hoa quên mang', ['Vì Hoa bị ốm', 'Vì Hoa nhờ', 'Vì Nam thừa áo']],
      ['Việc làm của Nam thể hiện điều gì?', 'Biết quan tâm giúp bạn', ['Thích khoe', 'Sợ mưa', 'Muốn được khen']],
      ['Hai bạn làm gì sau đó?', 'Cùng về nhà', ['Ở lại trường', 'Đi chơi', 'Gọi bố mẹ']],
    ],
  },
  {
    text: 'Mùa thu, lá bàng chuyển sang màu đỏ. Gió nhẹ thổi, lá rơi đầy sân trường. Chúng em nhặt lá xếp thành hình con bướm.',
    hoi: [
      ['Mùa thu, lá bàng có màu gì?', 'Màu đỏ', ['Màu xanh', 'Màu vàng', 'Màu tím']],
      ['Các bạn xếp lá thành hình gì?', 'Hình con bướm', ['Hình ngôi sao', 'Hình bông hoa', 'Hình con cá']],
      ['Lá rơi ở đâu?', 'Đầy sân trường', ['Trên mái nhà', 'Dưới sông', 'Trong lớp']],
    ],
  },
  {
    text: 'Bà kể chuyện cho bé nghe mỗi tối. Giọng bà ấm áp. Bé nghe rồi ngủ ngon lành.',
    hoi: [
      ['Bà làm gì cho bé mỗi tối?', 'Kể chuyện', ['Hát ru', 'Đọc báo', 'Nấu ăn']],
      ['Giọng bà thế nào?', 'Ấm áp', ['To vang', 'Khàn khàn', 'Nhỏ xíu']],
      ['Nghe bà kể chuyện xong, bé thế nào?', 'Ngủ ngon lành', ['Khóc', 'Chạy chơi', 'Đòi ăn']],
    ],
  },
  {
    text: 'Hè về, tiếng ve kêu râm ran. Chùm phượng đỏ rực góc sân. Chúng em chia tay nhau, hẹn ngày tựu trường.',
    hoi: [
      ['Tiếng gì kêu râm ran khi hè về?', 'Tiếng ve', ['Tiếng chim', 'Tiếng gió', 'Tiếng trống']],
      ['Hoa phượng có màu gì?', 'Màu đỏ rực', ['Màu vàng', 'Màu trắng', 'Màu tím']],
      ['Các bạn hẹn nhau điều gì?', 'Hẹn ngày tựu trường', ['Hẹn đi chơi', 'Hẹn về quê', 'Hẹn đi bơi']],
    ],
  },
  {
    text: 'Con kiến nhỏ tha mồi về tổ. Đường xa nhưng kiến không bỏ cuộc. Cả đàn cùng nhau tích trữ thức ăn cho mùa đông.',
    hoi: [
      ['Con kiến tha mồi về đâu?', 'Về tổ', ['Ra sông', 'Lên cây', 'Vào hang']],
      ['Đàn kiến tích trữ thức ăn cho mùa nào?', 'Mùa đông', ['Mùa hè', 'Mùa xuân', 'Mùa thu']],
      ['Bài đọc khen kiến ở điểm nào?', 'Chăm chỉ, không bỏ cuộc', ['Chạy nhanh', 'Kêu to', 'Ăn khoẻ']],
    ],
  },
  {
    text: 'Sáng chủ nhật, bố dẫn Bi ra công viên. Bi tập đi xe đạp. Ngã mấy lần nhưng Bi vẫn đứng dậy đạp tiếp.',
    hoi: [
      ['Bố dẫn Bi đi đâu?', 'Ra công viên', ['Đến trường', 'Về quê', 'Đi chợ']],
      ['Bi tập làm gì?', 'Tập đi xe đạp', ['Tập bơi', 'Tập hát', 'Tập vẽ']],
      ['Bi có bỏ cuộc khi bị ngã không?', 'Không, Bi đứng dậy đạp tiếp', ['Có, Bi khóc', 'Có, Bi về nhà', 'Bi ngồi nghỉ mãi']],
    ],
  },
  {
    text: 'Vườn nhà ngoại có cây ổi sai quả. Mỗi lần về, ngoại lại hái ổi cho em. Quả ổi giòn và thơm.',
    hoi: [
      ['Vườn nhà ngoại có cây gì?', 'Cây ổi', ['Cây xoài', 'Cây cam', 'Cây chuối']],
      ['Ai hái ổi cho em?', 'Ngoại', ['Mẹ', 'Bố', 'Anh']],
      ['Quả ổi thế nào?', 'Giòn và thơm', ['Chua và cứng', 'Đắng', 'Nhạt']],
    ],
  },
  {
    text: 'Lớp em trồng một luống rau nhỏ ở góc sân. Mỗi sáng, các bạn thay nhau tưới nước. Chẳng bao lâu, rau lên xanh mướt.',
    hoi: [
      ['Lớp em trồng gì ở góc sân?', 'Một luống rau', ['Một cây bàng', 'Một khóm hoa', 'Một bụi tre']],
      ['Các bạn làm gì mỗi sáng?', 'Thay nhau tưới nước', ['Nhổ cỏ', 'Bắt sâu', 'Hái rau']],
      ['Kết quả ra sao?', 'Rau lên xanh mướt', ['Rau héo', 'Rau bị sâu', 'Rau chết']],
    ],
  },
  {
    text: 'Chú gà trống gáy vang mỗi sớm. Tiếng gáy đánh thức cả xóm dậy. Nhờ chú, mọi người không ai đi làm muộn.',
    hoi: [
      ['Chú gà trống làm gì mỗi sớm?', 'Gáy vang', ['Đi kiếm mồi', 'Ngủ', 'Đá nhau']],
      ['Tiếng gáy có tác dụng gì?', 'Đánh thức cả xóm dậy', ['Doạ mèo', 'Gọi mưa', 'Ru ngủ']],
      ['Nhờ chú gà, mọi người thế nào?', 'Không ai đi làm muộn', ['Ngủ quên', 'Bị mệt', 'Không ra đồng']],
    ],
  },
  {
    text: 'Biển buổi sáng thật đẹp. Sóng vỗ nhè nhẹ vào bờ cát. Những chiếc thuyền nhỏ nhấp nhô ngoài khơi xa.',
    hoi: [
      ['Sóng vỗ vào đâu?', 'Vào bờ cát', ['Vào vách đá', 'Vào thuyền', 'Vào rừng']],
      ['Ngoài khơi xa có gì?', 'Những chiếc thuyền nhỏ', ['Đàn cá', 'Ngọn núi', 'Cánh rừng']],
      ['Đoạn văn tả biển vào lúc nào?', 'Buổi sáng', ['Buổi trưa', 'Buổi chiều', 'Ban đêm']],
    ],
  },
];

// ── Kể chuyện: thứ tự sự việc ───────────────────────────────────────────
const TRUYEN_THU_TU = [
  { ten: 'Rùa và Thỏ', buoc: ['Thỏ chê Rùa chậm', 'Hai bạn thi chạy', 'Thỏ ngủ quên bên đường', 'Rùa về đích trước'] },
  { ten: 'Cây khế', buoc: ['Chim ăn khế của người em', 'Chim chở người em ra đảo', 'Người em lấy vừa đủ vàng', 'Người anh tham lam bị rơi xuống biển'] },
  { ten: 'Sự tích quả dưa hấu', buoc: ['Mai An Tiêm bị đày ra đảo', 'Chàng nhặt được hạt lạ', 'Trồng thành ruộng dưa', 'Vua cho đón về'] },
  { ten: 'Ba lưỡi rìu', buoc: ['Chàng tiều phu làm rơi rìu', 'Cụ già vớt lên rìu vàng', 'Chàng chỉ nhận rìu sắt của mình', 'Cụ tặng cả ba lưỡi rìu'] },
  { ten: 'Cây tre trăm đốt', buoc: ['Phú ông hứa gả con gái', 'Anh nông dân vào rừng tìm tre', 'Bụt dạy câu thần chú', 'Phú ông phải giữ lời hứa'] },
  { ten: 'Thánh Gióng', buoc: ['Bà mẹ ướm chân vào vết chân lạ', 'Gióng lên ba vẫn chưa biết nói', 'Gióng vươn vai thành tráng sĩ', 'Gióng đánh tan giặc rồi bay về trời'] },
  { ten: 'Sơn Tinh Thuỷ Tinh', buoc: ['Vua Hùng kén rể', 'Sơn Tinh mang lễ vật đến trước', 'Thuỷ Tinh nổi giận dâng nước', 'Sơn Tinh dâng núi thắng cuộc'] },
  { ten: 'Con Rồng cháu Tiên', buoc: ['Lạc Long Quân gặp Âu Cơ', 'Âu Cơ sinh bọc trăm trứng', 'Năm mươi con theo cha xuống biển', 'Năm mươi con theo mẹ lên núi'] },
  { ten: 'Tấm Cám', buoc: ['Tấm bị Cám lừa trút hết giỏ tép', 'Bụt cho Tấm cá bống', 'Tấm đi hội đánh rơi hài', 'Tấm trở thành hoàng hậu'] },
  { ten: 'Sự tích Hồ Gươm', buoc: ['Lê Lợi nhận được gươm thần', 'Nghĩa quân đánh thắng giặc Minh', 'Rùa Vàng hiện lên đòi gươm', 'Hồ được đặt tên là Hồ Gươm'] },
  { ten: 'Bánh chưng bánh giầy', buoc: ['Vua Hùng ra điều kiện chọn người nối ngôi', 'Lang Liêu được thần báo mộng', 'Chàng làm bánh chưng, bánh giầy', 'Vua truyền ngôi cho Lang Liêu'] },
  { ten: 'Ếch ngồi đáy giếng', buoc: ['Ếch sống lâu ngày dưới giếng', 'Ếch tưởng mình to nhất', 'Mưa lớn đưa ếch ra ngoài', 'Ếch bị trâu giẫm bẹp'] },
  { ten: 'Thầy bói xem voi', buoc: ['Năm thầy bói rủ nhau xem voi', 'Mỗi thầy sờ một bộ phận', 'Các thầy cãi nhau kịch liệt', 'Không ai nói đúng về con voi'] },
  { ten: 'Cô bé quàng khăn đỏ', buoc: ['Mẹ dặn bé mang bánh cho bà', 'Bé mải chơi, gặp chó sói', 'Sói lừa vào nhà bà', 'Bác thợ săn cứu hai bà cháu'] },
  { ten: 'Sự tích cây vú sữa', buoc: ['Cậu bé ham chơi bỏ nhà đi', 'Mẹ mòn mỏi chờ con', 'Mẹ hoá thành cây', 'Cậu bé trở về ôm lấy cây'] },
  { ten: 'Chú bé chăn cừu', buoc: ['Cậu bé nói dối có sói', 'Dân làng chạy đến, không có sói', 'Sói đến thật, cậu kêu cứu', 'Không ai tin, đàn cừu bị ăn thịt'] },
  { ten: 'Kiến và Ve sầu', buoc: ['Mùa hè, Ve mải hát', 'Kiến chăm chỉ tích trữ thức ăn', 'Mùa đông đến, Ve đói rét', 'Ve hiểu ra giá trị của lao động'] },
  { ten: 'Quạ và đàn bồ câu', buoc: ['Quạ thấy bồ câu được cho ăn no', 'Quạ bôi trắng mình giả làm bồ câu', 'Quạ vô ý kêu lên nên bị phát hiện', 'Về nhà lại bị đàn quạ đuổi đi'] },
];

// ── Tập làm văn ─────────────────────────────────────────────────────────
const TAP_LAM_VAN = [
  ['Câu nào là câu MỞ ĐẦU phù hợp cho bài tả con mèo?', 'Nhà em nuôi một chú mèo tam thể rất đáng yêu.',
    ['Con mèo có bốn chân.', 'Em rất thích ăn cá.', 'Hôm qua trời mưa to.'],
    'Câu mở đầu cần GIỚI THIỆU con vật sẽ tả, chưa đi vào chi tiết.'],
  ['Câu nào tả HÌNH DÁNG của cây bàng?', 'Thân cây bàng to, vỏ xù xì màu nâu sẫm.',
    ['Em thường ngồi dưới gốc bàng.', 'Cây bàng được trồng năm ngoái.', 'Em rất yêu cây bàng.'],
    'Tả hình dáng là nói về thân, lá, cành — những gì NHÌN thấy được.'],
  ['Câu nào bộc lộ TÌNH CẢM của em với ngôi trường?', 'Em yêu ngôi trường này biết bao!',
    ['Trường em có ba dãy nhà.', 'Sân trường rộng và sạch.', 'Trường em xây năm 2010.'],
    'Câu bộc lộ tình cảm thường có từ chỉ cảm xúc như "yêu", "nhớ", "biết bao".'],
  ['Bài văn tả người thường đi theo thứ tự nào?', 'Mở bài → Tả hình dáng → Tả tính tình → Kết bài',
    ['Kết bài → Mở bài → Tả hình dáng', 'Tả tính tình → Mở bài → Kết bài', 'Mở bài → Kết bài → Tả hình dáng'],
    'Bài văn tả người đi từ giới thiệu, tả bề ngoài, đến tính nết, rồi nêu tình cảm.'],
  ['Câu nào là câu KẾT BÀI phù hợp cho bài tả mẹ?', 'Em mong mẹ luôn khoẻ mạnh và vui vẻ.',
    ['Mẹ em năm nay ba mươi tuổi.', 'Mẹ có mái tóc dài.', 'Mẹ đi làm từ sáng sớm.'],
    'Kết bài nêu mong ước hoặc tình cảm của em, khép lại bài viết.'],
  ['Khi tả cảnh, nên tả theo trình tự nào cho dễ hình dung?', 'Từ xa đến gần, từ bao quát đến chi tiết',
    ['Nghĩ đến đâu tả đến đó', 'Tả chi tiết trước, bao quát sau', 'Chỉ tả màu sắc'],
    'Tả từ bao quát đến chi tiết giúp người đọc hình dung được toàn cảnh trước.'],
];

// ── Tiếng Anh lớp 1 ─────────────────────────────────────────────────────
const EN_VOCAB = [
  ['apple', 'quả táo'], ['banana', 'quả chuối'], ['orange', 'quả cam'], ['egg', 'quả trứng'],
  ['milk', 'sữa'], ['bread', 'bánh mì'], ['rice', 'cơm'], ['fish', 'con cá'],
  ['cat', 'con mèo'], ['dog', 'con chó'], ['bird', 'con chim'], ['duck', 'con vịt'],
  ['book', 'quyển sách'], ['pen', 'cái bút'], ['bag', 'cái cặp'], ['desk', 'cái bàn'],
  ['chair', 'cái ghế'], ['door', 'cái cửa'], ['school', 'trường học'], ['teacher', 'giáo viên'],
  ['red', 'màu đỏ'], ['blue', 'màu xanh da trời'], ['green', 'màu xanh lá'], ['yellow', 'màu vàng'],
  ['father', 'bố'], ['mother', 'mẹ'], ['brother', 'anh trai'], ['sister', 'chị gái'],
  ['hand', 'bàn tay'], ['foot', 'bàn chân'], ['nose', 'cái mũi'], ['eye', 'con mắt'],
  ['mouth', 'cái miệng'], ['ear', 'cái tai'], ['hair', 'mái tóc'], ['leg', 'cái chân'],
  ['ball', 'quả bóng'], ['doll', 'búp bê'], ['car', 'ô tô'], ['kite', 'con diều'],
  ['house', 'ngôi nhà'], ['tree', 'cái cây'], ['flower', 'bông hoa'], ['sun', 'mặt trời'],
  ['water', 'nước'], ['cake', 'bánh ngọt'], ['candy', 'kẹo'], ['juice', 'nước ép'],
  ['pink', 'màu hồng'], ['black', 'màu đen'], ['white', 'màu trắng'], ['brown', 'màu nâu'],
  ['hand', 'bàn tay'], ['foot', 'bàn chân'], ['nose', 'cái mũi'], ['eye', 'con mắt'],
  ['pig', 'con lợn'], ['cow', 'con bò'], ['hen', 'con gà mái'], ['frog', 'con ếch'],
  ['ruler', 'cái thước'], ['pencil', 'bút chì'], ['rubber', 'cục tẩy'], ['board', 'cái bảng'],
  ['window', 'cửa sổ'], ['table', 'cái bàn ăn'], ['bed', 'cái giường'], ['lamp', 'cái đèn'],
  ['soup', 'món canh'], ['noodle', 'mì'], ['meat', 'thịt'], ['sweet', 'kẹo ngọt'],
  ['grandfather', 'ông'], ['grandmother', 'bà'], ['friend', 'người bạn'], ['baby', 'em bé'],
];

const EN_NUMBERS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

// [tình huống, câu đáp đúng, các câu đáp sai, LÝ DO nên đáp như vậy]
const EN_GIAO_TIEP = [
  ['Khi gặp bạn buổi sáng, em nói:', 'Good morning!', ['Good night!', 'Goodbye!', 'Thank you!'], "Buổi sáng (trước 12 giờ trưa) thì chào \"Good morning\"."],
  ['Bạn nói "Hello", em đáp lại:', 'Hello!', ['Sorry!', 'No!', 'Please!'], "Được chào \"Hello\" thì đáp lại cũng bằng \"Hello\"."],
  ['Khi được ai đó giúp, em nói:', 'Thank you!', ['Hello!', 'Goodbye!', 'Good night!'], "\"Thank you\" dùng để cảm ơn khi được ai đó giúp."],
  ['Trước khi đi ngủ, em chào:', 'Good night!', ['Good morning!', 'Hello!', 'Thank you!'], "\"Good night\" là lời chào lúc đi ngủ, không dùng khi gặp mặt."],
  ['Khi chia tay bạn, em nói:', 'Goodbye!', ['Good morning!', 'Sorry!', 'Yes!'], "\"Goodbye\" dùng lúc chia tay, khác với \"Hello\" là lúc gặp."],
  ['Bạn hỏi "How are you?", em đáp:', "I'm fine, thank you.", ['My name is Nam.', 'I am seven.', 'This is my book.'], "\"How are you?\" hỏi về sức khoẻ, nên đáp bằng \"I am fine\"."],
  ['Bạn hỏi "What is your name?", em đáp:', 'My name is Nam.', ["I'm fine.", 'I am seven.', 'Goodbye!'], "Câu hỏi về TÊN thì đáp bằng \"My name is...\"."],
  ['Khi làm phiền ai đó, em nói:', 'Sorry!', ['Thank you!', 'Hello!', 'Yes!'], "\"Sorry\" dùng để xin lỗi khi làm phiền ai đó."],
  ['Bạn giới thiệu "This is Mai.", em đáp:', 'Nice to meet you!', ['Good night!', 'Sorry!', 'No, thanks!'], "Khi được giới thiệu người mới, ta đáp \"Nice to meet you\"."],
  ['Khi muốn nhờ ai đó, em nói:', 'Please help me.', ['Goodbye!', 'Good night!', 'No!'], "Thêm \"please\" khi nhờ vả để lời nói lịch sự hơn."],
  ['Cô giáo hỏi "How old are you?", em đáp:', 'I am seven years old.', ['My name is Lan.', "I'm fine.", 'This is a pen.'], "\"How old are you?\" hỏi TUỔI, đáp bằng \"I am ... years old\"."],
  ['Buổi chiều gặp cô giáo, em chào:', 'Good afternoon!', ['Good morning!', 'Good night!', 'Goodbye!'], "Buổi chiều chào \"Good afternoon\", không phải \"Good morning\"."],
  ['Bạn chúc mừng sinh nhật em, em đáp:', 'Thank you!', ['Sorry!', 'Goodbye!', 'No!'], "\"Thank you\" dùng để cảm ơn khi được ai đó giúp."],
  ['Em muốn xin phép ra ngoài, em nói:', 'May I go out?', ['I am fine.', 'This is a pen.', 'Good night!'], "\"May I ...?\" dùng để xin phép một cách lịch sự."],
  ['Cô hỏi "Are you ready?", em đáp:', 'Yes, I am.', ['Yes, I do.', 'He is.', 'They are.'], "Câu hỏi mở đầu bằng \"Are you ...?\" thì đáp \"Yes, I am\"."],
  ['Bạn hỏi "Where are you from?", em đáp:', "I'm from Viet Nam.", ['I am seven.', "I'm fine.", 'This is Mai.'], "\"Where are you from?\" hỏi quê quán, đáp bằng \"I am from ...\"."],
  ['Em muốn mời bạn cùng chơi, em nói:', "Let's play together!", ['Good night!', 'Sorry!', 'Thank you!'], "Mẫu \"Let us ...\" dùng để rủ ai đó cùng làm gì."],
  ['Bạn hỏi "Is this your bag?", em đáp:', 'Yes, it is.', ['Yes, I am.', 'Yes, they are.', 'Yes, he is.'], "Câu hỏi \"Is this ...?\" thì đáp \"Yes, it is\", không phải \"Yes, I am\"."],
  ['Khi không hiểu bài, em nói với cô:', "I don't understand.", ['I am fine.', 'Good morning!', 'Thank you!'], "Chưa hiểu bài thì nói câu này để được cô giảng lại."],
  ['Bạn hỏi "How many books?", em đáp:', 'Three books.', ['I am three.', 'Yes, I do.', "It's red."], "\"How many ...?\" hỏi số lượng, nên đáp bằng số kèm danh từ số nhiều."],
  ['Bạn hỏi "What colour is it?", em đáp:', "It's red.", ['I am red.', 'Yes, it is.', 'Three books.'], "\"What colour is it?\" hỏi màu của vật, nên đáp \"It is + màu\"."],
  ['Khi gặp người lớn lần đầu, em nói:', 'Nice to meet you!', ['Goodbye!', 'Sorry!', 'Good night!'], "Khi được giới thiệu người mới, ta đáp \"Nice to meet you\"."],
  ['Em muốn nhờ bạn nhắc lại, em nói:', 'Pardon?', ['Goodbye!', 'Thank you!', 'Yes, I am.'], "\"Pardon?\" dùng khi muốn người khác nhắc lại."],
  ['Bạn hỏi "Do you like milk?", em đáp:', 'Yes, I do.', ['Yes, I am.', 'Yes, it is.', 'Yes, he does.'], "Câu hỏi mở đầu bằng \"Do you ...?\" thì đáp \"Yes, I do\"."],
  ['Cô gọi tên em, em thưa:', 'Yes, teacher.', ['Goodbye!', 'Sorry!', 'Good night!'], "Khi cô gọi tên, ta thưa \"Yes, teacher\"."],
  ['Khi tạm biệt vào buổi tối, em nói:', 'Good night!', ['Good morning!', 'Nice to meet you!', 'Pardon?'], "\"Good night\" là lời chào lúc đi ngủ, không dùng khi gặp mặt."],
  ['Bạn hỏi "Who is she?", em đáp:', 'She is my sister.', ['He is my brother.', 'It is a cat.', 'They are books.'], "\"Who is she?\" hỏi về người nữ, nên đáp bằng \"She is ...\"."],
  ['Em muốn xin thêm nước, em nói:', 'Some water, please.', ['Good night!', 'No, thanks!', 'Sorry!'], "Thêm \"please\" khi xin gì đó cho lịch sự."],
  ['Bạn nói "Thank you", em đáp:', "You're welcome!", ['Sorry!', 'Good night!', 'Yes, I do.'], "Khi được cảm ơn, ta đáp \"You are welcome\"."],
  ['Khi muốn hỏi tên bạn, em nói:', 'What is your name?', ['How are you?', 'Good night!', 'Thank you!'], "Muốn hỏi tên người khác thì dùng \"What is your name?\"."],
  ['Em muốn hỏi bạn có khoẻ không, em nói:', 'How are you?', ['How old are you?', 'What is your name?', 'Where are you from?'], '"How are you?" là câu hỏi thăm sức khoẻ.'],
  ['Bạn hỏi "Can you swim?", em đáp:', 'Yes, I can.', ['Yes, I am.', 'Yes, I do.', 'Yes, it is.'], 'Câu hỏi mở đầu bằng "Can you ...?" thì đáp "Yes, I can".'],
  ['Bạn hỏi "What is this?", em đáp:', 'It is a pen.', ['I am a pen.', 'He is a pen.', 'They are pen.'], 'Hỏi về MỘT vật thì đáp bằng "It is ...".'],
  ['Bạn hỏi "Where is your bag?", em đáp:', 'It is on the desk.', ['It is red.', 'I am fine.', 'Yes, it is.'], '"Where" hỏi nơi chốn, nên đáp bằng vị trí.'],
  ['Khi muốn khen bạn làm tốt, em nói:', 'Well done!', ['Sorry!', 'Pardon?', 'Good night!'], '"Well done!" dùng để khen ai đó làm tốt.'],
  ['Bạn hỏi "Is she your mother?", em đáp:', 'Yes, she is.', ['Yes, he is.', 'Yes, I am.', 'Yes, they are.'], 'Hỏi về "she" thì đáp bằng "she is".'],
  ['Khi đến lớp muộn, em nói với cô:', 'I am sorry I am late.', ['Thank you!', 'Good night!', 'Nice to meet you!'], 'Đi muộn thì xin lỗi trước, dùng "I am sorry I am late".'],
  ['Bạn hỏi "Do you have a pen?", em đáp:', 'Yes, I do.', ['Yes, I am.', 'Yes, it is.', 'Yes, he does.'], 'Câu hỏi "Do you ...?" thì đáp "Yes, I do".'],
  ['Bạn hỏi "How many pens?", em đáp:', 'Two pens.', ['I am two.', 'Yes, I do.', 'It is a pen.'], '"How many ...?" hỏi số lượng, đáp bằng số kèm danh từ số nhiều.'],
  ['Khi muốn mượn bút của bạn, em nói:', 'May I borrow your pen?', ['Give me pen!', 'Where is pen?', 'Thank you!'], 'Mượn đồ thì hỏi lịch sự bằng "May I borrow ...?".'],
  ['Bạn hỏi "What is your favourite colour?", em đáp:', 'Blue.', ['I am blue.', 'Yes, it is.', 'Three books.'], 'Hỏi màu yêu thích thì đáp thẳng bằng tên màu.'],
  ['Khi tạm biệt và hẹn gặp lại, em nói:', 'See you later!', ['Good morning!', 'Sorry!', 'Yes, I am.'], '"See you later!" là lời tạm biệt có ý hẹn gặp lại.'],
  ['Cô hỏi "Are you tired?", em đáp:', 'No, I am not.', ['No, I do not.', 'No, it is not.', 'No, he is not.'], 'Câu hỏi "Are you ...?" phủ định thì đáp "No, I am not".'],
  ['Bạn hỏi "Who is your teacher?", em đáp:', 'Miss Lan.', ['I am fine.', 'It is red.', 'Yes, she is.'], '"Who" hỏi NGƯỜI, nên đáp bằng tên người.'],
  ['Khi muốn xin phép uống nước, em nói:', 'May I drink some water?', ['I drink water!', 'Water!', 'Good night!'], 'Xin phép thì mở đầu bằng "May I ...?".'],
  ['Bạn hỏi "Is it a cat or a dog?", em đáp:', 'It is a cat.', ['Yes, it is.', 'I am a cat.', 'They are cats.'], 'Câu hỏi lựa chọn thì đáp bằng cả câu, không đáp "Yes/No".'],
  ['Khi bạn bị ngã, em hỏi:', 'Are you OK?', ['Good night!', 'Thank you!', 'How many?'], '"Are you OK?" dùng để hỏi thăm khi ai đó gặp chuyện.'],
  ['Bạn hỏi "What do you like?", em đáp:', 'I like apples.', ['I am apples.', 'Yes, I do.', 'It is apple.'], 'Hỏi sở thích thì đáp bằng "I like ...".'],
  ['Trước khi ăn, em mời cả nhà:', 'Enjoy your meal!', ['Good night!', 'See you later!', 'Pardon?'], '"Enjoy your meal!" là lời mời ăn ngon miệng.'],
  ['Bạn hỏi "How old is your sister?", em đáp:', 'She is five.', ['I am five.', 'Yes, she is.', 'It is five.'], 'Hỏi tuổi của "she" thì đáp bằng "She is ...".'],
];

// [câu có chỗ trống, đáp án đúng, đáp án sai, giải thích]
const EN_MAU_CAU = [
  ['___ is my father.', 'This', ['These', 'Those', 'They'], '"This is..." dùng để giới thiệu MỘT người hoặc vật ở gần.'],
  ['I ___ a student.', 'am', ['is', 'are', 'be'], 'Với chủ ngữ "I" thì dùng "am".'],
  ['She ___ my sister.', 'is', ['am', 'are', 'be'], 'Với chủ ngữ "She/He/It" thì dùng "is".'],
  ['They ___ my friends.', 'are', ['am', 'is', 'be'], 'Với chủ ngữ số nhiều "They" thì dùng "are".'],
  ['I have two ___.', 'books', ['book', 'bookes', 'bookies'], 'Từ hai trở lên thì danh từ thêm "s": book → books.'],
  ['This is ___ apple.', 'an', ['a', 'the', 'some'], 'Trước nguyên âm a, e, i, o, u thì dùng "an".'],
  ['This is ___ book.', 'a', ['an', 'some', 'any'], 'Trước phụ âm thì dùng "a".'],
  ['___ your name?', 'What is', ['Where is', 'How old', 'Who are'], '"What is your name?" là câu hỏi TÊN.'],
  ['I ___ seven years old.', 'am', ['is', 'are', 'have'], 'Nói tuổi trong tiếng Anh dùng "I am ... years old".'],
  ['___ you like apples?', 'Do', ['Does', 'Is', 'Are'], 'Với "you" thì câu hỏi bắt đầu bằng "Do".'],
  ['He ___ a big bag.', 'has', ['have', 'is', 'are'], 'Với "He/She/It" thì dùng "has".'],
  ['These ___ my books.', 'are', ['is', 'am', 'be'], '"These" là số nhiều nên đi với "are".'],
  ['It ___ a cat.', 'is', ['am', 'are', 'be'], 'Với chủ ngữ "It" thì dùng "is".'],
  ['I have three ___.', 'pens', ['pen', 'penes', 'penies'], 'Từ hai trở lên thì danh từ thêm "s": pen → pens.'],
  ['This is ___ orange.', 'an', ['a', 'the', 'any'], 'Trước nguyên âm a, e, i, o, u thì dùng "an".'],
  ['This is ___ desk.', 'a', ['an', 'some', 'any'], 'Trước phụ âm thì dùng "a".'],
  ['___ old are you?', 'How', ['What', 'Where', 'Who'], '"How old are you?" là câu hỏi TUỔI.'],
  ['___ is your teacher?', 'Who', ['What', 'How', 'Where'], '"Who" dùng để hỏi NGƯỜI.'],
  ['___ is my bag?', 'Where', ['Who', 'How', 'When'], '"Where" dùng để hỏi NƠI CHỐN.'],
  ['She ___ not my sister.', 'is', ['am', 'are', 'do'], 'Câu phủ định với "She" dùng "is not".'],
  ['___ they your friends?', 'Are', ['Is', 'Am', 'Do'], 'Câu hỏi với "they" bắt đầu bằng "Are".'],
  ['I ___ like fish.', "don't", ["doesn't", "isn't", "aren't"], 'Phủ định với "I" dùng "don\'t".'],
  ['He ___ like milk.', "doesn't", ["don't", "isn't", "aren't"], 'Phủ định với "He/She/It" dùng "doesn\'t".'],
  ['Touch ___ nose!', 'your', ['you', 'yours', 'my'], 'Trước danh từ thì dùng "your" (của bạn).'],
  ['This is ___ book. (của tôi)', 'my', ['I', 'me', 'mine'], 'Trước danh từ thì dùng "my" (của tôi).'],
  ['There ___ two cats.', 'are', ['is', 'am', 'be'], '"Two cats" là số nhiều nên dùng "There are".'],
  ['There ___ one dog.', 'is', ['are', 'am', 'be'], '"One dog" là số ít nên dùng "There is".'],
  ['We ___ in class 1A.', 'are', ['am', 'is', 'be'], 'Với chủ ngữ số nhiều "We" thì dùng "are".'],
  ['I ___ my mother.', 'love', ['loves', 'am love', 'is love'], 'Với chủ ngữ "I" thì động từ giữ nguyên: I love.'],
  ['She ___ to school every day.', 'goes', ['go', 'going', 'gone'], 'Với "She/He/It" thì động từ thêm "es": go → goes.'],
  ['They ___ football on Sunday.', 'play', ['plays', 'is play', 'playing'], 'Với chủ ngữ số nhiều "They" thì động từ giữ nguyên.'],
  ['___ is a cat. (một con mèo ở gần)', 'This', ['These', 'Those', 'They'], '"This" chỉ MỘT vật ở gần.'],
  ['___ are my books. (nhiều quyển ở gần)', 'These', ['This', 'That', 'It'], '"These" chỉ NHIỀU vật ở gần.'],
  ['That ___ my school.', 'is', ['are', 'am', 'be'], '"That" là số ít nên đi với "is".'],
  ['My father ___ a teacher.', 'is', ['am', 'are', 'be'], '"My father" là một người nên dùng "is".'],
  ['I can ___ a bike.', 'ride', ['rides', 'riding', 'rode'], 'Sau "can" thì động từ giữ nguyên.'],
  ['She can ___ very well.', 'sing', ['sings', 'singing', 'sang'], 'Sau "can" thì động từ giữ nguyên, kể cả với "She".'],
  ['Open ___ book, please.', 'your', ['you', 'yours', 'my'], 'Trước danh từ thì dùng "your".'],
  ['This is ___ ball. (của cậu ấy)', 'his', ['he', 'him', 'her'], '"His" nghĩa là của cậu ấy, đứng trước danh từ.'],
  ['This is ___ doll. (của cô ấy)', 'her', ['she', 'hers', 'his'], '"Her" nghĩa là của cô ấy, đứng trước danh từ.'],
  ['___ many books do you have?', 'How', ['What', 'Who', 'Where'], '"How many" dùng để hỏi số lượng.'],
  ['The cat is ___ the table.', 'on', ['in', 'at', 'of'], '"On" nghĩa là ở TRÊN bề mặt.'],
  ['The pen is ___ the bag.', 'in', ['on', 'at', 'of'], '"In" nghĩa là ở BÊN TRONG.'],
  ['I go to school ___ Monday.', 'on', ['in', 'at', 'of'], 'Trước thứ trong tuần thì dùng "on".'],
  ['I ___ got two sisters.', 'have', ['has', 'is', 'are'], 'Với "I" thì dùng "have got".'],
  ['He ___ got a red kite.', 'has', ['have', 'is', 'are'], 'Với "He/She/It" thì dùng "has got".'],
];

// ── Số nhiều tiếng Anh ──────────────────────────────────────────────────
// KHÔNG suy ra số nhiều bằng cách cộng "s" vào từ bất kỳ trong EN_VOCAB:
// kho đó có cả tính từ (green, brown), danh từ không đếm được (bread, milk,
// rice, water) và bất quy tắc (fish, foot) — cộng "s" là dạy sai.
// [số ít, số nhiều, quy tắc]
const EN_PLURALS = [
  ['book', 'books', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['pen', 'pens', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['bag', 'bags', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['cat', 'cats', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['dog', 'dogs', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['bird', 'birds', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['duck', 'ducks', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['desk', 'desks', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['chair', 'chairs', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['tree', 'trees', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['ball', 'balls', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['doll', 'dolls', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['car', 'cars', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['kite', 'kites', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['flower', 'flowers', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['apple', 'apples', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['banana', 'bananas', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['egg', 'eggs', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['hand', 'hands', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['leg', 'legs', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['ear', 'ears', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['eye', 'eyes', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['nose', 'noses', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['teacher', 'teachers', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['sister', 'sisters', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['brother', 'brothers', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['school', 'schools', 'Phần lớn danh từ chỉ cần thêm "s"'],
  ['house', 'houses', 'Phần lớn danh từ chỉ cần thêm "s"'],
  // Phụ âm + y → bỏ y, thêm "ies"
  ['candy', 'candies', 'Phụ âm đứng trước "y" thì bỏ "y", thêm "ies"'],
  ['baby', 'babies', 'Phụ âm đứng trước "y" thì bỏ "y", thêm "ies"'],
  ['city', 'cities', 'Phụ âm đứng trước "y" thì bỏ "y", thêm "ies"'],
  // Tận cùng s, x, ch, sh → thêm "es"
  ['box', 'boxes', 'Tận cùng bằng x thì thêm "es"'],
  ['bus', 'buses', 'Tận cùng bằng s thì thêm "es"'],
  ['watch', 'watches', 'Tận cùng bằng ch thì thêm "es"'],
  ['fish', 'fish', 'Một số từ giữ nguyên khi ở số nhiều'],
  ['foot', 'feet', 'Một số từ đổi hẳn khi sang số nhiều'],
  ['tooth', 'teeth', 'Một số từ đổi hẳn khi sang số nhiều'],
  ['child', 'children', 'Một số từ đổi hẳn khi sang số nhiều'],
  ['man', 'men', 'Một số từ đổi hẳn khi sang số nhiều'],
  ['woman', 'women', 'Một số từ đổi hẳn khi sang số nhiều'],
];

module.exports = {
  CHU_CAI, CHU_GHEP, VAN_NHOM, CHINH_TA, TRAI_NGHIA, CUNG_NGHIA, LOAI_TU,
  CAU_AI_LAM_GI, KIEU_CAU, DOAN_DOC, TRUYEN_THU_TU, TAP_LAM_VAN,
  EN_VOCAB, EN_NUMBERS, EN_GIAO_TIEP, EN_MAU_CAU, EN_PLURALS,
};
