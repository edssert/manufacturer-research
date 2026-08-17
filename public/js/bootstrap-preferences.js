(function applyStoredPreferences() {
  try {
    if (localStorage.getItem("mr-hide-media") === "1") {
      document.addEventListener(
        "DOMContentLoaded",
        function hideMedia() {
          document.body.classList.add("hide-media");
        },
        { once: true },
      );
    }
  } catch {
    // 저장소 접근이 차단돼도 사진이 보이는 기본 상태로 계속 부팅한다.
  }
})();
