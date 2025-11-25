# Google AI Worker (Unofficial)

**Creator:** Chamod Nimsara

This repository contains a Cloudflare Worker that scrapes a Google async response block and returns a JSON API with a `creator` field set to "Chamod Nimsara".

## Files
- `worker.js` - Cloudflare Worker script (single-file).
- `wrangler.toml` - Wrangler config for deployment.
- `README.md` - This file.
- `.gitignore` - Standard ignores.

## Usage
1. Install Wrangler: `npm install -g wrangler`
2. Authenticate: `wrangler login` (or use API token)
3. Publish:
   ```
   wrangler publish
   ```
4. Call the API:
   ```
   https://<your-worker>.workers.dev/?q=cosmic+indifference
   ```

## Notes and Warnings
- This worker performs HTML scraping of Google responses. Scraping search engines may violate their Terms of Service. Use responsibly and at your own risk.
- The code attempts to fetch a cookie from `play.google.com` and then calls an async Google endpoint. Results may vary over time.
- If you need API key protection, caching or rate-limiting, consider adding Cloudflare KV and durable objects or a simple API token check in `worker.js`.

## Customization
- To change the `creator` value, edit `worker.js` where `creator: "Chamod Nimsara"` appears.
