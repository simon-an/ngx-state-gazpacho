# Exercise 3 NGRX Effects

- Add EffectsModule to root-store and shared module

```typescript
EffectsModule.forRoot([])
...
EffectsModule.forFeature([SafeitemEffects, SafeListEffects]),
```

## 3.1 Add Effects to load SafeItems

- create an Effect, which calls safe.service getItems() when the LoadSafeItems event occurs.

```bash
ng g @ngrx/schematics:effect shared/store/safe/effects/safeitem
```
