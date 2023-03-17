const BASE_API = "http://13.212.226.116:8000";

async function fetchArticles(accessToken, limit = 10, offset = 0) {
    try {
      const response = await fetch(`${BASE_API}/api/article?limit=${limit}&offset=${offset}`, {
        headers: {
          'Authorization': `TSTKRI ${accessToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        // Process and display the data as needed
        console.log(data);
      } else {
        throw new Error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }
  
  async function createArticle(accessToken, title, content) {
    try {
      const response = await fetch(`${BASE_API}/api/article`, {
        method: 'POST',
        headers: {
          'Authorization': `TSTKRI ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Process and display the data as needed
        console.log(data);
      } else {
        throw new Error('Failed to create article');
      }
    } catch (error) {
      console.error('Error creating article:', error);
    }
  }
  