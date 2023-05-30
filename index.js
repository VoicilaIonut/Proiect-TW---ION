window.onload = function () {
  let header = document.getElementsByClassName("header")[0];
  let headerHiperlinks = document.getElementsByClassName("header-hiperlink");

  header.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  for (let hiperLink of headerHiperlinks) {
    hiperLink.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
};
