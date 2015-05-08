
var XMLHttpRequest = function(){}

describe("Hookfy", function(){
	it ("should exists", function(){
		expect(hookfy).toBeDefined();
	});

	it ("initialize should be defined", function(){
		expect(hookfy.initialize).toBeDefined();
	});

	it ("token should be defined", function(){
		hookfy.initialize("token_1");
		expect(hookfy.getToken).toBeDefined();
		expect(hookfy.getToken()).toEqual("token_1");
	});

	describe("storage", function(){
		beforeEach(function(){
			hookfy.initialize("token_1");
		});

		it ("should store a feedback", function(){
			hookfy.send({feature: "Feature", feeling: "happy"});
			var storage = JSON.parse(localStorage.getItem("__hookfy_feedbacks_storage"));
			expect(storage.length).toEqual(1);
		});

		it ("should store a feedback", function(){
			Storage = undefined;
			hookfy.send({feature: "Feature", feeling: "happy"});
			expect(hookfy.getStorage().length).toEqual(1);
		});
	});
})