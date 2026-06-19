# Contributing Guidelines

## Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- Git
- VS Code or preferred IDE

### Setup
```bash
# Clone repository
git clone https://github.com/TestOpsHub/Demo-website-automation.git
cd Demo-website-automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Create .env file (see .env.example)
cp .env.example .env
```

### Environment Setup
Create a `.env` file with:
```
BASE_URL=https://automationexercise.com/
LOGIN_USERNAME=your_test_username
EMAIL=your_test_email
PASSWORD=your_test_password
```

## Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/my-feature
# or
git checkout -b bugfix/my-bug
```

Branch naming convention:
- `feature/` - New test cases or features
- `bugfix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates

### 2. Make Changes

#### Writing Tests
- Follow the Page Object Model (POM) pattern
- Store selectors in `Pages/` directory
- Create page objects for new pages
- Write descriptive test names
- Use comments for complex logic

Example:
```typescript
import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }
  
  async login(username: string, password: string) {
    await this.page.fill('input[name="email"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }
}
```

#### Code Style
- Use TypeScript for type safety
- Use meaningful variable names
- Keep functions small and focused
- Add comments for non-obvious logic

### 3. Test Locally
```bash
# Run all tests
npm run test:e2e

# Run specific test file
npx playwright test tests/e2e/auth/login.spec.ts

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug mode
npx playwright test --debug
```

### 4. Commit Changes
```bash
git add .
git commit -m "feat: add login validation test"
```

Commit message format:
- `feat:` - New test or feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation
- `chore:` - Dependencies, config, build

Keep messages concise and descriptive.

### 5. Push and Create Pull Request
```bash
git push origin feature/my-feature
```

Create PR on GitHub with:
- Clear title describing changes
- Description of what tests were added/modified
- Any breaking changes noted
- Screenshots of new pages if applicable

## Pull Request Checklist

Before submitting a PR:
- [ ] Tests pass locally (`npm run test:e2e`)
- [ ] No hardcoded values (use environment variables)
- [ ] Followed POM pattern
- [ ] Added meaningful comments
- [ ] Updated related documentation
- [ ] Branch is up to date with `main`

## Code Review Process

1. **Automated Checks**
   - CI/CD pipeline runs tests
   - Report is automatically available in PR

2. **Manual Review**
   - At least one maintainer reviews code
   - Test logic and coverage verified
   - Selectors checked for stability

3. **Approval & Merge**
   - Approved after review
   - Merge with "Squash and merge" strategy

## Best Practices

### Test Stability
- Use explicit waits (avoid hardcoded delays)
- Use robust selectors (IDs > CSS > XPath)
- Test both happy and sad paths
- Handle dynamic content

### Performance
- Keep tests focused and independent
- Avoid unnecessary navigation
- Reuse test data when appropriate
- Use fixtures for common setup

### Maintenance
- Update selectors when UI changes
- Document complex test logic
- Keep dependencies updated
- Monitor test run times

## Reporting Issues

When reporting bugs:
1. Check if issue already exists
2. Provide clear description
3. Include steps to reproduce
4. Attach relevant logs/screenshots
5. Specify environment (OS, Node version)

## Questions?

- Open a GitHub Discussion
- Create an Issue with "question" label
- Check existing documentation

Thank you for contributing! 🚀

