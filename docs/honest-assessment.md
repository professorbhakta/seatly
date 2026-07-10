# Honest assessment

## Strengths of the idea

- Solves a real, felt problem: uncertainty before boarding GSRTC buses.
- Conductor seat-map-first UX is differentiated from boring legacy ETMs.
- Clear rules (standing ≠ waitlist, track only with confirmed booking) reduce scope creep.
- Flutter + local storage is a reasonable v0.1 stack for a demo.

## Risks & unknowns

- **Data access:** Real schedules, occupancy, and GPS need operator or API partnerships — not in v0.1.
- **Naming collision:** “Seatly” exists in other domains; trademark and app-store search matter later.
- **Adoption:** Conductors need devices, training, and trust; passengers need habit change.
- **GSRTC relationship:** Demo app is not affiliated; production would need official alignment.

## v0.1 reality check

What we have today is a **credible prototype**:

- Demo Gujarat stations and services
- Simulated UPI QR and cash confirm
- Hive-persisted onboard sales and standing counts
- `flutter analyze` and `flutter test` passing on `main`

What we do **not** have: live GSRTC feeds, real payments, production auth, or fleet GPS.

## Founder framing

This is awareness + easier process, not logistics revolution. That honesty keeps the product buildable.
