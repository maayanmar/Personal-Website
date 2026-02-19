// CV dropdown toggle — handle all instances (desktop + mobile)
document.querySelectorAll(".cv-dropdown").forEach((dropdown) => {
  const btn = dropdown.querySelector(".cv-dropdown__btn");
  const menu = dropdown.querySelector(".cv-dropdown__menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    // Close other dropdowns first
    document.querySelectorAll(".cv-dropdown").forEach((d) => {
      if (d !== dropdown) {
        d.classList.remove("open");
        d.querySelector(".cv-dropdown__menu").classList.remove("open");
      }
    });
    dropdown.classList.toggle("open");
    menu.classList.toggle("open");
  });

  menu.addEventListener("click", (e) => e.stopPropagation());
});

document.addEventListener("click", () => {
  document.querySelectorAll(".cv-dropdown").forEach((d) => {
    d.classList.remove("open");
    d.querySelector(".cv-dropdown__menu").classList.remove("open");
  });
});

// Rotating slogan with smooth crossfade
const sloganEl = document.querySelector(".terminal__slogan");
if (sloganEl) {
  const phrases = [
    "One developer, one AI teammate, zero limits.",
    "If I can imagine it \u2014 I can ship it.",
    "Armed with Claude Code, there\u2019s no project I can\u2019t build.",
  ];
  let index = 0;

  setInterval(() => {
    sloganEl.classList.add("slogan--fading");
    setTimeout(() => {
      index = (index + 1) % phrases.length;
      sloganEl.textContent = phrases[index];
      sloganEl.classList.remove("slogan--fading");
    }, 400);
  }, 4000);
}

// Interactive terminal
const terminalLines = document.querySelector(".terminal__lines");
const terminalCursor = document.querySelector(".terminal__cursor");

if (terminalLines) {
  const PROMPT = "PS> ";
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const commandResponses = {
    whoami: "Maayan Margolin \u2014 CS Graduate, Hebrew University",
    skills: "React \u00b7 TypeScript \u00b7 Supabase \u00b7 Cloudflare \u00b7 Playwright \u00b7 Python",
    projects: "vehagita/  wordpress-security/  nand2tetris/",
    status: "Open to full-stack, backend & security roles",
    contact: "GitHub: maayanmar \u00b7 LinkedIn: maayan-margolin",
    help: "Available commands:\n  whoami     About me\n  skills     Tech stack\n  projects   My work\n  status     What I\u2019m looking for\n  contact    Get in touch\n  clear      Clear terminal",
  };

  const easterEggs = {
    "sudo hire maayan": "No sudo needed. I\u2019m ready to start!",
    sudo: "No sudo needed around here.",
    coffee: "Brewing... \u2615 Best consumed while reviewing my projects.",
    "rm -rf /": "Nice try. This terminal is write-protected.",
    "rm -rf": "Nice try. This terminal is write-protected.",
    matrix: "Wake up, recruiter... the Matrix has you.",
    hello: "Hey there! Type 'help' to see what I can do.",
    hi: "Hey there! Type 'help' to see what I can do.",
    exit: "There is no escape. But you can type 'help'.",
    cls: "Use 'clear' instead \u2014 this isn\u2019t really PowerShell ;)",
  };

  // Insertion point switches from cursor to inputRow once interactive
  let insertTarget = terminalCursor;

  function addLine(text, className) {
    const el = document.createElement("div");
    el.className = "terminal__line" + (className ? " " + className : "");
    el.textContent = text;
    insertTarget.before(el);
  }

  function addOutputLines(text) {
    text.split("\n").forEach((line) => addLine(line, "terminal__output"));
  }

  function addCommandLine(cmd) {
    const lineEl = document.createElement("div");
    lineEl.className = "terminal__line";

    const promptSpan = document.createElement("span");
    promptSpan.className = "terminal__prompt";
    promptSpan.textContent = PROMPT;

    const cmdSpan = document.createElement("span");
    cmdSpan.className = "terminal__command";
    cmdSpan.textContent = cmd;

    lineEl.appendChild(promptSpan);
    lineEl.appendChild(cmdSpan);
    insertTarget.before(lineEl);
  }

  function handleCommand(input) {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    addCommandLine(input.trim());

    if (cmd === "clear") {
      terminalLines.querySelectorAll(".terminal__line").forEach((l) => l.remove());
      return;
    }

    const response = commandResponses[cmd] || easterEggs[cmd];
    if (response) {
      addOutputLines(response);
    } else {
      addLine("Command not found: " + cmd + ". Type 'help' for available commands.", "terminal__output");
    }
  }

  // Append a line to terminal
  function appendLine(text, className) {
    const el = document.createElement("div");
    el.className = "terminal__line" + (className ? " " + className : "");
    el.textContent = text;
    terminalLines.appendChild(el);
  }

  function appendOutput(text) {
    text.split("\n").forEach((line) => appendLine(line, "terminal__output"));
  }

  // Type command text character by character into an existing prompt line
  async function typeInto(cmdSpan, text) {
    for (let i = 0; i < text.length; i++) {
      cmdSpan.textContent += text[i];
      await delay(40);
    }
  }

  // Create a new PS> prompt line, append it, return the command span
  function addPromptLine() {
    const lineEl = document.createElement("div");
    lineEl.className = "terminal__line";
    const promptSpan = document.createElement("span");
    promptSpan.className = "terminal__prompt";
    promptSpan.textContent = PROMPT;
    const cmdSpan = document.createElement("span");
    cmdSpan.className = "terminal__command";
    lineEl.appendChild(promptSpan);
    lineEl.appendChild(cmdSpan);
    terminalLines.appendChild(lineEl);
    return cmdSpan;
  }

  // Create interactive input row
  function enableInput() {
    const inputRow = document.createElement("div");
    inputRow.className = "terminal__input-row";

    const promptSpan = document.createElement("span");
    promptSpan.className = "terminal__prompt";
    promptSpan.textContent = PROMPT;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "terminal__input";
    input.setAttribute("autocomplete", "off");
    input.setAttribute("spellcheck", "false");
    input.setAttribute("aria-label", "Terminal command input");

    inputRow.appendChild(promptSpan);
    inputRow.appendChild(input);

    // Append input row and set as insertion target
    terminalLines.appendChild(inputRow);
    insertTarget = inputRow;

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const value = input.value;
        input.value = "";
        handleCommand(value);

        // Move input row back to end
        terminalLines.appendChild(inputRow);
        input.focus();
      }
    });

    // Focus input when clicking anywhere in terminal body
    const terminalBody = document.querySelector(".terminal__body");
    terminalBody.addEventListener("click", () => input.focus());

    input.focus();
  }

  async function runTerminal() {
    // 1. PS> is already visible in HTML. Wait 0.4s then type "whoami"
    const placeholder = terminalLines.querySelector(".terminal__input-placeholder");
    const cursor = placeholder.querySelector(".terminal__cursor");
    cursor.remove();
    const cmdSpan1 = document.createElement("span");
    cmdSpan1.className = "terminal__command";
    placeholder.appendChild(cmdSpan1);
    placeholder.classList.remove("terminal__input-placeholder");

    await delay(400);
    await typeInto(cmdSpan1, "whoami");

    // 2. Immediately: output + new PS>. Wait 0.4s then type "status"
    appendOutput(commandResponses["whoami"]);
    const cmdSpan2 = addPromptLine();

    await delay(400);
    await typeInto(cmdSpan2, "status");

    // 3. Immediately: output + hint + interactive PS>
    appendOutput(commandResponses["status"]);
    appendLine("Type 'help' for available commands.", "terminal__output terminal__hint");
    enableInput();
  }

  runTerminal();
}

