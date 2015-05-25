function removeContainer(){
  if(document.getElementById("__hookfy_container"))
    document.body.removeChild(container);
}

describe("container", function(){
    beforeEach(function(){
      hookfy.initialize("token_1");
      hookfy.feedback( { title: "Title" } );
      container = document.getElementById("__hookfy_container");
    });

    afterEach(function(){
      removeContainer();
    });

    it("feedback should be defined", function(){
      expect(hookfy.feedback).toBeDefined();
    });

    it("should create hookfy container", function(){
      expect(container).not.toBeNull();
    });

    it("should create only one container", function(){
      hookfy.feedback( { title: "Title" } );
      removeContainer();
      expect(document.getElementById("__hookfy_container")).toBeNull();
    });

    it("should by stylized", function(){
      var style = 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.6)';
      expect(container.getAttribute('style')).toEqual(style);
    });
});