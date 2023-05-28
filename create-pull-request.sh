#!/bin/bash

# Set the necessary variables
repo=$(basename -s .git `git config --get remote.origin.url`)
branch_name=$(git rev-parse --abbrev-ref HEAD)
base_branch="master"
pr_title=$1
pr_body=$2

if [ -z $pr_title ]; then
  echo "PR Title is required"
  exit 1
fi

# Push the new branch to remote
git push origin $branch_name

# Create a new pull request using the GitHub API
curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer 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"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/Ckojo/$repo/pulls" \
  -d "{\"title\":\"$pr_title\",\"body\":\"$pr_body\",\"head\":\"$branch_name\",\"base\":\"$base_branch\"}" \

# Extract the pull request URL from the response
html_url=$(echo "$response" | jq -r '.html_url')

# Output the pull request URL
echo "Pull Request URL: $html_url"