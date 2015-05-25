function popup(){
  return document.getElementById("__hookfy_popup");
}
describe("popup", function(){
    beforeEach(function(){
      hookfy.initialize("token_1");
    });

    it("should create popup", function(){
      hookfy.feedback( { title: "Title" } );
      expect(popup()).not.toBeNull();
    });

    it("should be stylized", function(){
      hookfy.feedback( { title: "Title" } );
      var style = "font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; display: block; width: 300px; height: 400px; position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto; background-color: #fff";
      expect(popup().getAttribute('style')).toEqual(style);
    });

     it("should create popup title", function(){
      hookfy.feedback( { title: "Popup title" } );
      expect(popup().innerHTML).toMatch("<h2>"+"Popup title"+"</h2>");
    });
});