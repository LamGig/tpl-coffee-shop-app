# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Coffee Shop App Template built with Expo SDK 53 and React Native, supporting iOS, Android, and Web platforms. The project uses TypeScript with strict mode enabled and Expo Router for file-based navigation.

## Essential Commands

### Development
- `npm start` - Start Expo development server
- `npm run ios` - Start iOS simulator
- `npm run android` - Start Android emulator
- `npm run web` - Start web development server
- `npm run lint` - Run ESLint with Expo configuration

### Testing & Validation
Before committing changes, always run:
- `npm run lint` - Ensure code follows project standards

## Architecture

### Project Structure
The project has been reset to a minimal state with the full template preserved in `app-example/`. When implementing features:
- Reference `app-example/` for implementation patterns and examples
- Main application code goes in `app/` directory using Expo Router file-based routing
- Shared components should follow the pattern in `app-example/components/`
- Theme-aware components should extend `ThemedView` and `ThemedText`

### Navigation Pattern
- Uses Expo Router with file-based routing in `app/` directory
- Tab navigation with nested stack navigators
- Route definitions: `app/(tabs)/_layout.tsx` for tab structure
- Individual tab screens in `app/(tabs)/` directory

### Theming System
- Automatic dark/light mode detection via `useColorScheme`
- Color definitions in `constants/Colors.ts`
- All UI components should use `useThemeColor` hook for dynamic theming
- Themed wrapper components (`ThemedText`, `ThemedView`) automatically handle color schemes

### Component Architecture
When creating new components:
1. Place reusable components in `components/` directory
2. Use TypeScript interfaces for props
3. Follow the themed component pattern for color-aware components
4. Reference existing components like `HelloWave`, `ParallaxScrollView` for patterns

### Key Technologies
- **Expo Router 5.x** - File-based routing
- **React Navigation 7.x** - Navigation infrastructure
- **React Native Reanimated** - Animations
- **expo-haptics** - Haptic feedback
- **expo-symbols** - SF Symbols support

### TypeScript Configuration
- Strict mode is enabled
- Path alias `@/*` maps to project root
- Always use proper TypeScript types, avoid `any`

## Development Guidelines

### Mobile-First Development
- Test on both iOS and Android simulators
- Use platform-specific code sparingly with `Platform.select()` or `.ios.tsx`/`.android.tsx` files
- Ensure proper safe area handling with `react-native-safe-area-context`

### Performance Considerations
- Use `React.memo` for expensive components
- Implement proper list virtualization for long lists
- Lazy load screens and components where appropriate

### State Management
- Use React hooks for local state
- For global state, implement Context API or consider adding a state management library

## Reset Script
The project includes a reset script at `app-example/scripts/reset-project.js` that can reset the project to initial state. Use with caution as it will remove current `app/` directory contents.