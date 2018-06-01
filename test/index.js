/**
 * (c) Copyright 2018 Clause Inc., all rights reserved.
 */
'use strict';

const ModelManager = require('composer-common').ModelManager;
const glob = require('glob-promise');
const fs = require('fs');
const path = require('path');
const chai = require('chai');
chai.should();

describe('Clause Model Library', () => {

    it('All the model files should validate independently', async () => {
        // Load all files by recursive searching
        return glob('**/*.cto').then((files) => {
            return files.forEach((f) => {
                if(!f.startsWith('node_modules')){
                    const mm = new ModelManager();
                    mm.addModelFile(fs.readFileSync(path.resolve(__dirname, `../${f}`), 'UTF8'), f, true);
                    mm.updateExternalModels();
                }
            });
        });
    }).timeout(10000);
});