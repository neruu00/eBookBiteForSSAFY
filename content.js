(function () {
  console.log("eBookBite가 눈을 부릅뜹니다. 멍멍!");

  // 싸피에서 사용하는 상수 객체. 변경 ㄴㄴ
  const USER_TYPE_MAP = {
    1: { type: "T3", name: "TEST" },
    122: { type: "T4", name: "4기" },
    162: { type: "T5", name: "5기" },
    182: { type: "T6", name: "6기" },
    202: { type: "T7", name: "7기" },
    222: { type: "T8", name: "8기" },
    242: { type: "T9", name: "9기" },
    262: { type: "T10", name: "10기" },
    282: { type: "T11", name: "11기" },
    302: { type: "T12", name: "12기" },
    322: { type: "T13", name: "13기" },
    362: { type: "T14", name: "14기" },
    382: { type: "T15", name: "15기" },
  };

  document.addEventListener(
    "click",
    async function (event) {
      // 1. eBook 리더 (fnEbook) 처리
      const eBookReader = event.target.closest('a[onclick*="fnEbook"]');
      if (eBookReader) {
        event.preventDefault();
        event.stopPropagation();

        // eBook Key 파싱
        const match = eBookReader.getAttribute("onclick").match(/'([^']+)'/);
        if (match && match[1]) {
          const ebookUrl = `/data/upload_files/crossUpload/openLrn/ebook/unzip/${match[1]}/index.html`;
          window.open(ebookUrl, "_blank");
          console.log("E-Book을 탭으로 물어왔습니다! 왈왈!");
        }
        return;
      }

      // 2. SSAFY 도서관(fnKyoboBridge) 처리
      const eBookPage = event.target.closest('a[onclick*="fnKyoboBridge"]');
      if (eBookPage) {
        event.preventDefault();
        event.stopPropagation();

        try {
          console.log("SSAFY 도서관 정보를 물어오는 중...");
          const response = await fetch(
            "https://edu.ssafy.com/edu/main/kyoboBridge.do",
          );
          const data = await response.json();

          if (data) {
            const config = USER_TYPE_MAP[data.param3] || {
              type: "UNKNOWN",
              name: "알수없음",
            };

            const form = document.createElement("form");
            form.method = "POST";
            form.action = data.url;
            form.target = "_blank";
            form.style.display = "none";

            const fields = {
              user_id: data.param1,
              user_type: config.type,
              user_type_name: config.name,
              libraryCode: data.param2,
            };

            for (const [name, value] of Object.entries(fields)) {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = name;
              input.value = value;
              form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
            console.log("SSAFY 도서관을 탭으로 물어왔습니다! 컹컹!");
          }
        } catch (e) {
          console.error("도서관 정보를 놓쳐버렸습니다. 끼잉...", e);
        }
      }
    },
    true,
  );
})();
