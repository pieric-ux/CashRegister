# Cash Register

<div align="center">
  <a href="https://cashregister.ch" target="_blank">
    <img src="https://github.com/pieric-ux/CashRegister/assets/93613004/9e30952c-b0fd-4764-a6a2-722e453a72d3">
  </a>
</div>

## About

The **Cash Register** project is an application that simulates a cash register. It is a POS application that allows events to **manage their transactions, products, and returnable dishes**. The application offers an easy way to track sales and returns. Deposit calculations are **automatically added** to the various products, all through a **user-friendly interface**.

## Features

-   **Multi-application management**: Easily create multiple applications for different needs.
-   **Workstation management**: Add multiple workstations with a single product list.
-   **Employee management**: Assign different employees to workstations easily by drag-and-drop.
-   **Product management**: Add, delete or modify product information.
-   **Returnable dishes management**: Track returnable dishes sold with a product, or separately.
-   **Product categories**: Classify your products into different categories for better organization.
-   **Transaction management**: Easily track sales and transaction details.
-   **User-friendly interface**: Easy navigation with a modern user interface.
-   **Localization**: Supports multiple languages and currencies through internationalization.

## Technologies used

-   **Laravel**
-   **React**
-   **Tailwind CSS**
-   **Vite**

## Setup

### Prerequisites

To work on this project, you have two options to set up your development environment:

1. **Local Environment:**

    - PHP ^8.3
    - Composer ^2.7
    - Node.js ^20
    - npm ^10

2. **With Docker:**

    - Docker

### Installation - Local Environment

1. **Access the project directory:**

    ```bash
    cd CashRegister
    ```

2. **Install dependencies:**

    ```bash
    composer install
    npm install
    ```

3. **Generate APP_KEY:**

    ```bash
    php artisan key:generate
    ```

4. **Storage Link:**

    ```bash
    php artisan storage:link
    ```

5. **Migrate the database:**
    ```bash
    php artisan migrate
    ```
6. **Start the development server:**
    ```bash
    php artisan serve
    npm run dev
    ```

The application should now be running at `http://localhost:8000` or any other addresses displayed in your terminal.

### Installation - Docker Environment

To simplify the Docker setup, a script (`install.sh`) has been provided. Run the following commands in the project's root directory:

```bash
sh install.sh
```

This script performs the following steps:

1. Adds a `.env` file in the local environment.
2. Installs Composer dependencies using Docker.
3. Starts the Laravel Sail containers.
4. Generates the `APP_KEY`.
5. Creates the storage link.
6. Runs database migrations.
7. Installs Node dependencies.
8. Explains how to create an alias for sail
9. Explains how to get Vite in dev

## Use

<div align="center">
    <img width="800" alt="CreateApp" src="https://github.com/pieric-ux/CashRegister/assets/93613004/803c71da-b1aa-482b-8e60-02d37ea5900d">
</div>

1. **Create an application**: Create an application, and insert the requested data.

<div align="center">
    <img width="800" alt="ConfigureApp" src="https://github.com/pieric-ux/CashRegister/assets/93613004/5730c105-a45c-4108-9904-e8e81423c101">
</div>

2. **Configure the application**: On the applications page, select the configuration wheel.
 <div align="center">
    <img width="800" alt="ConfigureEmployees" src="https://github.com/pieric-ux/CashRegister/assets/93613004/d863f518-9568-4a37-a4de-be0b689f18d5">
 </div>

3. **Employee management**: On the employee page, you can manage employees, as well as generate a new code for each employee.
 <div align="center">
    <img width="800" alt="ConfigureWorkstations" src="https://github.com/pieric-ux/CashRegister/assets/93613004/c9f3eb79-25b1-4f98-bcba-cdc0e0b5f5ba">
 </div>

4. **Workstation management**: The workstation page lets you manage the assignment of employees and products to each workstation. To do this, simply drag-and-drop employees and products into the various columns. You can also change the order in which products are displayed for each workstation with drag-and-drop.
 <div align="center">
    <img width="800" alt="ConfigureCategories" src="https://github.com/pieric-ux/CashRegister/assets/93613004/06199406-5972-4774-b2d8-789d64936a7b">
 </div>

5. **Category management**: Categories can be added or modified in the control panel. Their display order in this view will be reflected on the cash register application. To change the order, drag-and-drop between categories.
 <div align="center">
    <img width="800" alt="ConfigureDishes" src="https://github.com/pieric-ux/CashRegister/assets/93613004/3eca8782-29aa-4c7f-8dbf-ca9f346dac99">
 </div>

6. **Dishes management**: Dishes can be used with or without deposits, and if you wish to sell a dish, you can choose to sell it separately.
 <div align="center">
     <img width="800" alt="ConfigureProducts" src="https://github.com/pieric-ux/CashRegister/assets/93613004/8b78ccaf-f2f4-4e92-972c-40c0a24a09a3">
 </div>

7. **Product management**: Products can be sold with a dishware item. At this point, if the dishware has a deposit, the deposit will be added automatically for each sale of the product. You can also add the product category.
 <div align="center"> 
    <img width="800" alt="ShowTransactions" src="https://github.com/pieric-ux/CashRegister/assets/93613004/3065fa65-ffc7-49de-9f2e-f6c67ada835d">
 </div>

8. **Transaction display**: The transactions page displays all transactions carried out on the application. You can also view the details of each transaction.
 <div align="center">
     <img width="400" alt="Capture d’écran 2023-08-24 à 17 11 43" src="https://github.com/pieric-ux/CashRegister/assets/93613004/fb4a26d8-d947-4ddf-846f-bc3f66628d9e">
     <img width="400" alt="Capture d’écran 2023-08-24 à 17 16 17" src="https://github.com/pieric-ux/CashRegister/assets/93613004/180d9e6a-7169-4bc5-8297-9b5adef4c361">
 </div>

9. **CashRegister**: To log on to the cash register as an employee, check your e-mails. When an employee is created, an e-mail is generated with login information. Once on the cash register page, you can toggle between the cart tab and the product tab. You can swipe products if they are not all displayed.

## Security and Vulnerabilities

If you discover a security vulnerability within CashRegister, please send an e-mail to Demont Pieric via [demont.pieric@gmail.com](mailto:demont.pieric@gmail.com). All security vulnerabilities will be **addressed promptly**.

2023 Demont Pieric. All rights reserved.
