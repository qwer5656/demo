

let straighth = 300;
let straightw = 250;

let Horizontalh = 250;
let Horizontalw = 600;
let videos = null;


let constraints;
function changemode() {

    constraints = {
        audio: false,
        video: {
            facingMode: "environment"
        }
    };

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function success(stream) {
            videos.srcObject = stream;
            videos.play();
        });
}
function test() {

    if (videos == null) {


        constraints = {
            audio: false,
            video: {
                facingMode: "environment"
            }
        };

        const getFrameFromVideo = (video, canvas) => {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();

            let h = document.documentElement.clientHeight;
            let w = document.documentElement.clientWidth;

            ctx.translate(0, 0);
            ctx.scale(1, 1);

            ctx.drawImage(video, 0, 0, video.width, video.height);
            ctx.restore();
            requestAnimationFrame(() => getFrameFromVideo(video, canvas));
        };

        const getCameraStream = video => {
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(function success(stream) {
                    video.srcObject = stream;
                });
        };

        const createVideo = (id, width, height) => {
            videos = document.createElement("video");
            videos.setAttribute("playsinline", "");
            videos.id = id;
            videos.width = width;
            videos.height = height;
            return videos;
        };

        const createCanvas = (id, width, height) => {
            const canvas = document.getElementById("canvas");
            canvas.id = id;
            canvas.width = width;
            canvas.height = height;
            return canvas;
        };

        const init = () => {
            let h = document.documentElement.clientHeight;
            let w = document.documentElement.clientWidth;

            const video = createVideo("vid", w, h);
            const canvas = createCanvas("canvas", w, h);
            const app = document.getElementById("go");
            getCameraStream(video);
            getFrameFromVideo(video, canvas);
            app.prepend(video);
            //app.appendChild(canvas);
            console.log("init ");
        };

        document.getElementById("app").onload = init();
    }
    videos.play();
    document.querySelector("#opencam").style.display = "none";
    document.querySelector("#capture").style.display = "inline";
}
function startcapture() {
    document.querySelector("#capture").style.display = "none";
    document.querySelector("#textfn").style.display = "flex";
    let i = 3;

    let dp = function () {
        document.querySelector("#textfn").innerText = " " + i;
        setTimeout(function () {
            i -= 1;
            if (i != 0) {

                dp();
            }
            else {
                html2canvas(document.querySelector("#app")).then(canvas => {
                    canvas.id = "save";
                    document.querySelector("#downloadwrap").prepend(canvas);

                    document.querySelector("#downloadimg").style.display = "block";
                    console.log(canvas.width);
                });
                document.querySelector("#go").style.display = "none";
                document.querySelector("#textfn").style.display = "none";
                document.querySelector("#downloadwrap").style.display = "flex";
            }
        }, 1000);
    }
    dp();


}

function download() {
    let image = document.querySelector("#save");

    console.log(image);
    Canvas2Image.saveAsPNG(image, image.width, image.height, "pic");
}
window.onresize = function () {
    let h = document.documentElement.clientHeight;
    let w = document.documentElement.clientWidth;

    if (document.querySelector("#vid") != null) {
        document.querySelector("#vid").setAttribute("width", w);
        document.querySelector("#vid").setAttribute("height", h);
    }

    if (document.querySelector("#canvas") != null) {
        document.querySelector("#canvas").setAttribute("width", w);
        document.querySelector("#canvas").setAttribute("height", h);
    }


    document.querySelector("#background").style.height = h + "px";
    document.querySelector("#background").style.width = w + "px";


}



window.onload = function () {
    document.querySelectorAll(".penguin").forEach(e => {
        e.classList.add("addpenguindown");
    })

    document.querySelectorAll(".turtle").forEach(e => {
        e.classList.add("addturtledown");
    })

    document.querySelectorAll(".imgfns").forEach(e => {
        e.classList.add("addimgfnsdown");
    })
    let h = document.documentElement.clientHeight;
    let w = document.documentElement.clientWidth;
    document.querySelector("#background").style.height = h + "px";
    document.querySelector("#background").style.width = w + "px";


    document.querySelector("#canvas").setAttribute("height", h);
    document.querySelector("#load").style.display = "block";
}


