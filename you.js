document.querySelector("#box").addEventListener("click", () => {
  window.location.href = "/YouTube/index.html";
});
let videoBoxes = [];
// Making all videoBoxes
for (let i = 0; i < data.length; i++) {
const videoBox = document.createElement('div');
  // Create the main container div with class "videoBox"
  videoBox.className = 'videoBox';

  // Create the img element for the thumbnail
  const thumbnail = document.createElement('img');
  thumbnail.src = data[i].thumbnail;
  videoBox.appendChild(thumbnail);

  // Create the bottom box div with class "bottomBox"
  const bottomBox = document.createElement('div');
  bottomBox.className = 'bottomBox';
  videoBox.appendChild(bottomBox);

  // Create the title box div with class "titleBox"
  const titleBox = document.createElement('div');
  titleBox.className = 'titleBox';
  bottomBox.appendChild(titleBox);

  // Create the paragraph for the video title
  const titlePara = document.createElement('p');
  titlePara.className = 'titlePara';
  titlePara.textContent = data[i].title;
  titleBox.appendChild(titlePara);

  // Create the paragraph for the uploader info
  const uploaderInfo = document.createElement('p');
  uploaderInfo.style.fontSize = '0.8rem';
  uploaderInfo.style.color = '#D4D4D4';
  uploaderInfo.textContent = data[i].channel;
  titleBox.appendChild(uploaderInfo);

  // Create the icon element (i) for additional options
  const optionsIcon = document.createElement('i');
  optionsIcon.className = 'fa-solid fa-ellipsis-vertical';
  optionsIcon.style.fontSize = '0.9rem';
  optionsIcon.style.marginTop = '0.3rem';
  bottomBox.appendChild(optionsIcon);

  // Append the videoBox to the desired parent element in the DOM
  document.querySelector(".videoBoxCon").appendChild(videoBox);
  videoBoxes.push(videoBox);
}
videoBoxes.forEach((videoBox,index)=>{
  videoBox.addEventListener("click",()=>{
    window.location.href = "/YouTube/index.html";
    console.log(homePage)
    let homePage = document.querySelector(".homePage")
    homePage.style.display = "none";
    document.querySelector(".videoCon").style.display = "flex";
  })
})