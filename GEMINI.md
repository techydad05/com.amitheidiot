# GEMINI.md

## Project Overview

This is a SvelteKit web application designed to be an interactive and educational experience, teaching users the etymology of the word "idiot". The application takes the user on a journey from the word's ancient Greek origins to its modern-day meaning. It features a quiz to test the user's knowledge and a timeline to visualize the word's evolution.

The project is built with SvelteKit and uses Tailwind CSS for styling. It includes a SQLite database for storing quiz questions and results, and uses `better-sqlite3` for database access. The application also has an admin dashboard for managing the quiz questions.

## Building and Running

To get the project up and running, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Seed the database:**
    ```bash
    npm run seed
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

### Other useful commands:

*   **Build for production:**
    ```bash
    npm run build
    ```
*   **Run tests:**
    ```bash
    npm run test
    ```
*   **Run Storybook:**
    ```bash
    npm run storybook
    ```

## Development Conventions

*   **Styling:** The project uses Tailwind CSS for styling. Utility classes are preferred over custom CSS.
*   **Components:** Svelte components are located in `src/lib/components`.
*   **Routes:** The application's routes are defined in the `src/routes` directory, following the SvelteKit file-based routing system.
*   **Database:** The database logic is located in `src/lib/server/db.js`. The database schema is defined in `seed-database.js`.
*   **Testing:** Playwright is used for end-to-end testing. Test files are located in the `tests` directory.
