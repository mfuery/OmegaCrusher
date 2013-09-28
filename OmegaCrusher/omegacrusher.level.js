var OMEGACRUSHER = OMEGACRUSHER || {};

(function () {
    // constructor
    OMEGACRUSHER.Level = function (callEndLevel, gameWorld) {
        this._currentWaveIndex = 0;

        //Load Level
        this._gameWorld = gameWorld;
        this._callEndLevel = callEndLevel;
        this._jsonLevel = {};
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "Levels/Level1/level1.json", true);
        var that = this;
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                that._jsonLevel = JSON.parse(xmlhttp.responseText);
                that.run();
            }
        };
        xmlhttp.send(null);
    };

        //// Members
        OMEGACRUSHER.Level.prototype._gameWorld = null;
        OMEGACRUSHER.Level.prototype._waves = [];


        OMEGACRUSHER.Level.prototype.tick = function () {
            if (this.currentWave) {
                this.currentWave.tick();

                //Check nextWave
                if (this.currentWave._enemies.length == 0) {
                    if (this._currentWaveIndex < this._jsonLevel.waves.length - 1) {
                        this._currentWaveIndex++;
                        this.currentWave = new OMEGACRUSHER.Wave(this._gameWorld, this._jsonLevel.waves[this._currentWaveIndex]);
                    } else {
                        if (this._callEndLevel)
                            this._callEndLevel();
                    }
                }
            }

        };

        // Methods
        OMEGACRUSHER.Level.prototype.run = function (jsonLevel) {
            //Create Enemies
            this.currentWave = new OMEGACRUSHER.Wave(this._gameWorld, this._jsonLevel.waves[this._currentWaveIndex]);
        };
})();
