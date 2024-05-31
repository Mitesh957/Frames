document.getElementById('imageUpload').addEventListener('change', function(event) {
    const files = event.target.files;
    const imageGallery = document.getElementById('imageGallery');

    for (const file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;

            const link = document.createElement('a');
            const imageId = 'uploadedImage'; // You could use a more dynamic way to generate unique IDs if handling multiple images.
            localStorage.setItem(imageId, e.target.result);

            link.href = `edit.html?imageId=${imageId}`;
            link.textContent = 'Edit Image';
            link.className = 'edit-link';

            const container = document.createElement('div');
            container.appendChild(img);
            container.appendChild(link);

            imageGallery.appendChild(container);
        }
        reader.readAsDataURL(file);
    }
});
