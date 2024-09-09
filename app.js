const apiKey = '8e3a4551e04f4ff08c9dd0712ca6ff08'; 
const apiUrl = `https://newsapi.org/v2/everything?q=technology&apiKey=${apiKey}`;
let newsData = [];
let currentPage = 1;
let itemsPerPage = 3;

document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
    document.getElementById('category').addEventListener('change', filterNews);
    document.getElementById('sort').addEventListener('change', sortNews);
    document.getElementById('prev').addEventListener('click', prevPage);
    document.getElementById('next').addEventListener('click', nextPage);
});

async function fetchNews() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    newsData = data.articles;
    displayNews();
}

function displayNews() {
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = '';
    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    const paginatedNews = newsData.slice(start, end);

    paginatedNews.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
            <img src="${news.urlToImage || 'https://via.placeholder.com/300x200'}" alt="News Image">
            <h2>${news.title}</h2>
            <p>${news.description || 'No description available'}</p>
            <a href="${news.url}" target="_blank">Read more</a>
        `;
        newsList.appendChild(newsItem);
    });
    document.getElementById('page-num').textContent = currentPage;
}

function sortNews() {
    const sortBy = document.getElementById('sort').value;
    if (sortBy === 'date') {
        newsData.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else if (sortBy === 'title') {
        newsData.sort((a, b) => a.title.localeCompare(b.title));
    }
    displayNews();
}

function filterNews() {
    const category = document.getElementById('category').value;
    // Implement category filtering logic based on your API or data structure.
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayNews();
    }
}

function nextPage() {
    if (currentPage < Math.ceil(newsData.length / itemsPerPage)) {
        currentPage++;
        displayNews();
    }
}
