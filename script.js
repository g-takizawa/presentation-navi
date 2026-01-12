document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('action-btn');

  btn.addEventListener('click', () => {
    alert('Hello! The JavaScript is connected and working.');
    console.log('Button clicked');
  });

  console.log('Application initialized');
});
