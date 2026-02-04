(function() {
    console.log("eBookBite가 눈을 부릅뜹니다");

    // 클릭 이벤트를 캡처 단계에서 돚거
    document.addEventListener('click', function(event) {
        // 클릭된 요소가 fnEbook 함수를 실행하는 링크인지 확인
        const target = event.target.closest('a[onclick*="fnEbook"]');
        
        if (target) {
            // 기본 동작(인라인 onclick 실행)을 중단
            event.preventDefault();
            event.stopPropagation();

            // onclick 속성 문자열에서 ID 추출 (예: fnEbook('A123...') -> A123...)
            const match = target.getAttribute('onclick').match(/'([^']+)'/);
            if (match && match[1]) {
                const atchId = match[1];
                const ebookUrl = `/data/upload_files/crossUpload/openLrn/ebook/unzip/${atchId}/index.html`;
                
                console.log("eBook을 물어옵니다.", ebookUrl);
                
                // 브라우저가 허용하는 새 탭 열기 사용
                window.open(ebookUrl, '_blank');
            }
        }
    }, true); // true는 캡처링 모드
})();