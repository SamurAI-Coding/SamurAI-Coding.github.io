function tournamentBlock() {
  const xmargin = 80;
  const ymargin = 50;
  const rectWidth = 130;
  const rectHeight = 50;
  const rectFill = 'green';
  const rectStroke = 'lightgreen';
  const nameFill = 'yellow';
  const rectRx = 10;
  const rectRy = 10;
  const buttonRectWidth = 100;
  const buttonRectHeight = 45;
  const buttonRectRx = 10;
  const buttonRectRy = 10;
  const radius = 18;
  const svg = document.getElementById("tournament");
  const ns = svg.namespaceURI;
  const w = window.innerWidth - 20;
  const h = window.innerHeight - 20;
  const xpitch = (w-2*xmargin)/8;
  const ypitch = (h-2*ymargin)/7;
  var entries = [];

  window.addEventListener('resize',
			  function (evt) { location.reload(); });

  if (!sessionStorage.matchesFinished) {
    sessionStorage.matchesFinished = 0;
  }

  svg.setAttribute('width', w);
  svg.setAttribute('height', h);

  const title = document.createElementNS(ns, "text");
  const titleX = w/2;
  const titleY = 45;
  title.setAttribute('font-size', 40);
  title.setAttribute('font-weight', 'bold');
  title.innerHTML =
    "<tspan x='" + titleX + "' y='" + titleY +
    "'>SamurAI Coding</tspan>" +
    "<tspan x='" + titleX + "' dy='1.2em'>" +
    "2017-2018 Final</tspan>";
  title.setAttribute('text-anchor', 'middle');
  title.setAttribute('fill', 'white');
  svg.appendChild(title);

  svg.setAttribute("style", "background:#004000");

  var entryPos = [];

  function entry(cx, cy, p) {
    var rect = document.createElementNS(ns, "rect");
    entryPos[p-1] = [cx, cy];
    rect.setAttribute('x', -rectWidth/2);
    rect.setAttribute('y', -rectHeight/2);
    rect.setAttribute('width', rectWidth);
    rect.setAttribute('height', rectHeight);
    rect.setAttribute('rx', rectRx);
    rect.setAttribute('ry', rectRy);
    rect.setAttribute('fill', rectFill);
    rect.setAttribute('stroke', rectStroke);
    var teamName = teamNames[p-1];
    var nameLabel =  document.createElementNS(ns, "text");
    nameLabel.innerHTML = teamName;
    nameLabel.setAttribute('x', 0);
    nameLabel.setAttribute('y', 0);
    nameLabel.setAttribute('text-anchor', 'middle');
    nameLabel.setAttribute('alignment-baseline', 'central');
    nameLabel.setAttribute('fill', nameFill);
    nameLabel.setAttribute('font-family', 'roman');
    nameLabel.setAttribute('font-weight', 'bold');
    nameLabel.setAttribute('font-size', 24);

    // Adjust label size
    svg.appendChild(nameLabel);
    var bb = nameLabel.getBBox();
    if (bb.width > rectWidth-2*rectRx) {
      nameLabel.setAttribute('textLength', rectWidth-2*rectRx);
      nameLabel.setAttribute('lengthAdjust', 'spacingAndGlyphs');
    }
    svg.removeChild(nameLabel);
    var entry = document.createElementNS(ns, "g");
    entry.appendChild(rect);
    entry.appendChild(nameLabel);
    entries[p-1] = entry;
  }

  function showMatch(m) {
    const p0 = matchTeam0[m];
    const p1 = matchTeam1[m];
    const title = matchTitle(m);
    sessionStorage.raceLog0 = JSON.stringify(raceLogs[p0+"-"+p1]);
    sessionStorage.raceLog1 = JSON.stringify(raceLogs[p1+"-"+p0]);
    sessionStorage.nextPage = window.location.href;
    sessionStorage.gameNumber = 0;
    sessionStorage.gameTitle = title;
    sessionStorage.matchesFinished = m + 1;
    window.location.href = "file:viewer/viewer.html";
  }

  function advanceMatch(m) {
    sessionStorage.matchesFinished = m+1;
    sessionStorage.direction = "forward";
    window.location.href = "file:tournament.html";
    // window.reload();
  }

  function line(x1, y1, x2, y2) {
    var line = document.createElementNS(ns, "line");
    line.setAttribute('x1', x1*xpitch+xmargin);
    line.setAttribute('y1', y1*ypitch+ymargin);
    line.setAttribute('x2', x2*xpitch+xmargin);
    line.setAttribute('y2', y2*ypitch+ymargin);
    line.setAttribute('style', 'stroke:skyblue; stroke-width:3');
    svg.appendChild(line);
    return line;
  }

  for (var k = 0; k != 8; k++) {
    line(0, k, 1, k);
    line(8, k, 7, k);
  }
  for (var k = 0; k != 4; k++) {
    line(1, 2*k, 1, 2*k+1);
    line(1, 2*k+0.5, 2, 2*k+0.5);
    line(7, 2*k, 7, 2*k+1);
    line(7, 2*k+0.5, 6, 2*k+0.5);
  }
  for (var k = 0; k != 2; k++) {
    line(2, 4*k+0.5, 2, 4*k+2.5);
    line(2, 4*k+1.5, 3, 4*k+1.5);
    line(6, 4*k+0.5, 6, 4*k+2.5);
    line(6, 4*k+1.5, 5, 4*k+1.5);
  }
  line(3, 1.5, 3, 5.5);
  line(5, 1.5, 5, 5.5);
  line(3, 3.5, 5, 3.5);
  line(3, 3.5, 4, 4.5).setAttribute('stroke-dasharray', '10,10');
  line(5, 3.5, 4, 4.5).setAttribute('stroke-dasharray', '10,10');

  // participants
  for (var k = 0; k != 8; k++) {
    entry(0, 0, 1);
    entry(0, 1, 16);
    entry(0, 2, 9);
    entry(0, 3, 8);
    entry(0, 4, 5);
    entry(0, 5, 12);
    entry(0, 6, 13);
    entry(0, 7, 4);
    entry(8, 0, 3);
    entry(8, 1, 14);
    entry(8, 2, 11);
    entry(8, 3, 6);
    entry(8, 4, 7);
    entry(8, 5, 10);
    entry(8, 6, 15);
    entry(8, 7, 2);
  }

  function posX(pos) {
    return pos[0]*xpitch + xmargin;
  }

  function posY(pos) {
    return pos[1]*ypitch + ymargin;
  }

  function posTransform(pos) {
    return "translate(" + posX(pos) + "," + posY(pos) + ")";
  }

  const matchPos = [
    [1, 0.5], [1, 2.5], [1, 4.5], [1, 6.5], // First Round
    [7, 0.5], [7, 2.5], [7, 4.5], [7, 6.5],
    [2, 1.5], [2, 5.5], [6, 1.5], [6, 5.5], // Quarterfinal
    [3, 3.5], [5, 3.5],			    // Semifinal
    [4, 4.5],				    // Third-place playoff
    [4, 3.5]];				    // Final

  const matchTeam0 = [];
  const matchTeam1 = [];
  const matchCircles = [];

  function matchTitle(m) {
    return m < 8 ? "First Round" :
      m < 12 ? "Quarterfinal" :
      m < 14 ? "Semifinal" :
      m < 15 ? "Third-Place Playoff" :
      "The Final";
  }

  function match(m, p1, p2) {
    var circle = document.createElementNS(ns, "circle");
    circle.setAttribute('cx', 0);
    circle.setAttribute('cy', 0);
    circle.setAttribute('r', radius);
    circle.setAttribute('stroke', 'lightblue');
    circle.setAttribute('stroke-width', 3);
    circle.setAttribute('fill', 'skyblue');
    circle.setAttribute('transform', posTransform(matchPos[m]));
    circle.addEventListener(
      'click',
      function (event) {
	if (event.shiftKey) {
	  showMatch(m);
	}
      });
    svg.appendChild(circle);
    matchCircles[m] = circle;
  }

  function addMatch(m, p0, p1) {
    matchTeam0[m] = p0;
    matchTeam1[m] = p1;
    match(m, p0, p1);
  }

  // first round
  addMatch(0, 1, 16);
  addMatch(1, 9, 8);
  addMatch(2, 5, 12);
  addMatch(3, 13, 4);
  addMatch(4, 3, 14);
  addMatch(5, 11, 6);
  addMatch(6, 7, 10);
  addMatch(7, 15, 2);

  // quarterfinals
  addMatch(8, 16, 9);
  addMatch(9, 5, 13);
  addMatch(10, 14, 6);
  addMatch(11, 7, 2);

  // semifinals
  addMatch(12, 16, 13);
  addMatch(13, 6, 2);

  // third-place play-off
  addMatch(14, 13, 6);

  // final
  addMatch(15, 16, 2);
  
  const winners = [
    16, 9, 5, 13, 14, 6, 7, 2,	// First Round
    16, 13, 6, 2,		// Quarterfinals
    16, 2,			// Semifinal
    13,				// Third-place Playoff
    2];				// Final

  const matchesFinished = parseInt(sessionStorage.matchesFinished);

  const showAnimation = 
	sessionStorage.direction == "forward" && matchesFinished != 0;
  const positionUpto =
	matchesFinished -
	(showAnimation == "forward" ? 2 : 1);
  for (var m = 0; m < positionUpto; m++) {
    var winner = winners[m]-1;
    entryPos[winner] = matchPos[m];
  }
  for (var k = 0; k != entries.length; k++) {
    entries[k].setAttribute(
      'transform', posTransform(entryPos[k]));
    svg.appendChild(entries[k]);
  }

  if (showAnimation) {
    // Play fanfare
    const audio = new Audio();
    audio.src = "sounds/matchDone.wav";
    audio.volume = 0.8;
    audio.play();
    // Animate the icon of the winning team
    var winner = winners[matchesFinished-1]-1;
    var animated = entries[winner];
    var oldPos = entryPos[winner];
    var newPos = matchPos[matchesFinished-1];
    var oldX = posX(oldPos);
    var oldY = posY(oldPos);
    var newX = posX(newPos);
    var newY = posY(newPos);
    var rep = 100;
    var interval = 10;
    var count = 0;
    var intervalID;
    var lateral = true;
    function showStep () {
      function interpolate(v, w, ratio) {
	return v + (w-v)*ratio;
      }
      count += 1;
      var toX = lateral ? interpolate(oldX, newX, count/rep) : newX;
      var toY = lateral ? oldY : interpolate(oldY, newY, count/rep);
      animated.setAttribute(
	'transform', 'translate(' + toX + ',' + toY + ')');
      if (count == rep) {
	if (lateral) {
	  lateral = false;
	  count = 0;
	} else {
	  clearInterval(intervalID);
	  prepareNextMatch();
	}
      }
    }
    intervalID = setInterval(showStep, interval);
  } else {
    if (!sessionStorage.fanfarePlayed) {
      sessionStorage.fanfarePlayed = true;
      // Play fanfare
      const audio = new Audio();
      audio.src = "sounds/openingFanfare.flac";
      audio.volume = 0.5;
      audio.play();
    }
    prepareNextMatch();
  }

  function prepareNextMatch() {
    function button(x, y, w, h, rx, ry, background, label, func) {
      var buttonRect = document.createElementNS(ns, "rect");
      buttonRect.setAttribute('x', x-w/2);
      buttonRect.setAttribute('y', y-h/2);
      buttonRect.setAttribute('width', w);
      buttonRect.setAttribute('height', h);
      buttonRect.setAttribute('rx', rx);
      buttonRect.setAttribute('ry', ry);
      buttonRect.setAttribute('stroke', 'white');
      buttonRect.setAttribute('stroke-width', 3);
      buttonRect.setAttribute('fill', background);
      var buttonLabel = document.createElementNS(ns, "text");
      buttonLabel.setAttribute('font-size', 30);
      buttonLabel.innerHTML = label;
      buttonLabel.setAttribute('x', x);
      buttonLabel.setAttribute('y', y);
      buttonLabel.setAttribute('width', rectWidth);
      buttonLabel.setAttribute('height', rectHeight);
      buttonLabel.setAttribute('text-anchor', 'middle');
      buttonLabel.setAttribute('dominant-baseline', 'middle');
      buttonLabel.setAttribute('fill', 'white');
      buttonLabel.setAttribute('font-weight', 'bold');
      var button = document.createElementNS(ns, "g");
      button.appendChild(buttonRect);
      button.appendChild(buttonLabel);
      button.addEventListener('click', func);
      button.style.cursor = "pointer";
      svg.appendChild(button);
    }

    if (matchesFinished < 16) {
      matchCircles[matchesFinished].setAttribute('fill', 'magenta');
    }

    button(4*xpitch+xmargin, 6*ypitch+ymargin,
	   buttonRectWidth, buttonRectHeight,
	   buttonRectRx, buttonRectRy,
	   'rgb(128,0,0)',
	   (matchesFinished == 0 ? "Start" :
	    matchesFinished == 16 ? "Results" :
	    "Next"),
	   function (evt) {
	     if (matchesFinished == 16) {
	       location.href = "results.html";
	     } else if (evt.shiftKey) {
	       advanceMatch(matchesFinished);
	     } else {
	       showMatch(matchesFinished);
	     }});
    button(4*xpitch+xmargin, 6.7*ypitch+ymargin,
	   buttonRectWidth, buttonRectHeight,
	   buttonRectRx, buttonRectRy,
	   'rgb(0,0,128)',
	   "Back",
	   function (evt) {
	     if (matchesFinished != 0) {
	       sessionStorage.matchesFinished = matchesFinished - 1;
	       sessionStorage.direction = "backward";
	       location.reload();
	     } else {
	       location.href = "index.html";
	     }
	   }
	  );
  }
}
