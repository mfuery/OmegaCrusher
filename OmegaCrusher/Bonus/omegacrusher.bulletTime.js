var OMEGACRUSHER;

(function (OMEGACRUSHER) {
    var BulletTime = (function (basedClass) {
        __extends(BulletTime, basedClass);
        // constructor
        function BulletTime(cloneable, gameWorld) {
            //Load DisplayObject
            var initialScaling = new BABYLON.Vector3(0.09, 0.09, 0.09);
            var initialRotation = new BABYLON.Vector3(0, 0, 0);

            basedClass.call(this, "Bidulelaser", "Scenes/SpaceDek/", "SpaceDek.babylon", null, initialRotation, initialScaling, cloneable, gameWorld);

            this._hasCollisions = true;
            this._live = 1;
        };

        // Members
        BulletTime.prototype.baseUrl = "Scenes/SpaceDek/";
        BulletTime.prototype.sceneFile = "SpaceDek.babylon";


        BulletTime.prototype._internalClone = function () {
            return new BulletTime(false, this._gameWorld);
        };

        BulletTime.prototype.loaded = function (meshes, particuleSystems) {
            this._gameWorld.scene.beginAnimation(this._mesh.material, 0, 50, true, 1.0);
        };

        BulletTime.prototype.initialize = function (manual) {
            
        }

        BulletTime.prototype.tick = function (bip) {
        };

        BulletTime.prototype.damageBehavior = function (live) {
            return live;
        }

        BulletTime.prototype.collisionBehavior = function (entity, tag) {
            if (entity === mainShip) {
                mainShip.bulletTime++;
                //Active BulletTime
                this.markForRemove();
            }
        };
        
        // Methods
        BulletTime.prototype.toString = function () {
            return "BulletTime";
        };
        return BulletTime;
    })(BABYLON.GameFX.GameEntity3D);
    OMEGACRUSHER.BulletTime = BulletTime;
})(OMEGACRUSHER || (OMEGACRUSHER = {}));
