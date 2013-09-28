var OMEGACRUSHER;
(function (OMEGACRUSHER) {
    // Missile extends BABYLON.GameFX.DisplayObj3D
    var BaseEntity = (function (basedClass) {
        __extends(BaseEntity, basedClass);
        function BaseEntity(cloneable, dir, file, nameEntity, scaling, gameWorld) {
            this._dir = dir;
            this._file = file;
            this._nameEntity = nameEntity;
            this._scaling = scaling;
            this._gameWorld = gameWorld;
            // Calling based class constructor
            var initialScaling = new BABYLON.Vector3(scaling, scaling, scaling);
            var initialRotation = new BABYLON.Vector3(0, 0, 0);
            basedClass.call(this, nameEntity, "Scenes/" + dir + "/", file + ".babylon", null, initialRotation, initialScaling, cloneable, gameWorld);
            this.isDestroyed = false;
            this.live = 0;
        }

        BaseEntity.prototype._internalClone = function () {
            return new BaseEntity(false, this._dir, this._file, this._nameEntity, this._scaling,  this._gameWorld);
        };
        BaseEntity.prototype.toString = function () {
            return this._nameEntity;
        };
        BaseEntity.prototype.tick = function () {
        };

        BaseEntity.prototype.collisionBehavior = function (entity) {
        };

        return BaseEntity;
        })(BABYLON.GameFX.GameEntity3D);
    OMEGACRUSHER.BaseEntity = BaseEntity;
})(OMEGACRUSHER || (OMEGACRUSHER = {}));

