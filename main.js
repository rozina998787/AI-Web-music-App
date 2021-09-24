scoreRightWrist = 0;
scoreLeftWrist = 0;
song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
leftWristX = 0;
leftWristY = 0;
rightWristY = 0;
rightWristX = 0;

function preload() {
  song1 = loadSound("JAM MUSIC.mp3");
  song2 = loadSound("music.mp3");
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function modelLoaded() {
  console.log("Posenet Is Intialized");
}

function draw() {
  image(video, 0, 0, 600, 500);
  song1_status = song1.isPlaying();
  song2_status = song2.isPlaying();
  fill("#00FFFF");
  stroke("#00FFFF");

  if (scoreRightWrist > 0.2) {
    circle(rightWristX, rightWristY, 20);
    song2.stop();
    if (song1_status == false) {
      song1.play();
      document.getElementById("song").innerHTML = "Playing-Just Add Magic";
    }
  }
  if (scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    song1.stop();
    if (song2_status == false) {
      song2.play();
      document.getElementById("song").innerHTML =
        "Playing-Harry Potter Theme Song";
    }
  }
}

function play() {
  song1.play();
  song1.setVolume(1);
  song1.rate(1);

  song2.play();
  song2.setVolume(1);
  song2.rate(1);
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist=" + scoreRightWrist);
    console.log("scoreLeftWrist=" + scoreLeftWrist);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX=" + leftWristX + "leftWristY=" + leftWristY);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX=" + rightWristX + "rightWristY=" + rightWristY);
  }
}
