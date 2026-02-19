// Shared header component — injected on every page for consistency
(function () {
  // Favicon
  var icon = document.createElement("link");
  icon.rel = "icon";
  icon.type = "image/svg+xml";
  icon.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='white'/%3E%3Ctext x='16' y='23' font-family='Inter,system-ui,sans-serif' font-size='20' font-weight='800' fill='%23f6821f' text-anchor='middle'%3EM%3C/text%3E%3C/svg%3E";
  document.head.appendChild(icon);

  const nav = document.createElement("nav");
  nav.className = "nav";
  nav.innerHTML = `
    <div class="container">
      <a href="index.html" class="nav__logo"><span class="nav__logo-first">Maayan</span> Margolin<span class="nav__logo-dot">.</span></a>
      <div class="nav__right">
        <div class="nav__status">
          <span class="nav__status-dot"></span>
          Open to work
        </div>
        <span class="nav__divider"></span>
        <div class="cv-dropdown">
          <button class="cv-dropdown__btn">CV <span class="cv-dropdown__arrow">&#9660;</span></button>
          <div class="cv-dropdown__menu">
            <a href="cv.html">Online version</a>
            <a href="Maayan_Margolin_CV.pdf" download>Download PDF</a>
          </div>
        </div>
      </div>
    </div>`;

  // Insert nav as first child of body
  document.body.insertBefore(nav, document.body.firstChild);
})();
