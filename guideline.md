New test script writing guideline:

1. For a new task, always create a new branch with the format: `<task_name>-<task_id>`
2. Base the branch on the main branch
3. Implement/fix the task
4. Check if any existing helper function/method exists, then use it or create a new function/method
5. Place common data in a centralized location and reference it
6. Environment data and credentials must not be pushed to the remote repository
7. Test scripts should be capable of running in different test environments with different credentials
8. Never add unnecessary files to git; always add them to the `.gitignore` file
9. After writing the test script, always run it locally to ensure it's working
10. Before committing and pushing the code, always format, clean, and remove unused data and variables
11. Push the changes to the remote repository
12. Before create the pull request, always fetch and merge the main branch to the current branch
13. Create a pull request to merge the changes to the main branch
14. After the pull request is approved, merge the changes to the main branch
15. Delete the branch (optional)
16. **Note:** Never directly push code to the main branch
