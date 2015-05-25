describe("popup", function(){
    beforeEach(function(){
      hookfy.initialize("token_1");
      hookfy.feedback();
      popup = document.getElementById("__hookfy_popup");
    });

    it("should create popup", function(){
      expect(popup).not.toBeNull();
    });

     it("should be stylized", function(){
      var style = "display: block; width: 300px; height: 400px; margin-left: auto; margin-right: auto; background-color: #fff";
      expect(popup.getAttribute('style')).toEqual(style);
    });
});