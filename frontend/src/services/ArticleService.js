const ARTICLE_API = "/articles/";

// Fetch all articles
export const fetchArticles = async () => {
    const res = await fetch(`${process.env.API_URL}${ARTICLE_API}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const response = await res.json();
    return response;
};

// Fetch article by ID
export const fetchArticleById = async (articleId) => {
    const res = await fetch(`${process.env.API_URL}${ARTICLE_API}${articleId}`, { method: 'GET' });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const response = await res.json();
    return response;
};

// Delete article by ID
export const deleteArticle = async (articleId) => {
    const res = await fetch(`${process.env.API_URL}${ARTICLE_API}${articleId}`, { method: 'DELETE' });
    if (!res.ok) {
        throw new Error('Failed to delete data');
    }
    const response = await res.json();
    return response;
};

// Add a new article
export const addArticle = async (article) => {
    const res = await fetch(`${process.env.API_URL}${ARTICLE_API}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
    });
    if (!res.ok) {
        throw new Error('Failed to add data');
    }
    const response = await res.json();
    return response;
};

// Edit an existing article
export const editArticle = async (article) => {
    const res = await fetch(`${process.env.API_URL}${ARTICLE_API}${article._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
    });
    if (!res.ok) {
        throw new Error('Failed to edit data');
    }
    const response = await res.json();
    return response;
};

// Fetch articles with pagination
export const fetchArticlesPagination = async (page, limit) => {
    const res = await fetch(`${process.env.API_URL}${ARTICLE_API}pagination?page=${page}&limit=${limit}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const response = await res.json();
    return response;
};

// Fetch articles with pagination and filters
export const fetchArticlesPaginationFilter = async (page, limit, searchTerm, prixMax) => {
    const res = await fetch(`${process.env.API_URL}${ARTICLE_API}paginationFilter?page=${page}&limit=${limit}&searchTerm=${searchTerm}&prixMax=${prixMax}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const response = await res.json();
    return response;
};

// Update article quantity
export const updateQuantity = async (lineOrder) => {
    const path = "qty/";
    const results = await Promise.all(lineOrder.map(async (line) => {
        const res = await fetch(`${process.env.API_URL}${ARTICLE_API}${path}${line.articleID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "quantity": line.quantity }),
        });
        if (!res.ok) {
            throw new Error('Failed to update quantity');
        }
        const response = await res.json();
        return response;
    }));
    return results;
};
