# Discussion and Next Steps

First off, thanks for this opportunity and reading through my PRs. I spent about two hours getting the core features—bug fixes , a smoother UI, and server-side search—in place.

With more time I'd focus on these things:

## Search and Performance

Real Database -
Need a huge dataset to realistically test

Smart Indexes -
adding indexes like on "first_name", "last_name", ect. to return quicker results

Server-driven pagination -
Rather than pulling in everything at once, a cursor-based approach

Cache queries -
Throw a simple Redis layer in front of our API
