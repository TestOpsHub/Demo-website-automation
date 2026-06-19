# CI/CD Pipeline Documentation

## Overview

This project uses GitHub Actions to automatically run Playwright end-to-end tests on every push and pull request. The pipeline ensures code quality and prevents regressions.

## Workflows

### Main Test Pipeline (`playwright.yml`)

Runs on every push and pull request to `main` or `master` branches.

**Triggers:**
- Push to `main` or `master`
- Pull requests targeting `main` or `master`

**Steps:**
1. Checks out code
2. Sets up Node.js LTS
3. Caches npm dependencies (faster subsequent runs)
4. Installs dependencies (`npm ci`)
5. Caches Playwright browsers
6. Installs Playwright browsers with dependencies
7. Runs test suite with environment secrets
8. Uploads HTML report as artifact (30-day retention)

**Environment Variables (via GitHub Secrets):**
- `BASE_URL` - Application base URL
- `LOGIN_USERNAME` - Test account username
- `EMAIL` - Test account email
- `PASSWORD` - Test account password

**Test Configuration:**
- **Timeout**: 60 minutes per run
- **Retries**: 2 automatic retries on failure (CI only)
- **Workers**: 1 (prevents race conditions)
- **Reporter**: HTML report with screenshots/videos

## Caching Strategy

### npm Dependencies Cache
- **Key**: Based on `package-lock.json`
- **Path**: `~/.npm`
- **Impact**: Avoids downloading npm packages on every run (~30 seconds saved)

### Playwright Browser Cache
- **Key**: Based on `package-lock.json`
- **Path**: `~/.cache/ms-playwright`
- **Impact**: Avoids reinstalling browsers (~60 seconds saved)

## Performance Metrics

| Stage | Time (First Run) | Time (Cached) | Savings |
|-------|-----------------|---------------|---------|
| Setup & Install | ~120s | ~30s | ~75% |
| Playwright Setup | ~120s | ~10s | ~92% |
| Test Execution | Variable | Variable | N/A |
| **Total Overhead** | ~240s | ~40s | ~83% |

## Test Results

### Viewing Reports
1. Go to **Actions** tab in GitHub
2. Select the workflow run
3. Scroll to **Artifacts** section
4. Download `playwright-report` to view `index.html`

### Report Contents
- Summary of passed/failed tests
- Screenshots for failed tests
- Video recordings on retry
- Detailed test timing

## Troubleshooting

### Tests Pass Locally but Fail in CI
1. Check environment variables are set in GitHub Secrets
2. Verify `BASE_URL` is correct
3. Check test data/fixtures exist on target environment

### Slow Pipeline Execution
1. Check if cache is being utilized (look for "Cache hit")
2. Verify runners aren't overloaded
3. Consider adding more workers (currently set to 1 for stability)

### Browser Installation Fails
1. Ensure `--with-deps` flag is included (handles system dependencies)
2. Check runner OS has required packages
3. Try clearing cache and re-running

## Local Testing

To simulate CI environment locally:

```bash
# Install dependencies
npm ci

# Install browsers
npx playwright install --with-deps

# Run tests as CI would
CI=true npm run test:e2e
```

## Adding New Tests

When adding new tests:
1. Create test file in `tests/e2e/` directory
2. Follow POM (Page Object Model) pattern
3. Use environment variables for sensitive data
4. Test locally before pushing
5. Ensure new tests pass in CI

## Secrets Management

### Setting up GitHub Secrets
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add required secrets:
   - `BASE_URL`
   - `LOGIN_USERNAME`
   - `EMAIL`
   - `PASSWORD`

### Security Best Practices
- Never commit `.env` files
- Rotate test credentials regularly
- Use separate test accounts for CI
- Review who has access to secrets

## Future Enhancements

Planned improvements:
- [ ] Add scheduled nightly regression runs
- [ ] Add TypeScript/ESLint checks
- [ ] Add dependency vulnerability scanning
- [ ] Add PR comments with test summaries
- [ ] Add multi-browser testing (Firefox, WebKit)
- [ ] Add performance benchmarks
- [ ] Add test trend tracking

