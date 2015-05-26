describe("container", function(){
  function removeContainer(){
    if(document.getElementById("__hookfy_container"))
      document.body.removeChild(container);
  }
  beforeEach(function(){
    hookfy.initialize("token_1");
    hookfy.feedback( { title: "Title", feature: "Feature" } );
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
});