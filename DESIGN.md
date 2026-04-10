# 星詠み DESIGN.md

This file is the design system and UI direction for this repository.
Any future UI work should follow this file by default unless the user explicitly asks for an exception.

## Product Intent

- Build a fortune-telling experience that feels like a deep 1-on-1 reading, not a mystical gimmick.
- The core value is not "accuracy theater." The core value is clarity, emotional release, and concrete next steps.
- The product should feel premium, intimate, and trustworthy.
- The design should communicate "deep conversation" and "saved insight," not "occult spectacle."

## Core Belief

- This product is not a lighthouse that dictates the way. It is a compass that helps the user find and choose their own direction.
- The goal is to help users face reality more deeply while still being able to believe in their own possibility.
- Fortune telling here is not external authority or recommendation. It is support for self-recognition, self-definition, and self-chosen action.
- The experience should feel emotionally weighty, but never oppressive; comforting, but never vague.
- The genre may be spiritual-adjacent, but the product must not rely on spiritual jargon, mystical inflation, or authority theater.

## Non-Negotiables

- Never reduce the user's sense of possibility.
- Never frame despair, collapse, or nihilism as the final truth.
- Never justify crime, abuse, coercion, or harmful behavior.
- Never use totalizing rejection of the user. Absolute condemnation is only appropriate for clearly harmful acts, not for the person seeking help.
- Never encourage dependence on the service or position the service as the final decision-maker.

## Experience Pillars

- Dense 1-on-1 presence: the user should feel listened to, not processed.
- Introspective clarity: the UI should help turn vague emotion into understandable language.
- Record value: paid and saved content should feel like something worth returning to, not disposable output.
- Courage to act: the reading should end with more grounded courage, not just more interpretation.
- Self-trust recovery: the product should help the user trust their own judgment more, not less.

## Visual Direction

- Overall mood: quiet, intimate, nocturnal, refined.
- Emotional keywords: stillness, trust, warmth, depth, ceremony, reflection.
- The visual tone should be high-end and persuasive like a strong landing page, but never loud, scammy, or overly hyped.
- The site may feel dramatic, but it must stay emotionally intelligent.
- Prefer layered backgrounds, glow, texture, and framing over flat fills.
- Keep a sense of ritual, but avoid fantasy excess.
- The emotional feel should be "a serious conversation that steadies you," not "an ecstatic mystical trip."

## Color Palette

Use the existing project tokens as the source of truth.

- **Void** `#04030A`: app background, deepest canvas
- **Deep** `#0C0818`: section background, modal background
- **Mid** `#1A1230`: raised dark surfaces and controls
- **Surface** `#231840`: premium panels, result cards, elevated containers
- **Gold** `#C9952A`: primary accent, emphasis line, active border
- **Gold Light** `#E4B84A`: headline accent, premium highlights
- **Gold Dark** `#8A6418`: gradient depth, icon accent, separators
- **Cream** `#F0EAD8`: primary text on dark surfaces
- **Cream Soft** `#DDD4BC`: secondary warm text
- **Muted** `#9088A4`: low-emphasis labels and helper copy
- **Silver** `#A8B4C8`: optional cool metadata accent
- **Rose** `#C04060`: use sparingly for emotionally sensitive warnings or tension
- **Teal** `#2A8A7A`: use sparingly for "clarity" or calm-state accents, never as a dominant brand color

## Color Rules

- Default canvas is dark.
- Text should be warm, not stark white.
- Gold is the brand accent and should remain rare enough to feel precious.
- Do not introduce bright neon colors.
- Do not use purple as the dominant accent.
- Do not use large solid red areas for sales pressure.
- Any warning state should still feel elegant.

## Typography

- **Display Accent**: `Cinzel Decorative`
  Use for sigils, tiny prestige moments, ornamental initials, counters, or rare display marks.
- **Editorial Serif**: `Shippori Mincho`
  Use for headings, key statements, section titles, result titles, and premium narrative copy.
- **UI Sans**: `Noto Sans JP`
  Use for body copy, labels, forms, controls, support text, and system-like UI.

## Type Scale

- **Hero Display**: 40-56px, `Shippori Mincho`, medium to semibold, line-height 1.35-1.55
- **Section Title**: 24-32px, `Shippori Mincho`, medium to semibold, letter-spacing 0.08em-0.14em
- **Card Title**: 16-20px, `Shippori Mincho`, medium to semibold
- **Lead Body**: 15-18px, `Shippori Mincho` or `Noto Sans JP` depending on tone
- **Body**: 13-15px, `Noto Sans JP`, line-height 1.8-2.0
- **Micro Label**: 10-12px, uppercase or spaced, often with wider tracking

