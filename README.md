# 📘 Trusted Parent System — Backend API

A RESTful backend API for the Trusted Parent System, providing authentication, parent profiles, privacy settings, community groups, family needs, and child development lookup data.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Node.js + Express | Server & routing |
| PostgreSQL | Database |
| Prisma ORM | Database access & migrations |
| JWT | Authentication |
| Rate Limiting + Validation | Security middleware |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd trusted-parent-system/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
DATABASE_URL="postgresql://postgres:<password>@localhost:5432/nugget?schema=public"
JWT_SECRET="your_jwt_secret_here"
PORT=4000
```

### 4. Generate the Prisma client

```bash
npx prisma generate
```

### 5. Apply database migrations

```bash
npx prisma migrate dev
```

### 6. Seed lookup tables *(optional but recommended)*

```bash
npx prisma db seed
```

### 7. Start the development server

```bash
npm run dev
```

The server will be running at **`http://localhost:4000`**

---

## 📡 API Routes

### 🔐 Authentication — `/auth`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Log in and receive a JWT token |

> **All protected routes require the following header:**
> ```
> Authorization: Bearer <token>
> ```

---

### 👤 Parent Profiles — `/profile`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/profile` | Get all parent profiles |
| `GET` | `/profile/:id` | Get a single parent profile |
| `POST` | `/profile` | Create a parent profile |
| `PUT` | `/profile/:id` | Replace a parent profile |
| `PATCH` | `/profile/:id` | Partially update a parent profile |
| `DELETE` | `/profile/:id` | Delete a parent profile |

---

### 🔒 Privacy Settings — `/privacy`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/privacy/:parentProfileId` | Get privacy settings for a parent |
| `PUT` | `/privacy/:parentProfileId` | Update privacy settings |

---

### 👥 Community Groups — `/groups`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/groups` | Get all groups |
| `GET` | `/groups/:id` | Get a single group |
| `POST` | `/groups` | Create a group |
| `PUT` | `/groups/:id` | Replace a group |
| `PATCH` | `/groups/:id` | Partially update a group |
| `DELETE` | `/groups/:id` | Delete a group |

---

### 🧩 Needs Lookup — `/needs`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/needs` | Returns all `FamilyNeed` lookup values |

**Response example:**

```json
[
  { "code": "AIR_CONDITIONING", "label": "Air Conditioning" },
  { "code": "DOG_FRIENDLY", "label": "Dog Friendly" }
]
```

---

### 🧒 Child Stages Lookup — `/stages`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/stages` | Returns all child development stages ordered by `sortOrder` |

**Response example:**

```json
[
  { "code": "BABY", "label": "Baby (0-12 months)" },
  { "code": "TODDLER", "label": "Toddler (1-3 years)" }
]
```

---

## 🗂 Folder Structure

```
backend/
├── config/
├── controllers/
├── middleware/
├── routes/
├── schemas/
├── utils/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── server.ts
```

---

## 🤝 For Frontend Developers

**Base URL:** `http://localhost:4000`

**Authentication header** (required on all protected routes):
```
Authorization: Bearer <token>
```

### Recommended Integration Flow

1. **`POST /auth/register`** or **`POST /auth/login`** → receive JWT token
2. Use `/needs` and `/stages` to populate dropdowns in your UI
3. Use `/profile` and `/privacy` routes for user profile & settings
4. Use `/groups` routes for community features
