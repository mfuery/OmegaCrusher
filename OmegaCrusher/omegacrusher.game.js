var mainShip;
var gameWorld;
var levels;
var keyboard;
var background;
var backgroundFog;
var patrick;
var explosion;
var explosion2;
var renderCanvas;

var divFps;
var modulo = 0;

function initializeGame() {

    gameWorld = new BABYLON.GameFX.GameWorld("renderCanvas");
    mainShip = new OMEGACRUSHER.MainShip(false, gameWorld);
    var enemy = new OMEGACRUSHER.BaseEnemy(true, gameWorld);
    var patrick = new OMEGACRUSHER.Patrick(true, gameWorld);
    var missile = new OMEGACRUSHER.Missile(true, gameWorld);
    //background = new OMEGACRUSHER.BaseEntity(false, "SpaceDek", "SpaceDek", "Ciel", 1.0 , gameWorld);
    backgroundFog = new OMEGACRUSHER.BaseEntity(false, "SpaceDek", "SpaceDek", "Spacefond001", 0.1, gameWorld);
    explosion = new OMEGACRUSHER.BaseEntity(true, "SpaceDek", "SpaceDek", "Explosion", 0.1, gameWorld);
    explosion2 = new OMEGACRUSHER.BaseEntity(true, "SpaceDek", "SpaceDek", "Explosion001", 0.1, gameWorld);


    gameWorld.assetsManager.push(patrick);
    gameWorld.assetsManager.push(mainShip);
    gameWorld.assetsManager.push(enemy);
    gameWorld.assetsManager.push(patrick);
    gameWorld.assetsManager.push(missile);
    //gameWorld.assetsManager.push(background);
    gameWorld.assetsManager.push(backgroundFog);
    gameWorld.assetsManager.push(explosion);
    gameWorld.assetsManager.push(explosion2);
    gameWorld.assetsManager.loadAllEntitiesAsync(sceneReady);

}

var viewModel = {
    fps: ko.observable()
};

function sceneReady() {
    assetsLoaded();
    gameWorld.startGameLoop(currentGameLoop);
}

function assetsLoaded() {
    mainShip.initialize(true);
    var w = gameWorld.getVirtual2DWindowOnZ(100);
    var xMid = (w.bottom.x - w.top.x) / 2;
    var yMid = (w.bottom.y - w.top.y) / 2;


    //Center background
//    var initialPosition = new BABYLON.Vector3(0, -5, 40);
//    var initialScaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
    var initialRotation = new BABYLON.Vector3(0, 0, Math.PI / 2);
    //background.setRotation(initialRotation);
    backgroundFog.setRotation(initialRotation);

    //background.setPosition(new BABYLON.Vector3(0, 0, 100));
    backgroundFog.setPosition(new BABYLON.Vector3(0, 0, 20));
    explosion.setPosition(new BABYLON.Vector3(0,0,40));

    gameWorld.addKeyboard().connectTo(mainShip);
    gameWorld.Keyboard.setKeysBehaviors([
        { key: "32", associatedBehavior: function () { mainShip.laser(); }},
        { key: "88", associatedBehavior: function () { mainShip.fire(false); }},
        { key: "65", associatedBehavior: function () { mainShip.launchStartAnimation(); } }
    ]);

    var borders = gameWorld.getVirtual2DWindowOnZ(80);
    gameWorld.Keyboard.setMinMaxX(borders.top.x, borders.bottom.x);
    gameWorld.Keyboard.setMinMaxY(borders.top.y, borders.bottom.y);

    gameWorld.addLeftJoystick().connectTo(mainShip);
    gameWorld.LeftJoystick.setActionOnTouch(function () { mainShip.fire(true); });
    gameWorld.LeftJoystick.setMinMaxX(borders.top.x, borders.bottom.x);
    gameWorld.LeftJoystick.setMinMaxY(borders.top.y, borders.bottom.y);

    //Level
    levels = new OMEGACRUSHER.Level(gameWorld.dashboard.endGame, gameWorld);

    //End Loading
    gameWorld.dashboard.endLoading();

}


function currentGameLoop() {
    viewModel.fps(BABYLON.Tools.GetFps().toFixed() + " fps");
    levels.tick();
}

/**
 * Bootstrap
 */
$(document).ready(function () {
    "use strict";
    if (!BABYLON.Engine.isSupported()) {
        console.log('You are SOL.');
    }

    $(window).on('tizenhwkey', function (e) {
        if (e.originalEvent.keyName === "back") {
            tizen.application.getCurrentApplication().exit();
        }
    });

    document.addEventListener('webkitvisibilitychange', function (event) {
        if (document.webkitVisibilityState === 'visible') {
            initializeGame();
        }
    });

    renderCanvas = $('#renderCanvas');
    renderCanvas.css('width', screen.availWidth);
    renderCanvas.css('height', screen.availHeight);

    initializeGame();
});

$(window).resize(function () {
    'use strict';
    renderCanvas.css('width', screen.availWidth);
    renderCanvas.css('height', screen.availHeight);
    gameWorld.canvas.css('width', screen.availWidth);
    gameWorld.canvas.css('height', screen.availHeight);
});
