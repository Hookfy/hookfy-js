var hookfy = (function(){
	'use strinct';
	var _token = null;
	var _storageKey = "__hookfy_feedbacks_storage";
	var _volatile_storage = [];

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
		http.open("GET", "http://hookfy.com", true);
		http.send(JSON.stringify(feedback));
	}

	function run(){
		setInterval( registerFeedbacks, 100);
	}

	return {
		initialize : initialize,
		getToken: getToken,
		send: send,
		getStorage: getStorage
	}
})();

