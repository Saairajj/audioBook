let audio = document.getElementById('audio')
let initPlay = document.getElementById('playButton')
let audioDisplay = document.getElementById('audioDisplay')
let play = document.getElementById('togglePlay')
let pause = document.getElementById('togglePause')
let stop = document.getElementById('toggleStop')
let playTime = document.getElementById('playTime')
let bookmarkTime = document.getElementById('bookmarkTime')
let playingStat = document.getElementById('playingStat')
let download = document.getElementById('download')

initPlay.addEventListener('click', function(e) {
  let bookmarkedTime;
  if(localStorage.getItem('bookmark') !== null) {
    bookmarkedTime = localStorage.getItem('bookmark')
    audio.currentTime = Math.floor(bookmarkedTime)
  }
  // console.log(bookmarkedTime);
  audioDisplay.style.display = 'block'
  initPlay.style.display = 'none'
  playingStat.innerHTML = '<p>Playing Audiobook...</p>'
  play.style.display = 'none'
  pause.style.display = 'inline'
  audio.play()
})



play.addEventListener('click', function() {
  audio.play();
  play.style.display = 'none'
  pause.style.display = 'inline'
  playingStat.innerHTML = '<p>Playing Audiobook...</p>'
})



pause.addEventListener('click', function() {
  audio.pause();
  play.style.display = 'inline'
  pause.style.display = 'none'
  playingStat.innerHTML = '<p>Audiobook paused</p>'
})


stop.addEventListener('click', function () {
  audio.load()
  play.style.display = 'inline'
  pause.style.display = 'none'
  playingStat.innerHTML = '<p>Play Again</p>'
})



audio.addEventListener('ended', function() {
  audioDisplay.style.display = 'none'
  initPlay.style.display = 'inline-block'
  playingStat.innerHTML = 'Play Again'
})


audio.ontimeupdate = function () {
  
  let currenttime = audio.currentTime

  function secondsToTime(seconds)
  { // day, h, m and s
    seconds = Math.floor(seconds)
    var days     = Math.floor(seconds / (24*60*60));
        seconds -= days    * (24*60*60);
    var hours    = Math.floor(seconds / (60*60));
        seconds -= hours   * (60*60);
    var minutes  = Math.floor(seconds / (60));
        seconds -= minutes * (60);
    return hours+":"+minutes+":"+seconds+"";
  }

  printTime = secondsToTime(currenttime)

  document.getElementById('currentTime').innerHTML = printTime;

}

bookmarkTime.addEventListener('click', function() {
  let bookmarkedTime = audio.currentTime;
  playingStat.innerHTML = `<p>Bookmark added successfully </p>`
  setTimeout(() => {
    playingStat.innerHTML = `<p>Playing Audiobook... </p>`
  },2000)
  localStorage.setItem('bookmark', JSON.stringify(bookmarkedTime));
})


download.addEventListener('click', function() {
  playingStat.innerHTML = `<p>AudioBook will be Downloaded... </p>`
  setTimeout(() => {
    if(audio.paused !== true) {
      playingStat.innerHTML = `<p>Playing Audiobook... </p>`
    } else {
      playingStat.innerHTML = `<p>Audiobook paused </p>`
    }
  },2000)
})




// function storeToLocalStorage(task){
//   let bookmarkedTime;
//   if(localStorage.getItem('bookmark') === null){
//     localStorage.setItem('bookmark', JSON.stringify(bookmarkedTime));
//   }else {

//   }
// };




// let tasks;
// if(localStorage.getItem('tasks') === null){
//   tasks = [];
// }else{
//   tasks = JSON.parse(localStorage.getItem('tasks'));
// };