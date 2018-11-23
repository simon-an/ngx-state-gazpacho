# Setup NGRX Store

## 1. Install schematics

<https://github.com/ngrx/platform/tree/master/docs/schematics>

```sh
npm install @ngrx/schematics --save-dev

ng config cli.defaultCollection @ngrx/schematics
```

## 2. Generate the Store

```sh
ng generate @ngrx/schematics:store State --root --module core.module.ts

```

## 3. Add feature items

### 3.1  
