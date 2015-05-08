var hookfy = (function(){
	'use strinct';
	var _token = null;
	var _storageKey = "__hookfy_feedbacks_storage";
	var _volatile_storage = [];

	function initialize(token){
		_token = token;
		localStorage.setItem(_storageKey, JSON.stringify([]));
	}

	function send(feedback){
		storeFeedback(feedback);
	}

	function storeFeedback(feedback){
		var storage = getStorage();
		storage.push(feedback);
		saveStorage(storage);
	}

	function getStorage(){
		if(typeof(Storage) !== "undefined") {
			return JSON.parse(localStorage.getItem(_storageKey));
		} else {
			return _volatile_storage;
		}
	}

	function saveStorage(storage){
		if(typeof(Storage) !== "undefined") {
			localStorage.setItem(_storageKey, JSON.stringify(storage));
		}
	}

	function getToken(){
		return _token;
	}

	return {
		initialize : initialize,
		getToken: getToken,
		send: send,
		getStorage: getStorage
	}
})();

