object = [] ;
status = "";
object_to_find="";

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
}

function start() {
    objectDetector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status1").innerHTML="Status:Detecting Objects";
    object_to_find=document.getElementById("nameofobject").value;
}

function modelloaded() {
    console.log("cocossd is ready");
    status = true;
}

function gotresults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(video,0,0,380,380);
    if(status != "") {
        objectDetector.detect(video,gotresults);
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0;i < object.length;i++) {
            if(object_to_find==object[i].label){
            document.getElementById("status1").innerHTML = "Status = Object mentioned Detcted";
           // document.getElementById("numberofobjects").innerHTML = object.length;
           var synth = window.speechSynthesis;
           speak_1 = "Object Mentioned Found";
           var utterThis = new SpeechSynthesisUtterance(speak_1);

           synth.speak(utterThis);


            fill(r,g,b);
            perscent = floor(object[i].confidence * 100);
            text(object[i].label + "" + perscent + "%", object[i].x + 15,object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);

            
            }
        }
    }
}