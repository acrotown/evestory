#!/bin/bash

# Run Vercel deploy command and capture the URL
url=$(pnpm run vercel deploy)

# Set Vercel alias for the deployed URL
pnpm run vercel alias set "$url" preview.evestory.day
