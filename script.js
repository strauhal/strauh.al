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
    container.style.zIndex = '-1000';



    // Create image element
    const img = document.createElement('img');
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    container.appendChild(img);

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
        img.src = src;
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

            // Allow clicking to load the image
            link.addEventListener('click', (e) => {
                hideImage();  // Optional: hide the hover image before following the link
            });
        } else {
            // Prevent default action for non-image links
            link.addEventListener('click', (e) => {
                e.preventDefault();
            });
        }
    });
});
