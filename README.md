# Pipertrack - Azure DevOps Dashboard

![](docs/logo.png)

This application provides a real-time dashboard that connects to Azure DevOps to monitor key metrics such as:

- Number of successful and failed builds in the last 24 hours
- Current running builds
- Bugs created in the last 24 hours
- Bugs by severity

![](docs/app.png)

## Prerequisites

Before running the application, you must configure the `config.json` file with the following information:

- **Azure DevOps URL**: The URL to your Azure DevOps organization.
- **Personal Access Token (PAT)**: Your Azure DevOps personal access token for authentication.
- **Team Projects**: The Azure DevOps team projects you wish to monitor.
- **Build Queue Time**: Monitor the time builds spend in the queue.
- **Failed Builds in Last 24 Hours**: Display the number of failed builds in the past 24 hours.
- **Most Commits per Developer**: Show which developer has the most commits in the last 24 hours.
- **More Settings**: Additional settings for custom monitoring and metrics.

### Example `config.json` File

```json
{
    "azureDevOpsUrl": "https://dev.azure.com/your-organization",
    "personalAccessToken": "your pat",
    "teamProjects": [
        "Team Project A",
        "Team Project B"
    ]
}
```

## Getting the Application

You can get the application by either cloning the repository or downloading the ZIP file from the "Releases" tab.
