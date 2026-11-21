# ListenUp API Contract & Specification

This document defines the REST API contract for the **ListenUp** backend service, including data entities, validation rules, endpoint specifications, and role-based access control (RBAC).

---

## 1. Resource Models & Data Dictionary

### 1.1 User Resource

Represents registered users in the system (teenagers, volunteers, and admins).

| Field       | Type      |  Required  | Constraints & Rules                                        | Description                                  |
| :---------- | :-------- | :--------: | :--------------------------------------------------------- | :------------------------------------------- |
| `id`        | `integer` | Read-only  | Auto-increment primary key                                 | Unique user identifier                       |
| `username`  | `string`  |    Yes     | Min: 3, Max: 20 chars; Regex: `^[a-zA-Z0-9_]+$` (unique)   | Anonymous handle for chat and login          |
| `password`  | `string`  | Write-only | Min: 8 chars (stored as bcrypt hash)                       | Plaintext received on register/login only    |
| `role`      | `enum`    |    Yes     | `'MEMBER' \| 'VOLUNTEER' \| 'ADMIN'` (default: `'MEMBER'`) | Permission level                             |
| `approved`  | `boolean` |    Yes     | Default: `true` for MEMBER/ADMIN, `false` for VOLUNTEER    | Admin approval flag for volunteers           |
| `active`    | `boolean` |    Yes     | Default: `true`                                            | Account active state (deactivation by admin) |
| `createdAt` | `string`  | Read-only  | ISO 8601 UTC timestamp                                     | Account creation date                        |

---

### 1.2 Provider Resource

Represents professional mental health clinics, therapists, and NGOs.

| Field       | Type       | Required  | Constraints & Rules                  | Description                                     |
| :---------- | :--------- | :-------: | :----------------------------------- | :---------------------------------------------- |
| `id`        | `integer`  | Read-only | Auto-increment primary key           | Unique provider identifier                      |
| `name`      | `string`   |    Yes    | Min: 2, Max: 100 chars               | Organization or professional name               |
| `type`      | `enum`     |    Yes    | `'THERAPIST' \| 'CLINIC' \| 'NGO'`   | Type of service provider                        |
| `province`  | `string`   |    Yes    | Min: 2, Max: 50 chars                | Cambodian province (e.g., "Phnom Penh")         |
| `languages` | `string[]` |    Yes    | Array of strings; Min: 1 item        | Languages spoken (e.g., `["Khmer", "English"]`) |
| `contact`   | `string`   |    Yes    | Max: 100 chars                       | Phone number, Telegram, or email                |
| `priceFrom` | `number`   |    Yes    | Float/integer, Range: `>= 0` (USD)   | Minimum session price (`0` = free)              |
| `priceTo`   | `number`   |    Yes    | Float/integer, Range: `>= priceFrom` | Maximum session price                           |
| `delivery`  | `enum`     |    Yes    | `'ONLINE' \| 'IN_PERSON' \| 'BOTH'`  | Service delivery method                         |
| `verified`  | `boolean`  |    Yes    | Default: `false`                     | Admin verification badge                        |

---

### 1.3 Helpline Resource

Emergency contact numbers displayed on the immediate urgent help page.

| Field          | Type       | Required  | Constraints & Rules                         | Description                                 |
| :------------- | :--------- | :-------: | :------------------------------------------ | :------------------------------------------ |
| `id`           | `integer`  | Read-only | Auto-increment primary key                  | Unique helpline identifier                  |
| `name`         | `string`   |    Yes    | Min: 2, Max: 100 chars                      | Name of service or organization             |
| `phone`        | `string`   |    Yes    | Min: 3, Max: 30 chars                       | Hotline number                              |
| `hours`        | `string`   |    Yes    | Min: 2, Max: 50 chars                       | Operating hours (e.g., "24/7", "8am - 5pm") |
| `languages`    | `string[]` |    Yes    | Array of strings; Min: 1 item               | Supported languages                         |
| `priority`     | `integer`  |    Yes    | Integer, Range: `1` to `100` (default: `1`) | Display ordering weight                     |
| `lastVerified` | `string`   |    Yes    | ISO 8601 Date/Timestamp string              | When details were last checked              |
| `active`       | `boolean`  |    Yes    | Default: `true`                             | Visibility toggle                           |

---

### 1.4 Conversation Resource

Represents a written chat session between a member and a volunteer.

