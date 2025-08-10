# ☕ Coffee Shop App

A modern, feature-rich mobile application for coffee shops built with React Native, Expo, and TypeScript. This template provides a complete solution for coffee shop businesses to offer mobile ordering and customer engagement.

## 📱 Features

- **Product Browsing**: Browse coffee menu with categories and detailed product views
- **Shopping Cart**: Add items to cart with quantity management
- **Order Management**: View order history and track orders
- **User Profile**: Manage user account and preferences
- **Vouchers & Promotions**: Apply discount codes and special offers
- **Cross-Platform**: Works on iOS, Android, and Web

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- iOS Simulator (Mac only) or Android Emulator
- Expo Go app on your physical device (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tpl-coffee-shop-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📁 Project Structure

```
tpl-coffee-shop-app/
├── src/
│   ├── app/              # Expo Router screens
│   │   ├── _layout.tsx   # Root navigation layout
│   │   ├── index.tsx     # Home/Menu screen
│   │   ├── cart.tsx      # Shopping cart
│   │   ├── orders.tsx    # Order history
│   │   └── profile.tsx   # User profile
│   ├── api/              # API service layer
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand state management
│   └── types/            # TypeScript definitions
├── assets/               # Images and static assets
├── app.json              # Expo configuration
└── package.json          # Dependencies and scripts
```

## 🛠️ Technology Stack

- **Framework**: [Expo SDK 53](https://expo.dev/) with React Native 0.79.5
- **Navigation**: [Expo Router v5](https://docs.expo.dev/router/introduction/) (file-based routing)
- **State Management**: [Zustand v5](https://github.com/pmndrs/zustand)
- **Language**: TypeScript with strict mode
- **UI Components**: React Navigation, Expo Vector Icons
- **Performance**: React Native New Architecture enabled

## 💻 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Run on Android emulator |
| `npm run ios` | Run on iOS simulator |
| `npm run web` | Run in web browser |
| `npm run lint` | Run ESLint checks |

### Code Quality

- TypeScript strict mode is enabled
- ESLint configured with Expo standards
- Path alias `@/*` for clean imports

### Development Guidelines

1. **Screens**: Add new screens in `src/app/` following Expo Router conventions
2. **Components**: Place reusable components in `src/components/`
3. **State**: Use Zustand stores in `src/store/` for global state
4. **API**: Implement API logic in `src/api/`
5. **Types**: Define TypeScript types in `src/types/`
6. **Linting**: Run `npm run lint` before committing

## 🎨 Customization

### App Configuration

Edit `app.json` to customize:
- App name and slug
- Icon and splash screen
- Color scheme
- Platform-specific settings

### Theming

Modify theme constants and styles in the components to match your brand colors and design system.

## 📦 Key Dependencies

- **expo**: Core Expo SDK
- **expo-router**: File-based navigation
- **react-native**: React Native framework
- **zustand**: State management
- **expo-image**: Optimized image component
- **expo-haptics**: Haptic feedback
- **react-native-webview**: WebView support

## 🔧 Configuration Files

- `app.json` - Expo app configuration
- `tsconfig.json` - TypeScript configuration
- `CLAUDE.md` - AI assistant guidelines
- `.eslintrc` - Linting rules

## 📄 License

This project is a template for commercial use. Please ensure you have the appropriate licenses for any third-party assets or libraries used.

## 🤝 Contributing

Contributions are welcome! Please ensure:
1. Code passes linting (`npm run lint`)
2. TypeScript types are properly defined
3. Follow existing code patterns and conventions

## 🆘 Support

For issues, feature requests, or questions, please open an issue in the repository.

---

Built with ❤️ using Expo and React Native