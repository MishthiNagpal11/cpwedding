/* ===== EDIT ME ===== */
const CFG = {
  groom: "Chirag",
  bride: "Parnika",
  year: 2026, // confirm the wedding year
  tz: "+05:30", // timezone of the venue
  startTime: "00:00", // first event start (HH:MM) for the countdown
  familyLines: [
    "With the blessings of the Almighty ",
    "Smt. Veera Devi & Late Sh. Brij Lal Takkar",
  ],
  familyNames: ["Mrs. Shammi & Mr. Mahesh Takkar"],
  brideFamily: "D/O Mrs. Ruchi & Mr. Dinesh Harjai",
  familyHeading: "Takkar Family",
  events: [
    {
      cls: "s",
      t: "Palms of Promise",
      d: "An enchanting evening of music, dance and unforgettable memories.",
      date: "1<sup>st</sup> December",
      time: "11:00 AM",
      venue: "The Page, Rohtak",
    },
    {
      cls: "r",
      t: "Midnight Dance Soiree",
      d: "A golden promise exchanged by candlelight, among flowers and family.",
      date: "1<sup>st</sup> December",
      time: "7:30 PM",
      venue: "The Page, Rohtak",
    },
    {
      cls: "h",
      t: "Mohey Rang-De",
      d: "A pop of hot pink for her, a touch of lavender for him.",
      date: "2<sup>nd</sup> December",
      time: "11:00 AM",
      venue: "The Page, Rohtak",
    },
    {
      cls: "w",
      t: "Golden Hour- Vows & Vidaai",
      d: "Two hearts, one forever, surrounded by the people we love.",
      date: "2<sup>nd</sup> December",
      time: "7:00 PM",
      venue: "Zorbagh Banquet, Rohtak",
    },
  ],

  venues: [
    {
      id: "venue1",
      title: "Where We Begin",
      name: "The Page",
      city: "Rohtak, Haryana",
      mapUrl: "https://maps.app.goo.gl/4jkMCLsJFJkvtWLP6",
      image: "images/thePage.jpg",
    },
    {
      id: "venue2",
      title: "Where We Continue",
      name: "Zorbagh Banquet",
      city: "Rohtak, Haryana",
      mapUrl: "https://maps.app.goo.gl/Cwbtrp21qiRQL9d69",
      image: "images/zorbagh.jpg",
    },
  ],

  hashtag: "#HumPARCHhayaIshq",
  images: { sky: "", haldi: "", sangeet: "", ring: "", wedding: "", venue: "" }, // optional: paste image URLs / data URIs to replace the drawn backgrounds
};
/* ==================== */
const $ = (id) => document.getElementById(id),
  Y = CFG.year;
$("n1").textContent = CFG.groom;
$("n2").textContent = CFG.bride;
$("fam").innerHTML =
  CFG.familyLines.map((l) => `<div>${l}</div>`).join("") +
  '<div style="margin-top:8px"><b>' +
  "Mrs. Shammi & Mr. Mahesh Takkar</b></div><div>request the honour of your presence at the wedding ceremony of their beloved son</div>";
$("bf").textContent = CFG.brideFamily;
$("dt").textContent = "2nd December " + Y;
$("fn").textContent = CFG.groom + " & " + CFG.bride;
$("fd").textContent = "1st & 2nd December " + Y;
$("fh2").textContent = CFG.hashtag;
$("fh").textContent = CFG.familyHeading;

/* Render both venue sections in CFG.venues order */
const venueSections = document.querySelectorAll(".venue-section");

CFG.venues.forEach((venue, index) => {
  const section = venueSections[index];

  // Skip if the matching HTML section doesn't exist.
  if (!section) return;

  const title = section.querySelector("h2");
  const name = section.querySelector("h3");
  const location = section.querySelector(".venue-location");
  const directions = section.querySelector(".directions-btn");
  const number = section.querySelector(".venue-number");

  if (title) title.textContent = venue.title;
  if (name) name.textContent = venue.name;
  if (location) location.textContent = venue.city;

  if (directions && venue.mapUrl) {
    directions.href = venue.mapUrl;
    directions.target = "_blank";
    directions.rel = "noopener noreferrer";
  }

  if (number) {
    number.textContent = String(index + 1).padStart(2, "0");
  }

  if (venue.image) {
    section.style.setProperty("--venue-image", `url("${venue.image}")`);
  }
});

$("ev").innerHTML = CFG.events
  .map(
    (e) =>
      `<article class="ec rv ${e.cls}"><div><h3>${e.t}</h3><p>${e.d}</p><div class="m"><span><i>DATE</i>${e.date}</span><span><i>TIME</i>${e.time}</span></div></div></article>`,
  )
  .join("");
const I = CFG.images;
if (I.sky) $("sky").style.background = `url(${I.sky}) center/cover`;
[
  ["haldi", ".h"],
  ["sangeet", ".s"],
  ["ring", ".r"],
  ["wedding", ".w"],
].forEach(([k, s]) => {
  if (I[k]) {
    const el = document.querySelector(".ec" + s);
    if (el) el.style.backgroundImage = `url(${I[k]})`;
  }
});

/* envelope */
const env = $("env");
env.addEventListener("click", () => {
  if (env.classList.contains("open")) return;
  env.classList.add("open");
  setTimeout(() => document.body.classList.remove("lock"), 1500);
});

