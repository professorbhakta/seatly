# Contributing to Seatly

Seatly uses a **three-branch workflow**. Put work in the right place.

## Where things go

| If you are… | Use branch | Examples |
|-------------|------------|----------|
| Capturing ideas, rules, naming, plans, conversation | **`convApp`** | Edit `docs/*.md`, update this README |
| Implementing or experimenting in Flutter | **`code-file`** | New screens, refactors, WIP features |
| Shipping verified, tested code | **`main`** | Merge from `code-file` after `flutter analyze` and `flutter test` pass |

## convApp (docs)

- Markdown only. Keep the tree docs-first (`README.md` + `docs/`).
- Do not add Flutter app source here unless explicitly requested.
- When product rules change, update `docs/03-rules-and-flows.md` first, then implement on `code-file`.

## code-file (WIP code)

- Default branch for feature work.
- README on that branch notes it is changeable working copy.
- Run `flutter analyze` and `flutter test` before merging to `main`.

## main (stable)

- Merge only when behavior matches locked rules in `docs/03-rules-and-flows.md`.
- Should always analyze and test clean.

## Suggested loop

```
Idea or rule change  →  convApp (document)
Implementation       →  code-file (code)
Verified             →  main (merge)
```
