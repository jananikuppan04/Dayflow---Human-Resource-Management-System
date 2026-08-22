# 🌊 Dayflow — Human Resource Management System

> **Every workday, perfectly aligned.**

Dayflow is a modern, role-aware **Human Resource Management System (HRMS)** designed to bring essential employee and HR operations into a single, intuitive workspace.

The platform provides dedicated experiences for **Admin/HR Officers** and **Employees**, with modules for authentication, employee management, attendance tracking, employee profiles, salary information, and workplace management.

The current implementation focuses on a polished frontend experience with responsive layouts, role-based UI behavior, reusable React components, mock service APIs, and an enterprise-style SaaS interface.

---

## 🚀 Live Demo

### 🌐 Deployed Application

**[Open Dayflow HRMS](https://dayflow-human-resource-management-s-jade.vercel.app/)**

### Demo Flow 

**[Open Dayflow HRMS](https://youtu.be/Mr7YVHQGfhg)**

### 📦 Repository

**[GitHub Repository](https://github.com/jananikuppan04/Dayflow---Human-Resource-Management-System)**

### 🌿 Current Development Branch

`feature/Aadhava-auth-employee`

---

# 📌 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Objectives](#-objectives)
- [Key Features](#-key-features)
- [Role-Based Access](#-role-based-access)
- [Authentication](#-authentication)
- [Employee Management](#-employee-management)
- [Profile & Salary Management](#-profile--salary-management)
- [Attendance Management](#-attendance-management)
- [Workplace Modules](#-workplace-modules)
- [UI/UX](#-uiux)
- [Application Routes](#-application-routes)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Production Build](#-production-build)
- [Available Scripts](#-available-scripts)
- [Authentication Flow](#-authentication-flow)
- [Role Flow](#-role-flow)
- [Attendance Flow](#-attendance-flow)
- [Salary Flow](#-salary-flow)
- [Component Architecture](#-component-architecture)
- [Mock Data & Services](#-mock-data--services)
- [Responsive Design](#-responsive-design)
- [Current Implementation Status](#-current-implementation-status)
- [Future Enhancements](#-future-enhancements)
- [Security Considerations](#-security-considerations)
- [Development Guidelines](#-development-guidelines)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

# 🏢 Overview

**Dayflow HRMS** is designed as a centralized workforce-management platform where organizations can manage employee information, attendance, salary information, and other HR-related operations through a single web application.

The application provides two primary perspectives:

### 👨‍💼 Admin / HR Officer

Designed for HR personnel and administrators who need to:

- Manage and view employees
- Monitor attendance
- Review employee information
- Configure salary structures
- Access organization-level HR functionality
- Test role-specific application behavior

### 👨‍💻 Employee

Designed for employees who need to:

- Access their dashboard
- View their profile
- View personal/private information
- Manage/view documents
- View salary information according to permissions
- View their attendance
- Access employee-specific HR functionality

---

# 🎯 Problem Statement

Traditional HR operations are often distributed across spreadsheets, documents, emails, attendance systems, and payroll tools.

This can result in:

- Fragmented employee information
- Difficult attendance tracking
- Limited visibility into salary information
- Manual HR operations
- Poor role separation
- Inconsistent employee data
- Difficult navigation between HR modules

Dayflow aims to provide a centralized and user-friendly interface for managing these common HR operations.

---

# 💡 Solution

Dayflow brings employee and HR workflows into one responsive web application.

The system provides:

```text
                    ┌──────────────────────┐
                    │      DAYFLOW HRMS    │
                    └──────────┬───────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
       ┌──────▼──────┐                   ┌──────▼──────┐
       │ ADMIN / HR  │                   │  EMPLOYEE   │
       └──────┬──────┘                   └──────┬──────┘
              │                                 │
       ┌──────▼────────────┐             ┌──────▼────────────┐
       │ Employee Mgmt    │             │ Personal Profile │
       │ Attendance       │             │ Salary View      │
       │ Salary Config    │             │ Attendance       │
       │ HR Operations    │             │ Documents        │
       └──────────────────┘             └───────────────────┘

       🎯 Objectives

The main objectives of Dayflow are:

Provide a centralized HR workspace
Simplify employee management
Provide role-aware employee experiences
Improve attendance visibility
Organize employee information
Provide salary transparency based on permissions
Provide a responsive and modern interface
Create a scalable frontend architecture for future backend integration
✨ Key Features
🔐 1. Authentication

Dedicated authentication pages:

/login
/signup

Features include:

Login ID / Email authentication
Password input
Password visibility toggle
Remember-me UI
Form validation
Loading states
Toast notifications
Login success/error handling
Separate Sign In and Sign Up pages
Protected application routes

The authentication interface uses a premium visual design with:

Glassmorphism
Gradient typography
Particle background
Modern cards
Enterprise SaaS styling
Responsive layout
👥 2. Role-Based Access

Dayflow supports two application roles:

ADMIN

Provides HR/Admin-oriented functionality.

EMPLOYEE

Provides employee-specific functionality.

The application also includes a role toggle in the navbar to switch between:

ADMIN
   ↕
EMPLOYEE

This is currently useful for testing role-specific UI behavior.

Note: The current role toggle is a frontend testing mechanism. Production-grade authorization should ultimately be enforced by a backend authentication/authorization layer.

👨‍💼 3. Employee Management
Route
/employees

The Employee Management module provides an employee directory.

Features include:

Employee grid
Employee cards
Employee information
Contact information
Detailed employee modal
Employee profile viewing
Responsive employee layout
Employee Card

Each employee is represented through a reusable:

EmployeeCard

component.

Employee Modal

Selecting an employee opens:

EmployeeModal

which provides detailed employee information.

📊 4. Dashboard
Route
/dashboard

The dashboard provides the main employee workspace and acts as the landing area after successful authentication.

The dashboard is integrated into the main Dayflow application layout and navigation system.

👤 5. Profile & Salary Management
Route
/profile

The profile module is one of the major completed areas of the application.

It provides multiple profile sections.

Personal Information

Employees can access personal information through the:

Personal Info

tab.

Private Information

The:

Private Info

tab provides access to private employee information.

Documents

The Documents section provides an interface for managing employee-related files and records.

Component:

DocumentsTab
💰 Salary Management

Dayflow provides a structured salary information interface.

Salary information includes:

Salary Components

Examples of salary structure components can be displayed through dedicated salary cards.

Deductions

Salary deductions are represented separately.

Take-Home Salary

The application provides a consolidated take-home salary view.

Admin Salary Configuration

Administrators can access:

SalaryConfigModal

to configure/update salary structures.

Employee Salary Access

Employees receive a restricted salary view according to their role.

Unauthorized access is handled through:

UnauthorizedState

This creates a clear separation between administrative salary management and employee salary viewing.

🕒 6. Attendance Management
Route
/attendance

Attendance is one of the completed core modules.

The attendance implementation includes dedicated React components for:

Attendance table
Attendance summary
Attendance details
Attendance drawer
Role-specific attendance presentation

The AttendancePage uses the authentication context and mock API service and renders separate summary components for Admin and Employee experiences.

Admin / HR Attendance

Admin/HR users can view organization-level attendance information.

The interface supports:

Attendance records
Employee attendance
Check-in time
Check-out time
Work hours
Extra hours
Attendance status
Attendance details
Employee Attendance

Employees receive an employee-specific attendance experience.

The design is intended to restrict employee attendance visibility to their own records.

Attendance Components

The attendance module is organized into reusable components such as:

AttendanceTable
AttendanceSummaryCards
AttendanceDetailDrawer

This keeps attendance functionality modular and easier to extend.

🏖️ 7. Time Off
Route
/time-off

The Time Off module currently contains the initial UI for leave management.

The current interface includes mock leave balances for:

Casual Leave
Sick Leave
Earned Leave

Example structure:

Casual Leave
12 / 14 Days

Sick Leave
7 / 10 Days

Earned Leave
15 / 18 Days
Current Status

🚧 Partially implemented

The current route provides the UI foundation, but the complete leave request/approval workflow is not yet implemented.

Planned functionality includes:

Leave application
Leave balance
Leave history
Approval workflow
HR review
Leave status
Notifications
💵 8. Payroll
Route
/payroll

The Payroll route currently provides a payroll overview interface.

It references:

Payroll schedules
Payslips
Tax statements
Salary information

Detailed salary information can currently be accessed through:

/profile
Current Status

🚧 Placeholder / partially implemented

A complete payroll calculation and payslip-generation engine is planned for future development.

📈 9. Reports & HR Analytics
Route
/reports

The Reports section currently provides the foundation for HR analytics.

The planned analytics area covers:

Attendance trends
Headcount growth
Payroll summaries
HR metrics
Current Status

🚧 Placeholder

Advanced reporting and visualization are planned for future versions.

⚙️ 10. Settings
Route
/settings

The Settings page currently provides the initial system-configuration interface.

Planned settings include:

Organization configuration
Role management
System preferences
Integrations
Notification preferences
Security settings
Current Status

🚧 Placeholder

🎨 UI/UX

Dayflow is designed with a modern enterprise SaaS visual language.

The authentication experience particularly emphasizes a premium interface with:

Glassmorphism
Particle backgrounds
Gradient text
Large hero typography
Rounded cards
Smooth interactions
Responsive layouts

The login page currently uses the headline:

Every workday, perfectly aligned.

and describes Dayflow as a smarter way to manage people, attendance, leave, and HR operations.

🧭 Application Routes

The current application defines the following major routes:

Route	Module	Status
/login	Authentication	✅ Complete
/signup	Employee/Account Signup UI	✅ Complete
/dashboard	Dashboard	✅ Complete
/profile	Profile & Salary	✅ Complete
/employees	Employee Management	✅ Complete
/attendance	Attendance	✅ Complete
/time-off	Leave Management	🚧 Partial
/payroll	Payroll	🚧 Placeholder
/reports	HR Analytics	🚧 Placeholder
/settings	System Settings	🚧 Placeholder

The route structure is implemented through React Router, with authenticated and unauthenticated route handling in App.tsx.

🏗️ System Architecture

The frontend architecture follows a modular React structure.

                         DAYFLOW HRMS
                              │
                              ▼
                       React Application
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
        Authentication                Main Application
        /login /signup                       │
                │                            │
                │                    ┌───────┴────────┐
                │                    │                │
                ▼                    ▼                ▼
          AuthContext            Sidebar           Navbar
                │                    │                │
                │                    └───────┬────────┘
                │                            │
                │                            ▼
                │                    React Router
                │                            │
                │        ┌───────────┬───────┼────────┐
                │        │           │       │        │
                ▼        ▼           ▼       ▼        ▼
             Login   Dashboard   Profile Employees Attendance
                                      │
                                      ▼
                                Salary System
                                      │
                         ┌────────────┼────────────┐
                         ▼            ▼            ▼
                    Components   Services       Types
📁 Project Structure
Dayflow---Human-Resource-Management-System/
│
├── frontend/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   │
│   │   ├── attendance/
│   │   │   ├── AttendanceTable.tsx
│   │   │   ├── AttendanceSummaryCards.tsx
│   │   │   └── AttendanceDetailDrawer.tsx
│   │   │
│   │   ├── employee/
│   │   │   ├── EmployeeCard.tsx
│   │   │   └── EmployeeModal.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navbar.tsx
│   │   │
│   │   ├── profile/
│   │   │   ├── AdditionalInfoCard.tsx
│   │   │   ├── DeductionsCard.tsx
│   │   │   ├── DocumentsTab.tsx
│   │   │   ├── PersonalInfoTab.tsx
│   │   │   ├── PrivateInfoTab.tsx
│   │   │   ├── ProfileHeader.tsx
│   │   │   ├── ProfileTabs.tsx
│   │   │   ├── SalaryComponentsCard.tsx
│   │   │   ├── SalaryConfigModal.tsx
│   │   │   ├── SalaryHelpBanner.tsx
│   │   │   ├── SalaryInfoPage.tsx
│   │   │   ├── SalaryOverviewCard.tsx
│   │   │   ├── TakeHomeSalaryCard.tsx
│   │   │   └── UnauthorizedState.tsx
│   │   │
│   │   ├── PageBackground.tsx
│   │   ├── ParticleCanvas.tsx
│   │   └── Toast.tsx
│   │
│   ├── pages/
│   │   ├── AttendancePage.tsx
│   │   ├── EmployeeDashboard.tsx
│   │   ├── EmployeesPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── SignupPage.tsx
│   │
│   ├── services/
│   │   ├── mockApi.ts
│   │   └── salaryService.ts
│   │
│   ├── store/
│   │   └── AuthContext.tsx
│   │
│   ├── types/
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .gitignore
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── Readme.md

The repository currently organizes source code into components, pages, services, store, and types, with dedicated page files for authentication, employees, dashboard, and attendance.

🧩 Component Architecture

Dayflow uses reusable components rather than putting every feature into a single page.

For example:

AttendancePage
      │
      ├── AttendanceSummaryCards
      │
      ├── AttendanceTable
      │
      └── AttendanceDetailDrawer

Similarly:

SalaryInfoPage
      │
      ├── ProfileHeader
      ├── ProfileTabs
      ├── PersonalInfoTab
      ├── PrivateInfoTab
      ├── DocumentsTab
      ├── SalaryOverviewCard
      ├── SalaryComponentsCard
      ├── DeductionsCard
      ├── TakeHomeSalaryCard
      └── SalaryConfigModal

This architecture improves:

Reusability
Maintainability
Separation of concerns
UI consistency
Feature scalability

The profile directory currently contains dedicated components for personal/private information, documents, salary components, deductions, salary configuration, take-home salary, and unauthorized states.

🛠️ Technology Stack
Frontend
Technology	Purpose
React	UI development
TypeScript	Type-safe development
Vite	Development server and build tooling
React Router DOM	Client-side routing
Tailwind CSS	Utility-first styling
Lucide React	Icons
HTML5	Application structure
CSS	Custom styling and animations

The current package.json lists React 18, React DOM 18, React Router DOM 6, Lucide React, Tailwind CSS 3, TypeScript 5.6, and Vite 6.

📦 Dependencies

Main runtime dependencies:

react
react-dom
react-router-dom
lucide-react

Development dependencies include:

typescript
vite
tailwindcss
postcss
autoprefixer
@vitejs/plugin-react
@types/react
@types/react-dom
@types/node
🔐 Authentication Architecture

The current authentication architecture uses:

LoginPage
     │
     ▼
mockApi.login()
     │
     ▼
AuthContext
     │
     ▼
Authenticated User
     │
     ▼
Dashboard

The application uses an AuthContext to maintain the currently logged-in user and expose:

user
login()
logout()

The current AuthContext contains a temporary hardcoded Admin/HR user for the current development scope.

Important

This implementation is intended for the current frontend/prototype scope.

A production deployment should replace the mock authentication layer with:

Backend authentication
Secure password hashing
Session/JWT handling
Refresh-token strategy
Server-side role authorization
Secure persistence
Password reset
Account verification
🔑 Login Flow
User
 │
 ▼
/login
 │
 ├── Enter Login ID / Email
 │
 ├── Enter Password
 │
 ▼
Form Validation
 │
 ▼
mockApi.login()
 │
 ├── Success
 │      │
 │      ▼
 │   AuthContext.login()
 │      │
 │      ▼
 │   /dashboard
 │
 └── Failure
        │
        ▼
    Error Toast

The current login implementation validates the login ID/email and password, calls mockApi.login(), updates AuthContext, shows a success toast, and navigates to /dashboard.

📝 Signup Flow

The Signup page provides the account-creation UI.

The current implementation includes:

Company name
Employee name
Email
Phone
Year of joining
Logo upload
Password
Confirm password
Generated Login ID
Generated password

The Signup implementation contains helper logic for generating a Login ID and a temporary password.

Login ID Generation

The current frontend helper constructs the Login ID using:

Company Code
+
First 2 letters of first name
+
First 2 letters of last name
+
Year
+
Serial Number

Example:

COMPJOHN20250001

The exact Login ID generation logic should eventually be moved to a trusted backend service so it cannot be manipulated from the client.

🧪 Mock Data & Services

The current project contains:

src/services/mockApi.ts
src/services/salaryService.ts

The mock API is used by the frontend to simulate application behavior while the backend is not yet integrated.

The salary service provides a dedicated layer for salary-related functionality.

This architecture makes it easier to replace mock services with real API calls later.

🌐 Backend Integration Roadmap

The current branch is primarily a frontend implementation.

A future backend can replace:

mockApi.ts

with REST or GraphQL APIs.

Recommended architecture:

React Frontend
      │
      ▼
API Layer
      │
      ▼
Backend Server
      │
      ├── Authentication
      ├── Employee Management
      ├── Attendance
      ├── Leave
      ├── Payroll
      ├── Reports
      └── Settings
      │
      ▼
Database
🗄️ Recommended Future Backend

A production implementation could include:

Authentication
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/register
POST /api/auth/refresh
POST /api/auth/forgot-password
POST /api/auth/reset-password
Employees
GET    /api/employees
GET    /api/employees/:id
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id
Attendance
GET  /api/attendance
GET  /api/attendance/:employeeId
POST /api/attendance/check-in
POST /api/attendance/check-out
PUT  /api/attendance/:id
Leave
GET  /api/leaves
POST /api/leaves
PUT  /api/leaves/:id/approve
PUT  /api/leaves/:id/reject
Salary
GET /api/salary/:employeeId
PUT /api/salary/:employeeId

These endpoints are future architecture recommendations, not currently implemented APIs.

📱 Responsive Design

Dayflow is designed for:

Desktop
Laptop
Tablet
Mobile

The main application layout contains:

Sidebar
   +
Navbar
   +
Responsive Main Content

The application also includes mobile sidebar state handling in the main layout.

🖥️ Installation
1. Clone the repository
git clone https://github.com/jananikuppan04/Dayflow---Human-Resource-Management-System.git
2. Enter the project directory
cd Dayflow---Human-Resource-Management-System
3. Switch to the development branch
git checkout feature/Aadhava-auth-employee
4. Install dependencies
npm install
▶️ Running the Project

Start the Vite development server:

npm run dev

The application will normally be available at:

http://localhost:5173
🏗️ Production Build

Create a production build:

npm run build

The build process runs TypeScript compilation followed by the Vite production build.

Preview the production build:

npm run preview
🧹 Linting

Run the configured lint command:

npm run lint
📜 Available Scripts
Command	Description
npm run dev	Start development server
npm run build	Build production application
npm run preview	Preview production build
npm run lint	Run linting
🔄 Application Navigation

After authentication:

/login
   │
   ▼
/dashboard
   │
   ├── /profile
   ├── /employees
   ├── /attendance
   ├── /time-off
   ├── /payroll
   ├── /reports
   └── /settings

Unauthenticated users attempting to access protected application routes are redirected to /login.

Authenticated users accessing /login or /signup are redirected to /dashboard. This behavior is implemented in App.tsx.

🧑‍💼 Role Flow
                     Login
                       │
                       ▼
                Authenticated User
                       │
               ┌───────┴───────┐
               │               │
               ▼               ▼
             ADMIN          EMPLOYEE
               │               │
       ┌───────┼──────┐        │
       │       │      │        │
       ▼       ▼      ▼        ▼
   Employees Attendance Salary Profile
       │       │      │        │
       └───────┴──────┘        │
               │               │
               ▼               ▼
         HR Operations    Employee Operations
🕒 Attendance Flow
Employee
   │
   ▼
Attendance Page
   │
   ├── Check In
   │
   ├── Check Out
   │
   ├── Work Hours
   │
   └── Attendance Status

Admin/HR:

Admin / HR
    │
    ▼
Attendance Page
    │
    ├── View Employees
    ├── View Attendance
    ├── Check In / Check Out Data
    ├── Work Hours
    ├── Extra Hours
    └── Attendance Details
💰 Salary Flow
Employee Profile
       │
       ▼
Salary Information
       │
       ├── Salary Overview
       ├── Salary Components
       ├── Deductions
       └── Take-Home Salary

For Admin:

Admin
  │
  ▼
Salary Configuration
  │
  ▼
SalaryConfigModal
  │
  ▼
Update Salary Structure

For Employee:

Employee
   │
   ▼
Salary Information
   │
   ▼
Restricted Read-Only View
🚧 Current Implementation Status
✅ Completed
Authentication
 Login page
 Signup page
 Form validation
 Login ID / Email field
 Password visibility
 Toast notifications
 AuthContext
 Protected routes
 Responsive authentication UI
 Particle background
 Page transitions
Layout
 Responsive sidebar
 Top navbar
 Mobile sidebar
 Role toggle
 Route-based page titles
 Main application layout
Employee Management
 Employee directory
 Employee cards
 Employee modal
 Employee profile information
Profile
 Personal information
 Private information
 Documents
 Salary overview
 Salary components
 Deductions
 Take-home salary
 Admin salary configuration
 Employee restricted salary view
Attendance
 Attendance page
 Attendance table
 Attendance summary
 Role-specific attendance views
 Attendance detail drawer
 Check-in/check-out presentation
 Work-hour information
🚧 Work in Progress
Time Off
 Initial UI
 Leave balance cards
 Leave request workflow
 Approval workflow
 Leave history
 Notifications
Payroll
 Initial overview
 Link to profile salary information
 Payroll calculation engine
 Payslip generation
 Payroll history
 Tax/statutory processing
Reports
 Initial HR analytics UI
 Attendance analytics
 Employee analytics
 Payroll analytics
 Exportable reports
 Advanced charts
Settings
 Initial UI
 Organization settings
 Role management
 System preferences
 Integrations
 Notification settings
🔮 Future Enhancements
Backend
 Production backend
 REST API
 Database integration
 Secure authentication
 JWT/session management
 Role-based authorization
Employee Management
 Employee creation
 Employee editing
 Employee deletion
 Department management
 Designation management
 Employee onboarding
Attendance
 Real-time attendance persistence
 Geolocation-based attendance
 Attendance correction requests
 Monthly attendance reports
 Attendance export
 Payroll integration
Leave Management
 Leave request
 Leave approval/rejection
 Leave balance calculation
 Leave history
 HR approval workflow
 Leave notifications
Payroll
 Payroll processing
 Salary calculation
 Attendance-based deductions
 Payslip generation
 Payroll history
 Tax calculations
Reports
 HR dashboards
 Employee analytics
 Attendance analytics
 Payroll analytics
 Export to PDF
 Export to Excel/CSV
Notifications
 In-app notifications
 Email notifications
 Leave approval notifications
 Attendance alerts
 Payroll notifications
🔐 Security Considerations

The current frontend implementation is a prototype/development-stage architecture and should not be considered production-secure authentication.

For production deployment, implement:

Authentication
Secure password hashing
Server-side authentication
Secure sessions/JWT
Refresh tokens
Password reset
Email verification
Authorization

Never rely only on frontend role toggles.

Backend authorization should enforce:

ADMIN
EMPLOYEE

permissions on every protected API endpoint.

Data Protection
HTTPS
Secure cookies
Input validation
API validation
Rate limiting
CSRF protection where applicable
Secure file upload validation
Audit logging
🧪 Testing Strategy

Future testing should cover:

Authentication
Valid login
Invalid login
Empty credentials
Password visibility
Logout
Protected routes
Employees
Employee list
Employee details
Modal behavior
Role restrictions
Attendance
Check-in
Check-out
Attendance display
Role-specific data visibility
Work-hour calculation
Salary
Admin configuration
Employee read-only access
Unauthorized access
Salary calculation
Responsive UI

Test:

Desktop
Tablet
Mobile
Different browser sizes
🧑‍💻 Development Guidelines

When extending Dayflow:

1. Use reusable components

Prefer:

components/

over putting large UI blocks directly inside pages.

2. Keep business logic separate

Use:

services/

for API/business-service interactions.

3. Keep authentication centralized

Use:

AuthContext

for authentication state.

4. Use TypeScript types

Keep shared types under:

src/types/
5. Maintain role separation

Always consider:

ADMIN
EMPLOYEE

when implementing new features.

6. Preserve responsive behavior

Every new feature should work on:

Desktop
Tablet
Mobile
🌱 Git Workflow

Create a feature branch before implementing a new module:

git checkout main
git pull origin main
git checkout -b feature/your-feature-name

After development:

git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature-name

Then create a Pull Request for review.

📌 Branch Information

Current development branch:

feature/Aadhava-auth-employee

This branch contains the authentication and employee-management work together with the current Dayflow HRMS frontend implementation.

The repository currently has an active Pull Request and the branch contains approximately 20 commits according to GitHub's repository view.

📊 Module Overview
Module	Admin	Employee	Status
Authentication	✅	✅	Complete
Dashboard	✅	✅	Complete
Employee Management	✅	Limited	Complete
Profile	✅	✅	Complete
Documents	✅	✅	Complete
Salary Management	✅	Read-only	Complete
Attendance	✅	Own Records	Complete
Time Off	🚧	🚧	Partial
Payroll	🚧	🚧	Placeholder
Reports	🚧	🚧	Placeholder
Settings	🚧	🚧	Placeholder
🧱 Current Architecture vs Future Architecture
Current
React
  │
  ├── React Router
  ├── AuthContext
  ├── Mock API
  ├── Salary Service
  └── Reusable Components
Future
React Frontend
      │
      ▼
API Gateway / Backend
      │
      ├── Authentication Service
      ├── Employee Service
      ├── Attendance Service
      ├── Leave Service
      ├── Payroll Service
      └── Reporting Service
      │
      ▼
Database
🌐 Deployment

The current application is deployed as a Vercel-hosted web application.

Production Demo

https://dayflow-human-resource-management-s-jade.vercel.app/

The GitHub repository also exposes the deployed application link in its repository metadata.

📸 Screenshots

Add project screenshots here as the UI evolves.

Recommended screenshots:

docs/
├── login.png
├── signup.png
├── dashboard.png
├── employees.png
├── profile.png
├── salary.png
├── attendance-admin.png
├── attendance-employee.png
└── mobile-view.png

Example:

## Login

![Dayflow Login](docs/login.png)

## Dashboard

![Dayflow Dashboard](docs/dashboard.png)

## Attendance

![Dayflow Attendance](docs/attendance.png)
🏆 Project Highlights

Dayflow focuses on:

🎨 Premium enterprise SaaS UI
🔐 Authentication flow
👥 Role-aware employee management
👤 Employee profile management
💰 Salary management
🕒 Attendance tracking
📱 Responsive design
🧩 Reusable React components
🧭 Client-side routing
🧪 Mock service architecture
🚀 Vercel deployment
📈 Extensible HR platform architecture
📚 Learning Outcomes

This project provides practical experience with:

React component architecture
TypeScript
React Router
Context API
State management
Form validation
Responsive UI development
Tailwind CSS
Component reuse
Role-aware interfaces
Service abstraction
Frontend architecture
Vite
Production builds
Vercel deployment
Git/GitHub collaboration
🤝 Contributing

Contributions are welcome.

Steps
Fork the repository
Create a feature branch
Implement your changes
Test locally
Commit your changes
Push the branch
Create a Pull Request

Example:

git checkout -b feature/attendance-improvements
📄 License

No explicit open-source license is currently specified in the repository.

If this project is intended for public reuse, add an appropriate license such as MIT before representing it as open-source software.

👨‍💻 Project
Dayflow — Human Resource Management System

Tagline:

Every workday, perfectly aligned.

Repository

GitHub

Live Application

Dayflow HRMS

⭐ Support

If you find the project useful:

⭐ Star the repository
🐛 Report issues
💡 Suggest improvements
🔀 Submit pull requests
📢 Share the project
