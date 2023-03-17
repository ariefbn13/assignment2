
const API_BASE_URL = "http://13.212.226.116:8000";

async function registerUser(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.access && data.refresh) {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      updateUI();
    } else {
      console.error("Registration failed:", data);
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.access && data.refresh) {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      updateUI();
      // window.location.href = "articles.html";
    } else {
      console.error("Login failed:", data);
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

async function refreshToken(refreshToken) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    const data = await response.json();
    if (data.access) {
      localStorage.setItem("accessToken", data.access);
      return true;
    } else {
      console.error("Refresh token failed:", data);
      return false;
    }
  } catch (err) {
    console.error("Error:", err);
    return false;
  }
}

async function fetchProfile(accessToken) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log("Profile data:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

function updateUI() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (accessToken && refreshToken) {
    //document.getElementById("login-form").style.display = "none";
    //document.getElementById("registration-form").style.display = "none";
    //document.getElementById("profile").style.display = "block";
    // document.getElementById("articles-list").style
     window.location.href = "articles.html";
  }
}    

function handleTokenExpiration() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  alert("Your session has expired. Please log in again.");
  updateUI();
}




function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.classList.add('alert', `alert-${type}`);
  notification.textContent = message;
  document.getElementById('notifications').appendChild(notification);

  setTimeout(() => {
      notification.remove();
  }, 3000);
}


document.getElementById('show-login-form').addEventListener('click', () => {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('registration-form').style.display = 'none';
});

document.getElementById('show-registration-form').addEventListener('click', () => {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('registration-form').style.display = 'block';
});

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = "index.html";
  updateUI();

});

document.getElementById('registration-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
      await registerUser(username, password);
      showNotification('Registration successful!');
      
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
  } catch (error) {
      showNotification('Registration failed.', 'danger');
  }
});

document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
 
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  try {
      await loginUser(username, password);
      showNotification('Login successful!');
      
      document.getElementById('login-username').value = '';
      document.getElementById('login-password').value = '';
      // document.getElementById('logout').style.display = 'block';
      updateUI();
  } catch (error) {
      showNotification('Login failed.', 'danger');
  }
});

