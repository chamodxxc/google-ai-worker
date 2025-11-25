/**
 * Google Search AI Worker
 * Creator: Chamod Nimsara
 * Note: This worker scrapes a Google async response block. Use responsibly.
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    if (!q) {
      return json({
        status: false,
        creator: "Chamod Nimsara",
        message: "Missing ?q= parameter"
      });
    }

    try {
      // STEP 1: Get Cookie (minimal request to obtain cookie)
      const ckReq = await fetch(
        "https://play.google.com/log?format=json&hasfast=true&authuser=0",
        {
          method: "POST",
          headers: {
            "accept-encoding": "gzip, deflate, br, zstd"
          },
          body: "[[1,null,null,null,null,null,null,null,null,null,[null,null,null,null,\"en-ID\",null,null,null,[[[\"Chromium\",\"142\"],[\"Not_A Brand\",\"99\"],[\"Google Chrome\",\"142\"]],0,\"Windows\",\"15.0.0\",\"x86\",\"\",\"142.0.7444.163\"],[4,0]]],596,[]]"
        }
      );

      const setCookie = ckReq.headers.get("Set-Cookie") || "";
      const cookie = setCookie.split(";")[0];

      // STEP 2: Google AI Search Request
      const searchURL =
        "https://www.google.com/async/folif?q=" +
        encodeURIComponent(q) +
        "&cs=1&csui=3&yv=3&aep=22";

      const r = await fetch(searchURL, {
        headers: {
          "cookie": cookie,
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/142 Safari/537.36"
        }
      });

      const html = await r.text();

      // STEP 3: Extract AI response block
      const match = html.match(
        /<div[^>]*data-target-container-id="5"[^>]*>([\s\S]*?)<\/div>/
      );

      let text = "";
      if (match) {
        // Remove HTML tags, clean text
        text = match[1]
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim();
      }

      return json({
        status: true,
        creator: "Chamod Nimsara",
        query: q,
        result: text || "No AI result found"
      });
    } catch (e) {
      return json({
        status: false,
        creator: "Chamod Nimsara",
        error: e.toString()
      });
    }
  }
};

// Quick JSON response helper
function json(obj) {
  return new Response(JSON.stringify(obj, null, 2), {
    headers: {
      "content-type": "application/json"
    }
  });
}
