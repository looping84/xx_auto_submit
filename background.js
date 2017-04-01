
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
var timer = null;
chrome.browserAction.onClicked.addListener(function(tab) {

 //    chrome.browserAction.getBadgeText({},function(txt){
 //    	if (txt != 'on') {
 //    		switchOn()
 //    	} else {
 //    		switchOff()
 //    	}
	// })
});

function switchOn(argument) {
	// chrome.tabs.query({
 //        currentWindow: true
 //    }, function(tabs) {
 //    	console.log(tabs.length)
 //    	for (var i in tabs) {
 //        	// reload(tabs[i])
 //    	}
        
 //    });

    chrome.browserAction.setIcon({
        path: "icon2.png"
    });
    chrome.browserAction.setBadgeText({
    	'text':'on'
    })
}
function switchOff(argument) {
	clearInterval(timer)
    chrome.browserAction.setIcon({
        path: "icon.png"
    });
    chrome.browserAction.setBadgeText({
    	'text':'off'
    })
}


var code = 'window.location.reload();';

function reload(tab) {
	var url = tab.url
	if (url.indexOf("dev.xxzhushou.cn/versionList.html") == -1) {
		return;
	}
	if (timer) {
		clearInterval(timer);
	}
	timer = setInterval(function(){
		console.log('reload')
    	chrome.tabs.executeScript(tab.id, {code: code});
	},30 * 1000)
	
}