| Field          | Type      | Required  | Constraints & Rules                 | Description                               |
| :------------- | :-------- | :-------: | :---------------------------------- | :---------------------------------------- |
| `id`           | `integer` | Read-only | Auto-increment primary key          | Unique chat identifier                    |
| `status`       | `enum`    |    Yes    | `'WAITING' \| 'ACTIVE' \| 'CLOSED'` | Chat lifecycle status                     |
| `memberId`     | `integer` |    Yes    | Foreign key -> `User.id`            | The teenage member who requested the chat |
| `volunteerId`  | `integer` | Optional  | Foreign key -> `User.id` or `null`  | The assigned volunteer                    |
| `reportedAt`   | `string`  | Optional  | ISO 8601 UTC timestamp or `null`    | When reported to admin                    |
| `reportReason` | `string`  | Optional  | Max: 500 chars or `null`            | Why conversation was flagged              |
| `createdAt`    | `string`  | Read-only | ISO 8601 UTC timestamp              | When request was created                  |
| `closedAt`     | `string`  | Optional  | ISO 8601 UTC timestamp or `null`    | When conversation ended                   |

---

### 1.5 Message Resource

An individual text message in a conversation.

| Field            | Type      | Required  | Constraints & Rules               | Description               |
| :--------------- | :-------- | :-------: | :-------------------------------- | :------------------------ |
| `id`             | `integer` | Read-only | Auto-increment primary key        | Unique message identifier |
| `conversationId` | `integer` |    Yes    | Foreign key -> `Conversation.id`  | Parent conversation       |
| `senderId`       | `integer` |    Yes    | Foreign key -> `User.id`          | Sender ID                 |
| `body`           | `string`  |    Yes    | Min: 1, Max: 1000 chars (trimmed) | Message text              |
| `sentAt`         | `string`  | Read-only | ISO 8601 UTC timestamp            | Sent time                 |

---

## 2. API Endpoints Specification

