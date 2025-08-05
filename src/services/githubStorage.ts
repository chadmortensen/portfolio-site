import { GITHUB_CONFIG } from '../config/github';

export interface GitHubFile {
  content: string;
  sha?: string;
}

export class GitHubStorageService {
  private baseUrl = 'https://api.github.com';
  private headers: HeadersInit;

  constructor() {
    this.headers = {
      'Authorization': `Bearer ${GITHUB_CONFIG.token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };
  }

  private getContentUrl(filename: string): string {
    return `${this.baseUrl}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.contentPath}/${filename}`;
  }

  async readFile(filename: string): Promise<any | null> {
    try {
      const response = await fetch(this.getContentUrl(filename), {
        headers: this.headers,
      });

      if (response.status === 404) {
        return null; // File doesn't exist
      }

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      const content = decodeURIComponent(escape(atob(data.content))); // Decode base64 with UTF-8 support
      return JSON.parse(content);
    } catch (error) {
      console.error('Error reading from GitHub:', error);
      return null;
    }
  }

  async writeFile(filename: string, content: any): Promise<boolean> {
    try {
      // First, try to get the current file to get its SHA
      const currentFile = await this.getCurrentFileSha(filename);
      
      const body: any = {
        message: `Update ${filename} - ${new Date().toISOString()}`,
        content: btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2)))), // Encode to base64 with UTF-8 support
        branch: GITHUB_CONFIG.branch,
      };

      // If file exists, include SHA for update
      if (currentFile?.sha) {
        body.sha = currentFile.sha;
      }

      const response = await fetch(this.getContentUrl(filename), {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Error writing to GitHub:', error);
      return false;
    }
  }

  private async getCurrentFileSha(filename: string): Promise<{ sha: string } | null> {
    try {
      const response = await fetch(this.getContentUrl(filename), {
        headers: this.headers,
      });

      if (response.status === 404) {
        return null; // File doesn't exist
      }

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return { sha: data.sha };
    } catch (error) {
      return null;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}`, {
        headers: this.headers,
      });
      return response.ok;
    } catch (error) {
      console.error('GitHub connection test failed:', error);
      return false;
    }
  }
}