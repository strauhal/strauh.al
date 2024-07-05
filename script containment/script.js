document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded");

    // Create image container
    const container = document.createElement('div');
    container.id = 'image-container';
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.display = 'none';
    container.style.maxWidth = '90%';
    container.style.maxHeight = '90%';
    container.style.backgroundSize = 'contain';
    container.style.backgroundRepeat = 'no-repeat';
    container.style.backgroundPosition = 'center';
    container.style.zIndex = '1000';
    container.style.border = '1px solid #ccc';  // Optional: adds a border
    container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';  // Optional: adds a shadow
    document.body.appendChild(container);

    // Object to store preloaded images
    const preloadedImages = {};

    // Function to preload images
    function preloadImage(src) {
        if (!preloadedImages[src]) {
            preloadedImages[src] = new Image();
            preloadedImages[src].src = src;
        }
    }

    // Function to show image
    function showImage(src) {
        console.log("Showing image:", src);
        container.style.backgroundImage = `url(${src})`;
        container.style.display = 'block';
    }

    // Function to hide image
    function hideImage() {
        console.log("Hiding image");
        container.style.display = 'none';
    }

    // Add event listeners to all links and preload images
    document.querySelectorAll('a').forEach(link => {
        // Check if the link's href ends with an image extension
        if (link.href.match(/\.(jpeg|jpg|gif|png)$/i)) {
            // Preload the image
            preloadImage(link.href);

            // Show the image in the container on hover
            link.addEventListener('mouseover', (e) => {
                e.preventDefault();
                showImage(link.href);
            });

            // Hide the image when not hovering
            link.addEventListener('mouseout', (e) => {
                e.preventDefault();
                hideImage();
            });
        }
    });

    // Also handle click events to avoid default behavior of following the link
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();  // Prevent default link action
        });
    });
});
