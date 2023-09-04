// Initialize predictions with default values
prediction_1 = "Prediction 1 not available";
prediction_2 = "Prediction 2 not available";

// Configure the webcam
Webcam.set({
  width: 350,
  height: 300,
  image_format: 'png',
  png_quality: 90
});

// Get the camera element and attach the webcam
const camera = document.getElementById("camera");
Webcam.attach('#camera');


function capturedImage() {
  Webcam.snap(function(data_uri) {

    document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';


    predictImage(data_uri);
  });
}

console.log('ml5.version', ml5.version);


let classifier;

function modelLoaded() {
  console.log('Model Loaded!');
  console.log('ml5.version:', ml5.version);
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/PR5CNSHpc/model.json");
}


function predictImage(dataUri) {
  classifier.classify(dataUri, gotResult);
}


function speak() {
  synth = window.speechSynthesis;
  speak_data_1 = "The first prediction is: " + prediction_1;
  speak_data_2 = "The second prediction is: " + prediction_2;
  utterThis = new SpeechSynthesisUtterance(speak_data_1 + ". " + speak_data_2);

  synth.speak(utterThis);
}


function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);


    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;


    prediction_1 = results[0].label;
    prediction_2 = results[1].label;


    updateEmojis();
  }
}


function updateEmojis() {
  const updateEmojiElement = document.getElementById("update_emoji");

  if (prediction_1 === "Thumbs Up" || prediction_2 === "Thumbs Up") {
    updateEmojiElement.innerHTML = "&#128077;";
  } else if (prediction_1 === "Peace" || prediction_2 === "Peace") {
    updateEmojiElement.innerHTML = "&#9996;";
  } else if (prediction_1 === "Excellent" || prediction_2 === "Excellent") {
    updateEmojiElement.innerHTML = "&#9994;";
  } else {
    updateEmojiElement.innerHTML = ""; 
  }
}

function prediction2() {
  img = document.getElementById("prediction2");

}
