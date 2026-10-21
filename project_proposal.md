<div align="center">
<img src="itc-logo.png" alt="Institute of Technology of Cambodia" width="280">
<br>

# Institute of Technology of Cambodia

<br><br><br><br>

## Project Proposal

<br><br><br><br><br>

Course: Internet Programming <br>
Lecturer: Mr. CHUN Thavorac<br> Name: Hen Chhordavattey<br> ID: p20230043
<br><br><br><br><br><br><br><br><br><br>
</div>







# ListenUp

A web app where teenagers can chat in writing with trained volunteers and find therapy and support services in one place.

---
## Problem

Teenagers who are struggling often find a phone call to a helpline hard, while typing to someone feels easier. They also have no single place to compare therapy and support services by price, location and language, so many do not know what help they can afford.

### Background

Helplines and counselling services exist, but they are spread across phone numbers, social media pages and word of mouth. A teenager who is anxious about speaking aloud, or who cannot talk privately at home, may never make the call. A written chat lowers that barrier: the teenager can type at their own pace, from a phone, without a voice being heard by others nearby.

At the same time, families and teenagers who want professional help face a second problem: they cannot easily see which providers exist, what they cost, which languages they work in, and whether they offer sessions online. Free services run by organisations and paid private therapists are listed in different places, if they are listed at all.

ListenUp brings the two together. It lets a member talk to a volunteer in writing, and it gives anyone, with or without an account, a searchable listing that runs from free organisations to paid therapists, plus an immediate help page with real helpline numbers.

### Goals

1. Let a teenager start a written conversation with an approved volunteer within a few taps and without giving a real name or email.
2. Let anyone find a therapy or support provider by province, language, price (free to paid) and online or in-person delivery.
3. Keep real emergency help one tap away on every screen, even without logging in.
4. Keep conversations private, and let an admin step in only after a conversation has been reported.

### What ListenUp is not

ListenUp is a course prototype. It is not a crisis service, it does not replace real helplines, and it never gives a diagnosis, a self-assessment score or advice. Only a licensed professional can diagnose, and the app says so. Every screen shows that it is a prototype, and all demonstrations use fake data.

---
## Users and roles

|Role|Who|What they do in the app|What they cannot do|
|---|---|---|---|
|Visitor|Anyone without an account|Browses the provider listing and opens the immediate help page|Chat, or see any conversation|
|Member|A teenager with an account (username and password only)|Requests a chat, messages a volunteer, ends or reports a chat, sees their own past chats|See anyone else's conversations or any admin page|
|Volunteer|An adult approved by the admin|Sees waiting requests, accepts one, chats, ends or reports a chat|Accept chats before approval, or see conversations that are not their own|
|Admin|The person who runs and moderates the service|Approves volunteers, manages providers, helplines and users, reads reported conversations|Read a conversation that has not been reported|

### Example users (fictional)

- **Dara, 16, member.** Dara feels anxious before exams and finds it hard to speak about it at home. Dara signs up with a made-up username, requests a chat late in the evening, and writes to a volunteer. Later Dara uses the listing to look for a free service in the province where the family lives.
- **Ms. Srey, volunteer.** Ms. Srey has been approved by the admin. She opens the waiting list after work, accepts one request, and follows the volunteer guide: no advice, no sharing of contact details, and pointing the member to the helplines when needed.
- **Mr. Vuthy, admin.** Mr. Vuthy adds a new clinic to the listing and marks it verified after checking its details. When a volunteer reports a conversation, he reads it, and deactivates the account if the rules were broken.

---
## User stories

