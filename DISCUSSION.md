# Discussion & Next Steps

First off, thanks for reading through my PRs! I spent about two hours getting the core features—bug fixes, a smoother UI, and server-side search—in place. Here’s a more personal rundown of where I’d take things if I had a bit more runway.

---

## 🚀 Leveling Up Search & Performance

**Why it matters:** Right now, our demo data is small, but in production we’ll have hundreds of thousands of advocates. We need snappy lookups.

- **Real database & smart indexes**  
  If we hooked into Postgres (or any relational store), I’d add indexes on `first_name`, `last_name`, and a GIN index on the `specialties` array. That way, searches like “John” or “anxiety” would return results in under 100ms, even at scale.

  ```sql
  CREATE INDEX idx_adv_name ON advocates (LOWER(first_name), LOWER(last_name));
  CREATE INDEX idx_adv_specialties ON advocates USING GIN (specialties);
  ```
