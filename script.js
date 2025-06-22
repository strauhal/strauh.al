document.addEventListener('DOMContentLoaded', () => {
    // YouTube Embed Function
    function addEmbedLinks() {
        const paragraphs = document.querySelectorAll('p');

        paragraphs.forEach(p => {
            const youtubeRegex = /(https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+))(?:&t=(\d+)s)?/g;
            let match = youtubeRegex.exec(p.innerHTML);

            if (match) {
                const youtubeLink = match[0];
                const videoId = match[2];
                const startTime = match[3] ? `&start=${match[3]}` : '';

                const embedLink = document.createElement('a');
                embedLink.textContent = '[display]';
                embedLink.style.cursor = 'pointer';
                embedLink.style.marginLeft = '5px';
                embedLink.style.textDecoration = 'underline';

                const spacer = document.createElement('br');
                let iframe = null;

                embedLink.addEventListener('click', (e) => {
                    e.preventDefault();

                    if (!iframe) {
                        iframe = document.createElement('iframe');
                        iframe.width = '560';
                        iframe.height = '315';
                        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1${startTime}`;
                        iframe.frameBorder = '0';
                        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                        iframe.allowFullscreen = true;
                        iframe.style.marginLeft = '0';

                        p.appendChild(spacer);
                        p.appendChild(iframe);
                    } else {
                        iframe.remove();
                        spacer.remove();
                        iframe = null;
                    }
                });

                p.innerHTML = p.innerHTML.replace(youtubeLink, `<a href="${youtubeLink}" target="_blank">${youtubeLink}</a>`);
                p.appendChild(embedLink);
            }
        });
    }

    // Desktop Hover and Mobile Tap for Images
    function enableImageInteraction() {
        const container = document.createElement('div');
        container.id = 'desktop-image-container';
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        container.style.display = 'none';
        container.style.zIndex = '-1';
        container.style.pointerEvents = 'none';

        const img = document.createElement('img');
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        container.appendChild(img);
        document.body.appendChild(container);

        // Simple LRU cache
        const imageCache = new Map();
        const MAX_CACHE_SIZE = 50;

        function cacheImage(src) {
            if (imageCache.has(src)) {
                const cached = imageCache.get(src);
                imageCache.delete(src);
                imageCache.set(src, cached);
                return cached;
            }

            const newImg = new Image();
            newImg.src = src;

            if (imageCache.size >= MAX_CACHE_SIZE) {
                const oldestKey = imageCache.keys().next().value;
                imageCache.delete(oldestKey);
            }

            imageCache.set(src, newImg);
            return newImg;
        }

        function showImage(src) {
            img.style.display = 'none';
            const cached = cacheImage(src);

            if (cached.complete) {
                img.src = cached.src;
                img.style.display = 'block';
                container.style.display = 'block';
            } else {
                cached.onload = () => {
                    img.src = cached.src;
                    img.style.display = 'block';
                    container.style.display = 'block';
                };
            }
        }

        function hideImage() {
            container.style.display = 'none';
        }

        // Track the last tapped link
        let lastTappedLink = null;

        // Hover debounce timeout
        let hoverTimer = null;

        document.querySelectorAll('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"], a[href$=".JPG"], a[href$=".JPEG"], a[href$=".PNG"], a[href$=".GIF"]').forEach(link => {
            const src = link.href;

            // Hover behavior for desktop
            link.addEventListener('mouseenter', () => {
                hoverTimer = setTimeout(() => showImage(src), 150); // 150ms debounce
            });

            link.addEventListener('mouseleave', () => {
                clearTimeout(hoverTimer);
                hideImage();
            });

            // Tap behavior for mobile
            link.addEventListener('touchstart', (e) => {
                e.preventDefault();

                if (lastTappedLink === link) {
                    window.location.href = src;
                } else {
                    lastTappedLink = link;
                    showImage(src);
                }
            });
        });

        document.body.addEventListener('touchstart', (e) => {
            if (!e.target.closest('a')) {
                hideImage();
                lastTappedLink = null;
            }
        });
    }

    // Initialize functions
    addEmbedLinks();
    enableImageInteraction();
});
