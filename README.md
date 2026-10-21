# Maths Wednesdays — complete website

Extract this ZIP. Open index.html to start locally, or upload ALL extracted files and folders to the root of the maths-wednesdays repository. Do not upload the ZIP itself or an enclosing folder. Keep the folders intact. No installation, build step, API keys or account is needed to play.

For GitHub Pages, use main / (root). Commit the upload and check the Pages workflow. This package includes the new games and dobble folders. Uploading only index.html is not sufficient.

## Existing activities

- Mastermind game, strategy tree, live solver and final-move puzzles.
- Dobble Fano-plane builder, one-player and two-player modes; orders 2, 3, 4, 5, 7, 8, 9.
- Tower of Hanoi.
- Bridge Lab and 2D/3D Rigidity Labs.

## Converted collection

- games/bee.html — Spelling Bee. Source: spellingbee and spellingBee1.
- games/wordle.html — Five-letter word game. Source: wordle6 word lists.
- games/cube.html — Rubik’s Cube. Source: rubiksGraph.
- games/multiply.html — Multiply to the target. Source: log-game.
- games/poker.html — Which poker hand wins?. Source: poker_tests.
- games/pursuit.html — Chase, escape & pursuit. Source: pursuit and escape.
- games/grid.html — Different totals. Source: puzz.
- games/divisors.html — The divisor game. Source: MSE_Q_1494480.
- games/neighbours.html — Add to your neighbours. Source: question1341929.
- games/cipher.html — Secret messages. Source: py_caesar.
- games/pixel.html — Pixel art studio. Source: pixel_art.
- games/robot.html — Build a robot. Source: robot.

## Adaptation details

These are browser adaptations of the public source projects, not exact copies of their Mathematica interfaces. Related repositories share pages: spellingbee/spellingBee1 and pursuit/escape. Empty letterboxed and puzz-101 are excluded. Wordle6 supplies word data; a playable five-letter game has been added. Creative pixel-art and robot activities are included. The general geometry/colour/number-theory research repositories are not games and have not been repackaged here.

- Word games use the supplied repository dictionaries; these may differ from commercial game dictionaries. Spelling Bee scores 1 for a four-letter word, otherwise word length, plus 7 for a pangram.
- Multiplication has an exact winning-strategy hint and computer opponent.
- Divisors: alternate taking a remaining number that has at least one remaining proper divisor; opponent gets those divisors. Unclaimed numbers at the end score for neither player. Hint is explicitly greedy.
- Neighbours: endpoints cannot be removed. Interior removal adds to both neighbours; stop at two numbers. Exact best-total hint for peak sizes 3–5.
- Number grid: all 2n row and column totals must differ. Tap cycles 0, +1, −1.
- Cube: real 3×3 face permutations shown as a labelled net. Reverse uses recorded moves, not a general solver.
- Poker: random two-player, seven-card comparison quiz with exact five-card ranking and kickers. No betting.
- Pursuit: cyclic-chase simulation and an adapted bounded escape game with manual steering; not a complete port of every archived research experiment.
- Robot: original SVG parts replace the old external image dependencies.

Shared assets in games/ must stay beside the HTML pages. Everything is local; no external scripts or fonts are required by the new collection.


## Activity planner (19 October 2026)
Open `planner.html` or use the homepage Activity planner link. The 104 catalogue entries are planning suggestions, not 104 built games. Change up to five ordered sort levels; filter, shortlist, prioritise, add notes and tick completed sessions. All catalogue data is embedded: no SQL, server, build step or JSON fetch is needed.

Choices use browser localStorage. File copies, devices and browsers may not share storage, especially when opened with file://. Export a JSON backup before moving or updating; import merges records and replaces matching entries after confirmation. Completion tracks use in a session, not mastery or implementation readiness. Age and difficulty guidance are editorial estimates. Existing linked pages need lesson review. Automated logic checks passed; this update has not had visual browser QA.

For GitHub Pages, upload the extracted contents with index.html and planner.html at the repository root. This download has not automatically updated the live GitHub site.

## Josephus card investigation
`josephus/index.html` is the learner experiment: 1–100 number cards or up to 52 playing cards, rows/circle, prediction, step, slow play, undo, reset, printable cards and a session results table. Start by keeping position 1 and removing position 2. Original positions remain labelled; colour never replaces numbering. No formula is displayed on the learner page.
`josephus/binary.html` is a separate explanation for totals up to 1,000,000. It demonstrates N=P+L, the reduction to P remaining cards, the survivor 2L+1, and binary rotation. The homepage links to both pages separately.
The simulation, recurrence and binary result agree for totals 1–1000. The physical reduction proof was checked for 1–100. Browser visual testing remains unavailable.

