var canvas, ctx, classifyButton, clearButton;
var pos = {x:0, y:0};
var rawImage;
const MODEL_URL="http://127.0.0.1:8887/js_model/model.json"
var resultShow=document.querySelector("#resultID")


function setPosition(e){
	pos.x = e.clientX;
	pos.y = e.clientY;
    
}

function draw(e) {
	if(e.buttons!=1) return;
	ctx.beginPath();
	ctx.lineWidth = 15;
	ctx.lineCap = 'round';
	ctx.strokeStyle = 'white';
	ctx.moveTo(pos.x, pos.y);
	setPosition(e);
	ctx.lineTo(pos.x, pos.y);
	ctx.stroke();
	rawImage.src = canvas.toDataURL('image/png');
}

function erase() {
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,280,280);
	resultShow.textContent="Result"
}

function classifyDigit(){
	var raw=tf.browser.fromPixels(rawImage,1)
	var resized=tf.image.resizeBilinear(raw,[28,28]).div(255)
	var tensor=resized.expandDims(0)
	tf.loadLayersModel(MODEL_URL).then((model) =>{
		var pred=model.predict(tensor)
		var pred_digit=tf.argMax(pred,1).dataSync()
		resultShow.textContent=pred_digit
	})
}

function init() {
	canvas = document.querySelector('#myCanvas');
	rawImage = document.querySelector('#canvasImg');
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,280,280);
	canvas.addEventListener("mousemove", draw);
	canvas.addEventListener("mousedown", setPosition);
	canvas.addEventListener("mouseenter", setPosition);
	saveButton = document.querySelector('#classifyID');
	saveButton.addEventListener("click",classifyDigit);
	clearButton = document.querySelector('#eraseID');
	clearButton.addEventListener("click", erase);
}
init();

