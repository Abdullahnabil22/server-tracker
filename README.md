# XOrithm Server Tracker

A modern, real-time server monitoring web application built with Next.js 15, React 19, and TypeScript. Monitor your server infrastructure with an intuitive dashboard, detailed analytics, and responsive design.

![Server Tracker Dashboard](https://img.shields.io/badge/Next.js-15.5.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## Features

- **Real-time Server Monitoring**: Live status updates and performance metrics
- **User Authentication**: Secure login/registration system with localStorage persistence
- **Google Login**: One-click sign-in via NextAuth Google provider
- **Server Dashboard**: Centralized view of all servers with filtering and search capabilities
- **Detailed Server Analytics**: Individual server performance metrics (CPU, Memory, Disk, Network)
- **Responsive Design**: Cross-platform compatibility for desktop, tablet, and mobile
- **Auto-refresh Data**: Continuous monitoring with configurable intervals (30s dashboard, 10s details)
- **Modern UI/UX**: Clean, intuitive interface with loading states and error handling
- **Dedicated Error & Not-Found Pages**: Tailwind-styled `error.tsx` and `not-found.tsx` for graceful recovery

## Technology Stack

### Frontend

- **Next.js 15.5.5** - React framework with App Router
- **React 19.1.0** - UI library with hooks and context
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Icons** - Comprehensive icon library
- **NextAuth (Google OAuth)** - Authentication with Google provider

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundling and development server

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** or **pnpm** package manager
- **Google OAuth Credentials** (Client ID and Secret)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd server-tracker
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2.5. Configure Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
AUTH_SECRET=your_random_auth_secret
# Optional if deploying behind a custom URL
# AUTH_URL=https://your-domain.com
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 4. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── (dashboard)/       # Protected dashboard routes
│   │   └── servers/       # Server management pages
│   ├── api/               # API routes
│   │   └── servers/       # Server API endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── dashboard/         # Dashboard-specific components
│   ├── header/            # Header component
│   ├── ui/                # Generic UI components
│   └── serverStats.tsx    # Server statistics component
├── context/               # React Context providers
│   └── authContext.tsx    # Authentication context
├── lib/                   # Utility libraries
│   ├── auth.ts            # Authentication service
│   └── mockData.ts        # Mock server data
├── types/                 # TypeScript type definitions
│   └── types.ts           # Application types
└── utils/                 # Utility functions
    └── utils.ts           # Helper functions
```

## 🎯 Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🔧 Implementation Overview

### Architecture Decisions

#### 1. **Next.js App Router**

- **Choice**: Used Next.js 15 with the new App Router instead of Pages Router
- **Rationale**: Better performance, improved developer experience, and future-proof architecture
- **Benefits**: Server components, improved routing, better SEO capabilities

#### 2. **TypeScript Implementation**

- **Choice**: Full TypeScript implementation with strict type checking
- **Rationale**: Type safety, better developer experience, reduced runtime errors
- **Benefits**: IntelliSense support, compile-time error detection, self-documenting code

#### 3. **Context-Based State Management**

- **Choice**: React Context API instead of external state management libraries
- **Rationale**: Simpler architecture for this application's scope, built-in React solution
- **Benefits**: No additional dependencies, easier to understand, sufficient for current needs

#### 4. **Client-Side Authentication**

- **Choice**: localStorage-based authentication instead of server-side sessions
- **Rationale**: Simplified development, no backend required for MVP
- **Benefits**: Faster development, easier deployment, suitable for demonstration purposes

#### 5. **Mock Data Strategy**

#### 6. **Google OAuth with NextAuth**

- **Choice**: Enable Google login via NextAuth provider
- **Rationale**: Faster onboarding and secure OAuth with widely-used identity provider
- **Benefits**: Reduced friction, familiar UX, no password management

Add the following environment variables (see Getting Started): `GOOGLE_ID`, `GOOGLE_SECRET`, `AUTH_SECRET`.

The provider is configured in `src/lib/googleAuth.ts`:

```ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
});
```

Use `signIn("google")` to trigger the flow.

- **Choice**: Realistic mock data instead of real server integration
- **Rationale**: Focus on frontend development, demonstrate functionality without backend complexity
- **Benefits**: Consistent data, predictable behavior, easier testing

### Design Patterns

#### 1. **Component Composition**

- **Pattern**: Composition over inheritance
- **Implementation**: Reusable components with flexible props
- **Example**: `ServerCard`, `MetricCard`, `Input` components

#### 2. **Custom Hooks**

- **Pattern**: Extract reusable logic into custom hooks
- **Implementation**: `useAuth` hook for authentication logic
- **Benefits**: Reusable logic, cleaner components, easier testing

#### 3. **Error Boundaries**

- **Pattern**: Graceful error handling
- **Implementation**: App Router `error.tsx` with Tailwind UI, `reset()` retry, safe navigation; `not-found.tsx` for 404s with clear actions
- **Benefits**: Better user experience, application stability

#### 4. **Loading States**

- **Pattern**: Skeleton loaders and loading indicators
- **Implementation**: `SkeletonLoader`, `AuthLoading`, `ServerLoader` components
- **Benefits**: Better perceived performance, user feedback

### Performance Optimizations

#### 1. **Auto-refresh Strategy**

- **Dashboard**: 30-second intervals for overview data
- **Server Details**: 10-second intervals for detailed metrics
- **Rationale**: Balance between real-time updates and performance

#### 2. **Component Memoization**

- **Implementation**: React.memo for expensive components
- **Benefits**: Reduced unnecessary re-renders, improved performance

#### 3. **Code Splitting**

- **Implementation**: Route-based code splitting with Next.js
- **Benefits**: Smaller initial bundle, faster page loads

#### 4. **Responsive Design**

- **Implementation**: Mobile-first approach with Tailwind CSS
- **Benefits**: Optimal experience across all devices

## 🔐 Authentication System

### Implementation Details

The authentication system uses a client-side approach with localStorage for persistence:

```typescript
// Authentication flow
User Registration → Validation → localStorage Storage → Context Update → Route Redirect
User Login → Credential Check → localStorage Storage → Context Update → Dashboard Access
```

### Security Considerations

- **Input Validation**: Client-side form validation
- **Password Requirements**: Minimum 8 characters with letters and numbers
- **Error Handling**: Non-revealing error messages
- **Session Management**: Secure localStorage usage

## 📊 Data Management

### Mock Data Structure

The application uses realistic mock data to simulate server monitoring:

```typescript
interface Server {
  id: string;
  name: string;
  ipAddress: string;
  status: "up" | "down" | "degraded";
  responseTime: number;
  uptime: number;
  location: string;
  type: string;
  lastChecked: string;
  description?: string;
}
```

### API Design

- **GET /api/servers** - Fetch all servers
- **GET /api/servers/[id]** - Fetch individual server details
- **Real-time Updates** - Automatic data refresh with configurable intervals

## 🎨 UI/UX Design

### Design System

- **Color Palette**: Consistent color scheme with status indicators
- **Typography**: Inter Tight font for modern, readable text
- **Spacing**: Tailwind-based spacing system
- **Components**: Reusable UI components with consistent styling

### User Experience Features

- **Real-time Updates**: Live data refresh without page reload
- **Search & Filter**: Quick server discovery
- **Responsive Design**: Optimal experience on all devices
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: User-friendly error messages with recovery options

## 🚀 Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables

No environment variables are required for the current implementation.

## 🔮 Future Enhancements

### Planned Features

- **Real Backend Integration**: Replace mock data with actual server monitoring
- **Advanced Filtering**: Complex search and filter capabilities
- **Alert System**: Notification management for server issues
- **Historical Data**: Time-series data visualization
- **Multi-user Support**: Team collaboration features
- **Dashboard Customization**: User-configurable dashboard layouts

### Technical Improvements

- **Database Integration**: Persistent data storage
- **Real-time WebSockets**: Live data streaming
- **Advanced Caching**: Redis-based caching layer
- **Microservices Architecture**: Service-oriented design
- **Containerization**: Docker deployment
- **CI/CD Pipeline**: Automated testing and deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **XOrithm Team** - _Initial work_ - [XOrithm](https://github.com/xorithm)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- React team for the powerful UI library
- Tailwind CSS team for the utility-first CSS framework
- React Icons team for the comprehensive icon library

---

**Built with ❤️ by the XOrithm Team**