Planner update: 106 ideas. Added Tokieda paper surprises and fish/wake investigations, plus Floppy Paper as a source for paper beams. Suggested first five is a separate preset and ranking; it does not overwrite personal shortlists, notes or completed sessions. Source video links and practical session notes are included.

## Seven teaching companions and short breaks
Open the homepage section “Teaching companions & short breaks”, or these pages:
- sessions/paper.html: paperclip, loop-cutting and paper-beam prediction notebook, optional explanations, source links and downloadable notes. This is a companion to real experiments, not a physics simulation.
- sessions/set.html: 9/27/81-card SET, per-attribute checking, progressive card hints, deck exhaustion handling and printable decks.
- sessions/fifteen.html: two-player or optimal-computer 15 game, undo, optional hints and magic-square layout.
- sessions/sorting.html: hidden-weight comparison puzzle, rearrangement, move undo and selection/insertion demonstrations using the same original arrangement.
- sessions/nim.html: one-pile take-away game, configurable take limit, last-wins/last-loses, two-player or computer, undo and optional strategy.
- sessions/memory.html: 4/6/8/12 pairs, symbols/numbers/fraction–decimal equivalents, solo/cooperative/two-player, manual covering of mismatches.
- sessions/tables.html: selected multiplication tables 1–12, multiplication/division/mixed, 5/10/20 questions, optional elapsed clock, array hints, first-try scoring and focused retry. Original design; not a clone of any commercial service.

All seven work offline with the included local scripts and styles; source videos require internet. Progress in these seven activities lasts for the current visit (paper notes can be downloaded). The planner still saves its own records in localStorage and supports backups. Catalogue now contains 108 ideas.

Validation: all SET pairs in all three deck sizes have exactly one completing card; 15-game computer never loses across exhaustive human continuations from either starting player; both Nim rules checked through 60 counters and take limits 1–8; sorting checked on all 720 six-box permutations; mocked DOM interaction checks cover each page. Real browser visual and touch QA remains outstanding.

15 game update: sessions/fifteen.html now uses a single horizontal row; chosen cards leave the row and enter separate player hands. sessions/fifteen-grid.html is the separate magic-square game, with 8,1,6 across its top row. Both support two players or a computer, selectable first player, hints and undo. Computer moves follow a short pause and pending moves are cancelled on reset/undo.

## Visual and play-flow update
Memory now uses 12 original SVG illustrations, left/right player collections, pair and card totals, and empty placeholders so unmatched cards retain their positions.
Times-table studio now advances automatically by default (manual remains available), supports 60/120-second timed rounds alongside untimed/elapsed-time sessions, and has a brighter colour scheme. Timed rounds continue until the deadline; reset and completion cancel pending advances.
Every page now has a Theme picker: Paper, Ocean, Peach or Lilac. Choice persists in this browser; clearing browser data or changing origins may reset it. Theme changes preserve game-specific card/player colours.
Validation covers timer expiry, auto advance, pending timer cancellation, memory collections and stable board slots; all links and JavaScript syntax checked. Browser visual/touch QA still outstanding.


## Update: 19 October 2026 — teaching activities and coding labs
- Homepage: puzzles and strategy first; Memory and Times Tables next; all 37 activity pages linked with illustrated tile icons. Theme picker offers Paper, Ocean, Peach and Lilac.
- New original coding activities: Turing tape puzzles (editable two-state rules, step/run/undo, four challenges and sandbox); Robot trails (five isometric levels, reorderable command blocks, repeats, step/run); Enigma explorer (rotors I–V, rings, plugboard, reflector B, stepping and letter trace).
- Original Google Doodles linked on the homepage and relevant pages. Robot trails uses our own small block editor, not the Blockly library, and is not a copy of Google's game or artwork.
- Planner now has 111 entries; previous browser-saved notes and completion records keep their stable IDs.
- Validation: existing session, planner, Josephus, memory/timer and 15-game checks passed. New checks cover Enigma known vectors/reciprocity/double stepping, all robot level solutions, 64 binary increment inputs and DOM-stub interactions. All activity links and local static resources checked.
- Browser rendering, touchscreen use and live GitHub Pages deployment have NOT been verified in this environment.
- Upload the extracted site contents to the GitHub Pages publishing folder. This archive does not deploy itself. Keep private tutoring JSON and chat exports out of the public repository.
