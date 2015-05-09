function assertRequest(state, status, mockedSend){
	XMLHttpRequest = function(){}
	XMLHttpRequest.prototype = {
		send : function(data){
			this.readyState = state;
			this.status = status;
			this.onreadystatechange();
			mockedSend(data, this);
		},
		open : function(method, url, async){
			this.url = url;
			this.method = method;
			this.async = async;
		},
		headers : {},
		setRequestHeader : function(key, value){
			this.headers[key] = value;
		}
	}
}