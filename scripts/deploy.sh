#!/usr/bin/env bash
#
# Build and deploy the marketing site to Cloudflare Pages.
#
# This project has NO Git integration on the Pages side — pushing to GitHub does
# not trigger a build. Deploying is: build the static export locally, then
# upload it with wrangler. This script is that, with the env-var check that the
# manual version keeps forgetting.
#
# Usage, from the repo root:
#
#   NEXT_PUBLIC_WEB3FORMS_KEY=<key> bash scripts/deploy.sh
#
# or with the key already exported in your shell:
#
#   bash scripts/deploy.sh
#
# Deploy from a CLEAN CHECKOUT of the commit you intend to ship (a git worktree
# of it, say), not from a working tree carrying unrelated edits — `next build`
# bundles whatever is on disk, so uncommitted work would go live with it.

set -euo pipefail

PROJECT_NAME="battwheelz-marketing"
BRANCH="main"

# --- Environment ------------------------------------------------------------
#
# Every NEXT_PUBLIC_* value is inlined into the JS bundle at BUILD time. A
# missing key therefore cannot be fixed by redeploying the same artefact: the
# built files would carry an empty string, the enquiry form would show its
# "not connected" notice, and every enquiry submitted in the meantime would be
# lost. So fail here, loudly, rather than shipping a form that does not send.
#
# .env.local is gitignored and will NOT exist in a clean checkout — pass the key
# in the environment, as the usage above shows.
if [[ -z "${NEXT_PUBLIC_WEB3FORMS_KEY:-}" ]]; then
  echo "ERROR: NEXT_PUBLIC_WEB3FORMS_KEY is not set." >&2
  echo "The enquiry form would build without a Web3Forms key and silently stop" >&2
  echo "sending. Export it (see .env.example) and run again." >&2
  exit 1
fi

export NEXT_PUBLIC_WEB3FORMS_KEY

COMMIT="$(git rev-parse HEAD)"

echo "==> Installing dependencies"
npm ci

echo "==> Building static export (commit ${COMMIT})"
npm run build

echo "==> Deploying to Cloudflare Pages project ${PROJECT_NAME}"
npx wrangler pages deploy out \
  --project-name "${PROJECT_NAME}" \
  --branch "${BRANCH}" \
  --commit-hash "${COMMIT}" \
  --commit-dirty=false

echo "==> Done. Production alias: https://battwheelz-demo.dqstore.in"
