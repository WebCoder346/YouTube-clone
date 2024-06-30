// // making video boxes
let oneClick = false;
window.ind = [];
let videoBoxes = [];
for (let i = 0; i < data.length; i++) {
  let videoBox = document.createElement("div");
  videoBox.className = "videoBox";
  let img = document.createElement("img");
  img.src = data[i].thumbnail;
  let infoBox = document.createElement("div");
  infoBox.className = "infoBox";
  let titlePara = document.createElement("p");
  titlePara.className = "title";
  titlePara.textContent = data[i].title;
  let infoPara = document.createElement("p");
  infoPara.className = "info";
  infoPara.textContent = data[i].info;
  videoBox.appendChild(img)
  infoBox.appendChild(titlePara);
  infoBox.appendChild(infoPara);
  videoBox.appendChild(infoBox);
  videoBoxes.push(videoBox);
  document.querySelector(".contentCon").appendChild(videoBox);
}

function getIndex() {
  videoBoxes.forEach((videoBox, index) => {
    videoBox.addEventListener("click", () => {
      videoPlayPause(index);
      smallBoxFnc(index);
      document.querySelector(".body").style.display = "none";
      document.querySelector(".container").style.display = "flex";
      document.querySelector("#video").style.display = "flex";
    })
  })
}
getIndex();

// Video Controlors Logic
const videoElement = document.querySelector(".container #video");
const controlBox = document.querySelector(".container .controlors");
const backwardBtn = document.querySelector(".backward");
const forwardBtn = document.querySelector(".forward");
const settingBox = document.querySelector(".settingCon");
let isVideoPlay;

videoElement.addEventListener("click", (event) => {
  controlBox.style.display = "flex";
  setTimeout(() => {
    controlBox.style.display = "none";
  }, 50000);
})
controlBox.addEventListener("click", (event) => {
  if (controlBox.classList.contains("controlBox")) {
    if (controlBox.style.display == "flex" && settingBox.style.display == "flex") {

      settingBox.style.display = "none";
    }
  }
  controlBox.style.display = "none";
})


backwardBtn.addEventListener("click", () => {
  videoElement.currentTime = videoElement.currentTime - 10;
})
forwardBtn.addEventListener("click", () => {
  videoElement.currentTime = videoElement.currentTime + 10;
})

// Range Bar code
const rangeInput = document.getElementById("rangeInput");
const progress = document.getElementById("progress");
const timePara = document.querySelector(".timePara");
videoElement.addEventListener("timeupdate", () => {
  rangeInput.value = (videoElement.currentTime / videoElement.duration) * 100;
  let value = rangeInput.value;
  progress.style.width = (value) + '%';
  timePara.innerText = formatTime(videoElement.currentTime);
});


function formatTime(seconds) {
  let minTime = parseInt(Math.floor(videoElement.currentTime / 60));
  let secTime = parseInt(Math.floor(videoElement.currentTime % 60));
  minTime < 9 ? minTime = `0${minTime}` : minTime = minTime;
  secTime < 9 ? secTime = `0${secTime}` : secTime = secTime;
  let dmt = parseInt(Math.floor(videoElement.duration / 60));
  let dst = parseInt(Math.floor(videoElement.duration % 60));
  dmt < 9 ? dmt = `0${dmt}` : dmt = dmt;
  dst < 9 ? dmt = `0${dst}` : dst = dst;
  return `${minTime}:${secTime}/${dmt}:${dst}`;
}


// protect all btns
const btns = Array.from(document.querySelectorAll(".btn"));
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    event.stopPropagation();
  })
})

rangeInput.addEventListener("change", () => {
  videoElement.currentTime = rangeInput.value * videoElement.duration / 100;
})

// play pauuse btn fnc
const playBtn1 = document.querySelector(".playBtn1");
const playBtn2 = document.querySelector(".playBtn2");

function pauseFnc() {
  playBtn1.classList.remove("fa-pause");
  playBtn1.classList.add("fa-play");
  playBtn2.classList.remove("fa-pause");
  playBtn2.classList.add("fa-play");
  isVideoPlay = false;
  videoElement.pause();
}

function playFnc() {
  playBtn1.classList.remove("fa-play");
  playBtn1.classList.add("fa-pause");
  playBtn2.classList.remove("fa-play");
  playBtn2.classList.add("fa-pause");
  isVideoPlay = true;
  videoElement.play();
}

function videoPlayPause(videoIndex) {
  videoElement.src = data[videoIndex].video;
  videoElement.poster = data[videoIndex].thumbnail;
  setTimeout(() => {
    isVideoPlay = true;
    videoElement.play();
  }, 100)
  btnPlayPause();
}

function btnPlayPause() {
  const playBtns = Array.from(document.querySelectorAll(".playBtn"));
  playBtns.forEach(playPauseBtn => {
    playPauseBtn.addEventListener("click", () => {
      if (isVideoPlay) {
        pauseFnc();
      }
      else {
        playFnc();
      }
    })
    document.addEventListener("keypress", (event) => {
      if (event.keyCode == 32 && isVideoPlay) {
        pauseFnc();
      }
      else if (event.keyCode == 32 && !isVideoPlay) {
        playFnc();
      }
    })
  })
}
// setting box code
document.querySelector(".stngBtn").addEventListener("click", (e) => {

  if (settingBox.style.display == "none") {
    settingBox.style.display = "flex";
  } else {
    settingBox.style.display = "none";
  }
  e.stopPropagation();
})

// video down function
function smallBoxFnc(index) {
  document.querySelector(".downbtn").addEventListener("click", () => {
    let smallBoxVideo = document.querySelector(".smallBoxVideo");
    smallBoxVideo.poster = data[index].thumbnail;
    smallBoxVideo.src = data[index].video;
    smallBoxVideo.play();
    const smallBox = document.querySelector(".smallBox");
    document.querySelector(".videoContainer").style.display = "none";
    smallBox.parentElement.style.display = "flex";
    document.querySelector(".homePage").style.display = "flex";
  })
}