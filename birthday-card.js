const scene = document.querySelector(".scene");
const card = document.querySelector("#card");
const openButton = document.querySelector("#openCard");
const leftStars = document.querySelector("#leftStars");
const rightStars = document.querySelector("#rightStars");
const messageLayer = document.querySelector("#messageLayer");
const messageText = document.querySelector("#messageText");

const starContents = [
  { type: "text", text: "Feliz cumpleaños" },
  { type: "image", src: "./star-assets/letterforCintia.png", alt: "letterforcintia" },
  { type: "image", src: "./star-assets/KTUB4397.GIF", alt: "生日 GIF" },
  { type: "image", src: "./star-assets/IMG_1129.JPG", alt: "照片 1" },
  { type: "image", src: "./star-assets/IMG_2610.JPG", alt: "照片 2" },
  { type: "image", src: "./star-assets/IMG_2704.JPG", alt: "照片 3" },
  { type: "image", src: "./star-assets/IMG_2695.JPG", alt: "照片 4" },
  { type: "image", src: "./star-assets/christmas-drinks.jpg", alt: "照片 5" },
  { type: "image", src: "./star-assets/mirror-friends.png", alt: "镜子合照" },
  { type: "image", src: "./star-assets/friends-group.JPG", alt: "朋友合照" }
];

const starPlan = [
  { page: "left", x: 28, y: 31, size: "72px", color: "#f6c842", rot: "-18deg", stroke: "102deg", delay: "1.0s", float: ["10px", "14px", "7px", "9px", "4px", "12px", "5deg", "3deg", "2deg", "4.6s", "0.1s"] },
  { page: "left", x: 63, y: 72, size: "46px", color: "#62aeca", rot: "23deg", stroke: "18deg", delay: "1.12s", float: ["7px", "9px", "11px", "6px", "8px", "5px", "4deg", "5deg", "3deg", "3.8s", "0.7s"] },
  { page: "right", x: 18, y: 19, size: "42px", color: "#e86e5a", rot: "-22deg", stroke: "96deg", delay: "1.04s", float: ["8px", "12px", "5px", "10px", "10px", "4px", "6deg", "3deg", "4deg", "4.1s", "0.4s"] },
  { page: "right", x: 56, y: 16, size: "76px", color: "#f6c842", rot: "10deg", stroke: "28deg", delay: "1.16s", float: ["13px", "8px", "10px", "14px", "5px", "10px", "3deg", "6deg", "4deg", "5.2s", "1.1s"] },
  { page: "right", x: 84, y: 31, size: "34px", color: "#8eb45b", rot: "-11deg", stroke: "112deg", delay: "1.28s", float: ["6px", "10px", "8px", "5px", "11px", "8px", "7deg", "4deg", "5deg", "3.5s", "0.2s"] },
  { page: "right", x: 31, y: 43, size: "60px", color: "#9d6a98", rot: "27deg", stroke: "36deg", delay: "1.4s", float: ["12px", "11px", "6px", "13px", "9px", "7px", "5deg", "7deg", "3deg", "4.8s", "0.9s"] },
  { page: "right", x: 72, y: 52, size: "50px", color: "#62aeca", rot: "-26deg", stroke: "100deg", delay: "1.52s", float: ["9px", "7px", "12px", "9px", "6px", "13px", "4deg", "6deg", "5deg", "3.9s", "1.4s"] },
  { page: "right", x: 17, y: 78, size: "68px", color: "#8eb45b", rot: "8deg", stroke: "18deg", delay: "1.64s", float: ["14px", "10px", "9px", "8px", "12px", "11px", "3deg", "5deg", "6deg", "5.6s", "0.5s"] },
  { page: "right", x: 48, y: 70, size: "38px", color: "#e86e5a", rot: "-15deg", stroke: "118deg", delay: "1.76s", float: ["7px", "13px", "10px", "6px", "5px", "9px", "8deg", "3deg", "4deg", "3.7s", "1.0s"] },
  { page: "right", x: 86, y: 82, size: "58px", color: "#f6c842", rot: "21deg", stroke: "32deg", delay: "1.88s", float: ["11px", "8px", "13px", "12px", "7px", "6px", "4deg", "7deg", "5deg", "4.4s", "1.7s"] }
];

let audioContext;
let isOpening = false;

