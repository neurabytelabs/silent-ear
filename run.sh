#!/bin/bash
echo "--- Silent-Ear Builder ---"
echo "Compiling Release Build..."

# Ensure we are in the project directory or adjust path
cd "$(dirname "$0")"

if cargo build --release; then
    echo "------------------------------------------------"
    echo "✅ Build Successful."
    echo "🚀 Starting Simulation..."
    echo "📊 Dashboard: http://localhost:3000"
    echo "------------------------------------------------"
    ./target/release/silent-ear --simulate
else
    echo "❌ Build Failed."
    exit 1
fi
