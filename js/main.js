

    let straighth = 300;
    let straightw = 250;

    let Horizontalh = 250;
    let Horizontalw = 600;
    let videos = null;
    function test() {

        if (videos == null) {


            const constraints = {
                audio: false,
                video: {
                    facingMode: "user"
                }
            };

            const getFrameFromVideo = (video, canvas) => {
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();
                ctx.translate(video.width, 0);
                ctx.scale(-1, 1);
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
                const canvas = document.createElement("canvas");
                canvas.id = id;
                canvas.width = width;
                canvas.height = height;
                return canvas;
            };

            const init = () => {
                let h = straighth;
                let w = straightw;
                if (document.documentElement.clientWidth  > 600) {
                    h = Horizontalh;
                    w = Horizontalw;
                }
                const video = createVideo("vid", w, h);
                const canvas = createCanvas("canvas", w, h);
                const app = document.getElementById("app");
                getCameraStream(video);
                getFrameFromVideo(video, canvas);
                app.appendChild(video);
                app.appendChild(canvas);
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
                    html2canvas(document.querySelector("#go")).then(canvas => {
                        canvas.id = "save";
                        document.querySelector("#downloadwrap").prepend(canvas);

                        document.querySelector("#downloadimg").style.display = "block";
                        console.log(canvas);
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
        Canvas2Image.saveAsPNG(image);
    }
    window.onresize = function () {
        if (document.documentElement.clientWidth  > 600) {
            if (document.querySelector("#canvas") != null) {
                document.querySelector("#canvas").setAttribute("width", Horizontalw);
                document.querySelector("#vid").setAttribute("width", Horizontalw);

                document.querySelector("#canvas").setAttribute("height", Horizontalh);
                document.querySelector("#vid").setAttribute("height", Horizontalh);
            }

        } else {
            if (document.querySelector("#canvas") != null) {
                document.querySelector("#canvas").setAttribute("width", straightw);
                document.querySelector("#vid").setAttribute("width", straightw);
            }

        }



    }



    
    window.onload = function () {
        document.querySelectorAll(".imgtrans").forEach(e => {
            e.classList.add("adddown");
        })
    }
