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

    it('index.cto should include all models in the library', async () => {
        // Add the index file and load all dependencies
        const mm1 = new ModelManager();
        mm1.addModelFile(fs.readFileSync(path.resolve(__dirname, '../index.cto'), 'UTF8'), 'index.cto', true);
        await mm1.updateExternalModels();

        // Load all files by recursive searching
        const mm2 = new ModelManager();
        return glob('**/*.cto').then((files) => {
            files.forEach((f) => {
                if(!f.startsWith('node_modules')){
                    mm2.addModelFile(fs.readFileSync(path.resolve(__dirname, `../${f}`), 'UTF8'), f, true);
                }
            });
            mm2.validateModelFiles();

            // Do the test
            return mm1.getNamespaces().should.have.members(mm2.getNamespaces());
        });
    }).timeout(10000);
});