function playBirthdaySong() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return 0;

  audioContext ||= new AudioContext();
  const now = audioContext.currentTime + 0.04;
  const notes = [
    ["G4", 0, 0.24], ["G4", 0.3, 0.24], ["A4", 0.6, 0.52], ["G4", 1.2, 0.52],
    ["C5", 1.8, 0.52], ["B4", 2.4, 0.95],
    ["G4", 3.6, 0.24], ["G4", 3.9, 0.24], ["A4", 4.2, 0.52], ["G4", 4.8, 0.52],
    ["D5", 5.4, 0.52], ["C5", 6.0, 0.95],
    ["G4", 7.2, 0.24], ["G4", 7.5, 0.24], ["G5", 7.8, 0.52], ["E5", 8.4, 0.52],
    ["C5", 9.0, 0.52], ["B4", 9.6, 0.52], ["A4", 10.2, 1.0],
    ["F5", 11.4, 0.24], ["F5", 11.7, 0.24], ["E5", 12.0, 0.52], ["C5", 12.6, 0.52],
    ["D5", 13.2, 0.52], ["C5", 13.8, 1.15]
  ];

  notes.forEach(([note, start, length]) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "triangle";
    osc.frequency.value = noteFrequency(note);
    gain.gain.setValueAtTime(0.0001, now + start);
    gain.gain.exponentialRampToValueAtTime(0.18, now + start + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + start + length);
    osc.connect(gain).connect(audioContext.destination);
    osc.start(now + start);
    osc.stop(now + start + length + 0.05);
  });

  const lastNote = notes[notes.length - 1];
  return (lastNote[1] + lastNote[2]) * 1000;
}

function noteFrequency(note) {
  const match = note.match(/^([A-G])(#?)(\d)$/);
  const semitones = { C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2 };
  const [, name, sharp, octave] = match;
  const distance = semitones[name] + (sharp ? 1 : 0) + (Number(octave) - 4) * 12;
  return 440 * 2 ** (distance / 12);
}

function createStars() {
  starPlan.forEach((star, index) => {
    const button = document.createElement("button");
    button.className = "book-star";
    button.type = "button";
    button.setAttribute("aria-label", `打开第 ${index + 1} 颗星星的内容`);
    button.style.left = `${star.x}%`;
    button.style.top = `${star.y}%`;
    button.style.background = star.color;
    button.style.setProperty("--size", star.size);
    button.style.setProperty("--rot", star.rot);
    button.style.setProperty("--stroke-angle", star.stroke);
    button.style.setProperty("--delay", star.delay);
    button.style.setProperty("--float-x", star.float[0]);
    button.style.setProperty("--float-y", star.float[1]);
    button.style.setProperty("--float-x2", star.float[2]);
    button.style.setProperty("--float-y2", star.float[3]);
    button.style.setProperty("--float-x3", star.float[4]);
    button.style.setProperty("--float-y3", star.float[5]);
    button.style.setProperty("--float-r", star.float[6]);
    button.style.setProperty("--float-r2", star.float[7]);
    button.style.setProperty("--float-r3", star.float[8]);
    button.style.setProperty("--float-duration", star.float[9]);
    button.style.setProperty("--float-offset", star.float[10]);
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      showContent(starContents[index]);
    });

    const page = star.page === "left" ? leftStars : rightStars;
    page.append(button);
  });
}

function openCard() {
  if (scene.classList.contains("is-open") || isOpening) return;
  isOpening = true;
  scene.classList.add("is-playing");
  const songDuration = playBirthdaySong();
  window.setTimeout(() => {
    scene.classList.remove("is-playing");
    scene.classList.add("is-open");
    card.setAttribute("aria-expanded", "true");
  }, songDuration || 900);
}

function showContent(content) {
  messageText.replaceChildren();
  messageText.parentElement.classList.toggle("message-card--image", content.type === "image");

  if (content.type === "image") {
    const image = document.createElement("img");
    image.src = content.src;
    image.alt = content.alt;
    messageText.append(image);
  } else {
    messageText.textContent = content.text;
  }

  messageLayer.classList.add("is-visible");
  messageLayer.setAttribute("aria-hidden", "false");
}

function hideMessage() {
  messageLayer.classList.remove("is-visible");
  messageLayer.setAttribute("aria-hidden", "true");
  messageText.parentElement.classList.remove("message-card--image");
}

createStars();
openButton.addEventListener("click", openCard);
openButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openCard();
  }
});
messageLayer.addEventListener("click", hideMessage);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideMessage();
  }
});
