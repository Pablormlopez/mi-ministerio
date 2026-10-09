// Optional IndexedDB integration check: npm install --no-save fake-indexeddb,
// then node tests/device-access.mjs. No user data or live API calls.
import ts from 'typescript';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const fake = await import(process.env.MINISTERIO_IDB_TEST_MODULE || 'fake-indexeddb');
globalThis.indexedDB = new fake.IDBFactory();
const load=async(path,replacements=[])=>{
 let source=await fs.readFile(path,'utf8');
 for(const [from,to] of replacements)source=source.replace(from,to);
 const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
 return 'data:text/javascript;base64,'+Buffer.from(js).toString('base64');
};
const modelUrl=await load('lib/ministerio/model.ts');
const M=await import(modelUrl);
const V=await import(await load('lib/ministerio/vault.ts',[["'./model'",JSON.stringify(modelUrl)]]));
const salt=V.salt(), key=await V.derive('test-password-only',salt);
const state=M.initial();state.profile.name='Only encrypted';
const cache={owner:'account-a',revision:1,dirty:false,payload:await V.seal(state,key,salt)};
await V.writeCache(cache);
assert.equal(await V.readDeviceAccess(),null);
await V.writeDeviceAccess({owner:'account-a',requirePassword:false,salt,key});
// A new IndexedDB connection must retrieve a usable, non-extractable key.
const access=await V.readDeviceAccess();
assert.equal(access.key.extractable,false);
await assert.rejects(()=>crypto.subtle.exportKey('raw',access.key));
assert.equal(V.matchesDeviceAccess(access,cache),true);
assert.deepEqual(await V.unseal((await V.readCache()).payload,access.key),state);
assert.equal(V.matchesDeviceAccess(access,{...cache,owner:'account-b'}),false);
assert.equal(V.matchesDeviceAccess(access,{...cache,payload:{...cache.payload,salt:V.salt()}}),false);
// Turning password protection back on must delete key material, even if supplied.
await V.writeDeviceAccess({...access,requirePassword:true});
assert.deepEqual(await V.readDeviceAccess(),{owner:'account-a',requirePassword:true});
assert.equal(V.matchesDeviceAccess(await V.readDeviceAccess(),cache),false);
// Manual lock preserves preference but cannot auto-unlock on reload.
await V.writeDeviceAccess({owner:'account-a',requirePassword:false});
assert.equal(V.matchesDeviceAccess(await V.readDeviceAccess(),cache),false);
await V.writeDeviceAccess(null);
assert.equal(await V.readDeviceAccess(),null);
assert.deepEqual(await V.readCache(),cache);
console.log('PASS: persisted device key, reopen/decrypt, owner and salt isolation, password-required mode, manual lock and key removal; encrypted records preserved.');
