# Repo & branch structure

Repository: [professorbhakta/seatly](https://github.com/professorbhakta/seatly)

## Branches

| Branch | Purpose | Contents |
|--------|---------|----------|
| `main` | Stable | Flutter app — analyzed, tested, verified |
| `code-file` | WIP | Same app + note that this is changeable working code |
| `convApp` | Docs | Product vision, rules, conversation — **Markdown only** |

## Workflow (forever)

```
Idea / docs  →  convApp
Implement    →  code-file
Tested       →  merge into main
```

## Where to work

- **Product thoughts, rules, naming debates** → edit on `convApp` (`docs/*.md`)
- **Feature implementation** → edit on `code-file`
- **Release-quality code** → merge to `main` after `flutter analyze` + `flutter test`

## App code location

Runnable Flutter source lives on `main` and `code-file`, not on `convApp`.
