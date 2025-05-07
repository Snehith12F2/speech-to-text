const recordBtn = document.getElementById("recordBtn");
const searchBtn = document.getElementById("searchBtn");
const transcriptDiv = document.getElementById("transcript");
const copyBtn = document.getElementById("copyBtn");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");

let recognition;
let isRecording = false;

if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";
} else {
  alert("Speech recognition not supported in this browser. Try using Google Chrome.");
}

recordBtn.addEventListener("click", () => {
  if (!recognition) return;

  if (isRecording) {
    recognition.stop();
    recordBtn.textContent = "Start Recording";
    recordBtn.classList.remove("recording");
  } else {
    recognition.start();
    recordBtn.textContent = "Stop Recording";
    recordBtn.classList.add("recording");
  }
  isRecording = !isRecording;
});

recognition.onresult = (event) => {
  let transcript = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }
  transcriptDiv.innerHTML = transcript;
};

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(transcriptDiv.innerText);
  alert("Text copied to clipboard");
});

saveBtn.addEventListener("click", () => {
  const blob = new Blob([transcriptDiv.innerText], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "transcript.txt";
  link.click();
});

clearBtn.addEventListener("click", () => {
  transcriptDiv.innerHTML = "";
});

searchBtn.addEventListener("click", () => {
  const query = transcriptDiv.innerText.trim();
  if (query) {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(searchUrl, "_blank");
  } else {
    alert("Please record or enter some text before searching.");
  }
});
