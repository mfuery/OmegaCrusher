var OMEGACRUSHER;
(function (OMEGACRUSHER) {
    // Missile extends BABYLON.GameFX.DisplayObj3D
    var Laser = (function (basedClass) {
        __extends(Laser, basedClass);

        function Laser(name, mesh, particle, gameWorld) {
            // Calling based class constructor
            this._name = name;
            basedClass.call(this, name, "", "", null, null, null, false, gameWorld);
            this.isDestroyed = false;

            this._live = 1;
            this._mesh = mesh;
            this._particle = particle;
        }

        Laser.prototype.loaded = function (meshes, particuleSystems) {
        }

        Laser.prototype.toString = function () {
            return "Laser" + this._name;
        };
        Laser.prototype.tick = function () {
        };

        Laser.prototype.intersectBehavior = function (entity) {
            for (var i = 0; i < this._particle.particles.length; i++) {
                if (entity._mesh.intersectsPoint(this._particle.particles[i].position))
                {
                    return { value: true, tag: i };
                }
            }
            return { value: false, tag: null };
        }

        Laser.prototype.damageBehavior = function (live) {
            return --live;
        }

        Laser.prototype.collisionBehavior = function (entity, tag) {
            if ((entity != mainShip) && (tag) && (this._particle.particles.length > 0))
            {
                this._live = entity.damageBehavior(this._live);
                if (this._live <= 0)
                    this._particle.particles.splice(tag, 1);
            }

        };

        return Laser;
        })(BABYLON.GameFX.GameEntity3D);
    OMEGACRUSHER.Laser = Laser;
})(OMEGACRUSHER || (OMEGACRUSHER = {}));

