document.getElementById('flip-button').addEventListener('click', function() {
    document.body.classList.toggle('upside-down');
    this.textContent = document.body.classList.contains('upside-down') ? 'Dont Click Me' : 'Dont Click Me';
});