# DatingClient

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Technology Stack

This project uses a modern Angular architecture with the following technologies and tools:

### Core Framework & Language

- **[Angular](https://angular.dev/) 21.0.0** - Modern web framework using standalone components architecture
  - Standalone components (no NgModules required)
  - Modern dependency injection with `inject()` function
  - Built-in routing with view transitions
  - HTTP client with functional interceptors

- **[TypeScript](https://www.typescriptlang.org/) 5.9.2** - Typed superset of JavaScript
  - Strict mode enabled for enhanced type safety
  - Modern ES2022 target
  - Experimental decorators support

- **[RxJS](https://rxjs.dev/) 7.8.0** - Reactive programming library
  - Observable patterns for asynchronous operations
  - Operators for data transformation and side effects

### Styling & UI Framework

- **[Tailwind CSS](https://tailwindcss.com/) 4.1.18** - Utility-first CSS framework
  - Rapid UI development with utility classes
  - PostCSS integration for processing

- **[DaisyUI](https://daisyui.com/) 5.5.14** - Component library built on Tailwind CSS
  - Pre-built components (buttons, cards, modals, etc.)
  - Theme customization support

### Build & Development Tools

- **[Angular CLI](https://angular.dev/tools/cli) 21.0.4** - Command-line interface for Angular
  - Project scaffolding and code generation
  - Development server with hot reload
  - Production build optimization

- **[Angular Build](https://angular.dev/tools/cli/build) 21.0.4** - Modern build system
  - Fast incremental builds
  - Tree-shaking and code splitting
  - Source maps for debugging

- **npm 10.8.2** - Package manager
  - Dependency management
  - Script execution

### Testing Framework

- **[Vitest](https://vitest.dev/) 4.0.8** - Fast unit testing framework
  - Vite-powered test runner
  - Jest-compatible API
  - Fast test execution

- **jsdom 27.1.0** - DOM implementation for Node.js
  - Browser-like environment for testing
  - DOM manipulation and querying support

### Architecture & Patterns

- **Standalone Components** - Modern Angular architecture without NgModules
  - Self-contained components with their own dependencies
  - Improved tree-shaking and bundle size

- **Angular Signals** - Reactive state management
  - Fine-grained reactivity
  - Automatic change detection optimization
  - Used for user state management (`currentUser` signal)

- **Functional Interceptors** - HTTP request/response middleware
  - JWT token interceptor for authentication
  - Error interceptor for centralized error handling

- **Router with View Transitions** - Enhanced navigation experience
  - Smooth transitions between routes
  - Improved user experience

- **App Initializer Pattern** - Application startup logic
  - Pre-loading user data on app start
  - Splash screen management

- **Environment-based Configuration** - Environment-specific settings
  - Development and production configurations
  - API base URL management

### Key Features

- **HTTP Interceptors**
  - JWT token authentication interceptor
  - Global error handling interceptor

- **Route Guards**
  - Authentication guard for protected routes
  - Route access control

- **LocalStorage Integration**
  - User session persistence
  - Client-side data storage

- **TypeScript Interfaces**
  - Type-safe data models
  - User, Member, and API exception types
  - Enhanced IDE support and error prevention

### Project Structure

```
src/
├── app/              # Application root and routing
├── core/             # Core functionality
│   ├── guards/      # Route guards
│   ├── interceptor/ # HTTP interceptors
│   └── services/    # Shared services
├── features/         # Feature modules
│   ├── account/     # Authentication features
│   ├── members/     # Member management
│   └── message/     # Messaging features
├── layout/          # Layout components (nav, etc.)
├── types/           # TypeScript type definitions
└── environments/    # Environment configurations
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
