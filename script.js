document.addEventListener('DOMContentLoaded', () => {
    // Function to detect YouTube links in <p> tags and add embed links
    function addEmbedLinks() {
        const paragraphs = document.querySelectorAll('p');

        paragraphs.forEach(p => {
            const youtubeRegex = /(https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+))(?:&t=(\d+)s)?/g;
            let match = youtubeRegex.exec(p.innerHTML);

            if (match) {
                const youtubeLink = match[0];
                const videoId = match[2];
                const startTime = match[3] ? `&start=${match[3]}` : ''; // Handle start time if present

                // Create an <a> styled link that says [embed]
                const embedLink = document.createElement('a');
                embedLink.textContent = '[embed]';
                embedLink.style.cursor = 'pointer';
                embedLink.style.marginLeft = '5px'; // Small margin for space between the link and [embed]
                embedLink.style.textDecoration = 'underline'; // Underlined text

                // Create a <br> element for spacing between the video and the link
                const spacer = document.createElement('br');

                // Embed video toggle on link click
                let iframe = null;  // Declare iframe variable outside so it can be accessed for toggle
                embedLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    if (!iframe) {
                        // If iframe doesn't exist, create and append it
                        iframe = document.createElement('iframe');
                        iframe.width = '560';
                        iframe.height = '315';
                        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1${startTime}`;
                        iframe.frameBorder = '0';
                        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                        iframe.allowFullscreen = true;
                        iframe.style.marginLeft = '0'; // No left margin

                        // Add the spacer and iframe after the YouTube link
                        p.appendChild(spacer);
                        p.appendChild(iframe);
                    } else {
                        // If iframe exists, remove the spacer and iframe (toggle off)
                        iframe.remove();
                        spacer.remove();
                        iframe = null;  // Set iframe to null for future toggling
                    }
                });

                // Replace the YouTube link in the paragraph with a clickable link
                p.innerHTML = p.innerHTML.replace(youtubeLink, `<a href="${youtubeLink}" target="_blank">${youtubeLink}</a>`);
                
                // Append the [embed] link next to the YouTube link
                p.appendChild(embedLink);
            }
        });
    }

    // Run the function to add embed links
    addEmbedLinks();
});
