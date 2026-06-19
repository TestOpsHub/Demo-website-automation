# CI/CD Setup Summary

## Quick Overview

Your Playwright test suite is automatically run on every code push and pull request using GitHub Actions.

## What Happens When You Push Code

```
git push → GitHub detects push → Workflow runs → Tests execute → Report uploaded
```

### Timeline
1. **~10 seconds** - Code checkout + Node setup
2. **~30 seconds** - Dependencies installed (cached)
3. **~10 seconds** - Playwright installed (cached)
4. **~2-5 minutes** - Tests execute
5. **~5 seconds** - Report uploaded

**Total: ~3-6 minutes**

## Caching Performance Boost

### Without Cache (First Run)
- npm install: ~60 seconds
- Playwright install: ~120 seconds
- **Total overhead: ~180 seconds**

### With Cache (Subsequent Runs)
- npm install: ~10 seconds  
- Playwright install: ~5 seconds
- **Total overhead: ~15 seconds**

**Savings: ~165 seconds per run (91% faster!)** ✨

## View Test Results

1. Go to **Actions** tab in GitHub
2. Click the latest workflow run
3. Scroll down to **Artifacts**
4. Download `playwright-report`
5. Extract and open `index.html` in browser

## Key Files

| File | Purpose |
|------|---------|
| `.github/workflows/playwright.yml` | Main CI/CD configuration |
| `playwright.config.ts` | Test runner settings |
| `package.json` | Dependencies and scripts |
| `.env` | Local environment variables (not committed) |

## Required GitHub Secrets

Set these in **Settings → Secrets and variables → Actions**:
- `BASE_URL` - Your app URL
- `LOGIN_USERNAME` - Test account username
- `EMAIL` - Test account email
- `PASSWORD` - Test account password

## Test Behavior in CI

- **Retries**: Failed tests retry automatically 2 times
- **Workers**: Tests run sequentially (1 worker) for stability
- **Timeout**: Each test has 90 seconds to complete
- **Reporter**: HTML report generated with screenshots

## Local Equivalent

To run tests exactly as CI does:
```bash
CI=true npm run test:e2e
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests pass locally, fail in CI | Check GitHub Secrets are set correctly |
| Slow pipeline | Check if cache is being used (hit > miss) |
| Browser install fails | Try clearing cache and re-running |
| Permission errors | Verify runners have access to branches |

## Next Steps

- [Full CI/CD Documentation](CI_CD_PIPELINE.md)
- [Contributing Guidelines](../CONTRIBUTING.md)
- [Test Cases](TEST_CASES.md)

