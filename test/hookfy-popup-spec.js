describe("inject template", function(){
    function getContainer(){
      return document.getElementById("__hookfy_container");
    }
    beforeEach(function(){
      hookfy.setTemplate("<h2 id='__hookfy_popup_title'></h2><span id='__hookfy_feature'></span>");
      hookfy.initialize("token_1");
      hookfy.feedback( { title: "Awesome Feature", feature: "Custom Feature" } );
    });

    it("should create popup", function(){
      expect(getContainer().innerHTML).not.toBeNull();
    });

    it("should show popup title", function(){
      var titleElement = '<h2 id="__hookfy_popup_title">Awesome Feature</h2>';
      expect(getContainer().innerHTML).toMatch(titleElement);
    });

    it("should show feature name", function(){
      var titleElement = '<span id="__hookfy_feature">Custom Feature</span>';
      expect(getContainer().innerHTML).toMatch(titleElement);
    });
});