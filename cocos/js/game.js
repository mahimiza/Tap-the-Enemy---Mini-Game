var random = Math.floor((Math.random() * 4) + 1);
var GameLayer = cc.Layer.extend({
  ctor:function(){
      this._super();
      this.init();

  },
  init:function()
 {
    this._super();
    var size = cc.director.getWinSize(); //helps get window size


    // var sprite = cc.Sprite.create("");
    // sprite.setPosition(size.width / 2, size.height / 2);
    // this.addChild(sprite, 0); //numer is the z-index; the more negative the backward it is 

    var sprite = cc.Sprite.create("images/BG-HD.png")
    sprite.setAnchorPoint(cc.p(0.5,0.5));
    sprite.setPosition(cc.p(size.width / 2, size.height / 2));
    this.addChild(sprite, 0);

   

   this._robin = new RobinSprite(res.ROBIN_IMAGE);
    this._robin.x = kRobinStartX;
    this._robin.y = size.height / 2;
    this.addChild(this._robin, kZindexRobin);
    this._robin.setTag(1);
    


    //cc.log("Node Position: " + this._robin.position);
   // console.log('spriteposition' +rp.x.toFixed(2)+ ',' + rp.y.toFixed(2));

         
    //}
  
 },

 onEnter:function()
 {
      this._super();
      cc.eventManager.addListener({
        event:cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan:   this.onTouchBegan,
        onTouchMoved:   this.onTouchMoved,
        onTouchEnded:   this.onTouchEnded
    }, this);
 },

 onTouchBegan:function(touch, event)
 {
   var tp = touch.getLocation();
   console.log('onTouchBegan' +tp.x.toFixed(2)+ ',' + tp.y.toFixed(2));
    this._robin.scheduleOnce(this.remove,0);


   
    return false;
 },

 onTouchMoved:function(touch, event)
 {
   var tp = touch.getLocation();
   console.log('onTouchMoved' +tp.x.toFixed(2)+ ',' + tp.y.toFixed(2));

 },

 onTouchEnded:function(touch, event)
 {
   var tp = touch.getLocation();
   console.log('onTouchEnded' +tp.x.toFixed(2)+ ',' + tp.y.toFixed(2));
 },


remove:function()
{
  
  this.removeChildByTag(1,true);
}


});

GameLayer.scene = function()
{
    var scene = new cc.Scene();
    var layer = new GameLayer();
    scene.addChild(layer);
    return scene;

}
  window.onload = function(){

            var targetWidth = 960;
            var targetHeight = 640;

              cc.game.onStart = function(){

               cc.view.adjustViewPort(false);
               cc.view.setDesignResolutionSize(targetWidth,targetHeight,cc.ResolutionPolicy.SHOW_ALL);
                cc.view.resizeWithBrowserSize(true);
                  //load resources
                  cc.LoaderScene.preload(["images/HelloWorld.png"], function () {
                      
                      cc.director.runScene(GameLayer.scene());
                  }, this);
              };
              cc.game.run("gameCanvas");


              var self = this;

   

          };