| Method     | Endpoint Path                 | Request Body                                                                 |  Success Status  | Error Statuses                                                          |
| :--------- | :---------------------------- | :--------------------------------------------------------------------------- | :--------------: | :---------------------------------------------------------------------- |
| **POST**   | `/auth/register`              | `{ username, password }`                                                     |  `201 Created`   | `400 Bad Request`, `409 Conflict`                                       |
| **POST**   | `/auth/login`                 | `{ username, password }`                                                     |     `200 OK`     | `400 Bad Request`, `401 Unauthorized`                                   |
| **GET**    | `/auth/me`                    | None                                                                         |     `200 OK`     | `401 Unauthorized`                                                      |
| **GET**    | `/users`                      | None (Query: `?role=&approved=`)                                             |     `200 OK`     | `401 Unauthorized`, `403 Forbidden`                                     |
| **PATCH**  | `/users/:id/approve`          | None                                                                         |     `200 OK`     | `401 Unauthorized`, `403 Forbidden`, `404 Not Found`                    |
| **PATCH**  | `/users/:id/status`           | `{ active: boolean }`                                                        |     `200 OK`     | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found` |
| **GET**    | `/providers`                  | None (Query: `?province=&type=&delivery=&maxPrice=`)                         |     `200 OK`     | `400 Bad Request`                                                       |
| **GET**    | `/providers/:id`              | None                                                                         |     `200 OK`     | `404 Not Found`                                                         |
| **POST**   | `/providers`                  | `{ name, type, province, languages, contact, priceFrom, priceTo, delivery }` |  `201 Created`   | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`                  |
| **PATCH**  | `/providers/:id`              | Partial provider fields                                                      |     `200 OK`     | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found` |
| **DELETE** | `/providers/:id`              | None                                                                         | `204 No Content` | `401 Unauthorized`, `403 Forbidden`, `404 Not Found`                    |
| **GET**    | `/helplines`                  | None (Query: `?_sort=priority`)                                              |     `200 OK`     | None                                                                    |
| **GET**    | `/helplines/:id`              | None                                                                         |     `200 OK`     | `404 Not Found`                                                         |
| **POST**   | `/helplines`                  | `{ name, phone, hours, languages, priority, lastVerified }`                  |  `201 Created`   | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`                  |
| **PATCH**  | `/helplines/:id`              | Partial helpline fields                                                      |     `200 OK`     | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found` |
| **DELETE** | `/helplines/:id`              | None                                                                         | `204 No Content` | `401 Unauthorized`, `403 Forbidden`, `404 Not Found`                    |
| **POST**   | `/conversations`              | None (Created for current member)                                            |  `201 Created`   | `401 Unauthorized`, `403 Forbidden`, `409 Conflict` (already in queue)  |
| **GET**    | `/conversations`              | None (Query: `?status=WAITING`)                                              |     `200 OK`     | `401 Unauthorized`, `403 Forbidden`                                     |
| **GET**    | `/conversations/:id`          | None                                                                         |     `200 OK`     | `401 Unauthorized`, `403 Forbidden`, `404 Not Found`                    |
| **PATCH**  | `/conversations/:id/accept`   | None                                                                         |     `200 OK`     | `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`    |
| **PATCH**  | `/conversations/:id/close`    | None                                                                         |     `200 OK`     | `401 Unauthorized`, `403 Forbidden`, `404 Not Found`                    |
| **POST**   | `/conversations/:id/report`   | `{ reason: string }`                                                         |     `200 OK`     | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found` |
| **GET**    | `/conversations/:id/messages` | None                                                                         |     `200 OK`     | `401 Unauthorized`, `403 Forbidden`, `404 Not Found`                    |
| **POST**   | `/conversations/:id/messages` | `{ body: string }`                                                           |  `201 Created`   | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found` |

---

## 3. Route Authentication & Access Control (RBAC) Matrix

Auth will be enforced via JWT Guards and Role Guards (added in Week 8). The permissions are determined as follows:

| Endpoint Path                 |  Method  | Auth Required | Allowed Roles                  | Access Rules & Justification                                               |
| :---------------------------- | :------: | :-----------: | :----------------------------- | :------------------------------------------------------------------------- |
| `/auth/register`              |  `POST`  |      No       | Public (Visitor)               | Anyone can create a member account.                                        |
| `/auth/login`                 |  `POST`  |      No       | Public (Visitor)               | Anyone with credentials can log in.                                        |
| `/auth/me`                    |  `GET`   |      Yes      | `MEMBER`, `VOLUNTEER`, `ADMIN` | Returns profile info for current authenticated token.                      |
| `/users`                      |  `GET`   |      Yes      | `ADMIN`                        | Only admin manages users.                                                  |
| `/users/:id/approve`          | `PATCH`  |      Yes      | `ADMIN`                        | Only admin approves pending volunteer accounts.                            |
| `/users/:id/status`           | `PATCH`  |      Yes      | `ADMIN`                        | Only admin can deactivate abusive accounts.                                |
| `/providers`                  |  `GET`   |      No       | Public (Visitor)               | Anonymous browsing of providers is an MVP requirement.                     |
| `/providers/:id`              |  `GET`   |      No       | Public (Visitor)               | Anonymous viewing of detail page.                                          |
| `/providers`                  |  `POST`  |      Yes      | `ADMIN`                        | Only admin can add directory listings.                                     |
| `/providers/:id`              | `PATCH`  |      Yes      | `ADMIN`                        | Only admin can edit or verify providers.                                   |
| `/providers/:id`              | `DELETE` |      Yes      | `ADMIN`                        | Only admin can remove listings.                                            |
| `/helplines`                  |  `GET`   |      No       | Public (Visitor)               | Immediate help page must work without login.                               |
| `/helplines/:id`              |  `GET`   |      No       | Public (Visitor)               | Detail view of helpline.                                                   |
| `/helplines`                  |  `POST`  |      Yes      | `ADMIN`                        | Only admin can add emergency helplines.                                    |
| `/helplines/:id`              | `PATCH`  |      Yes      | `ADMIN`                        | Only admin updates emergency numbers.                                      |
| `/helplines/:id`              | `DELETE` |      Yes      | `ADMIN`                        | Only admin deletes helplines.                                              |
| `/conversations`              |  `POST`  |      Yes      | `MEMBER`                       | Only members can request support chats.                                    |
| `/conversations`              |  `GET`   |      Yes      | `MEMBER`, `VOLUNTEER`, `ADMIN` | Members view their own chats; Volunteers view queue; Admin views reported. |
| `/conversations/:id`          |  `GET`   |      Yes      | `MEMBER`, `VOLUNTEER`, `ADMIN` | Restricted to participants (or Admin if reported).                         |
| `/conversations/:id/accept`   | `PATCH`  |      Yes      | `VOLUNTEER`                    | Only approved volunteers can accept a chat.                                |
| `/conversations/:id/close`    | `PATCH`  |      Yes      | `MEMBER`, `VOLUNTEER`          | Either chat participant can end the session.                               |
| `/conversations/:id/report`   |  `POST`  |      Yes      | `MEMBER`, `VOLUNTEER`          | Either chat participant can report to admin.                               |
| `/conversations/:id/messages` |  `GET`   |      Yes      | `MEMBER`, `VOLUNTEER`, `ADMIN` | Restricted to chat participants (or Admin if reported).                    |
| `/conversations/:id/messages` |  `POST`  |      Yes      | `MEMBER`, `VOLUNTEER`          | Only active participants can send messages.                                |
