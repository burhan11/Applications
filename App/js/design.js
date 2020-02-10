$(document).ready(function() {
    $("#textinput").on("change", textupload);
    $("#imginput").on("change", imgupload);
    $("#audioinput").on("change", audioupload);
    $("#videoinput").on("change", videoupload);
});

function textupload(event) {
    debugger
    let input = event.target;
    let allfiles = input.files;
    let file = allfiles[0];
    let reader = new FileReader();
    reader.onload = function(event) {
        let result = event.target.result;
        $("#txt").text(result);
    }
    reader.readAsText(file);
}

function imgupload(event) {
    debugger
    let input = event.target;
    let allimages = input.files;
    let image = allimages[0];
    let imgreader = new FileReader();
    imgreader.onload = function(event) {
        let result = event.target.result;
        $("#img").attr("src", `${result}`);
    }
    imgreader.readAsDataURL(image);
}

function audioupload(event) {
    debugger
    let input = event.target;
    let allaudio = input.files;
    let audio = allaudio[0];
    let audioreader = new FileReader();
    audioreader.onload = function(event) {
        let result = event.target.result;
        $("#audio").attr("src", `${result}`);
    }
    audioreader.readAsDataURL(audio);
}

function videoupload(event) {
    debugger
    let input = event.target;
    let allvideo = input.files;
    let video = allvideo[0];
    let videoreader = new FileReader();
    videoreader.onload = function(event) {
        let result = event.target.result;
        $("#video").attr("src", `${result}`);
    }
    videoreader.readAsDataURL(video);
}