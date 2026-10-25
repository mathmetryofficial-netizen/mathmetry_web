# Loading Animation Usage Guide

## Components Created

### 1. Loader Component (`/components/Loader.tsx`)
A reusable hourglass loading animation with different sizes.

**Usage:**
```tsx
import Loader from '@/components/Loader';

// Different sizes
<Loader size="sm" />   // Small (32x32px)
<Loader size="md" />   // Medium (56x56px) - default
<Loader size="lg" />   // Large (80x80px)
<Loader size="xl" />   // Extra Large (128x128px)

// With custom className
<Loader size="lg" className="my-4" />
```

### 2. Loading Provider (`/components/LoadingProvider.tsx`)
Global loading state management with full-screen overlay.

**Usage:**
```tsx
import { useLoading } from '@/components/LoadingProvider';

function MyComponent() {
  const { showLoader, hideLoader, isLoading } = useLoading();
  
  const handleAsyncAction = async () => {
    showLoader();
    try {
      await someAsyncOperation();
    } finally {
      hideLoader();
    }
  };
}
```

## Integration Status

### ✅ Already Integrated:
- **Login Page** - Shows loader during authentication
- **Signup Page** - Shows loader during account creation
- **Materials Page** - Shows loader during data fetching and purchases
- **Admin Materials Page** - Shows loader during form submissions

### 🔄 Global Loading Provider:
- Wraps entire application in `/app/providers.tsx`
- Shows full-screen overlay with loading animation
- Accessible from any component using `useLoading()` hook

## How to Add to Other Pages

1. **Import the hook:**
```tsx
import { useLoading } from '@/components/LoadingProvider';
```

2. **Use in component:**
```tsx
const { showLoader, hideLoader } = useLoading();
```

3. **Show/hide during async operations:**
```tsx
const handleAction = async () => {
  showLoader();
  try {
    await fetch('/api/endpoint');
  } finally {
    hideLoader();
  }
};
```

## Features

- **Responsive Design** - Works on all screen sizes
- **TypeScript Support** - Fully typed components
- **Tailwind CSS** - No external dependencies
- **Global State** - Centralized loading management
- **Customizable** - Different sizes and styling options
- **Accessible** - Proper ARIA labels and roles

The loading animation is now ready to use throughout your website!