/**
 * (c) Copyright 2018 Clause Inc., all rights reserved.
 */
'use strict';

const ModelManager = require('composer-common').ModelManager;
const glob = require('glob-promise');
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

describe('Clause Model Library', () => {

    it('All the model files should validate independently', async () => {
        // Load all files by recursive searching
        const files = await glob('**/*.cto');
        return chai.expect(Promise.all(files.map(async (f) => {
            if(!f.startsWith('node_modules')){
                const mm = new ModelManager();
                mm.addModelFile(fs.readFileSync(path.resolve(__dirname, `../${f}`), 'UTF8'), f, true);
                await mm.updateExternalModels();
            }
        }))).to.be.fulfilled;
    }).timeout(10000);
});