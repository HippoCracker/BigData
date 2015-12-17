var neuApp = angular.module('neuApp', ['ngFileUpload']);

neuApp.controller('MainCtrl',
		['$scope', 'Upload', '$timeout',function($scope, Upload, $timeout) {
	var data = {"sentences":[
		{
			"status":false,
			"words":[
				{"word":"This","tag":"noun"},
				{"word":"is","tag":"verb"},
				{"word":"good","tag":"Adj"}
			]
		},
		{
			"status":true,
			"words":[
				{"word":"Another","tag":"noun"},
				{"word":"sentence","tag":"verb"},
				{"word":"here","tag":"Adj"}
			]
		},
		{
			"status":true,
			"words":[
				{"word":"Another","tag":"noun"},
				{"word":"sentence","tag":"verb"},
				{"word":"here","tag":"Adj"}
			]
		},
		{
			"status":true,
			"words":[
				{"word":"Another","tag":"noun"},
				{"word":"sentence","tag":"verb"},
				{"word":"here","tag":"Adj"}
			]
		},
		{
			"status":true,
			"words":[
				{"word":"Another","tag":"noun"},
				{"word":"sentence","tag":"verb"},
				{"word":"here","tag":"Adj"}
			]
		},
		{
			"status":false,
			"words":[
				{"word":"Another","tag":"noun"},
				{"word":"sentence","tag":"verb"},
				{"word":"here","tag":"Adj"}
			]
		},
		{
			"status":true,
			"words":[
				{"word":"Another","tag":"noun"},
				{"word":"sentence","tag":"verb"},
				{"word":"here","tag":"Adj"}
			]
		},
		{
			"status":false,
			"words":[
				{"word":"Another","tag":"noun"},
				{"word":"sentence","tag":"verb"},
				{"word":"here","tag":"Adj"}
			]
		},
		{
			"status":false,
			"words":[
				{"word":"Another","tag":"noun"},
				{"word":"sentence","tag":"verb"},
				{"word":"here","tag":"Adj"}
			]
		},
		{
			"status":true,
			"words":[
				{"word":"Another","tag":"noun"},
				{"word":"sentence","tag":"verb"},
				{"word":"here","tag":"Adj"}
			]
		},
		{
			"status":true,
			"words":[
				{"word":"Another","tag":"noun"},
				{"word":"sentence","tag":"verb"},
				{"word":"here","tag":"Adj"}
			]
		}
	]
	};
	$scope.sentences = data.sentences;

	$scope.upload = function(sentence) {
		$(".loading-effect-container").fadeIn(500);
		Upload.upload({
			url: 'php/sentenceupload',
			method: 'POST',
			data: { setence: sentence, ip: 'userip' }
		}).then(function(resp) {
			$(".loading-effect-container").fadeOut(500);

		});
	};

	$scope.uploadFile = function(file, errFiles) {
		$(".loading-effect-container").fadeIn(500);
		$("#upload-submenu").fadeOut(100);
		$(".process-results-container").fadeOut(200);

		$scope.file = file;
		if (file) {
			file.upload = Upload.upload({
				url: 'file_upload',
				method: 'GET',
				headers: {enctype:'multipart/form-data'},
				file: file
			}).then(function (resp) {
				// var data = resp.data;
				// $scope.sentences = data.sentences;
			});
			$scope.$apply();

			$(".loading-effect-container").fadeOut(500);
			$(".process-results-container").fadeIn(200);
			$("#nav-btn-container").fadeIn(600);
			scrollToResult();
		}
	};

	$scope.uploadFiles = function(files) {
		$(".loading-effect-container").fadeIn(500);
		$("#upload-submenu").fadeOut(100);
		$scope.files = files;
		if (files && files.length) {
			Upload.upload({
				url: 'upload',
				fields: {'username': 'zouroto'}, // additional data to send
				file: files
			}).progress(function (evt) {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
			}).success(function (data, status, headers, config) {
				console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
			});
		}
	};


	$scope.getCrimeRecordsByYear = function(year) {
		$(".loading-effect-container").fadeIn(500);
		$("#upload-submenu").fadeOut(100);
		$(".process-results-container").fadeOut(200);

		var crime_year = $("#search-text").val();
		if (crime_year >= 2001 && crime_year <= 2015) {
			console.log("send request");
			$.get("crime_type",
                {year: crime_year})
            .done(function(data) {
				console.log(data);
				$scope.crime_records = data;

				$(".loading-effect-container").fadeOut(500);
				$(".process-results-container").fadeIn(200);
				$("#nav-btn-container").fadeIn(600);
				scrollToResult();
			});

			$scope.$apply();
		}
	};

    $scope.getCrimeTypeNumber = function() {
        $.get("crime_type").done(function(data) {
                console.log(data);
                $scope.crimeTypeNum = data;

            });

        $scope.$apply();
    };

	function scrollToResult() {
		var backtop = $(window).scrollTop();
		var pageLookHeight = document.documentElement.clientHeight;
		$(window).scrollTop(backtop + pageLookHeight / 2 + 50);
	};

}]);