// Mobile carousel for Ongoing Work (index.html)
(function () {
  const carousel = document.querySelector(".carousel-mobile");
  const dotsContainer = document.querySelector(".carousel-dots");
  if (!carousel || !dotsContainer) return;

  const cards = Array.from(carousel.children);
  if (cards.length < 2) return;

  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", () => {
      cards[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".carousel-dot");

  let ticking = false;
  carousel.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = cards[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(carousel).gap) || 16;
      const activeIndex = Math.round(scrollLeft / (cardWidth + gap));
      dots.forEach((d, i) => d.classList.toggle("active", i === activeIndex));
      ticking = false;
    });
  });
})();

// Generic carousel with arrows + dots (vehagita.html)
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".carousel__track");
  const dotsContainer = carousel.querySelector(".carousel__dots");
  const prevBtn = carousel.querySelector(".carousel__btn--prev");
  const nextBtn = carousel.querySelector(".carousel__btn--next");
  if (!track || !dotsContainer) return;

  const isFullWidth = track.classList.contains("carousel__track--full");
  const slides = Array.from(track.children);
  if (slides.length < 2) return;

  // For full-width carousels, each slide = 1 page.
  // For multi-item carousels, we calculate pages based on visible width.
  function getPageCount() {
    if (isFullWidth) return slides.length;
    const trackWidth = track.clientWidth;
    const totalScroll = track.scrollWidth;
    return Math.max(1, Math.ceil(totalScroll / trackWidth));
  }

  function getCurrentPage() {
    if (isFullWidth) {
      const slideWidth = slides[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      return Math.round(track.scrollLeft / (slideWidth + gap));
    }
    const trackWidth = track.clientWidth;
    const maxScroll = track.scrollWidth - trackWidth;
    if (maxScroll <= 0) return 0;
    const pages = getPageCount();
    return Math.round((track.scrollLeft / maxScroll) * (pages - 1));
  }

  function scrollToPage(page) {
    if (isFullWidth) {
      const slideWidth = slides[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      track.scrollTo({ left: page * (slideWidth + gap), behavior: "smooth" });
    } else {
      const pages = getPageCount();
      const maxScroll = track.scrollWidth - track.clientWidth;
      const target = pages <= 1 ? 0 : (page / (pages - 1)) * maxScroll;
      track.scrollTo({ left: target, behavior: "smooth" });
    }
  }

  function buildDots() {
    dotsContainer.innerHTML = "";
    const pages = getPageCount();
    const current = getCurrentPage();
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement("button");
      dot.className = "carousel__dot" + (i === current ? " active" : "");
      dot.setAttribute("aria-label", "Go to page " + (i + 1));
      dot.addEventListener("click", () => scrollToPage(i));
      dotsContainer.appendChild(dot);
    }
    updateButtons(current, pages);
  }

  function updateButtons(current, pages) {
    if (prevBtn) prevBtn.disabled = current <= 0;
    if (nextBtn) nextBtn.disabled = current >= pages - 1;
  }

  function syncDots() {
    const pages = getPageCount();
    const current = getCurrentPage();
    const dots = dotsContainer.querySelectorAll(".carousel__dot");
    // Rebuild if page count changed (resize)
    if (dots.length !== pages) {
      buildDots();
      return;
    }
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
    updateButtons(current, pages);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const current = getCurrentPage();
      if (current > 0) scrollToPage(current - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const current = getCurrentPage();
      const pages = getPageCount();
      if (current < pages - 1) scrollToPage(current + 1);
    });
  }

  let ticking = false;
  track.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      syncDots();
      ticking = false;
    });
  });

  // Rebuild dots on resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildDots, 150);
  });

  buildDots();
});

