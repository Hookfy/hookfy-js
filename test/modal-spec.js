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

    it("should by stylized", function(){
      var style = 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%';
      expect(container.getAttribute('style')).toEqual(style);
    });
});