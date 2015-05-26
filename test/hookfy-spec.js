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
		assertRequest(4, 204, function(data, http){
			expect(data).toEqual('{"feedback":{"feeling":"sad","comment":"a coment"}}');
			expect(http.headers['Content-Type']).toBeDefined();
			expect(http.headers['Content-Type']).toEqual('application/json');
			expect(http.method).toEqual('POST');
			expect(http.async).toEqual(true);
		});

		hookfy.send({ feeling: "sad", feature: "Feature", comment: "a coment"});
		jasmine.clock().tick(1001);

		expect(hookfy.getStorage().length).toEqual(0);
	});

	it("should survive on api fail", function(){
		assertRequest(4, 404, function(data){
			expect(data).toEqual('{"feedback":{"feeling":"sad","comment":"a coment"}}');
		});
		
		hookfy.send({ feeling: "sad", feature: "Feature", comment: "a coment"});
		jasmine.clock().tick(1001);

		expect(hookfy.getStorage().length).toEqual(1);
	});
});