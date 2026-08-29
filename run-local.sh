#!/usr/bin/env sh
# ============================================================
# FILE: run-local.sh
# PURPOSE: Provides the Unix-like shell launcher that forwards local commands to PCB Component Finder's Node.js entry point.
# ============================================================

set -eu
node "$(dirname "$0")/src/cli.mjs" "$@"
