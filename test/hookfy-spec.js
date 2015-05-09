describe("background", function(){
	var timerCallback;
	beforeEach(function() {
		timerCallback = jasmine.createSpy('timerCallback');
		jasmine.clock().install();
		hookfy.initialize("token_1");
		localStorage.setItem(_storageKey, '[]');
	});

	afterEach(function() {
		jasmine.clock().uninstall();
	});

	it("should send to api", function(){
		assertRequest(4, 204, function(data){
			expect(data).toEqual('{"feedback":"sad","feature":"Feature"}');
		});

		hookfy.send({ feedback: "sad", feature: "Feature"});
		jasmine.clock().tick(101);

		expect(hookfy.getStorage().length).toEqual(0);
	});

	it("should survive on api fail", function(){
		assertRequest(4, 404, function(data){
			expect(data).toEqual('{"feedback":"sad","feature":"Feature"}');
		});
		
		hookfy.send({ feedback: "sad", feature: "Feature"});
		jasmine.clock().tick(101);

		expect(hookfy.getStorage().length).toEqual(1);
	});
});