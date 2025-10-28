# 🤝 Contributing Guide

Thank you for your interest in contributing to this portfolio template!

## How to Contribute

### Reporting Bugs

If you find a bug:

1. Check if it's already reported in [Issues](../../issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, browser, Node version)

### Suggesting Features

Have an idea? Great!

1. Check existing [Issues](../../issues) and [Discussions](../../discussions)
2. Create a new discussion or issue
3. Describe the feature and its use case
4. Explain why it would be valuable

### Submitting Changes

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
   
   Use clear commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting
   - `refactor:` for code restructuring
   - `test:` for tests
   - `chore:` for maintenance

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

## Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use functional components with hooks
- Keep components small and focused
- Add JSDoc comments for complex functions
- Use meaningful variable and function names

Example:
```tsx
/**
 * Formats a date string to a readable format
 * @param date - ISO date string
 * @returns Formatted date string
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
```

## Component Guidelines

- Use Framer Motion for animations
- Ensure components are accessible (ARIA labels, keyboard navigation)
- Make components responsive by default
- Support both light and dark modes
- Keep styling with Tailwind CSS

## Testing

Before submitting:

- [ ] Test in both light and dark modes
- [ ] Test on mobile, tablet, and desktop
- [ ] Check browser console for errors
- [ ] Run `npm run build` successfully
- [ ] Test all interactive elements
- [ ] Verify accessibility (keyboard navigation, screen readers)

## Documentation

If you add new features:

- Update README.md if necessary
- Add comments to complex code
- Update CUSTOMIZATION.md for user-facing changes
- Create examples if helpful

## Questions?

Feel free to ask questions by:
- Opening a [Discussion](../../discussions)
- Commenting on related issues
- Reaching out to maintainers

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! 🙌**



