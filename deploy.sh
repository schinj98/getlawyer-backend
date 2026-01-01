#!/bin/bash

echo "🚀 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
npm install --production

echo "🔄 Restarting backend..."
pm2 restart getlawyer-backend

echo "✅ Deployment complete"
