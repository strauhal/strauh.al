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
    container.style.zIndex = '-1000';  // Ensure it's on top of other elements

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
    function addHoverListeners() {
        document.querySelectorAll('a').forEach(link => {
            // Check if the link's href ends with an image extension
            if (link.href.match(/\.(jpeg|jpg|gif|png)$/i)) {
                // Preload the image
                preloadImage(link.href);

                // Show the image in the container on hover
                link.addEventListener('mouseover', showImageOnHover);
                // Hide the image when not hovering
                link.addEventListener('mouseout', hideImageOnHover);
            }
        });
    }

    // Remove hover listeners
    function removeHoverListeners() {
        document.querySelectorAll('a').forEach(link => {
            if (link.href.match(/\.(jpeg|jpg|gif|png)$/i)) {
                link.removeEventListener('mouseover', showImageOnHover);
                link.removeEventListener('mouseout', hideImageOnHover);
            }
        });
    }

    // Hover event handlers
    function showImageOnHover(e) {
        e.preventDefault();
        showImage(this.href);
    }

    function hideImageOnHover(e) {
        e.preventDefault();
        hideImage();
    }

    // Add Intersection Observer for narrow viewports
    function enableMobileImageDisplay() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.href.match(/\.(jpeg|jpg|gif|png)$/i)) {
                    showImage(entry.target.href);
                } else {
                    hideImage();
                }
            });
        });

        document.querySelectorAll('a').forEach(link => {
            if (link.href.match(/\.(jpeg|jpg|gif|png)$/i)) {
                observer.observe(link);
            }
        });
        return observer;
    }

    // Enable or disable features based on viewport width
    let currentObserver = null;

    function checkViewportWidth() {
        const viewportWidth = window.innerWidth;

        if (viewportWidth > 900) {
            if (currentObserver) {
                currentObserver.disconnect();
                currentObserver = null;
            }
            removeHoverListeners();
            addHoverListeners();
        } else {
            removeHoverListeners();
            if (!currentObserver) {
                currentObserver = enableMobileImageDisplay();
            }
        }
    }

    // Initial check and add resize event listener
    checkViewportWidth();
    window.addEventListener('resize', checkViewportWidth);
});
