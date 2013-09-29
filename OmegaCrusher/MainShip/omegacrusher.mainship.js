var OMEGACRUSHER;
(function (OMEGACRUSHER) {
    // MainShip extends BABYLON.GameFX.DisplayObj3D
    var MainShip = (function (basedClass) {
        __extends(MainShip, basedClass);

        function MainShip(cloneable, gameWorld) {
            this.initialPosition = new BABYLON.Vector3(0, 10, 0);
            this.initialScaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
            this.initialRotation = new BABYLON.Vector3(0, -Math.PI / 2, Math.PI / 2);
            this._deltaPosition = BABYLON.Vector3.Zero();
            this.deltaRotate = BABYLON.Vector3.Zero();
            // Calling based class constructor
            basedClass.call(this, "Vaisseau", "Scenes/SpaceDek/", "SpaceDek.babylon", this.initialPosition, this.initialRotation, this.initialScaling, cloneable, gameWorld);
            this.isPlayingAnimation = true;
            this.isMoving = false;
            this.setHasCollisions(true);
            this.laserFrequency = 3;
            this.laserTick = 0;
            this.missileFrequency = 3;
            this.missileTick = 0;
            var self = this;
            var instantZ = 0;
            console.log(this.initialRotation);
//            setInterval(function() {
//                instantZ += (.01 * Math.PI);
//                if (instantZ > (2 * Math.PI)) {
//                    instantZ
//                }
//                self.setRotation(new BABYLON.Vector3((-90 * Math.PI) / 180, 0, 1));
//            }, 100);
        }

        //Bonus

        //Wapons
        MainShip.prototype._missiles = [];
        MainShip.prototype._laserParticules = [];

        MainShip.prototype.moveUp = function () {

        };

        MainShip.prototype.moveDown = function () {

        };

        MainShip.prototype.moveLeft = function () {

        };

        MainShip.prototype.moveRight = function () {

        };

        MainShip.prototype.startAnimation = function () {
            this._mesh.getScene().beginAnimation(this._mesh, 0, 45, false, 1.0);
        };

        MainShip.prototype.launchStartAnimation = function () {
            this.setPosition(this.initialPosition);
            this.setRotation(this.initialRotation);
            this.isPlayingAnimation = true;
        };

        MainShip.prototype.loaded = function (meshes, particuleSystems) {
            this._mesh.getScene().stopAnimation(this._mesh);
            for (var i = 0; i < particuleSystems.length; i++) {
                if (particuleSystems[i].emitter.name == "Part006") {
                    this._laser1 = particuleSystems[i];
                    particuleSystems[i].manualEmitCount = 0;
                    particuleSystems[i].minLifeTime = 800.0;
                    particuleSystems[i].maxLifeTime = 800.0;
                    particuleSystems[i].bufferSize = 100;
                    this._laserParticules.push(particuleSystems[i]);
                }
                if (particuleSystems[i].emitter.name == "Part007") {
                    this._laser2 = particuleSystems[i];
                    particuleSystems[i].manualEmitCount = 0;
                    particuleSystems[i].minLifeTime = 800.0;
                    particuleSystems[i].maxLifeTime = 800.0;
                    particuleSystems[i].buffeSize = 100;
                    this._laserParticules.push(particuleSystems[i]);
                }
            }
            
        };

        MainShip.prototype.initialize = function (manual) {
            //Load Laser
            if (manual) {
                var descendants = this._mesh.getDescendants();
                for (var i = 0; i < descendants.length; i++) {
                    if (descendants[i].name == "Part006") {
                        var entity = new OMEGACRUSHER.Laser("Part006", descendants[i], this._laser1, this._gameWorld, this);
                        entity.setHasCollisions(true);
                    }
                    if (descendants[i].name == "Part007") {
                        var entity = new OMEGACRUSHER.Laser("Part007", descendants[i], this._laser2, this._gameWorld, this);
                        entity.setHasCollisions(true);
                    }
                }
            }
        }

        MainShip.prototype.laser = function () {
            if (this.laserTick > this.laserFrequency) {
                for (var i = 0; i < this._laserParticules.length; i++) {
                    this._laserParticules[i].manualEmitCount++;
                }
                this.laserTick = 0;
            }
            this.laserTick++;
        }

        MainShip.prototype.fire = function (fromTruch) {
            if ((this.missileTick > this.missileFrequency) || (fromTruch)) {

                var missile = this._gameWorld.assetsManager.cloneLoadedEntity("Missile");

                missile.setPosition(this.getPosition());
                missile.setHasCollisions(true);
                this._missiles.push(missile);

                this.missileTick = 0;
            }
            this.missileTick++;
        };

        MainShip.prototype._internalClone = function () {
            return new MainShip(this.getPosition(), this.getScaling(), this.getRotation(), false, this._gameWorld);
        };
        MainShip.prototype.toString = function () {
            return "MainShip";
        };
        MainShip.prototype.tick = function () {
            if (this.isReady) {
                if (this.isPlayingAnimation) {
                    var deltaMove = BABYLON.Vector3.Zero();
                    var deltaRotate = BABYLON.Vector3.Zero();
                    var zNormalRotation = (Math.PI / 2);
                    if (this.getPosition().z < 40) {
                        deltaMove.z = 0.75;
                    }
                    if (this.getRotation().z > zNormalRotation) {
                        deltaRotate.z = -0.015;
                    }

                    this.setPosition(this.getPosition().add(deltaMove));
                    this.setRotation(this.getRotation().add(deltaRotate));

                    if (this.getPosition().z >= 40 && this.getRotation().z <= zNormalRotation) {
                        this.isPlayingAnimation = false;
                    }
                } else {
                   //this.setRotation(this.getRotation().add(this.deltaRotate));
                   // Adding inertia
                   this.deltaRotate = this.deltaRotate.scale(0.9);

                    for (var i = 0; i < this._missiles.length; i++) {
                        this._missiles[i].tick();
                        if (this._missiles[i].isDestroyed) {
                            this._missiles.splice(i, 1);
                        }
                    }
                }
            }
        };
        return MainShip;
        })(BABYLON.GameFX.GameEntity3D);
    OMEGACRUSHER.MainShip = MainShip;
})(OMEGACRUSHER || (OMEGACRUSHER = {}));

