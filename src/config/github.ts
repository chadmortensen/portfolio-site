// GitHub configuration - Add your GitHub Personal Access Token here
// Token needs "Contents" permission for the repository
export const GITHUB_CONFIG = {
  token: 'your_github_token_here', // Replace with your actual token
  owner: 'your_username', // Replace with your GitHub username
  repo: 'your_repo_name', // Replace with your repository name
  branch: 'main', // or 'master' depending on your default branch
  contentPath: 'data/case-studies' // Path where case study data will be stored
};

// Instructions:
// 1. Replace 'your_github_token_here' with your GitHub Personal Access Token
// 2. Replace 'your_username' with your GitHub username
// 3. Replace 'your_repo_name' with your repository name
// 4. Create a Personal Access Token at: https://github.com/settings/tokens
//    - Select "Fine-grained tokens" for better security
//    - Give it "Contents" permission for your repository