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
- **Framework**: Expo (v53) with React Native (v0.79.5)
- **Navigation**: Expo Router (file-based routing in `app/` directory)
- **Language**: TypeScript with strict mode enabled
- **Styling**: Inline React Native styles
- **Linting**: ESLint with expo configuration

### Project Structure
- `app/` - Main application code using file-based routing
  - `_layout.tsx` - Root layout component using Stack navigation
  - `index.tsx` - Home screen component
- `assets/` - Static assets (images, fonts)
- `tsconfig.json` - TypeScript configuration with path alias `@/*` pointing to root

### Key Configuration
- TypeScript strict mode is enabled
- Path alias `@/*` is configured for imports from project root
- ESLint is configured with `eslint-config-expo`
- Main entry point is `expo-router/entry`

## Development Guidelines

When developing in this codebase:
1. All new screens should be added in the `app/` directory following Expo Router conventions
2. Use TypeScript with strict typing
3. Run `npm run lint` before committing changes
4. Follow React Native styling conventions (StyleSheet or inline styles)
5. Use the `@/*` path alias for cleaner imports from project root