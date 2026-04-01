(() => {
  const COMMENTS_API_URL = "YOUR_COMMENTS_API_URL";

  const FALLBACK_COMMENTS = [
    {
      id: "sample-1",
      author: "Sample User",
      body: "This study sounds interesting. I'm curious about the wearable EEG device and the tasks.",
      createdAt: "2025-01-15T10:30:00Z",
      replyCount: 2
    },
    {
      id: "sample-2",
      author: "Visitor",
      body: "How long does the session take? Are the games difficult?",
      createdAt: "2025-01-17T08:10:00Z",
      replyCount: 0
    }
  ];

  const STOP_WORDS = new Set([
    "the", "and", "a", "an", "to", "of", "in", "is", "it", "that", "this", "for", "on",
    "with", "are", "was", "were", "be", "as", "at", "by", "or", "from", "i", "you",
    "we", "they", "he", "she", "my", "your", "our", "their", "but", "if", "so",
    "about", "how", "what", "when", "where", "why", "who", "can", "will", "would"
  ]);

  const POSITIVE_WORDS = new Set([
    "great", "good", "interesting", "awesome", "excited", "helpful", "clear", "love",
    "like", "nice", "cool", "curious"
  ]);

  const NEGATIVE_WORDS = new Set([
    "bad", "confusing", "hard", "difficult", "unclear", "hate", "problem", "issue"
  ]);

  const TOPIC_LABELS = [
    { label: "Scheduling", keywords: ["schedule", "time", "session", "duration", "availability"] },
    { label: "Wearable Device", keywords: ["eeg", "device", "headband", "wearable", "sensor"] },
    { label: "Tasks & Games", keywords: ["task", "game", "activity", "activities", "challenge"] },
    { label: "Compensation", keywords: ["payment", "compensation", "gift", "reward", "paid"] }
  ];

  const listEl = document.getElementById("comment-analytics-list");
  if (!listEl) return;

  const formatDate = (iso) => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "Unknown date";
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  const tokenize = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
  };

  const getTopWords = (text, count = 5) => {
    const tokens = tokenize(text);
    const freq = new Map();
    tokens.forEach((token) => {
      freq.set(token, (freq.get(token) || 0) + 1);
    });
    return Array.from(freq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([word, times]) => `${word} (${times})`);
  };

  const getSentiment = (text) => {
    const tokens = tokenize(text);
    let score = 0;
    tokens.forEach((token) => {
      if (POSITIVE_WORDS.has(token)) score += 1;
      if (NEGATIVE_WORDS.has(token)) score -= 1;
    });
    const label = score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral";
    return { label, score };
  };

  const getTopicLabel = (text) => {
    const lower = text.toLowerCase();
    for (const topic of TOPIC_LABELS) {
      if (topic.keywords.some((keyword) => lower.includes(keyword))) {
        return topic.label;
      }
    }
    return "General";
  };

  const buildPopup = (title, body) => {
    const popup = document.createElement("div");
    popup.className = "comment-popup";

    const heading = document.createElement("h4");
    heading.textContent = title;

    const text = document.createElement("p");
    text.textContent = body;

    popup.appendChild(heading);
    popup.appendChild(text);
    return popup;
  };

  const buildAction = (label, popupContent) => {
    const wrapper = document.createElement("div");
    wrapper.className = "comment-action";

    const button = document.createElement("button");
    button.className = "comment-action-button";
    button.type = "button";
    button.textContent = label;

    const popup = buildPopup(popupContent.title, popupContent.body);

    wrapper.appendChild(button);
    wrapper.appendChild(popup);
    return wrapper;
  };

  const renderComments = (comments) => {
    listEl.innerHTML = "";
    comments.forEach((comment) => {
      const item = document.createElement("div");
      item.className = "comment-item";

      const header = document.createElement("div");
      header.className = "comment-header";

      const author = document.createElement("div");
      author.className = "comment-author";
      author.textContent = comment.author || "Anonymous";

      const date = document.createElement("div");
      date.className = "comment-date";
      date.textContent = formatDate(comment.createdAt);

      header.appendChild(author);
      header.appendChild(date);

      const body = document.createElement("div");
      body.className = "comment-body";
      body.textContent = comment.body || "";

      const actions = document.createElement("div");
      actions.className = "comment-actions";

      const topWords = getTopWords(comment.body || "");
      const sentiment = getSentiment(comment.body || "");
      const topic = getTopicLabel(comment.body || "");
      const replies = Number.isFinite(comment.replyCount) ? comment.replyCount : 0;

      actions.appendChild(
        buildAction("Top words", {
          title: "Top words",
          body: topWords.length ? topWords.join(", ") : "Not enough content to analyze."
        })
      );

      actions.appendChild(
        buildAction("Sentiment", {
          title: "Sentiment",
          body: `${sentiment.label} (score: ${sentiment.score})`
        })
      );

      actions.appendChild(
        buildAction("Topic label", {
          title: "Topic label",
          body: topic
        })
      );

      actions.appendChild(
        buildAction("Reply count", {
          title: "Reply count",
          body: `${replies} replies`
        })
      );

      item.appendChild(header);
      item.appendChild(body);
      item.appendChild(actions);
      listEl.appendChild(item);
    });
  };

  const loadComments = async () => {
    if (!COMMENTS_API_URL || COMMENTS_API_URL.includes("YOUR_COMMENTS_API_URL")) {
      renderComments(FALLBACK_COMMENTS);
      return;
    }

    try {
      const response = await fetch(COMMENTS_API_URL);
      if (!response.ok) throw new Error("Failed to load comments");
      const data = await response.json();
      const comments = Array.isArray(data.comments) ? data.comments : [];
      renderComments(comments.length ? comments : FALLBACK_COMMENTS);
    } catch (error) {
      console.warn("Falling back to sample comments:", error);
      renderComments(FALLBACK_COMMENTS);
    }
  };

  loadComments();
})();
