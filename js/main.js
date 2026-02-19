// Mobile nav toggle
const toggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.classList.toggle("active", isOpen);
    toggle.setAttribute("aria-expanded", isOpen);
  });
}

// CV dropdown toggle — handle all instances (desktop + mobile)
document.querySelectorAll(".cv-dropdown").forEach((dropdown) => {
  const btn = dropdown.querySelector(".cv-dropdown__btn");
  const menu = dropdown.querySelector(".cv-dropdown__menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    // Close other dropdowns first
    document.querySelectorAll(".cv-dropdown__menu.open").forEach((m) => {
      if (m !== menu) m.classList.remove("open");
    });
    menu.classList.toggle("open");
  });

  menu.addEventListener("click", (e) => e.stopPropagation());
});

document.addEventListener("click", () => {
  document.querySelectorAll(".cv-dropdown__menu.open").forEach((m) => m.classList.remove("open"));
});

// Rotating slogan with binary scramble transition (retargeted to terminal)
const sloganEl = document.querySelector(".terminal__slogan");
if (sloganEl) {
  const phrases = [
    "One developer, one AI teammate, zero limits.",
    "If I can imagine it \u2014 I can ship it.",
    "Armed with Claude Code, there\u2019s no project I can\u2019t build.",
  ];
  let index = 0;
  let isAnimating = false;

  function randomBinary(len) {
    let s = "";
    for (let i = 0; i < len; i++) {
      s += Math.random() < 0.15 ? " " : Math.random() < 0.5 ? "0" : "1";
    }
    return s;
  }

  function scrambleTo(target, done) {
    const len = Math.max(target.length, 30);
    let frame = 0;
    const totalFrames = 18;

    function step() {
      frame++;
      if (frame >= totalFrames) {
        sloganEl.textContent = target;
        sloganEl.classList.remove("slogan--binary");
        done();
        return;
      }
      const revealed = Math.floor((frame / totalFrames) * target.length);
      const real = target.slice(0, revealed);
      const noise = randomBinary(len - revealed);
      sloganEl.textContent = real + noise;
      sloganEl.classList.add("slogan--binary");
      requestAnimationFrame(step);
    }
    step();
  }

  setInterval(() => {
    if (isAnimating) return;
    isAnimating = true;
    const next = (index + 1) % phrases.length;

    const len = Math.max(sloganEl.textContent.length, 30);
    let dissolveFrame = 0;
    const dissolveTotal = 10;

    function dissolve() {
      dissolveFrame++;
      if (dissolveFrame >= dissolveTotal) {
        index = next;
        scrambleTo(phrases[index], () => { isAnimating = false; });
        return;
      }
      sloganEl.textContent = randomBinary(len);
      sloganEl.classList.add("slogan--binary");
      requestAnimationFrame(dissolve);
    }
    dissolve();
  }, 4000);
}

// Terminal typing animation
const terminalLines = document.querySelector(".terminal__lines");
const terminalCursor = document.querySelector(".terminal__cursor");

if (terminalLines) {
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const commands = [
    {
      cmd: "whoami",
      output: "Maayan Margolin \u2014 CS Graduate, Hebrew University",
    },
    {
      cmd: "ls ~/skills",
      outputHTML: [
        '<span class="tag tag--react">React</span>',
        '<span class="tag tag--ts">TypeScript</span>',
        '<span class="tag tag--supabase">Supabase</span>',
        '<span class="tag tag--cloudflare">Cloudflare</span>',
        '<span class="tag tag--playwright">Playwright</span>',
        '<span class="tag" style="background:#fef3c7;color:#92400e;border-color:#fde68a;">Python</span>',
      ].join(" "),
    },
    {
      cmd: "cd ~/projects && ls",
      output: "vehagita/  wordpress-security/  nand2tetris/",
    },
    {
      cmd: "cat status.txt",
      output: "Open to full-stack, backend & security roles",
    },
  ];

  async function typeCommand(text) {
    const lineEl = document.createElement("div");
    lineEl.className = "terminal__line";

    const promptSpan = document.createElement("span");
    promptSpan.className = "terminal__prompt";
    promptSpan.textContent = "$ ";

    const cmdSpan = document.createElement("span");
    cmdSpan.className = "terminal__command";

    lineEl.appendChild(promptSpan);
    lineEl.appendChild(cmdSpan);

    // Insert before cursor
    terminalCursor.before(lineEl);

    for (let i = 0; i < text.length; i++) {
      cmdSpan.textContent += text[i];
      await delay(40);
    }

    await delay(300);
  }

  function showOutput(text, isHTML) {
    const outEl = document.createElement("div");
    outEl.className = "terminal__line terminal__output";
    if (isHTML) {
      outEl.innerHTML = text;
    } else {
      outEl.textContent = text;
    }
    terminalCursor.before(outEl);
  }

  async function runTerminal() {
    await delay(800); // initial pause

    for (const entry of commands) {
      await typeCommand(entry.cmd);
      if (entry.outputHTML) {
        showOutput(entry.outputHTML, true);
      } else {
        showOutput(entry.output, false);
      }
      await delay(600);
    }
  }

  runTerminal();
}
