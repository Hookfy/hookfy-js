var hookfy = (function(){
	'use strinct';
	var _token = null;
	var _storageKey = "__hookfy_feedbacks_storage";
	var _volatile_storage = [];
	var _hookfyContainerId = '__hookfy_container';

	new XMLHttpRequest();
	
	function initialize(token){
		_token = token;
		run();
	}

	function send(feedback){
		storeFeedback(feedback);
	}

	function storeFeedback(feedback){
		var storage = getStorage();
		storage.push(feedback);
		saveStorage(storage);
	}

	function hasLocalStorage(){
		return typeof(Storage) !== "undefined";
	}

	function getStorage(){
		if(hasLocalStorage())
			return JSON.parse(localStorage.getItem(_storageKey)) || [];
		else
			return _volatile_storage;
	}

	function saveStorage(storage){
		if(hasLocalStorage())
			localStorage.setItem(_storageKey, JSON.stringify(storage));
	}

	function getToken(){
		return _token;
	}

	function registerFeedbacks(){
		var storage = getStorage();
		saveStorage([]);
		for (i in storage){
			var feedback = storage[i];
			registerFeedback(feedback);
		}
	}

	function registerFeedback(feedback){
		var http = new XMLHttpRequest();
		http.onreadystatechange = function() {
			if (http.readyState == 4 && !(http.status == 204 || http.status == 200)){
				send(feedback);
			}
		}
		var feedback_url = "http://localhost:3000/feedback/" + _token + "/" + feedback.feature;
		delete feedback.feature;
		http.open("POST", feedback_url, true);
		http.setRequestHeader("Content-Type","application/json");
		http.send(JSON.stringify({feedback: feedback}));
	}

	function run(){
		setInterval( registerFeedbacks, 100);
	}

	function feedback(options){
		var container = retrieveContainer();

		container.innerHTML = '<div id="__hookfy_popup" \
			style="font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif; display: block; width: 300px; height: 400px; position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto; background-color: #fff">\
			<h2>'+ options.title +'</h2>\
		</div>';
	}

	function retrieveContainer(){
		if(!hasContainer())
			return createConainer();
		else
			return document.getElementById(_hookfyContainerId);
	}

	function createConainer(){
		var container = document.createElement('div');
		container.setAttribute('id', _hookfyContainerId);
		container.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.6)');
		document.body.appendChild(container);
		return container;
	}

	function hasContainer(){
		return !!document.getElementById(_hookfyContainerId);
	}

	return {
		initialize : initialize,
		getToken: getToken,
		send: send,
		getStorage: getStorage,
		feedback: feedback
	}
})();

