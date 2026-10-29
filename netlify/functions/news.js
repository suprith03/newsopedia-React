
exports.handler = async (event) => {
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "GNews API key is not configured." })
    };
  }

  try {
    const params = event.queryStringParameters || {};
    const category = (params.category || "general").toLowerCase();
    const searchQuery = params.q && params.q.trim();
    const categorySearches = {
      politics: "politics OR government OR election"
    };

    const allowedCategories = [
      "general",
      "world",
      "nation",
      "business",
      "technology",
      "entertainment",
      "sports",
      "science",
      "health"
    ];

    const unsupportedCategory = !allowedCategories.includes(category);
    const query = searchQuery || categorySearches[category] || (
      unsupportedCategory ? category : null
    );
    const endpoint = query
      ? "search"
      : "top-headlines";

    const max = Number.parseInt(params.max, 10) || 8;
    const page = Number.parseInt(params.page, 10) || 1;
    if (max < 1 || max > 10 || page < 1) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid pagination parameters." })
      };
    }

    const url = new URL(`https://gnews.io/api/v4/${endpoint}`);

    if (query) {
      url.searchParams.set("q", query.slice(0, 200));
    } else {
      url.searchParams.set("category", category);
    }

    const language = params.lang || "en";
    const country = params.country || "in";
    if (!/^[a-z]{2}$/i.test(language) || !/^[a-z]{2}$/i.test(country)) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid language or country." })
      };
    }

    url.searchParams.set("lang", language);
    url.searchParams.set("country", country);
    url.searchParams.set("max", String(max));
    url.searchParams.set("page", String(page));
    url.searchParams.set("apikey", apiKey);

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: data.errors || "News provider request failed."
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Error fetching news from GNews:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Unable to retrieve news."
      })
    };
  }
};
