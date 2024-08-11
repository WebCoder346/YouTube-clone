// making video boxes
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
const playBtn1 = document.querySelector(".playBtn1");
const playBtn2 = document.querySelector(".playBtn2");
let isVideoPlay;

function getIndex() {
  videoBoxes.forEach((videoBox, index) => {
    videoBox.addEventListener("click", () => {
      videoPlayPause(index);
      smallBoxFnc(index);
      document.querySelector(".body").style.display = "none";
      document.querySelector("footer").style.display = "none";
      document.querySelector(".container").style.display = "flex";
      document.querySelector("#video").style.display = "flex";
      playBtn1.classList.remove("fa-play");
      playBtn1.classList.add("fa-pause");
    })
  })
}
getIndex();
btnPlayPause()
// Video Controlors Logic
const videoElement = document.querySelector(".container #video");
let smallBoxVideo = document.querySelector(".smallBoxVideo");
const controlBox = document.querySelector(".container .controlors");
const backwardBtn = document.querySelector(".backward");
const forwardBtn = document.querySelector(".forward");
const settingBox = document.querySelector(".settingCon");


videoElement.addEventListener("click", (event) => {
  controlBox.style.display = "flex";
  setTimeout(() => {
    controlBox.style.display = "none";
  }, 10000);
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

function pauseFnc() {
  if (isVideoPlay) {
    playBtn1.classList.remove("fa-pause");
    playBtn1.classList.add("fa-play");
    playBtn2.classList.remove("fa-pause");
    playBtn2.classList.add("fa-play");
    isVideoPlay = false;
    smallBoxVideo.pause();
    videoElement.pause();
  }
}

function playFnc() {
  if (!isVideoPlay) {
    playBtn1.classList.remove("fa-play");
    playBtn1.classList.add("fa-pause");
    playBtn2.classList.remove("fa-play");
    playBtn2.classList.add("fa-pause");
    isVideoPlay = true;
    smallBoxVideo.play();
    videoElement.play();
  }
}

function videoPlayPause(videoIndex) {
  document.querySelector(".titlePara").textContent = data[videoIndex].title;
  videoElement.src = data[videoIndex].video;
  videoElement.poster = data[videoIndex].thumbnail;
  setTimeout(() => {
    isVideoPlay = true;
    videoElement.play();
  }, 1)
  // btnPlayPause();
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
  })
}
document.addEventListener('keydown', function(event) {
  // 37 39
  try {
    if (event.code === 'Space') {
      event.preventDefault();
      if (videoElement.paused) {
        videoElement.play();
        playFnc();
      } else {
        videoElement.pause();
        pauseFnc();
      }
    }
    else if (event.keyCode === 37) {
      videoElement.currentTime = videoElement.currentTime - 10;
      smallBoxVideo.currentTime = videoElement.currentTime - 10;
    }
    else if (event.keyCode === 39) {
      videoElement.currentTime = videoElement.currentTime + 10;
      smallBoxVideo.currentTime = videoElement.currentTime + 10;

    }
  } catch (e) {
    console.log(e)
  }
});

// setting box code
document.querySelector(".stngBtn").addEventListener("click", (e) => {

  if (settingBox.style.display == "none") {
    settingBox.style.display = "flex";
  } else {
    settingBox.style.display = "none";
  }
  e.stopPropagation();
})
// like dislike function iconBox btn function
let iconBoxBtn = Array.from(document.querySelectorAll(".iconBoxBtn"));
const popupBox = document.querySelector(".popupBox");
iconBoxBtn.forEach((elem) => {
  elem.addEventListener("click", (element) => {
    popupBoxText = element.target.getAttribute("text");
    popupBox.classList.add("popupAnimation");
    console.log(popupBoxText);
    popupBox.textContent = popupBoxText;
    setTimeout(() => {
      popupBox.classList.remove("popupAnimation");
    }, 3000)


    if (element.target.classList.contains("fa-solid")) {
      element.target.classList.remove("fa-solid");
      element.target.classList.add("fa-regular");
    } else {
      element.target.classList.remove("fa-regular");
      element.target.classList.add("fa-solid");
    }
    const likeBtn = document.querySelector(".fa-thumbs-up");
    const dislikeBtn = document.querySelector(".fa-thumbs-down");
    if (likeBtn.classList.contains("fa-solid")) {
      dislikeBtn.addEventListener("click", () => {
        likeBtn.classList.remove("fa-solid");
        likeBtn.classList.add("fa-regular");
      })
    } else if (dislikeBtn.classList.contains("fa-solid")) {
      likeBtn.addEventListener("click", () => {
        dislikeBtn.classList.remove("fa-solid");
        dislikeBtn.classList.add("fa-regular");
      })
    }
  })
})
// video down function
function smallBoxFnc(index) {
  document.querySelector(".downbtn").addEventListener("click", () => {
    smallBoxVideo.poster = data[index].thumbnail;
    smallBoxVideo.src = data[index].video;
    smallBoxVideo.currentTime = videoElement.currentTime;
    if (isVideoPlay) {
      smallBoxVideo.play();
      isVideoPlay = true;
    } else {
      smallBoxVideo.pause();
      isVideoPlay = false;
    }
    const smallBox = document.querySelector(".smallBox");
    document.querySelector(".videoContainer").style.display = "none";
    document.querySelector("footer").style.display = "flex";
    document.querySelector(".smallBoxCon").style.display = "flex";
    document.querySelector(".homePage").style.display = "flex";
  })
}
// small box remove function
document.querySelector(".removeSmallVideoBtn").addEventListener("click", () => {
  videoElement.src = "";
  videoElement.poster = "";
  videoElement.currentTime = 0;
  isVideoPlay = false;
  videoElement.pause();
  document.querySelector(".smallBoxCon").style.display = "none";
  playBtn1 && playBtn2.classList.remove("fa-play");
  playBtn1 && playBtn2.classList.add("fa-pause");
})
// smallbox on click
document.querySelector(".smallBoxCon").addEventListener("click", () => {
  const smallBox = document.querySelector(".smallBox");
  document.querySelector(".videoContainer").style.display = "flex";
  document.querySelector(".smallBoxCon").style.display = "none";
  document.querySelector(".homePage").style.display = "none";
})

function network() {

  function onoffline() {
    const offlineBox = document.querySelector(".offlineBox");
    const offlinePara = document.querySelector(".offlineBox p");
    let firstEnter = true;
    if (navigator.onLine) {
      offlinePara.style.color = "#00FF26";
      offlinePara.textContent = "You are Online...";
      document.querySelector(".loader").style.display = "none";
      setTimeout(() => {
        offlineBox.style.display = "none";
      }, 2000)
    } else {
      offlinePara.style.color = "white";
      offlinePara.textContent = "You are Offline...";
      document.querySelector(".loader").style.display = "flex";
      offlineBox.style.display = "flex";
    }
  }
  onoffline();
  window.addEventListener("online", onoffline);
  window.addEventListener("offline", onoffline);
}
document.querySelector(".icon").addEventListener("click",(e)=>{
  window.location.href = "/YouTube/you.html";
})
