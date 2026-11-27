import * as desert from "../scenes/desert.js";
import * as town from "../scenes/town.js";
import * as camp from "../scenes/camp.js";
import * as arena from "../scenes/arena.js";
import { PlayerData } from "../classes/player-data.js";
import { init } from "./init.js";


nn.on('load', () => {
  
  init();
  let playerData = new PlayerData();
  
  
  
  // makeGrid(); // Debug grid with coordinates
  //Tmap holds the tile array, gives the map sprite, etc.
  //It may be easier to have tiles be independednt nodes in a linked list so that positioning is easy and player focused, plus generating new tiles are easy

var Tilenode=function(x,y, xprev=null,yprev=null, xnext=null,ynext=null){
this.x=x;
this.y=y;
this.prevX=xprev;
this.prevY=yprev;
this.nextX=xnext; //holds the next tile in the x direction, so that the player can move to the next tile in the x direction
//and also allows pipes to very easily connect to the next tile in the x direction, and also allows for easy generation of new tiles in the x direction
this.nextY=ynext;
this.dug=false; //whether the tile has been dug or not, so that the player can dig it and get resources, and also allows for easy generation of new tiles in the y direction
this.buildlist=[]; //holds the list of buildings on the tile, so that the player can build buildings on the tile for crafts
this.sourcelinked=false; //basically, if the tile is piped, where does it lead to, if anywhere, false if nothing, true if there is a pipe connecting it someplace, but it links directly to the dest.
//sourcelinked otherwise is a pointer to the nearest tile that it paths to, (as a town or a well only when liked to either otherwise we would be going into depth hell, but it is a pointer)
}
//ok now, handling digging, when a tile is dug, it will be marked as dug, and it will randomly generate what reasoruces the player gets(and the player may or may not strike water as a buildobj so)
Tilenode.prototype.dig=function(){
this.dug=true;
///idk what to add here
this.sprite=add([
  sprite("dugTile"),
  pos(this.x, this.y),
])
//pull the reasource pool, see what we dig up, use a shadow call/placeholder but someone fill this in
resourcevalue=random(1,10); //placeholder for now, but this will be a random value from the resource pool, which will be a list of resources that can be dug up, and the player will get a random amount of that resource, and the resource will be added to the player's inventory
resource[resourcevalue]; //add the resource to the player's inventory, but this will be a random value from the resource pool, which will be a list of resources that can be dug up, and the player will get a random amount of that resource, and the resource will be added to the player's inventory
//if the reasource happens to be a well, then it can be pushed in buildlist with code "well"

if(resourcevalue==10){
  this.buildlist.push("well");
}

Tilenode.prototype.OnInteract=function(){
  //do nothing for now, but this will be a function that is called when the player interacts with the tile, and it will be overridden by the different tile types, like desert, town, camp, arena, etc.
}
Tilenode.prototype.placepipe=function(){


  //place a pipe on the tile, and mark it as piped, and also mark the next tile in the x direction as piped, and also mark the next tile in the y direction as piped, and also mark the previous tile in the x direction as piped, and also mark the previous tile in the y direction as piped, so that the player can easily connect pipes to other tiles
  //this.sourcelinked=true;
  //sourcelinked otherwise is a pointer to the nearest tile that it paths to, (as a town or a well only when liked to either otherwise we would be going into depth hell, but it is a pointer)
  //look for adjacent tiles that are piped, and if there is one, then link to it, otherwise, link to the nearest tile that is piped, and if there is none, then link to the base tile, and if those pipes link to a town or well, create a list of hits where they join to which is what sourcelinked becomes
  //this.sourcelinked will be a pointer to the nearest tile that it paths to, (as a town or a well only when liked to either otherwise we would be going into depth hell, but it is a pointer, or if there is more then one town it can link to, a list of pointers)
//search for adjacent tiles that are piped, and if there is one, then link to it, otherwise, link to the nearest tile that is piped, and if there is none, then link to the base tile, and if those pipes link to a town or well, create a list of hits where they join to which is what sourcelinked becomes

if(this.nextX!=null && this.nextX.sourcelinked!=false){
  
  this.sourcelinked=this.nextX.sourcelinked;

}
var sourceList=[];
 if(this.nextY!=null && this.nextY.sourcelinked!=false){
  sourceList.push(this.nextY.sourcelinked);
}
 if(this.prevX!=null && this.prevX.sourcelinked!=false){
  sourceList.push(this.prevX.sourcelinked);
}
 if(this.prevY!=null && this.prevY.sourcelinked!=false){
  sourceList.push(this.prevY.sourcelinked);
}
 if(sourceList.length===0){
  this.sourcelinked=this;
 }
 for(let i=0; i<sourceList.length; i++){
  if(sourceList[i].tileType==="town" || sourceList[i].tileType==="well"){
    this.sourcelinked+=[sourceList[i]];
  }
}
this.sourcelinked=sourceList;
  //this.sourcelinked=this;
   //placeholder, replace with actual logic

//handle the case where there are multiple adjacent tiles that are piped, and link to the nearest one, and if there is more then one town it can link to, a list of pointers

 Tilenode.baseTile=new Tilenode(0,0,0,0,1,0); //tilenode now has a static attached basetile value from which all other tiles are found
//have different tile types, like desert, town, camp, arena, etc. and have them be generated randomly around the player as they move around the map, the main difference will be an Oninteract prototype function which is blank except for if pipes need repairs or easy sleep in the base case, not with special tiles
var townTile=function(x,y, xprev=null,yprev=null, xnext=null,ynext=null){
Tilenode.call(this,x,y, xprev,yprev, xnext,ynext);
this.tileType="town";
//also has a counter for number of wells connected, has to do with flow rate later, but for now, it is mainly a shortcut so we do not have to traverse
this.wellCount=0;


}
var campTile=function(x,y, xprev=null,yprev=null, xnext=null,ynext=null){
Tilenode.call(this,x,y, xprev,yprev, xnext,ynext);
this.tileType="camp";
this.prototype.OnInteract=function(){
  //do camp stuff
}
}
var arenaTile=function(x,y, xprev=null,yprev=null, xnext=null,ynext=null){
Tilenode.call(this,x,y, xprev,yprev, xnext,ynext);
this.tileType="arena";
this.prototype.OnInteract=function(){
  //do arena stuff
}
}

TownTile.prototype=Object.create(Tilenode.prototype); //inherit from Tilenode, basically the prototype stuff I was talking about earlier
TownTile.prototype.OnInteract=function(){
  tilenode.prototype.OnInteract.call(this); //call the base class OnInteract function

  
  //do town stuff, like checking if the town has water or not, and if it does, then allow the player to interact with the town, and if it does not, then do not allow the player to interact with the town
  if(this.wellCount>0){
    //town has water, allow interaction
  }
  else{
    //town does not have water, do not allow interaction
  }}
TownTile.prototype.placepipe=function(){
  //do town stuff for placing pipes, like checking if the pipe is connected to a well or not, and if it is, then increase the wellCount, and if it is not, then decrease the wellCount, and if the wellCount is 0, then the town is out of water, and if the wellCount is greater than 0, then the town has water
  Tilenode.prototype.placepipe.call(this); //call the base class placepipe function
  if(this.sourcelinked!=false){
    if(this.sourcelinked.tileType==="well"){
      this.wellCount++;
    }
  }}

 //get a tile based on player cordinates from the base tile....
 tilenode.getTile=function(playerX, playerY){
  //get the tile based on player coordinates from the base tile, and return it, if it does not exist, then generate it, and return it
  let xDiff=playerX-tilenode.baseTile.x;
  let yDiff=playerY-tilenode.baseTile.y;
  let currentTile=tilenode.baseTile;
while(xd)

//tilenode will have a static method called generateTiles() which generates a 50 x 50 grid of new tiles around the player when needed
//of course, with all the nexts and stuff updated with it as well so that everything is filled in, 
tilenode.generateTiles=function(playerX, playerY){
  //remember, randomly, you can get a town, or camp tile, too, but those are less frequent than desert tiles, and they are generated in a 50 x 50 grid around the player, with the player in the center, and the tiles are generated randomly, but with a higher chance of desert tiles, and a lower chance of town and camp tiles, and also with a chance of an arena tile, but that is very rare
  let tileArr=[];
  for(let x=playerX-25; x<playerX+25; x++){
    var prevxtile=
    for(let y=playerY-25; y<playerY+25; y++){
      let rand=Math.random();
      
      //the previous tiles are all pointers 
      if(rand<0.7){
        tileArr.push(new Tilenode(x,y,));
      }
      else if(rand<0.9){
        tileArr.push(new townTile(x,y));
      }
      else if(rand<0.95){
        tileArr.push(new campTile(x,y));
      }




/*
var Tmap=function(arrT,spr, currentx,currenty){
this.TileArr=arrT;
this.Sprite=spr;
this.curX=currentx;
this.curY=currenty;

}
*/
//so tiles hold stuff, they are dug or not dug, they have piping and other shit with random generated objects, they may have towns etc
//var notableobj=function
//var tle=function(dug,)  
  desert.make();
  town.make();
  camp.make();
  arena.make();
  
  
  playerData.spawnPos = vec2(width() / 2, height() / 2);
  go("desert", playerData);
  
  // Uncomment to load Town 1 scene on startup
  // playerData.spawnPosX = width() / 2;
  // playerData.spawnPosY = height() - 200;
  // go("town", playerData);
  
  // const windSnd = play("wind");
  // const walkSnd = play("walk");
  
});

function makeGrid() {
  for(let x = 100; x < width(); x += 100) {
    add([
      rect(10, height()),
      
      color(BLACK),
      opacity(0.6),
      
      pos(x, 0),
      anchor("top"),
      
      stay(),
      z(10000)
    ]);
  }
  
  for(let y = 100; y < height(); y += 100) {
    add([
      rect(width(), 10),
      
      color(BLACK),
      opacity(0.6),
      
      pos(0, y),
      anchor("left"),
      
      stay(),
      z(10000)
    ]);
  }
}

