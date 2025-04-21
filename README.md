# 🧳 Lost & Found Items Application

This is a full-stack web application that allows users to **report**, **view**, **edit**, and **delete** lost and found items. It helps track and recover misplaced belongings effectively.

## 📚 Features

### ✅ Frontend (Angular)
- Home page with navigation buttons:
  - Report Lost Item
  - View Lost Items
  - Report Found Item
  - View Found Items
- Lost and Found item forms with:
  - Field validations (all fields required)
  - Duplicate entry prevention
  - Date validation (lost date must be in the past)
- Dynamic item lists with Edit & Delete functionality
- Responsive UI with clean styling

### ✅ Backend (Node.js + Express + MySQL)
- RESTful API for:
  - Creating, reading, updating, and deleting Lost and Found items
  - Duplicate entry checks
  - Date validations
- MySQL database integration

---

## 🛠 Technologies Used

### 🔹 Frontend
- Angular (Standalone Components)
- TypeScript
- HTML & CSS
- HttpClientModule

### 🔹 Backend
- Node.js
- Express.js
- TypeScript
- MySQL


---

## 🗃 Database Schema

### `lost_items`
| Field              | Type         |
|-------------------|--------------|
| id (PK)           | INT (AUTO_INCREMENT) |
| item_name         | VARCHAR      |
| category          | VARCHAR      |
| description       | TEXT         |
| last_seen_location| VARCHAR      |
| date_lost         | DATE         |
| contact_info      | VARCHAR      |
| created_at        | TIMESTAMP    |

### `found_items`
| Field              | Type         |
|-------------------|--------------|
| id (PK)           | INT (AUTO_INCREMENT) |
| item_name         | VARCHAR      |
| category          | VARCHAR      |
| description       | TEXT         |
| found_location    | VARCHAR      |
| date_found        | DATE         |
| contact_info      | VARCHAR      |
| created_at        | TIMESTAMP    |

---





