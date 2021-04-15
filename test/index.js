/**
 * (c) Copyright 2018 Clause Inc., all rights reserved.
 */
'use strict';

const ModelLoader = require('@accordproject/concerto-core').ModelLoader;
const glob = require('glob-promise');
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
                await ModelLoader.loadModelManager(null, [path.resolve(__dirname, `../${f}`)]);
            }
        }))).to.be.fulfilled;
    }).timeout(10000);
});
