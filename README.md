# Towing Service Application

## Overview

This is a modern web application for managing towing service requests. Built with React, TypeScript, and Tailwind CSS, it provides a seamless experience for users to request towing services and for administrators to manage these requests.

## Features

- 🗺️ Interactive map interface for location selection
- 💰 Real-time cost calculation with toll detection
- 🚛 Multiple truck type selection
- 💳 Secure payment processing
- 📱 Responsive design for all devices
- 🔔 Real-time notifications
- 🔒 User authentication and profile management

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context + Tanstack Query
- **Maps**: Leaflet
- **Backend**: Supabase
- **Payment Processing**: Stripe
- **Build Tool**: Vite

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Development Guidelines

- Use TypeScript for all new components
- Follow the existing component structure
- Implement responsive designs using Tailwind CSS
- Use shadcn/ui components when possible
- Add proper error handling and loading states
- Keep components small and focused
- Use the existing toast system for notifications

## Project Structure

```
src/
  ├── components/     # React components
  ├── contexts/       # React contexts
  ├── features/       # Feature-specific code
  ├── hooks/          # Custom React hooks
  ├── services/       # API and external services
  ├── types/          # TypeScript types
  └── utils/          # Utility functions
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Ensure all tests pass
5. Wait for review

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team.