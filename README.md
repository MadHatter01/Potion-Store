# Potion Store - A microservice based app

Potion Store is a microservices-based application designed to manage and sell magical potions. It consists of separate backend services, a gateway, and a React-based frontend for both users and administrators.

## Architecture Overview 

The application follows a **microservice architecture** with a **Python FastAPI** backend and a **React** frontend.  

### **Backend Services (FastAPI & SQLAlchemy with SQLite)**  
The backend is divided into three services:  

1. **Gateway Service**  
   - Acts as a single entry point for the frontend.  
   - Routes requests to the appropriate microservice (Inventory or Store).  

2. **Inventory Service**  
   - Manages potion stock quantity.  
   - Allows admins to view, add, and restock potions.  

3. **Store Service**  
   - Handles potion purchases.  
   - Process store purchases and updates inventory.  

### **Frontend (React + Mantine UI)**  
The frontend consists of two separate interfaces:  

1. **Admin UI**  
   - Allows admins to:  
     - View all available potions.
       ![image](https://github.com/user-attachments/assets/328ac887-6b7b-4e0d-a2ec-7600eaafd5fd)
     - Add new potions.
       ![image](https://github.com/user-attachments/assets/1affa32a-54f1-4e08-88c7-dc4ea7fc3c37)
     - Restock existing potions.  
   - Sends requests to the Gateway Service, which communicates with the Inventory Service.
   
     



2. **Store UI**  
   - Allows customers to:  
     - Browse available potions.  
     - Purchase potions.
       ![image](https://github.com/user-attachments/assets/e3e49211-4abb-4cc0-88dc-4602af61b0ea)

   - Sends requests to the Gateway Service, which communicates with both Inventory and Store Services.
   - Photos by FlyD on Unsplash https://unsplash.com/photos/clear-glass-bottle-with-red-liquid-6ShUh79l1Vw?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash


## Tech Stack  
- **Backend:** Python, FastAPI, SQLAlchemy, SQLite  
- **Frontend:** React, Mantine UI, Axios  
- **API Gateway:** FastAPI-based routing  

## Getting Started  
1. Clone the repository:  
   ```bash
   git clone https://github.com/MadHatter01/Potion-Store.git
   cd potion-store
   ```
2. Start backend services:
   Go to the backend folder  
   ```bash
   python -m inventory-service.app.main   
   python -m store-service.app.main  
   python -m gateway-service.main
   ```
4. Start the frontend:  
   ```bash
   cd frontend
   cd admin-ui
   npm install
   npm run dev
   ```

    ```bash
   cd frontend
   cd store-ui
   npm install
   npm run dev
   ```
5. Access the app via:  
   - **Admin UI:** and **Store UI** at `http://localhost:5173` , `http://localhost:5174`  (or in the order in which they were started)


