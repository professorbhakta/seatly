# Repo structure

Repository: [github.com/professorbhakta/seatly](https://github.com/professorbhakta/seatly)

## Three branches

| Branch | Purpose | Primary contents |
|--------|---------|------------------|
| **`main`** | Final, tested, verified code | Flutter app; `flutter analyze` + `flutter test` must pass |
| **`code-file`** | Changeable / WIP working code | Same app + README note that this is the experimentation branch |
| **`convApp`** | Conversation + thoughts + docs | `README.md`, `CONTRIBUTING.md`, `docs/*.md` — **no app source as primary content** |

## Workflow (forever)

```
Idea / rule / naming / plan  →  convApp (document first)
Implementation               →  code-file (Flutter WIP)
Tested & verified            →  merge into main
```

## Where to edit what

| Change type | Branch |
|-------------|--------|
| Product rules, vision, competitive notes, timeline | `convApp` |
| New screen, bugfix, refactor, experiment | `code-file` |
| Release-quality merge | `main` (from `code-file`) |

## Merge criteria for `main`

1. Behavior matches [03-rules-and-flows.md](03-rules-and-flows.md)
2. `flutter analyze` — no issues
3. `flutter test` — all pass
4. If rules changed, `convApp` docs updated first (or in same PR cycle)

## convApp tree shape

Docs-first; prefer only:

```
README.md
CONTRIBUTING.md
docs/
  01-origin-and-motivation.md
  …
  10-uml-diagrams.md
```

Runnable Flutter code lives on `main` and `code-file`, not on `convApp`.