/* countdown */
const target = new Date(`${Y}-12-01T${CFG.startTime}:00${CFG.tz}`);
const cd = $("cd");
cd.innerHTML = ["DAYS", "HOURS", "MINUTES", "SECONDS"]
  .map((l) => `<div><b>0</b><span>${l}</span></div>`)
  .join("");
const nums = cd.querySelectorAll("b");
function tick() {
  let d = Math.max(0, target - Date.now()) / 1000;
  const v = [
    Math.floor(d / 86400),
    Math.floor((d % 86400) / 3600),
    Math.floor((d % 3600) / 60),
    Math.floor(d % 60),
  ];
  v.forEach((n, i) => (nums[i].textContent = String(n).padStart(2, "0")));
}
tick();
const timer = setInterval(tick, 1000);
addEventListener("pagehide", () => clearInterval(timer));

/* scratch */
(function () {
  const cv = $("cv"),
    card = $("card"),
    x = cv.getContext("2d");
  let w,
    h,
    down = false,
    n = 0;
  function fit() {
    const b = card.getBoundingClientRect();
    w = cv.width = b.width;
    h = cv.height = b.height;
    const g = x.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#DB8FA4");
    g.addColorStop(1, "#D3849B");
    x.globalCompositeOperation = "source-over";
    x.fillStyle = g;
    x.fillRect(0, 0, w, h);
  }
  fit();
  function sc(e) {
    const b = cv.getBoundingClientRect();
    x.globalCompositeOperation = "destination-out";
    x.beginPath();
    x.arc(e.clientX - b.left, e.clientY - b.top, 22, 0, 7);
    x.fill();
    if (++n % 8 == 0) chk();
  }
  function chk() {
    const d = x.getImageData(0, 0, w, h).data;
    let c = 0;
    for (let i = 3; i < d.length; i += 64) if (!d[i]) c++;
    if (c / (d.length / 64) > 0.4) card.classList.add("done");
  }
  cv.addEventListener("pointerdown", (e) => {
    down = true;
    cv.setPointerCapture(e.pointerId);
    sc(e);
  });
  cv.addEventListener("pointermove", (e) => {
    if (down) sc(e);
  });
  ["pointerup", "pointercancel"].forEach((t) =>
    cv.addEventListener(t, () => {
      down = false;
      chk();
    }),
  );
  cv.tabIndex = 0;
  cv.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.classList.add("done");
    }
  });
})();

/* reveal + parallax */
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.15 },
);
document.querySelectorAll(".rv").forEach((el) => io.observe(el));
const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
if (!rm)
  addEventListener(
    "scroll",
    () => {
      const s = $("welcome");
      const o = -s.getBoundingClientRect().top * 0.15;
      $("sky").style.transform = `translateY(${o}px)`;
    },
    { passive: true },
  );

document.addEventListener("DOMContentLoaded", () => {
  const venueSections = document.querySelectorAll(".venue-section");

  // Reveal each venue as it enters the screen.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    venueSections.forEach((section) => {
      observer.observe(section);
    });
  } else {
    venueSections.forEach((section) => {
      section.classList.add("is-visible");
    });
  }
});

/* music (generated soft tones — no audio file needed) */
(function () {
  const b = $("mus");
  let ac,
    t,
    on = false,
    i = 0;
  const N = [
    261.6, 329.6, 392, 523.3, 392, 329.6, 293.7, 349.2, 440, 587.3, 440, 349.2,
  ];
  function note() {
    const o = ac.createOscillator(),
      g = ac.createGain();
    o.type = "sine";
    o.frequency.value = N[i++ % N.length];
    g.gain.setValueAtTime(0, ac.currentTime);
    g.gain.linearRampToValueAtTime(0.09, ac.currentTime + 0.08);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 1.6);
    o.connect(g).connect(ac.destination);
    o.start();
    o.stop(ac.currentTime + 1.7);
  }
  b.addEventListener("click", () => {
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      if (!on) {
        ac.resume();
        note();
        t = setInterval(note, 700);
      } else clearInterval(t);
      on = !on;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on);
      b.setAttribute("aria-label", on ? "Pause music" : "Play music");
    } catch (e) {}
  });
})();

(() => {
  const button = document.getElementById("mus");
  if (!button) return;

  let player;
  let ready = false;
  let playing = false;

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player("youtube-player", {
      width: "1",
      height: "1",
      videoId: "R9dPK8j-QUk",
      playerVars: {
        autoplay: 0,
        controls: 0,
        playsinline: 1,
      },
      events: {
        onReady: () => {
          ready = true;
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.ENDED) {
            playing = false;
            button.classList.remove("on");
            button.setAttribute("aria-pressed", "false");
          }
        },
      },
    });
  };

  button.addEventListener("click", () => {
    if (!ready) {
      alert("Music is loading. Please tap again in a moment!");
      return;
    }

    if (playing) {
      player.pauseVideo();
      playing = false;
    } else {
      player.playVideo();
      playing = true;
    }

    button.classList.toggle("on", playing);
    button.setAttribute("aria-pressed", String(playing));
    button.setAttribute("aria-label", playing ? "Pause music" : "Play music");
  });
})();
