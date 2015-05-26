describe("validations", function (){
  beforeEach(function(){
    if(document.getElementById("__hookfy_container"))
      document.body.removeChild(document.getElementById("__hookfy_container"));
    hookfy.initialize("token_1");
  });

  it("should not start feedback without options", function(){
    hookfy.feedback();
    expect(document.getElementById("__hookfy_container")).toBeNull();
  });

  it("should not start feedback without title", function(){
    hookfy.feedback({});
    expect(document.getElementById("__hookfy_container")).toBeNull();
  });

  it("should not start feedback without feature", function(){
    hookfy.feedback({ title: "title" });
    expect(document.getElementById("__hookfy_container")).toBeNull();
  });
});