var hookfy = (function(){
	'use strinct';
	var _token = null;
	var _storageKey = "__hookfy_feedbacks_storage";
	var _volatile_storage = [];
	var _hookfyTemplate = "@@template";
	var _hookfyContainerId = '__hookfy_container';
	var _titleId = '__hookfy_popup_title';
	var _featureId = '__hookfy_feature';
	
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
		setInterval( registerFeedbacks, 1000);
	}

	function feedback(options){
		try{
			validateOptions(options);
			var container = retrieveContainer();
			container.innerHTML = _hookfyTemplate;
			setTitle(container, options.title);
			setFeature(container, options.feature);
		} catch (error){
			console.error(error);
		}
	}

	function setTitle(container, title){
		var titleElement = document.getElementById(_titleId);
		if(titleElement)
			titleElement.innerHTML = title;
	}

	function setFeature(container, feature){
		var featureElement = document.getElementById(_featureId);
		if(featureElement)
			featureElement.innerHTML = feature;
	}

	function validateOptions(options){
		if (!options)
			throw "feedback options can't be blank";

		if (!(options.title || options.title == ''))
			throw "feedback title can't be blank";

		if (!(options.feature || options.feature == ''))
			throw "feedback feature can't be blank";
	}

	function retrieveContainer(){
		if(!hasContainer())
			createConainer();
		
		return document.getElementById(_hookfyContainerId);
	}

	function createConainer(){
		var container = document.createElement('div');
		container.setAttribute('id', _hookfyContainerId);
		document.body.appendChild(container);
	}

	function hasContainer(){
		return !!document.getElementById(_hookfyContainerId);
	}

	function setTemplate(template) {
		_hookfyTemplate = template;
	}

	return {
		initialize : initialize,
		getToken: getToken,
		send: send,
		getStorage: getStorage,
		feedback: feedback,
		setTemplate: setTemplate
	}
})();