1. As a member, I want to sign up with only a username and password so that I can chat without giving my real name or email. Accepted when: the username is unique; the password is hashed and never returned; no email or real-name field exists; a wrong password returns 401; invalid input returns 400 with a clear message
2. As a visitor, I want to search the therapy and support listing by province, language, price and online or in-person so that I find help I can afford. Accepted when: it works without login; filters can be combined and free providers (price 0) can be selected; results are paginated (10 per page); only verified providers appear; an empty state is shown when nothing matches
3. As a visitor, I want an immediate help page with helpline numbers that opens from any screen without logging in so that I can reach real help fast. Accepted when: the Urgent help button is on every screen; the page needs no login; each helpline shows its number, hours, languages and last-verified date; a quick exit leaves the app; the page still shows a built-in list if the API is down
4. As a member, I want to request a chat so that a volunteer can talk with me in writing. Accepted when: a request creates a waiting conversation; I see a waiting screen with the Urgent help button; I can cancel the request; I can have only one open request at a time
5. As a member or volunteer, I want messages to arrive instantly so that the chat feels like a real conversation. Accepted when: a message appears for the other person within 2 seconds without refreshing; only the two participants receive it; empty or over-length messages are rejected with 400
6. As a member or volunteer, I want to end a chat or report it so that I stay in control and the admin can step in. Accepted when: either side can close a chat; a report needs a reason; closed chats accept no new messages; a report marks the conversation for the admin
7. As a volunteer, I want to see waiting requests and accept one so that I can help someone. Accepted when: only approved volunteers can accept; two volunteers cannot accept the same request (409); I can read only my own conversations (another volunteer's returns 403)
8. As an admin, I want to approve volunteers and manage providers and helplines so that the content is trustworthy. Accepted when: only an admin can do this; unapproved volunteers cannot accept chats; providers can be marked verified; helplines show their last-verified date
9. As an admin, I want to review reported conversations and deactivate users so that harmful behaviour is stopped. Accepted when: I can open a conversation only if it was reported (otherwise 403); deactivated users cannot log in
10. As a member, I want a private journal so that I can write down my thoughts. Accepted when: only I can read my entries; volunteers and admins cannot

---
## MVP scope

Must have: story 1, 2, 3, 4, 5, 6, 7, 8, 9 Nice to have: story 10

|Story|Feature|Priority|Target milestone|
|---|---|---|---|
|1|Sign up and log in with username and password|Must have|M3 (week 9)|
|2|Search the therapy and support listing|Must have|M2 (week 7)|
|3|Immediate help page and Urgent help button|Must have|M2 (week 7)|
|4|Request a chat and wait for a volunteer|Must have|M4 (week 12)|
|5|Live messages over WebSocket (stretch feature)|Must have|M4 (week 12)|
|6|End a chat or report it|Must have|M4 (week 12)|
|7|Volunteer queue and accepting a chat|Must have|M4 (week 12)|
|8|Admin approves volunteers and manages content|Must have|M3 (week 9)|
|9|Admin reviews reported conversations|Must have|M4 (week 12)|
|10|Private journal|Nice to have|After M4, only if time allows|

**Which story was cut, and why.** Story 10 is cut from the MVP because it needs a sixth entity and is a separate product from chat and listing. An anonymous post wall was considered and dropped earlier for the same reason, and because public posts would need constant moderation.

---
## Entities

|Entity|Main attributes|Relations|
|---|---|---|
|User|username (unique), passwordHash, role (MEMBER, VOLUNTEER, ADMIN), approved, active, createdAt|as a member has many Conversations; as a volunteer has many Conversations; has many Messages|
|Conversation|status (WAITING, ACTIVE, CLOSED), reportedAt, reportReason, createdAt, closedAt|belongs to one member and at most one volunteer; has many Messages|
|Message|body, sentAt|belongs to one Conversation and one sender (User)|
|Provider|name, type (THERAPIST, CLINIC, NGO), province, languages, contact, priceFrom, priceTo, delivery (ONLINE, IN_PERSON, BOTH), verified|standalone, managed by the admin|
|Helpline|name, phone, hours, languages, priority, active, lastVerified|standalone, managed by the admin|

### Relations and reasoning

- **Member to Conversation (one-to-many).** A member can have several chats over time, and each chat belongs to exactly one member.
- **Volunteer to Conversation (one-to-many).** A volunteer handles many chats, and each chat has at most one volunteer, which stays empty until a volunteer accepts. Both links are foreign keys on Conversation, so no join table is needed.
- **Conversation to Message (one-to-many)** and **User to Message (one-to-many, as sender).**
- **Provider and Helpline** are reference data with no owner. Only the admin changes them, which keeps the permission rules simple.

### Data rules

- Usernames are unique. No email, phone number or real name is stored for members.
- Passwords are stored only as hashes.
- Timestamps are stored in UTC.
- A conversation is readable only by its two participants, and by the admin after it has been reported.
- The seed script creates one admin, two volunteers (one approved, one pending), three members, several providers and a few conversations, all fictional. Helpline records in the seed use obviously fake placeholder numbers. Real numbers are entered by the admin from the organisations' official pages.

---
## Stretch feature

Real-time update (WebSockets). What it does in this app: chat messages and the volunteer's waiting queue update live through a NestJS WebSocket gateway, so a message reaches the other person within about 2 seconds without refreshing. The plain REST chat is built first, so the real-time part is added on top. If the connection drops, the client reconnects and falls back to polling every 5 seconds.

---
## Safety, privacy and ethics

- **No diagnosis or advice.** There are no quizzes, scores or symptom checkers. The app says that only a licensed professional can diagnose.
- **Real help first.** The Urgent help button is on every screen and works without login. The chat room has it too, and the waiting screen shows it while a member waits for a volunteer.
- **Volunteer rules.** A short volunteer guide states the rules: no advice, no sharing of contact details, and pointing members to the helplines. Volunteers are approved by the admin.
- **Privacy by design.** Members give no email, phone number or real name. Admin reads of reported conversations are written to the server log.
- **Honest limits.** The app never claims to monitor chats. Because it is a prototype, it is not promoted to real users.
- **Fake data only.** Demonstrations, tests and the seed script use fictional people and placeholder helpline numbers.

---
## Project plan

|Milestone|Week|Deliverable for ListenUp|
|---|---|---|
|M0 Proposal|3|This document and the entity list|
|M1 Frontend prototype|5|Wireframes, Vue app with at least 4 routes including a provider detail page, form validation, Pinia store, mock API, loading, empty and error states|
|M2 Backend API|7|API contract and ERD, NestJS modules, Prisma schema, migrations, seed script, CRUD for users, providers and helplines|
|M3 Integrated app|9|Real API in the frontend, login, roles and guards, volunteer approval, route guards, security checklist, demo|
|M4 Feature complete|12|Conversation and message modules, WebSocket chat, report flow, unit and e2e tests, Swagger|
|M5 Deployed|14|Dockerfiles, docker compose, CI, README, deployment with the prototype label|
|Final|16|Presentation and code defence (code frozen at the end of week 15)|

---
## Risks

|Risk|Mitigation|
|---|---|
|Real teenagers find the deployed app and treat it as a real service|Prototype label on every screen, Urgent help button, no public promotion, fake volunteers only, and the lecturer informed before M0 feedback|
|Crisis messages appear in a chat|The app never claims to monitor chats, the volunteer guide points to helplines, and the chat room has the Urgent help button|
|Misuse by a volunteer or member|Admin approval of volunteers, no contact sharing rule, report button, admin can deactivate users|
|Scope grows (journal, post wall, articles)|The MVP list is fixed and story 10 stays nice-to-have|
|WebSocket work takes longer than planned|Build REST chat first, add the gateway second, keep polling as a fallback|
|Deployment problems on the school server|Keep docker compose working locally from the first week|

---
## Out of scope

Diagnosis or self-assessment quizzes, advice, crisis handling, voice or video calls, payments, an anonymous post wall, and password recovery by email (accounts have no email).

---
## Repository
https://github.com/Vattey26/listenup