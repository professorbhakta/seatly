# Seatly docs (`code-file`)

Working docs for the Flutter implementation branch.

## Preferred local demo

**Interactive UI prototype (open in a browser):**

→ **[wireframes/index.html](wireframes/index.html)**

No Flutter toolchain required. Double-click the file, or:

```bash
python3 -m http.server 8765
# → http://localhost:8765/docs/wireframes/
```

See [wireframes/README.md](wireframes/README.md).

| Wireframe doc | Purpose |
|---------------|---------|
| [DESIGN_SPEC.md](wireframes/DESIGN_SPEC.md) | Screen → route → widget → provider → file |
| [INTERACTIONS.md](wireframes/INTERACTIONS.md) | QA: every tap → expected result |
| [DOCS_ANALYSIS.md](wireframes/DOCS_ANALYSIS.md) | Coverage vs product docs + intentional gaps |

## Start here

New humans and agents: **[START_HERE.md](START_HERE.md)**.

## Product vision & rules

Long-form product conversation lives on the **`convApp`** branch (`docs/01`–`10`). On this branch, use:

```bash
git show origin/convApp:docs/02-product-vision.md
git show origin/convApp:docs/03-rules-and-flows.md
```

## App summary

**Seatly** — *Asaan sawari — know before you board.*

| Role | What you do |
|------|-------------|
| Passenger | From/To line-up, occupancy, PNR-gated live track |
| Conductor | Seat-map ETM; sell seated (₹120) & standing (₹80) tickets |

Brand seed color: `#0B6E4F`. Not affiliated with GSRTC. Demo data / simulated UPI only.
