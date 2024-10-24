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
                embedLink.textContent = '[embed]';
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

    // Desktop Hover Image Function
    function enableDesktopHover() {
        const container = document.createElement('div');
        container.id = 'desktop-image-container';
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        container.style.display = 'none';
        container.style.zIndex = '-10';
        container.style.pointerEvents = 'none';

        const img = document.createElement('img');
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        container.appendChild(img);
        document.body.appendChild(container);

        function showImage(src) {
            img.style.display = 'none';
            img.src = '';

            const newImg = new Image();
            newImg.onload = () => {
                img.src = src;
                img.style.display = 'block';
            };
            newImg.src = src;
            container.style.display = 'block';
        }

        function hideImage() {
            container.style.display = 'none';
        }

        // Update query to handle case-insensitive extensions
        document.querySelectorAll('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"], a[href$=".JPG"], a[href$=".JPEG"], a[href$=".PNG"], a[href$=".GIF"]').forEach(link => {
            const src = link.href;

            link.addEventListener('mouseover', () => {
                showImage(src);
            });

            link.addEventListener('mouseout', () => {
                hideImage();
            });
        });
    }

    // Initialize functions
    addEmbedLinks();
    enableDesktopHover();
});
