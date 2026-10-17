/* ==========================================================
   FILE DỮ LIỆU CV – CHỈ CẦN SỬA FILE NÀY ĐỂ CẬP NHẬT TRANG
   - Mục nào chưa có thì để mảng rỗng [] hoặc chuỗi rỗng ""
   - Các dòng có chữ "[CẬP NHẬT]" là thông tin mẫu, hãy thay bằng thông tin thật
   - Tài liệu (PDF, poster, hình) bỏ vào thư mục docs/ rồi ghi đường dẫn vào "file"
   - Trang này công khai: không đưa số CCCD, địa chỉ nhà, ngày sinh vào đây
   ========================================================== */

const CV_DATA = {
  profile: {
    name: "Nguyễn Thị Tường Vi",
    title: "Nhân viên Đảm bảo chất lượng xét nghiệm",
    org: "Khoa Xét nghiệm – MEDIC Lab Hòa Hảo",
    location: "TP. Hồ Chí Minh, Việt Nam",
    email: "email-cua-ban@example.com",      // [CẬP NHẬT]
    phone: "0900 000 000",                    // [CẬP NHẬT]
    photo: "",                                // ví dụ: "docs/anh-chan-dung.jpg" (để trống sẽ hiện chữ cái đầu)
    summary: "",   // dòng mô tả giới thiệu (để trống = không hiển thị)
    links: [
      // { label: "LinkedIn", url: "https://linkedin.com/in/..." },
      // { label: "ORCID", url: "https://orcid.org/..." },
    ],
  },

  // Các con số nổi bật (sửa hoặc xóa tùy ý)
  highlights: [
    { value: "15 năm", label: "Làm việc tại Khoa Xét nghiệm (2011 – nay)" },
    { value: "3",      label: "Khóa đào tạo QA: Westgard/Sigma, ISO 15189" },
    { value: "2",      label: "Công trình: 1 bài báo, 1 poster quốc tế" },
  ],

  skills: [
    { group: "Quản lý chất lượng xét nghiệm", items: [
      "Quy luật Westgard & thang Sigma", "Tiêu chuẩn ISO 15189:2012 / 2022",
      "Nội kiểm / ngoại kiểm", "Xây dựng & rà soát quy trình (SOP)"
    ]},
    { group: "Thống kê & Xử lý số liệu nghiên cứu", items: [
      "Làm sạch & chuẩn hóa dữ liệu", "Thống kê mô tả & phân tích",
      "Tính toán, xử lý số liệu cho bài báo và poster"
    ]},
    { group: "Kỹ năng khác", items: [
      "Làm việc nhóm liên khoa", "Viết báo cáo & trình bày poster"
    ]},
  ],

  experience: [
    {
      role: "Nhân viên Đảm bảo chất lượng xét nghiệm – Tổ Quản lý chất lượng, Khoa Xét nghiệm",
      org: "MEDIC Lab Hòa Hảo",
      period: "2011 – nay",
      points: [
        "Quản lý chất lượng xét nghiệm theo quy luật Westgard, thang Sigma và tiêu chuẩn ISO 15189.",
        "Tham gia thống kê, tính toán, xử lý số liệu cho các nghiên cứu khoa học của đơn vị.",
      ],
    },
    // {
    //   role: "Vị trí trước đó", org: "Nơi làm việc", period: "20XX – 20XX",
    //   points: ["Mô tả công việc 1", "Mô tả công việc 2"],
    // },
  ],

  education: [
    { degree: "Cử nhân Xét nghiệm (chính quy)", org: "Đại học Hồng Bàng", period: "2014 – 2016" },
    { degree: "Trung cấp Xét nghiệm (chính quy)", org: "Đại học Y Dược", period: "2008 – 2010" },
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
      file: "docs/poster-AASLD-2026.pdf",
      link: "",
    },
    {
      type: "paper",
      title: "Nghiên cứu tỷ lệ và đặc điểm lâm sàng, cận lâm sàng nhiễm siêu vi viêm gan B tiềm ẩn tại Trung tâm Y khoa MEDIC Thành phố Hồ Chí Minh",
      authors: "Lê Đình Vĩnh Phúc, Nguyễn Bảo Toàn, Nguyễn Thị Tường Vi, Hồ Minh Mẫn, Phan Thanh Hải",
      venue: "Tạp chí Truyền nhiễm Việt Nam, số 03(47), tr. 17–23",
      year: 2024,
      file: "docs/bai-bao-OBI-truyen-nhiem-viet-nam-2024.pdf",
      link: "",
    },
    // Mẫu thêm mục mới (bỏ dấu // ở đầu mỗi dòng để dùng):
    // {
    //   type: "report",            // paper | poster | report
    //   title: "Tên báo cáo", authors: "Tác giả", venue: "Nơi công bố", year: 2025,
    //   file: "docs/ten-file.pdf", link: "",
    // },
  ],

  // Đào tạo, bồi dưỡng chuyên môn & chứng chỉ (thêm "file" nếu có bản scan trong docs/)
  certificates: [
    { name: "Quản lý PXN theo tiêu chuẩn ISO 15189:2022", org: "BoA", year: "13/09/2024", file: "" },
    { name: "Quản lý PXN theo tiêu chuẩn ISO 15189:2012", org: "BoA", year: "14–16/08/2019", file: "" },
    { name: "Quản lý chất lượng xét nghiệm bằng quy luật Westgard và công cụ Sigma", org: "Đại học Y Dược TP.HCM", year: "21–22/03/2019", file: "" },
  ],

  memberships: [
    "Hội Hóa Sinh Y Học TP. Hồ Chí Minh",
    "Hội Hóa Sinh Y Học Việt Nam",
  ],
};
