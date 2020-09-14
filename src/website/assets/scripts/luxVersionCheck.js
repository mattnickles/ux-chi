var versions;

if (window.location.hostname === 'assets.ctl.io') {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === XMLHttpRequest.DONE) {
      if (xmlhttp.status === 200) {
        versions = JSON.parse(xmlhttp.responseText);
        if (localStorage.getItem("luxVersions") !== JSON.stringify(versions))  {
          localStorage.setItem("luxVersions", JSON.stringify(versions));
          checkLuxCurrentVersion(versions[0]);
        }
      }
    }
  };

  var time = Date.now();
  xmlhttp.open("GET", "https://assets.ctl.io/lux/versions.json?time="+time, true);
  xmlhttp.send();
}

function fillDropdown() {
  var drop = document.getElementById('versionDropdown');

  while (drop.childNodes.length > 0) {
    drop.removeChild(drop.firstChild);
  }

  for (var version in versions.slice(0, 4)) {
    var versionAnchor = document.createElement('a');

    versionAnchor.setAttribute("href", "https://assets.ctl.io/lux/"+versions[version]);
    versionAnchor.setAttribute("class", "lux-dropdown__menu-item");
    versionAnchor.innerText = "v" + versions[version];
    if (window.luxCurrentVersion === versions[version]) {
      versionAnchor.classList.add('-active');
    }
    drop.appendChild(versionAnchor);
  }
}

function versionCompare(v1, v2) {
  var v1parts = v1.split('.'),
      v2parts = v2.split('.');

  for (var i = 0; i < v1parts.length; ++i) {
      if (v2parts.length == i) {
          return false;
      }

      if (v1parts[i] == v2parts[i]) {
          continue;
      } else if (v1parts[i] > v2parts[i]) {
          return false;
      } else {
          return true;
      }
  }

  return false;
}

function checkLuxCurrentVersion(currentVersion) {
  if (versionCompare(window.luxCurrentVersion, currentVersion)) {
    var docsContainerSelector = document.getElementById('docs-container');
    var luxVersionCheckSelector = document.getElementById('version-check');
    var newVersionMessage = document.createElement('div');

    fillDropdown();
    newVersionMessage.setAttribute("class", "lux-alert -banner -center -info -w--100");
    newVersionMessage.setAttribute("role", "alert");
    newVersionMessage.innerHTML = '<i class="lux-icon lux-alert__icon icon-circle-info -icon--info"></i><div class="lux-alert__content"><p class="lux-alert__text">A new version of Lux is available! &nbsp;<a href="https://assets.ctl.io/lux/'+currentVersion+'">Learn more &#8250;</a></p>';
    while (luxVersionCheckSelector.childNodes.length > 0) {
      luxVersionCheckSelector.removeChild(luxVersionCheckSelector.firstChild);
    }
    luxVersionCheckSelector.appendChild(newVersionMessage, luxVersionCheckSelector.childNodes[0]);
    docsContainerSelector.classList.add("outdated-version");
  }
}
