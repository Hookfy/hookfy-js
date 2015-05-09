function assertRequest(state, status, mockedSend){
	XMLHttpRequest = function(){}
	XMLHttpRequest.prototype = {
		send : function(data){
			this.readyState = state;
			this.status = status;
			this.onreadystatechange();
			mockedSend(data);
		},
		open : function(method, url, async){}
	}
}