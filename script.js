window.onload = function () {
  document.getElementById('date-display').textContent = new Date().toDateString();
  document.getElementById('new-quote').onclick = getQuote;
};

async function getQuote() {
  const quoteText = document.getElementById('quote-text');
  const authorName = document.getElementById('author-name');
  const tagsContainer = document.getElementById('tags-container');

  try {
    quoteText.textContent = 'Loading quote...';
    authorName.textContent = '';
    tagsContainer.innerHTML = '';

    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();

    quoteText.textContent = `"${data.content}"`;
    authorName.textContent = `— ${data.author}`;

    tagsContainer.innerHTML = '';
    if (data.tags && data.tags.length) {
      data.tags.forEach((tag) => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        tagsContainer.appendChild(span);
      });
    }
  } catch (err) {
    quoteText.textContent = "Couldn't load quote. Please try again.";
    console.error('Error fetching quote:', err);
  }
}