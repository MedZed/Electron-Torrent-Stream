var player = document.getElementById("player");

var fadeTime;
var over = false;

var full = false;

var loadCheck;

$("#player").on("loadeddata", updateTime);

loadCheck = setInterval(function(){
	if($("#player").get(0).duration > 0){
		$("#player, #controls").css("pointer-events", "auto");
		if ($("#playercontainer").hasClass("hidden"))
		{player.pause();}
		clearInterval(loadCheck);
	}
}, 100);

$("#player").click(toggleVideo);
$("#playpause").click(toggleVideo);
$("#playercontainer").mousemove(function() {
	$("#controls").show();
	$("#player").css("cursor", "pointer");
	clearTimeout(fadeTime);
	if(!player.paused) {
		fadeTime = setTimeout(function() {
			$("#controls").fadeOut("medium");
			$("#player").css("cursor", "none");
		}, 3000);
	}
});

$("#progressholder").hover(function(e) { over = true; }, function() { over = false; });

$("#progressholder").click(function(e) {
	var pos = e.pageX - 25;
	var prop = (pos + 1) / $("#progressholder").width();
	var prog = prop * player.duration;
	player.currentTime = prog;
	updateProgress();
});

$("#fullscreen").click(function() {
	if(!full) launchIntoFullscreen(document.getElementById("playercontainer"));
	else exitFullscreen(document.getElementById("playercontainer"));
	full = !full;
});

function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

$("#progressholder").mousemove(function(e) { updateOrb(e); });

function toggleVideo() {
	//We're playing
	if(!player.paused) {
		$("#controls").show();
		$("#player").css("cursor", "pointer");
		$("#playpause").attr("class", "fa fa-play");
		player.pause();
	} else {
		$("#controls").fadeOut("medium");
		$("#player").css("cursor", "none");
		$("#playpause").attr("class", "fa fa-pause");
		player.play();
	}
}

function updateProgress() {
	var bp = player.buffered.end(player.buffered.length-1) / player.duration;
	var bw = bp * 100;
	$("#buffered").css("width", bw + "%");

	var p = player.currentTime / player.duration;
	var w = p * 100;
	$("#progress").css("width", w + "%");

	updateTime();

	if(player.ended) {
		$("#playpause").attr("class", "fa fa-repeat");
		$("#controls").show();
		$("#player").css("cursor", "pointer");
		clearTimeout(fadeTime);
	}
}

function updateOrb(e) {
	var pos = e.pageX - 25;
	var prop = pos / $("#progressholder").width();
	var prog = prop * player.duration;
	$("#progressorb").css("margin-left", pos + "px");
}

function updateTime() {
	$("#progresstime").text(player.currentTime.toString().toHHMMSS() + " / " + player.duration.toString().toHHMMSS());
}

setInterval(updateProgress, 100);

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10);
    var minutes = Math.floor(sec_num / 60);
    var seconds = sec_num - (minutes * 60);

    if (seconds < 10) {seconds = "0"+seconds;}
    var time = minutes + ':' + seconds;
    return time;
};
