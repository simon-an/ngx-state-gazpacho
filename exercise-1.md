# Setup NGRX Store

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
ng generate @ngrx/schematics:store State --root --module core.module.ts

```

## 3. Add feature items

### 3.1  
