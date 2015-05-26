describe("inject template", function(){
    beforeEach(function(){
      hookfy.initialize("token_1");
    });

    it("should create popup", function(){
      hookfy.feedback( { title: "Title" } );
      container = document.getElementById("__hookfy_container");
      expect(container.innerHTML).toEqual("@@template");
    });
});