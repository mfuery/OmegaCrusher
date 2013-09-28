var OMEGACRUSHER;

(function (OMEGACRUSHER) {
    var Patrick = (function (basedClass) {
        __extends(Patrick, basedClass);
        // constructor
        function Patrick(cloneable, gameWorld) {
            //Load DisplayObject
            var initialScaling = new BABYLON.Vector3(0.09, 0.09, 0.09);
            var initialRotation = new BABYLON.Vector3(0, 0, 0);

            basedClass.call(this, "Patrick", "Scenes/SpaceDek/", "SpaceDek.babylon", null, initialRotation, initialScaling, cloneable, gameWorld);

            this._hasCollisions = true;

            //Load Properties
            var jsonLevel = {};
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", this.baseUrl + this.propertiesFile, true);
            var that = this;
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    that.properties = JSON.parse(xmlhttp.responseText);
                }
            };
            xmlhttp.send(null);
        };

        // Members
        Patrick.prototype.baseUrl = "Scenes/SpaceDek/";
        Patrick.prototype.sceneFile = "SpaceDek.babylon";
        Patrick.prototype.propertiesFile = "patrick.json";
        Patrick.prototype.trajectory = [];
        Patrick.prototype._laserParticules = [];
        Patrick.prototype.properties = {};


        Patrick.prototype._internalClone = function () {
            return new Patrick(false, this._gameWorld);
        };

        Patrick.prototype.loaded = function (meshes, particuleSystems) {
        };

        Patrick.prototype.initialize = function (manual) {
            var particuleSystems = this._mesh.getHierarchyEmittedParticleSystems();
            for (var i = 0; i < particuleSystems.length; i++) {
                if (particuleSystems[i].emitter.name == "pART ENNEMY REACT002") {
                    this._laser1 = particuleSystems[i];
                    particuleSystems[i].manualEmitCount = 0;//this.properties.fireCount;
                    particuleSystems[i].minLifeTime = 100.0;
                    particuleSystems[i].maxLifeTime = 800.0;
                    this._laserParticules.push(particuleSystems[i]);
                }
                if (particuleSystems[i].emitter.name == "pART ENNEMY REACT001") {
                    this._laser2 = particuleSystems[i];
                    particuleSystems[i].manualEmitCount = 0;//this.properties.fireCount;
                    particuleSystems[i].minLifeTime = 100.0;
                    particuleSystems[i].maxLifeTime = 800.0;
                    this._laserParticules.push(particuleSystems[i]);
                }
            }
        }

        Patrick.prototype.manualTick = function (bip) {
            if (bip < 100) {
                var newPosition = BABYLON.Vector2.CatmullRom(this.trajectory[0], this.trajectory[1], this.trajectory[2], this.trajectory[3], (bip % 1000) / 100);
                this.setPosition(new BABYLON.Vector3(newPosition.x, newPosition.y, 40));
            }
            
            if (this.explosionTime <= 0) {
                if ((this.explosion1 != null) && (this.explosion2 != null)) {
                    this.explosion1.markForRemove();
                    this.explosion1 = null;
                    this.explosion2.markForRemove();
                    this.explosion2 = null;
                    this.markForRemove();
                    this.isDestroy = true;
                }
            } else {
                this.explosionTime--;
            }
        };

        Patrick.prototype.damageBehavior = function (live) {
            return 0;
        }

        Patrick.prototype.collisionBehavior = function (entity, tag) {
            this.properties.live = entity.damageBehavior(this.properties.live);
            if (this.properties.live <= 0) {
                if ((this.explosion1 == null) && (this.explosion2 == null)) {
                    this.explosion1 = this._gameWorld.assetsManager.cloneLoadedEntity("Explosion");
                    this.explosion1._mesh.position = this._mesh.position;
                    this.explosion2 = this._gameWorld.assetsManager.cloneLoadedEntity("Explosion001");
                    this.explosion2._mesh.position = this._mesh.position;
                    this.explosionTime = 50;
                    this._mesh.dispose();
                }
            }
            
        };
        
        // Methods
        Patrick.prototype.toString = function () {
            return "Patrick";
        };
        return Patrick;
    })(BABYLON.GameFX.GameEntity3D);
    OMEGACRUSHER.Patrick = Patrick;
})(OMEGACRUSHER || (OMEGACRUSHER = {}));
