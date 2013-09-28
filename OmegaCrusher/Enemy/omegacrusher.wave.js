var OMEGACRUSHER = OMEGACRUSHER || {};


(function () {
	// constructor
    OMEGACRUSHER.Wave = function (gameWorld, jsonWave) {
        this._gameWorld = gameWorld;
        this._wave = jsonWave;
        //Enemies
        for (var i = 0; i < jsonWave.enemies.length; i++) {
            var enemy = gameWorld.assetsManager.cloneLoadedEntity(jsonWave.enemies[i].type);
            enemy.trajectory = jsonWave.enemies[i].trajectory;
            this._enemies.push(enemy);
        }
        //Bonus
        for (var i = 0; i < jsonWave.bonus.length; i++) {
            var bonus = gameWorld.assetsManager.cloneLoadedEntity(jsonWave.bonus[i].type);
            bonus.setPosition(new BABYLON.Vector3(jsonWave.bonus[i].position.x, jsonWave.bonus[i].position.y, 40));
            this._bonus.push(enemy);
        }
    };

	// Members
    OMEGACRUSHER.Wave.prototype._gameWorld = null;
    OMEGACRUSHER.Wave.prototype._wave = null;
    OMEGACRUSHER.Wave.prototype._bip = 0;
    OMEGACRUSHER.Wave.prototype._enemies = [];
    OMEGACRUSHER.Wave.prototype._bonus  = [];


	// Properties
    OMEGACRUSHER.Wave.prototype.getPropertie = function () {
		return null;
	};

    OMEGACRUSHER.Wave.prototype.tick = function () {
        this._bip++;
        var toRemove = [];
        for (var i = 0; i < this._enemies.length; i++) {
            this._enemies[i].manualTick(this._bip);
            if (this._enemies[i].isDestroy) {
                toRemove.push(i);
            }
        }

        for (var j = 0; j < toRemove.length; j++) {
            this._enemies.splice(toRemove[j], 1)
        }
        toRemove = [];

    };

	// Methods
    OMEGACRUSHER.Wave.prototype._getFromCache = function () {
	};

})();