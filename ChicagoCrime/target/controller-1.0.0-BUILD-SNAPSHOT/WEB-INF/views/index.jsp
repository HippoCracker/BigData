<%--
  Created by IntelliJ IDEA.
  User: zongzesheng
  Date: 12/17/15
  Time: 2:03 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en" ng-app="neuApp">
<head>
  <meta charset="UTF-8">
  <title>NEU Smart Engine | Sentence context detection</title>
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="resources/css/style.css">
</head>
<body id="page" ng-controller="MainCtrl">
<header class="nav-bar">
  <div class="wrap">
    <section class="menu-btn">
      <a href="#"><i class="fa fa-list"></i></a>
    </section><!-- menu-btn -->
    <section id="main-submenu" class="dropdown-menu main-menu hide">
      <ul class="menu-options">
        <li><a href="#">No option</a></li>
        <li><a href="#">No option</a></li>
      </ul>
    </section><!-- dropdown-menu main-menu -->
    <nav>
      <section class="left-actions">
        <ul>
          <li><a href="#" class="active">Home</a></li>
          <li><a href="#">Wiki</a></li>
        </ul>
      </section><!-- left-actions -->
      <secion class="right-actions">
        <ul>
          <li><a id="notify-btn"  href="#"><i class="fa fa-bell"></i></a></li>
          <li><a id="settings-btn" href="#"><i class="fa fa-cog"></i></a></li>
        </ul>
      </secion><!-- right-actions -->
      <section id="notify-submenu" class="dropdown-menu notification-menu hide">
        <ul class="menu-options">
          <li><a href="#">No option</a></li>
          <li><a href="#">No option</a></li>
        </ul>
      </section><!-- dropdown-menu notification-menu -->
      <section id="settings-submenu" class="dropdown-menu settings-menu hide">
        <ul class="menu-options">
          <li><a href="#">No option</a></li>
          <li><a href="#">No option</a></li>
        </ul>
      </section><!-- dropdown-menu settings-menu -->
    </nav>
  </div><!-- wrap -->
</header>

<div class="contents">
  <section class="banner">
    <h1><span>Chicago</span> Crime Analysis</h1>
  </section><!-- banner -->
  <section class="form-container">
    <form>
      <section class="form-contents">
        <textarea id="search-text" class="input-text" ng-model="sentence" placeholder="Search by year"></textarea>
        <section class="btn-group">
          <div id="submit-btn" ng-click="getCrimeRecordsByYear($sentence)" class="submit-btn btn">Submit</div>
          <a href="#" id="submit-dropdown-btn" class="drop-down-btn btn"><i class="fa fa-caret-square-o-down"></i></a>
        </section><!-- btn-group -->
      </section><!-- form-contents -->
      <section id="upload-submenu" class="dropdown-menu upload-menu hide">
        <div class="menu-options">
          <div class="file-upload-btn" ng-model="file" ngf-select="uploadFile($file, $invalidFiles)">
            <i class="fa fa-upload"></i> Upload File
          </div>
          <!-- <input type="file" id ="file-upload" name="#"> -->
          <div class="file-upload-btn" ng-model="files" ngf-select="uploadFiles($files)" multiple>
            <i class="fa fa-folder"></i> Multiple Files
          </div>
          <!-- <input type="file" id ="folder-upload" name="#"> -->
        </div><!-- menu-options -->
      </section><!-- dropdown-menu -->
    </form>
  </section><!-- form-contents -->

  <div class="loading-effect-container">
    <div class="loading-effect">
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
      <span class="dots"></span>
    </div>
  </div>

  <div class="wrap">
    <section class="process-results-container">
      <header class="results-nav">
        <nav>
          <ul class="nav-options">
            <li><a id="result-label" href="#" class="left-label active">Result</a></li>
            <li><a id="analysis-label" href="#" class="middle-label">Analysis</a></li>
            <li><a id="download-label" href="#" class="right-label">Download</a></li>
          </ul>
        </nav>
      </header><!-- results-nav -->
      <div class="result-container">
        <section class="process-results">
          <div class="sentence-container" ng-repeat="record in crime_records">
            <div class="line" ng-class="record.arrest ? 'normal-line' : 'abnormal-line'">
              <div class="word-container">
									<span class="word">
										{{record.date}}
										<span class="notation" ng-class="word.tag">{{word.tag}}</span>
									</span><!-- word -->
              </div><!-- word-container -->
              <div class="word-container">
									<span class="word">
										{{record.fbi}}
										<span class="notation" ng-class="word.tag">{{word.tag}}</span>
									</span><!-- word -->
              </div><!-- word-container -->
              <div class="word-container">
									<span class="word">
										{{record.location}}
										<span class="notation" ng-class="word.tag">{{word.tag}}</span>
									</span><!-- word -->
              </div><!-- word-container -->
              <div class="word-container">
									<span class="word">
										{{record.type}}
										<span class="notation" ng-class="word.tag">{{word.tag}}</span>
									</span><!-- word -->
              </div><!-- word-container -->
              <div class="status-icon normal-icon" ng-if="record.arrest == true">
                <i class="fa fa-check"></i>
              </div>
              <div class="status-icon abnormal-icon" ng-if="record.arrest == false">
                <i class="fa fa-times"></i>
              </div>
            </div>
          </div><!-- sentence-container -->
        </section><!-- process-results -->
        <section class="download-options-container hide">
          <ul class="download-options">
            <li><a href="#" class="download-btn">pdf</a></li>
            <li><a href="#" class="download-btn">txt</a></li>
            <li><a href="#" class="download-btn">csv</a></li>
          </ul>
        </section><!-- download-options-container -->
        <section class="chart-container">
          <div class="chart">
            <canvas id="line-chart" class="chart line-chart"></canvas>
          </div><!-- chart -->
          <div class="chart">
            <canvas id="bar-chart" class="chart bar-chart"></canvas>
          </div><!-- chart -->
        </section>
      </div><!-- result-container -->
    </section><!-- process-results-container -->
  </div><!-- wrap -->
</div><!-- contents -->

<div id="nav-btn-container" class="side-btn-container left-side">
  <div id="previous-btn" class="previous-error-btn side-btn"><i class="fa fa-arrow-up"></i></div>
  <div id="next-btn" class="next-error-btn side-btn"><i class="fa fa-arrow-down"></i></div>
</div><!-- side-btn -->

<div id="backtop-btn-container" class="side-btn-container right-side">
  <div id="backtop-btn" class="side-btn"><i class="fa fa-arrow-up"></i></div>
</div><!-- side-btn -->

<footer>
  <div class="wrap">
    <ul>
      <li>
        <a href="http://www.northeastern.edu/graduate/programs/information-systems/#masters" target="_blank">
          MSIS
          <span>|</span>
        </a>
      </li>
      <li>
        <a href="http://www.coe.neu.edu/" target="_blank">
          College Of Engineering
          <span>|</span>
        </a>
      </li>
      <li>
        <a href="http://www.northeastern.edu/" target="_blank">
          Northeastern University
        </a>
      </li>
    </ul>
  </div><!-- wrap -->
</footer>


<!-- bower:js -->
<script src="resources/js/angular.js"></script>
<script src="resources/js/ng-file-upload.js"></script>
<!-- endbower -->

<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="resources/js/dom.js"></script>
<script src="resources/js/controller.js"></script>
<script src="resources/js/Chart.js"></script>

</body>
</html>
