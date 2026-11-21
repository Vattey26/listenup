# Milestones

## M0 Proposal

**Which story did you cut from the MVP, and why?**
Story 9 (report a chat and admin review). The lecturer pointed out that nine of ten stories were must-have, and the report flow adds a special admin permission rule that the core chat does not need. The private journal was also cut because it needs a sixth entity.

## M1 Frontend prototype

**What state lives in the store and what stays inside a component? Why?**
The store holds state that several pages or the router need: the provider list with its filters, loading and error flags (so the filters survive going to a detail page and back), and the logged-in user (the route guard and the header both read it). A component keeps state that only it uses: the register form values and its touched flags, the detail page's provider, and the helpline and queue lists. Keeping local state local makes each page easier to follow and test.

**Where is a field validated?**
On the client, in `utils/validation.ts`. One pure function checks username length and characters, password length and the match with the confirmation, and the form shows each message under its field after blur or submit. The "username already taken" check needs data, so it runs against the API in the auth store. The real API will validate again with DTOs, because client checks can be bypassed.
