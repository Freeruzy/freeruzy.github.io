
(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
     
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		
		return this;
	};
})(jQuery);

function timeElapse(date){
	var current = Date();
	var seconds = (Date.parse(date) - Date.parse(current)) / 1000;
	if(seconds <= 10 || test)
	{
	    $("#messages").html("<span class=\"count\">" +seconds+ "</span>");
	    if(seconds <= 0 || test){
	        $("#messages").html("新年到了：祝大家（请看大屏幕）");
	        ocas.width = canvas.width = window.innerWidth;
                ocas.height = canvas.height = window.innerHeight;
		clearInterval(time);
	        initAnimate();     
            }
	    return;
	}
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = "<span class=\"digit\">" + days + "</span> days <span class=\"digit\">" + hours + "</span> hours <span class=\"digit\">" + minutes + "</span> minutes <span class=\"digit\">" + seconds + "</span> seconds"; 
	$("#elapseClock").html(result);
}

function showMessages() {
	adjustWordsPosition();
	$('#messages').fadeIn(5000, function() {
	});
}

function adjustWordsPosition() {
	$('#words').css("position", "absolute");
	$('#words').css("top",  195);
	$('#words').css("left", 370);
}

function adjustCodePosition() {
	$('#code').css("margin-top", -100);
}



