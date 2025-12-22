# AssetVerse Frontend

**AssetVerse** is a **B2B corporate asset management system** that helps HR managers and employees track company assets, manage assignments, and request/return items efficiently. This repository contains the **frontend client** built with **React, Vite, Tailwind CSS, DaisyUI, and Firebase**.

---

## **Live Demo**

[AssetVerse Live Site](https://asset-verse-d5365.web.app)

---

## **Features**

### **Authentication**
- Email & password login for Employees and HR managers  
- Firebase authentication integration (token verification)  
- Role-based access: Employee vs HR manager dashboards  
- Persistent login on route reloads  

### **HR Manager Dashboard**
- Asset Management: Add, edit, delete company assets  
- Employee Management: View, remove, and track employees  
- Asset Requests: Approve/reject employee requests  
- Package Management: Upgrade subscription packages using Stripe  
- Analytics: Charts for asset types and popular requests  

### **Employee Dashboard**
- View assigned assets across all affiliated companies  
- Request new assets from company inventory  
- Return returnable items  
- View team members and birthdays  
- Update personal profile  

### **Public Pages**
- Home page with hero, features, testimonials, packages, FAQ, and contact sections  
- Separate registration pages for HR and Employee  
- Login page  
- 404 error page  

### **UI & UX**
- Responsive design for mobile, tablet, and desktop  
- Professional corporate-friendly design  
- Smooth animations using Framer Motion  
- DaisyUI components for consistent styling  
- Toast notifications using `react-hot-toast`  

---

## **Technologies Used**

- **Frontend:** React.js, Vite, React Router v6  
- **CSS & Styling:** Tailwind CSS, DaisyUI  
- **Animations:** Framer Motion  
- **Icons:** Lucide React  
- **HTTP Client:** Axios  
- **Authentication:** Firebase Auth  
- **Notifications:** React Hot Toast  
- **Payment Integration:** Stripe Checkout (via backend)  

---

## **Pages & Components**

### **Public Pages**
- `Home.jsx` – Landing page with hero, features, packages, testimonials  
- `Login.jsx` – Login page for HR and Employees  
- `RegisterEmployee.jsx` – Employee registration  
- `RegisterHR.jsx` – HR registration  
- `Error404.jsx` – Page not found  

### **Employee Dashboard**
- `MyAssets.jsx` – View assigned assets with search/filter & print PDF  
- `RequestAsset.jsx` – Browse assets & submit requests  
- `MyTeam.jsx` – View team members by company  
- `Profile.jsx` – Update personal info  

### **HR Manager Dashboard**
- `AssetList.jsx` – Searchable table of company assets  
- `AddAsset.jsx` – Form to add new asset  
- `AllRequests.jsx` – Table for employee asset requests (approve/reject)  
- `EmployeeList.jsx` – List of employees with remove button  
- `UpgradePackage.jsx` – View packages & integrate Stripe payment  
- `Profile.jsx` – Update HR info and company logo  

### **Shared Components**
- `Navbar.jsx` – Responsive navigation bar  
- `Footer.jsx` – Footer with contact & social links  
- `Loader.jsx` – Animated spinner for loading states  
- `ToastNotification.jsx` – React Hot Toast wrapper  
- `Charts.jsx` – Recharts components for analytics  

---

## **State Management & API Calls**

- **HTTP Requests:** Axios for calling backend APIs  
- **Protected Routes:** React Router v6 with `PrivateRoute` and `HRRoute`  
- **Auth Context:** `AuthContext` for storing logged-in user info & token  
- **Notifications:** `react-hot-toast` for success/error feedback  

---

## **Setup & Installation**

1. **Clone the repository**
```bash
git clone <repository_url>
cd assetverse-frontend
