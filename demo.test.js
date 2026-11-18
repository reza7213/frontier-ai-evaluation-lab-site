import test from 'node:test';
import assert from 'node:assert/strict';
import {answerFor,documents} from './demo.js';
test('the observed dollar-income-as-margin failure is corrected',()=>{const a=answerFor('margin');assert.ok(Math.abs(a.values.aurora-23.3333333333333)<1e-9);assert.equal(a.values.nova,10);assert.ok(Math.abs(a.values.gap-13.3333333333333)<1e-9);assert.deepEqual(a.sourceIds,['A25','N25']);assert.match(a.formula,/23.33%/);});
test('growth uses each company’s prior year and percentage-point gap',()=>{const a=answerFor('growth');assert.deepEqual(a.values,{aurora:25,nova:40,gap:15});assert.equal(a.sourceIds.length,4);assert.match(a.heading,/Nova/);});
test('missing data, forecasts and invalid proxies preserve uncertainty',()=>{assert.match(answerFor('forecast').heading,/not an audited actual/);assert.equal(answerFor('cashflow').status,'Insufficient evidence');assert.equal(answerFor('proxy').status,'Unsupported inference declined');});
test('all demo citations resolve to the supplied synthetic documents',()=>{for(const q of ['margin','growth','forecast','cashflow','proxy'])for(const id of answerFor(q).sourceIds)assert.ok(documents[id]);assert.throws(()=>answerFor('arbitrary live query'));});
