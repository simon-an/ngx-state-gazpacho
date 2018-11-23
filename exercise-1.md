#  Exercise 1 - Implement SafeItem Actions and Reducer

## 1. Install schematics

<https://github.com/ngrx/platform/tree/master/docs/schematics>

```bash
npm install @ngrx/schematics --save-dev

ng config cli.defaultCollection @ngrx/schematics
```

UNIX
```bash
npm install @ngrx/{store,effects,entity,store-devtools} --save
```
WINDOWS
```bash
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools -S
```

## 2. Generate the Store

```bash
ng g module root-store —-flat false —-module app.module.ts
ng generate @ngrx/schematics:store State --statePath root-store/state --root --module root-store/root-store.module.ts

```

## 3. Add feature SafeItems

```bash
ng g @ngrx/schematics:feature root-store/SafeItems --flat --group --reducers root-state/state/index.ts
```

Result:
```
λ tree -L 3 src\app\root-store\                       
src\app\root-store\                                   
|-- actions                                           
|   `-- safe-items.actions.ts                         
|-- effects                                           
|   |-- safe-items.effects.spec.ts                    
|   `-- safe-items.effects.ts                         
|-- reducers                                          
|   |-- safe-items.reducer.spec.ts                    
|   `-- safe-items.reducer.ts                         
|-- root-store.module.ts                              
`-- state                                             
    `-- index.ts                                      
```

## 4. Add Metareducer Store Freeze, to detect shared state errors during development
- Only needed with ngrx6. When ngrx7 is released it will be included.

```bash
 npm i -D ngrx-store-freeze
```

add to root-store/state/index.ts
```typescript
export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];
```
