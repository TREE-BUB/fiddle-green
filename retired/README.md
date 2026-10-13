Retired URLs.

Each file here is front matter only: an old path and where it now points. The
`redirect` layout turns it into a page that forwards. Nothing in this folder is
linked from the site — these exist so that a link someone saved, or a search
result that has not been recrawled yet, still lands in the right place.

The path of a file under `retired/` mirrors the old URL it answers, so
`retired/expertise/advising.html` serves `/expertise/advising/`. Follow that
when adding one: it is the only way to see at a glance which addresses are
covered, and it keeps two stubs for the same destination from colliding.

Point `redirect_to` at the address a visitor should end up on, not at another
retired path. A URL that has moved twice gets its stub retargeted rather than
chained, so nobody takes two hops.

Delete one only when you are confident nothing points at that address any more.
