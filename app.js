const SUPABASE_URL = "https://prwrrvhdsdkwhfybvssb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByd3Jydmhkc2Rrd2hmeWJ2c3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyODkzNDAsImV4cCI6MjA3MDg2NTM0MH0.kqIJN1Pw6kCkB5nYqWUTLbmpfWmzCbZP5ZijynvSRlA"

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM elements
const authDiv = document.getElementById("auth");
const appDiv = document.getElementById("app");
const postsDiv = document.getElementById("posts");
const storiesContainer = document.getElementById("stories-container");
const fileInput = document.getElementById("fileInput");

// --- AUTH FUNCTIONS ---
async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return alert(error.message);
  alert("Sign up successful! Check your email.");
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return alert(error.message);
  showApp();
  fetchPosts();
  fetchStories();
}

async function logout() {
  await supabase.auth.signOut();
  appDiv.style.display = "none";
  authDiv.style.display = "block";
}

// --- SHOW APP AFTER LOGIN ---
function showApp() {
  authDiv.style.display = "none";
  appDiv.style.display = "block";
}

// --- UPLOAD POST ---
async function uploadPost() {
  const file = fileInput.files[0];
  if (!file) return alert("Select a file first");

  const fileName = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("posts")
    .upload(fileName, file);

  if (error) return alert(error.message);

  const url = supabas
