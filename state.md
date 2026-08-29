# Production state

Active task: E2, awaiting user approval.

The user approved an Experiments collection that sits after featured projects.
It is one deck destination, reached from a single Work-menu entry. Cards open
live projects in a new tab and may expose a separate source link.

Validation: TypeScript build, Vite production build, and oxlint passed using
the repository-local executables. The design detector found no issues.

Change request: the horizontal rail must not take ownership of the vertical
wheel. A throwaway comparison route now explores replacement layouts before
the production slide proceeds.

Decision: the user chose the index-strip variant. The production slide now
uses that layout and leaves vertical wheel navigation to the deck.

E2 now uses six user-supplied 1312 × 820 PNG captures, one for each experiment.
Their selected-panel layout now flows top-to-bottom to preserve the captures'
native aspect ratio.
