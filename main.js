Webcam.set({
    width: 350,
    height: 300,
    image_format:'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera")

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="' + data_uri + '">';
    })
}
console.log('ml5.version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/UD1i3Cush/model.json', modelLoaded);

function modelLoaded(){
    console.log('modelLoaded')
}

function speak(){
    synth = window.speechSynthesis;
    speak_data = "The Prediction Is " + prediction;
    uttarThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(uttarThis);
}

function check(){
    img = document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak()
        if(results[0].label == "Peace"){
            document.getElementById("update_emoji").innerHTML = "&#9996";
        }
        if(results[0].label == "Thumbs Up"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "Thumbs Down"){
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
    }
}