#!/bin/bash

# Fix Missing Dependencies for Productivity Brain with Tambo Components

echo "🔧 Installing missing dependencies..."

# Navigate to your project directory (update this path if needed)
cd "$(pwd)"

# Install Radix UI components
npm install @radix-ui/react-popover \
  @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-select \
  @radix-ui/react-tooltip

# Install TipTap editor dependencies
npm install @tiptap/react \
  @tiptap/pm \
  @tiptap/starter-kit \
  @tiptap/extension-document \
  @tiptap/extension-hard-break \
  @tiptap/extension-mention \
  @tiptap/extension-paragraph \
  @tiptap/extension-text \
  @tiptap/extension-placeholder

# Install any other common missing dependencies
npm install class-variance-authority \
  clsx \
  tailwind-merge

echo "✅ Dependencies installed!"
echo "🔄 Restart your dev server: npm run dev"