## Typography Rules

- Headings should feel editorial, not startup-generic.
- UI copy should stay readable and calm.
- Avoid giant center-aligned text walls unless the block is intentionally dramatic.
- Use letter-spacing deliberately on labels and premium headings.
- Do not overuse decorative fonts.

## Spacing

- Base spacing unit: `4px`
- Main scale: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64`
- Section breathing room should feel generous.
- Premium and result sections should feel slower and more spacious than form areas.

## Corner Radius

- Default radius is minimal and restrained.
- Use `1px` to `4px` for most controls and panels.
- Use pill radius only for badges, chips, and compact status elements.
- Do not make the UI soft and bubbly.

## Borders And Depth

- Borders should be subtle, usually warm gold at low opacity.
- Use glow and soft shadow as depth, not thick outlines.
- Favor inset glow, top-line accents, and faint radial light.
- Elevated elements should feel like illuminated cards in a dark room.

## Motion

- Motion should be calm, slow, and meaningful.
- Prefer fades, upward reveals, soft glows, and staggered entrances.
- Keep most motion between `160ms` and `320ms`.
- Avoid bouncy motion.
- Avoid flashy parallax or distracting hover choreography.
- Loading states should feel ceremonial and alive, not playful.

## Layout Principles

- Every major screen needs a clear focal zone.
- Avoid flat stacks of identical cards without rhythm changes.
- Alternate between compact UI blocks and spacious editorial sections.
- Mix left-aligned reading areas with occasional centered emotional statements.
- Keep desktop layouts framed and intentional, never full-width chaos.
- Mobile should preserve atmosphere, not collapse into plain utilitarian spacing.

## Structural Patterns

### Hero

- Hero should combine emotional promise, proof of seriousness, and immediate path to action.
- Include one strong core line, one supporting paragraph, and one or two primary actions.
- Use a visual anchor: sigil, framed avatar, proof artifact, or ceremonial object.
- The first screen should feel premium within 3 seconds.

### Guide / Brand Introduction

- Present the service like a thoughtful guide, not a faceless engine.
- Use framed composition, subtle glow, and editorial typography.
- This area should build trust and define the reading style.
- The guide stance is close, but never sloppy.
- The tone should feel like "親しき中にも礼儀あり": intimate enough to reach the heart, composed enough to remain trustworthy.

### Offer Comparison

- Free vs paid should be obvious at a glance.
- Free is "entrance."
- Paid is "deeper understanding plus something worth keeping."
- The paid option must feel more archival, more complete, and more emotionally finished.
- Free should reveal the user's core nature clearly, even with limited card volume.
- Paid should translate a specific concern into overwhelming information density, clarity, and concrete action guidance.

### Premium Entry

- This section should feel like a luxury explainer, not a generic pricing box.
- Use a promise, short narrative lines, summary cards, and then deeper detail cards.
- Repetition across cards is acceptable only if the rhythm changes.
- Vary kicker labels and card structures enough to keep reading alive.

### Clarify Flow

- This is not a form interrogation.
- It should feel like the reading is being focused collaboratively.
- Use calm helper text, soft panel framing, and concise choice chips.
- The UI should invite honesty, not speed.

### Result Screen

- The result screen should progress in this order:
- felt understood
- situation clarified
- movement becomes possible
- saved value becomes visible

### History / Vault

- Saved readings should feel like a personal archive.
- Never present history as raw logs only.
- Show patterns, recurrence, returning themes, and reasons to revisit.

## Components

### Buttons

- **Primary CTA**: gold gradient fill, dark text or very dark brown text if legible, serif label acceptable for premium moments
- **Secondary CTA**: transparent or near-transparent dark fill, gold border, cream text
- **Ghost / Utility**: minimal border or text-only, used sparingly
- Primary CTAs should feel decisive and premium.
- CTA labels should be consistent across contexts unless the context truly changes.

### Cards

- Cards should use dark translucent surfaces with subtle border and light depth.
- Premium cards may use faint gold tinting or a brighter top accent line.
- Avoid plain gray cards or modern SaaS white-card defaults.

### Inputs

- Inputs should feel calm, precise, and premium.
- Use dark surfaces, warm text, subtle border, and clear focus state.
- Focus state should be gold-accented, never bright blue browser default styling.

### Chips / Choice Buttons

- Chips should read as thoughtful choices, not filters from a dashboard.
- Selected state uses gold border and low-opacity gold fill.

### Badges

- Small uppercase or spaced labels are good for sections like `FREE`, `PREMIUM`, `DEEP READING`, `QUESTION 01`.
- They should support hierarchy, not steal attention.

## Content Presentation Rules

- Avoid giant undifferentiated paragraphs.
- Break long copy into rhythm: title, short lead, brief support, compact proof, action.
- Highlight emotional payoff and concrete payoff together.
- Use repetition carefully. Repeated structure must still feel intentional.
- When explaining premium value, rotate emphasis across:
- emotional understanding
- practical next steps
- lasting record value

## Copy Philosophy

- The service should sound like it deeply listened first, then spoke.
- Copy should help the user recognize themselves, not merely admire the reading.
- The emotional destination is not "wow, mysterious." It is "I can face this" and "I can choose."
- Favor language that restores agency: "選べる", "見極められる", "動ける", "受け止められる", "整えられる".
- The product may hit the heart heavily, but the after-feel should still be breathable and constructive.

## Copy Tone In UI

- Calm, perceptive, and emotionally literate.
- Never use fake urgency.
- Avoid hype phrases, miracle framing, or manipulative scarcity language.
- Avoid "destiny decided everything" language.
- Prefer "整理される", "見えてくる", "言葉になる", "戻ってこられる" style framing.
- Sound close, but keep dignity and manners.
- Be clear and honest without becoming cold.
- Do not use absolute rejection of the user. Avoid language that sounds like "you are hopeless," "nothing will change," or "this is all you are."
- When a boundary must be drawn, condemn the harmful action clearly without devaluing the person's humanity.
- The user should feel strengthened in reality, not floated away from it.

## Preferred Framing

- "背中を押す"
- "現実を深く見ても、可能性は失わない"
- "自分を知る"
- "自分で選べる"
- "気づく"
- "本質"
- "行動指針"
- "心に響くのに、苦しくなりすぎない"
- "近いけれど丁寧"

## Avoided Framing

- "あなたの運命は決まっている"
- "波動"
- "覚醒"
- "奇跡が起きる"
- "宇宙が教えている"
- "全部無意味"
- "あなたはダメだ"
- hard 100% rejection unless addressing crime or clearly harmful behavior

## Screen-Specific Guidance For This Repo

### Top Screen

- Keep the current premium dark editorial tone.
- Strengthen first-view contrast and hierarchy before adding more content.
- The top area should feel closer to a prestige editorial LP than a toy fortune site.

### `premium-entry`

- This is one of the most important sales surfaces.
- It should feel rich, layered, and luxurious.
- Summary cards should scan quickly.
- Detail cards should reward slow reading.

### `result-upgrade-panel`

- This should feel like an upgrade into substance, not a paywall interruption.
- Use strong contrast between "entrance" and "deep reading."
- Keep the panel persuasive but composed.

### `clarify-*`

- Clarify components should be elegant, breathable, and conversational.
- Reduce visual noise.
- Let the text carry the interaction.

### `vault-*`

- Treat this as a personal archive interface, not a dashboard.
- Favor interpretation and reflection over raw metrics.

## Implementation Guidance

- Reuse the existing root CSS variables where possible.
- Prefer adding or refining section-specific variables instead of inventing unrelated one-off colors.
- Keep backgrounds layered with gradients, glow, or subtle patterning.
- Use serif for emotional and interpretive content.
- Use sans for controls and utility text.
- If a new section is added, give it one distinctive visual move:
- a framed visual
- a top light line
- a badge strip
- a narrative pull quote
- a proof block

## Do

- build interfaces that feel intentional, premium, and emotionally grounded
- preserve the dark warm palette unless there is a strong reason to change it
- make paid surfaces feel more archival and more complete than free surfaces
- use typography hierarchy to create mood before adding decoration
- create rhythmic variety between sections
- let the user feel understood before asking them to act

## Do Not

- do not drift into generic SaaS design
- do not use default system font stacks as the main voice
- do not overuse purple, neon, or glassmorphism clichés
- do not make every section a similar card grid
- do not use harsh white backgrounds for major sections
- do not push mystical symbolism so far that usability drops
- do not turn the product into a hype-marketing LP with aggressive red/yellow pressure tactics

## Quality Bar

- A new screen should feel polished enough to be a paid product, not a prototype.
- A new section should have a memorable silhouette from a screenshot.
- The UI should feel hand-directed, not average.
- If a design decision makes the product feel more generic, calmer in a boring way, or more "template-like," reject it.
