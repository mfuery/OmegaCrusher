var OMEGACRUSHER;
(function (OMEGACRUSHER) {
    // Missile extends BABYLON.GameFX.DisplayObj3D
    var Missile = (function (basedClass) {
        __extends(Missile, basedClass);
        function Missile(cloneable, gameWorld) {
            this._deltaPosition = new BABYLON.Vector3(0.1, 0, 0);
            // Calling based class constructor
            var initialScaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
            var initialRotation = new BABYLON.Vector3(0, 0, 0);


            basedClass.call(this, "Missile", "Scenes/SpaceDek/", "SpaceDek.babylon", null, initialRotation, initialScaling, cloneable, gameWorld);
            this.isDestroyed = false;
            
        }

        Missile.prototype._internalClone = function () {
            return new Missile(false, this._gameWorld);
        };
        Missile.prototype.toString = function () {
            return "Missile";
        };
        Missile.prototype.tick = function () {
            if (this.isReady) {
                this.setPosition(this.getPosition().add(this._deltaPosition));
                this._deltaPosition = this._deltaPosition.scale(1.01);
            }
        };

        Missile.prototype.damageBehavior = function (live) {
            return live-50;
        }

        Missile.prototype.collisionBehavior = function(entity, tag) {
            if (entity !== mainShip) {
                this._live = 0;
                if (this._live <= 0) {
                    this.isDestroyed = true;
                    this.markForRemove();
                }
            }
        };

        Missile.prototype.onDispose = function () {
        }

        return Missile;
        })(BABYLON.GameFX.GameEntity3D);
    OMEGACRUSHER.Missile = Missile;
})(OMEGACRUSHER || (OMEGACRUSHER = {}));

