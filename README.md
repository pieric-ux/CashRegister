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
    <img width="800" alt="Application" src="https://github.com/pieric-ux/CashRegister/assets/93613004/6fbca4b6-7b83-46ec-8b87-abc7cea9a461">
</div>


1. **Create an application**: Create an application, and insert the requested data.

<div align="center">
    <img width="800" alt="ConfigureApplication" src="https://github.com/pieric-ux/CashRegister/assets/93613004/cec17328-39b6-4a38-8983-dddfaa2fb838">
</div>

2. **Configure the application**: On the applications page, select the configuration wheel.
 <div align="center">
     <img width="800" alt="GenerateCode" src="https://github.com/pieric-ux/CashRegister/assets/93613004/099dbed0-d82c-481a-9b43-aa54709d17bb">
 </div>

3. **Employee management**: On the employee page, you can manage employees, as well as generate a new code for each employee.
 <div align="center">
     <img width="800" alt="ConfigureWorkstations" src="https://github.com/pieric-ux/CashRegister/assets/93613004/989f42d9-c3d6-425d-936a-19d810ba0ce0">
 </div>

4. **Workstation management**: The workstation page lets you manage the assignment of employees and products to each workstation. To do this, simply drag-and-drop employees and products into the various columns. You can also change the order in which products are displayed for each workstation with drag-and-drop.
 <div align="center">
     <img width="800" alt="ConfigureCategories" src="https://github.com/pieric-ux/CashRegister/assets/93613004/87e1b1b3-0dfd-466d-8696-ab02159ccede">
 </div>

5. **Category management**: Categories can be added or modified in the control panel. Their display order in this view will be reflected on the cash register application. To change the order, drag-and-drop between categories.
 <div align="center">
     <img width="800" alt="ConfigureDishes" src="https://github.com/pieric-ux/CashRegister/assets/93613004/631ce9b9-4611-4350-b74a-092563403277">
 </div>

6. **Dishes management**: Dishes can be used with or without deposits, and if you wish to sell a dish, you can choose to sell it separately.
 <div align="center">
     <img width="800" alt="ConfigureProducts" src="https://github.com/pieric-ux/CashRegister/assets/93613004/e587c055-762b-481a-b4f2-ceb60f2a383f">
 </div>

7. **Product management**: Products can be sold with a dishware item. At this point, if the dishware has a deposit, the deposit will be added automatically for each sale of the product. You can also add the product category.
 <div align="center">
     <img width="800" alt="DisplayTransactions" src="https://github.com/pieric-ux/CashRegister/assets/93613004/c9dae7b1-c3e2-4c97-992f-665780309fee">
 </div>

8. **Transaction display**: The transactions page displays all transactions carried out on the application. You can also view the details of each transaction.
 <div align="center">
    <img width="268" alt="Cart" src="https://github.com/pieric-ux/CashRegister/assets/93613004/17ee28c4-1ed0-4ec0-8fae-517171f5fc23">
    <img width="266" alt="Products" src="https://github.com/pieric-ux/CashRegister/assets/93613004/f7a13ec8-c753-4a20-8acb-eb5c0023c075">
    <img width="266" alt="Pay" src="https://github.com/pieric-ux/CashRegister/assets/93613004/716976df-a4d4-470b-a738-d05875345692">
 </div>

9. **CashRegister**: To log on to the cash register as an employee, check your e-mails. When an employee is created, an e-mail is generated with login information. Once on the cash register page, you can toggle between the cart tab and the product tab. You can swipe products if they are not all displayed.
<div align="center">
    <img width="800" alt="Dashboard" src="https://github.com/pieric-ux/CashRegister/assets/93613004/0400784d-3aa3-4eb0-9aee-6984f9bcd620">
</div>

10. **Dashbaord**: The Dashboard section provides an insightful overview of various key metrics and data points related to your business operations. Through interactive charts and visualizations, you can easily monitor sales information, employee statistics, workstation details, and more. 

## Security and Vulnerabilities

If you discover a security vulnerability within CashRegister, please send an e-mail to Demont Pieric via [demont.pieric@gmail.com](mailto:demont.pieric@gmail.com). All security vulnerabilities will be **addressed promptly**.

## Intellectual Property

### Code Ownership

The codebase and its associated components, including but not limited to scripts, documentation, and configurations, are the intellectual property of Demont Pieric. All rights are reserved.

### Usage and Distribution

This code is made publicly accessible on GitHub for the purpose of showcasing skills and serving as a portfolio. It is not open source, and usage or distribution without explicit permission is prohibited.

### License

This project is not licensed for open-source use. No permission is granted to use, modify, or distribute the codebase, except for the purpose of reviewing and assessing the showcased skills.

### Contribution and Attribution

Contributions to this project are not accepted at this time. The project is maintained solely for personal and portfolio purposes.

### Reporting Issues and Contact

For any issues or inquiries related to this project, please contact [demont.pieric@gmail.com](mailto:demont.pieric@gmail.com).

