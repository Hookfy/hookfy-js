
var _storageKey = "__hookfy_feedbacks_storage";

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
			localStorage.setItem(_storageKey, '[]');
		});

		it ("should store a feedback", function(){
			hookfy.feedback({feature: "Feature", feeling: "happy"});
			var storage = JSON.parse(localStorage.getItem(_storageKey));
			expect(storage.length).toEqual(1);
		});

		it ("should store a feedback", function(){
			_storage = Storage;
			Storage = undefined;
			hookfy.feedback({feature: "Feature", feeling: "happy"});
			expect(hookfy.getStorage().length).toEqual(1);
			Storage = _storage;
		});

		it ("should store a feedback on empty store", function(){
			localStorage.setItem(_storageKey, null);
			hookfy.feedback({feature: "Feature", feeling: "happy"});
			expect(hookfy.getStorage().length).toEqual(1);
		});
	});
})