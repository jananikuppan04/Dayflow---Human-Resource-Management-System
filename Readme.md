# 🌊 Dayflow — Human Resource Management System

> **Every workday, perfectly aligned.**

Dayflow is a modern, role-aware **Human Resource Management System (HRMS)** designed to bring essential employee and HR operations into a single, intuitive workspace.

The platform provides dedicated experiences for **Admin/HR Officers** and **Employees**, with modules for authentication, employee management, attendance tracking, employee profiles, salary information, and workplace management.

The current implementation focuses on a polished frontend experience with responsive layouts, role-based UI behavior, reusable React components, mock service APIs, and an enterprise-style SaaS interface.

---

## 🚀 Live Demo

### 🌐 Deployed Application

**[Open Dayflow HRMS](https://dayflow-human-resource-management-s-jade.vercel.app/)**

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
