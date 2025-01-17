const API_URL = 'https://crudcrud.com/api/11dc15d858f34973bb6544a5c69b97ce/bookmarks'; 

const titleInput = document.getElementById('title');
const urlInput = document.getElementById('url');
const addBtn = document.getElementById('addBtn');
const bookmarksDiv = document.getElementById('bookmarks');

async function loadBookmarks() {
  try {
    const res = await axios.get(API_URL);
    console.log(res.data);
    bookmarksDiv.innerHTML = '';  
    res.data.forEach((bookmark) => {
      const div = document.createElement('div');
      div.className = 'bookmark';
      div.innerHTML = `
        <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
        <button onclick="editBookmark('${bookmark._id}')">Edit</button>
        <button onclick="deleteBookmark('${bookmark._id}')">Delete</button>
      `;
      bookmarksDiv.appendChild(div);
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
  }
}

addBtn.addEventListener('click', async () => {
  const title = titleInput.value;
  const url = urlInput.value;
  if (!title || !url) {
    alert('Please enter both title and URL');
    return;
  }

  try {
    const response = await axios.post(API_URL, { title, url });
    console.log(response.data); 
    titleInput.value = '';  
    urlInput.value = '';
    loadBookmarks(); 
  } catch (error) {
    console.error('Error adding bookmark:', error);
  }
});

async function deleteBookmark(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    loadBookmarks();  
  } catch (error) {
    console.error('Error deleting bookmark:', error);
  }
}

async function editBookmark(id) {
  const title = prompt('Enter new title:');
  const url = prompt('Enter new URL:');
  if (!title || !url) return;  

  try {
    await axios.put(`${API_URL}/${id}`, { title, url });
    loadBookmarks();  
  } catch (error) {
    console.error('Error editing bookmark:', error);
  }
}

loadBookmarks();  
