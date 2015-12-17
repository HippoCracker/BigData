$(document).ready(function() {

	var abnormalLineTags = document.getElementsByClassName("abnormal-line");

	var focusedTagIndex = -1;
	var focusedTag = null;

	$("#next-btn").click(function() {
		$(".abnormal-line").removeClass("line-focused");
		var tag = focusedTagByIndex(++focusedTagIndex);
		scrollToTag();
		if (focusedTagIndex > abnormalLineTags.length - 2) {
			focusedTagIndex = abnormalLineTags.length - 2;
			console.log("set to max");
		}
	});

	$("#previous-btn").click(function() {
		$(".abnormal-line").removeClass("line-focused");
		focusedTagByIndex(--focusedTagIndex);
		scrollToTag();
		if (focusedTagIndex < 1) {
			focusedTagIndex = 1;
			console.log("set to 0");
		}
	});

	function scrollToTag() {
		var tagToTop = $(".line-focused").scrollTop();
		console.log(tagToTop);
	}

	function focusedTagByIndex(index) {
		var tag = abnormalLineTags[index];
		var className = tag.className;
		tag.className = className + " line-focused";
	}

	$(".abnormal-line").click(function() {
		$(".abnormal-line").removeClass("line-focused");
		$(this).addClass("line-focused");
		focusedTag = $(this);
	});

	function displayChart() {
		var scope = angular.element($("#page")).scope();
		scope.getCrimeTypeNumber();
		var crimeTypeNum = scope.crimeTypeNum;

		var crimeType = [];
		var number = [];

		for (var i = 0; i < crimeTypeNum.length; i++) {
			crimeType.push(crimeTypeNum[i].name);
			number.push(crimeTypeNum[i].number);
		}

		console.log("crime type");
		console.log(crimeType);
		console.log(number);

		Chart.defaults.global.responsive = true;

		var lineChartConf = $("#line-chart").get(0).getContext("2d");
		var barChartConf = $("#bar-chart").get(0).getContext("2d");

		var data = {
			labels: crimeType,
			datasets: [
				{
					label: "My First dataset",
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: number
				},
				{
					label: "My Second dataset",
					fillColor: "rgba(151,187,205,0.2)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					data: [28, 48, 40, 19, 86, 27, 90]
				}
			]
		};
		var lineChart = new Chart(lineChartConf).Line(data);
		var barChart = new Chart(barChartConf).Bar(data);
	}

	$(".dropdown-menu a, .dropdown-menu label").click(function(event) {
		$(".dropdown-menu").fadeOut(100);
	});

	$(".menu-btn a").click(function(event) {
		event.preventDefault();
		var menu = $("#main-submenu");
		if (menu.is(":visible")) {
			menu.fadeOut(50);
		} else {
			menu.fadeIn(50);
		}
	});

	$("#submit-dropdown-btn").click(function(event) {
		event.preventDefault();
		var menu = $("#upload-submenu");
		if (menu.is(":visible")) {
			menu.fadeOut(50);
		} else {
			menu.fadeIn(50);
		}
	});

	$("#notify-btn").click(function(event) {
		event.preventDefault();
		var menu = $("#notify-submenu");
		if (menu.is(":visible")) {
			menu.fadeOut(50);
		} else {
			menu.fadeIn(50);
		}
	});

	$("#settings-btn").click(function(event) {
		event.preventDefault();
		var menu = $("#settings-submenu");
		if (menu.is(":visible")) {
			menu.fadeOut(50);
		} else {
			menu.fadeIn(50);
		}
	});

	$("#result-label").click(function(event) {
		event.preventDefault();
		$("#download-label").removeClass("active");
		$("#analysis-label").removeClass("active");
		$("#result-label").addClass("active");

		$(".process-results").fadeIn(200);
		$(".download-options-container").hide();
		$(".chart-container").hide();
	});

	$("#download-label").click(function(event) {
		event.preventDefault();
		$("#download-label").addClass("active");
		$("#analysis-label").removeClass("active");
		$("#result-label").removeClass("active");

		$(".process-results").hide();
		$(".chart-container").hide();
		$(".download-options-container").fadeIn("fast");
	});

	$("#analysis-label").click(function(event) {
		event.preventDefault();
		$("#download-label").removeClass("active");
		$("#analysis-label").addClass("active");
		$("#result-label").removeClass("active");


		$(".process-results").hide();
		$(".chart-container").fadeIn(200);
		$(".download-options-container").hide();
		displayChart();
	});

	$("#backtop-btn").click(function() {
		var timer = setInterval(function() {
			var backtop = $(window).scrollTop();
			var speed = backtop / 5;
			$(window).scrollTop(backtop - speed);
			if (backtop == 0) {
				clearInterval(timer);
			}
		}, 30);
	});

	window.onscroll = function() {
		addOrRemoveBacktopBtn();
	};

	function addOrRemoveBacktopBtn() {
		var backtop = $(window).scrollTop();
		var pageLookHeight = document.documentElement.clientHeight;
		var btn = $("#backtop-btn-container");
		if (backtop >= pageLookHeight / 2) {
			btn.fadeIn(400);
		} else {
			btn.fadeOut(400);
		}
	}

});
