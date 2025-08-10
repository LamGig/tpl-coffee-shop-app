# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo React Native application for a coffee shop, built with TypeScript and using Expo Router for file-based navigation.

## Development Commands

### Core Commands
- `npm install` - Install all dependencies
- `npm start` or `npx expo start` - Start the development server
- `npm run android` - Start on Android emulator
- `npm run ios` - Start on iOS simulator  
- `npm run web` - Start in web browser
- `npm run lint` - Run ESLint to check code quality

## Architecture

### Technology Stack
- **Framework**: Expo SDK 53 with React Native 0.79.5
- **Navigation**: Expo Router v5 (file-based routing)
- **State Management**: Zustand v5
- **Language**: TypeScript with strict mode enabled
- **Styling**: Inline React Native styles
- **UI Components**: React Navigation, Expo Vector Icons
- **Linting**: ESLint with expo configuration

### Project Structure
- `src/` - Source code directory
  - `app/` - Expo Router screens with file-based routing
    - `_layout.tsx` - Root layout using Stack navigation
    - `index.tsx` - Home screen entry point
  - `api/` - API service layer
  - `components/` - Reusable React components
  - `hooks/` - Custom React hooks
  - `store/` - Zustand state management
  - `types/` - TypeScript type definitions
- `assets/` - Static assets (images, fonts)
- `app.json` - Expo configuration with typed routes enabled

### Key Configuration
- TypeScript strict mode is enabled
- Path alias `@/*` maps to project root for imports
- ESLint configured with `eslint-config-expo/flat`
- Main entry point: `expo-router/entry`
- Typed routes enabled via `experiments.typedRoutes`
- New Architecture enabled for improved performance

## Development Guidelines

When developing in this codebase:
1. Place new screens in `src/app/` following Expo Router file-based conventions
2. Use TypeScript with strict typing - no `any` types
3. Run `npm run lint` before committing changes
4. Follow React Native styling patterns (inline styles or StyleSheet.create)
5. Use the `@/*` path alias for imports from project root
6. Store reusable components in `src/components/`
7. Place API logic in `src/api/` directory
8. Use Zustand for global state management in `src/store/`