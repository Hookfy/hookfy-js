describe("modal", function(){
    beforeEach(function(){
      hookfy.initialize("token_1");
      hookfy.feedback();
      container = document.getElementById("__hookfy_container");
    });

    it("feedback should be defined", function(){
      expect(hookfy.feedback).toBeDefined();
    });

    it("should create hookfy container", function(){
      expect(container).not.toBeNull();
    });
});