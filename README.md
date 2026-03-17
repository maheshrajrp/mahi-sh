# mahi-sh

This is the personal portfolio website of Maheshraj, built with Next.js and React Three Fiber. It showcases software development projects and skills in an interactive 3D environment.

## ✨ Features

*   **Next.js:** Built with the latest version of Next.js and the App Router.
*   **React Three Fiber:** Interactive 3D graphics rendered with R3F.
*   **Custom Shaders:** GLSL shaders for effects like stars and nebulae.
*   **TypeScript:** For type safety and better developer experience.
*   **Tailwind CSS:** For styling the application.
*   **ESLint:** For maintaining code quality.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   bun

### Installation

1.  Install dependencies:
    ```sh
    bun install
    ```

### Running the application

1.  Run the development server:
    ```bash
    bun dev
    ```
2.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

*   `app/`: Contains all the routes and pages for the Next.js application.
*   `components/`: Contains all the React components, including the 3D components built with React Three Fiber.
    * `components/nebulae/shaders`: GLSL shaders for the nebulae effect.
    * `components/stars/star-shader`: GLSL shaders for the stars effect.
*   `public/`: Contains all the static assets, such as images, and resume.
