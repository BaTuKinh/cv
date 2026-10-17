/* ==========================================================
   FILE DỮ LIỆU CV – CHỈ CẦN SỬA FILE NÀY ĐỂ CẬP NHẬT TRANG
   - Mục nào chưa có thì để mảng rỗng [] hoặc chuỗi rỗng ""
   - Các dòng có chữ "[CẬP NHẬT]" là thông tin mẫu, hãy thay bằng thông tin thật
   - Tài liệu (PDF, poster, hình) bỏ vào thư mục docs/ rồi ghi đường dẫn vào "file"
   ========================================================== */

const CV_DATA = {
  profile: {
    name: "Nguyễn Thị Tường Vi",
    title: "Quản lý & Đảm bảo kỹ thuật Khoa Xét nghiệm",
    org: "MEDIC Lab Hòa Hảo",
    location: "TP. Hồ Chí Minh, Việt Nam",
    email: "ngtuongvi1990@gmail.com",      // [CẬP NHẬT]
    phone: "0945 400 881",                    // [CẬP NHẬT]
    photo: "",                                // ví dụ: "docs/anh-chan-dung.jpg" (để trống sẽ hiện chữ cái đầu)
    summary:
      "Nhân viên quản lý, đảm bảo kỹ thuật của Khoa Xét nghiệm MEDIC Lab Hòa Hảo: giám sát chất lượng xét nghiệm, " +
      "duy trì quy trình kỹ thuật và tuân thủ tiêu chuẩn. Đồng thời tham gia các nghiên cứu khoa học với vai trò " +
      "thống kê, tính toán và xử lý số liệu.",
    links: [
      // { label: "LinkedIn", url: "https://linkedin.com/in/..." },
      // { label: "ORCID", url: "https://orcid.org/..." },
    ],
  },

  // Các con số nổi bật (sửa hoặc xóa tùy ý)
  highlights: [
    { value: "2",  label: "Công trình nghiên cứu" },
    { value: "1",  label: "Bài báo tạp chí" },
    { value: "1",  label: "Poster quốc tế (AASLD 2026)" },
  ],

  skills: [
    { group: "Quản lý & Đảm bảo chất lượng", items: [
      "Kiểm soát chất lượng nội kiểm / ngoại kiểm", "Xây dựng & rà soát SOP",
      "Quản lý thiết bị & hiệu chuẩn", "Chuẩn bị đánh giá ISO 15189", "An toàn sinh học phòng xét nghiệm"
    ]},
    { group: "Thống kê & Xử lý số liệu", items: [
      "Làm sạch & chuẩn hóa dữ liệu", "Thống kê mô tả & suy luận", "Phân tích tương quan, hồi quy",
      "Đánh giá phương pháp (độ chính xác, độ đúng, độ lặp lại)", "Excel nâng cao", "SPSS / R / Python (ghi rõ phần bạn dùng)"
    ]},
    { group: "Kỹ năng khác", items: [
      "Làm việc nhóm liên khoa", "Đào tạo nhân viên", "Viết báo cáo & trình bày poster"
    ]},
  ],

  experience: [
    {
      role: "Nhân viên quản lý, đảm bảo kỹ thuật – Khoa Xét nghiệm",
      org: "MEDIC Lab Hòa Hảo",
      period: "2011 – nay",
      points: [
        "Giám sát chất lượng kỹ thuật và quy trình vận hành của khoa xét nghiệm.",
        "Theo dõi nội kiểm, ngoại kiểm; phối hợp xử lý các sai lệch.",
        "Tham gia thống kê, tính toán, xử lý số liệu cho các đề tài nghiên cứu của đơn vị.",
      ],
    },
    // {
    //   role: "Vị trí trước đó", org: "Nơi làm việc", period: "20XX – 20XX",
    //   points: ["Mô tả công việc 1", "Mô tả công việc 2"],
    // },
  ],

  education: [
    { degree: "[CẬP NHẬT] Cử nhân Xét nghiệm Y học", org: "Tên trường", period: "20XX – 20XX" },
  ],

  /* NGHIÊN CỨU: type = "paper" (bài báo) | "poster" | "report" (báo cáo)
     file: đường dẫn tới PDF/hình trong docs/   link: đường dẫn web ngoài (nếu có) */
  research: [
    {
      type: "poster",
      title: "Prevalence of Hepatitis B Virus Infection, Total Anti-HBc Positivity, and Isolated Anti-HBc among 118,141 Individuals Undergoing Routine Health Check-ups at MEDIC Medical Center in the South of Vietnam",
      authors: "Pham T.T.T., Ho D.T., Nguyen T.B., Nguyen T.T.V., Phan T.H.",
      venue: "AASLD – The Liver Meeting 2026, Denver, CO (5–9/11/2026), poster P 2226",
      year: 2026,
      role: "Đồng tác giả – xử lý, phân tích số liệu thống kê",
      file: "docs/poster-AASLD-2026.pdf",
      link: "",
    },
    {
      type: "paper",
      title: "Nghiên cứu tỷ lệ và đặc điểm lâm sàng, cận lâm sàng nhiễm siêu vi viêm gan B tiềm ẩn tại Trung tâm Y khoa MEDIC Thành phố Hồ Chí Minh",
      authors: "Lê Đình Vĩnh Phúc, Nguyễn Bảo Toàn, Nguyễn Thị Tường Vi, Hồ Minh Mẫn, Phan Thanh Hải",
      venue: "Tạp chí Truyền nhiễm Việt Nam, số 03(47)",
      year: 2024,
      role: "Đồng tác giả – xử lý, phân tích số liệu thống kê",
      file: "docs/bai-bao-OBI-truyen-nhiem-viet-nam-2024.pdf",
      link: "",
    },
    // Mẫu thêm mục mới (bỏ dấu // ở đầu mỗi dòng để dùng):
    // {
    //   type: "report",            // paper | poster | report
    //   title: "Tên báo cáo", authors: "Tác giả", venue: "Nơi công bố", year: 2025,
    //   role: "Vai trò của bạn", file: "docs/ten-file.pdf", link: "",
    // },
  ],

  certificates: [
    // { name: "Chứng chỉ ISO 15189", org: "Đơn vị cấp", year: 2024, file: "docs/chung-chi.pdf" },
  ],
};
