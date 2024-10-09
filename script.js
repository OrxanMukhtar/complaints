document.addEventListener("DOMContentLoaded", () => {
    const postForm = document.getElementById("postForm");
    const hashtagInput = document.getElementById("hashtagsInput");
    const hashtagList = document.getElementById("hashtagList");
    let hashtags = [];

    document.getElementById("addHashtagButton").addEventListener("click", () => {
        const hashtagValue = hashtagInput.value.trim();
        if (hashtagValue && !hashtags.includes(hashtagValue)) {
            hashtags.push(hashtagValue);
            const listItem = document.createElement("li");
            listItem.textContent = hashtagValue;
            hashtagList.appendChild(listItem);
            hashtagInput.value = ""; // Inputu sıfırla
        }
    });

    postForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const message = document.getElementById("message").value;
        const mediaInput = document.getElementById("media");
        const mediaFile = mediaInput.files[0];
        const postList = document.getElementById("postList");

        if (name && message) {
            const postItem = document.createElement("div");
            postItem.classList.add("post");

            // Tarixi almaq
            const now = new Date();
            const dateString = now.toLocaleString("az-AZ", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });

            postItem.innerHTML = `<strong>${name}</strong><p>${message}</p><span class="date">${dateString}</span>`;

            // Şəkil/video əlavə edilibsə göstər
            if (mediaFile) {
                const fileReader = new FileReader();
                fileReader.onload = function(e) {
                    const fileType = mediaFile.type.split("/")[0];
                    if (fileType === "image") {
                        const img = document.createElement("img");
                        img.src = e.target.result;
                        postItem.appendChild(img);
                    } else if (fileType === "video") {
                        const video = document.createElement("video");
                        video.src = e.target.result;
                        video.controls = true;
                        postItem.appendChild(video);
                    }
                };
                fileReader.readAsDataURL(mediaFile);
            }

            // Hashtagları göstər
            if (hashtags.length > 0) {
                const hashtagsElement = document.createElement("div");
                hashtagsElement.classList.add("hashtags");
                hashtagsElement.innerHTML = hashtags.map(tag => `<a href="#" class="hashtag" data-tag="${tag}">${tag}</a>`).join(" ");
                postItem.appendChild(hashtagsElement);
            }

            // Gönderiyi üstte göstermek
            postList.insertBefore(postItem, postList.firstChild);

            // Formu sıfırla
            postForm.reset();
            hashtagList.innerHTML = "";
            hashtags = [];
        }
    });

    // Hashtag klick
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("hashtag")) {
            event.preventDefault();
            const clickedHashtag = event.target.getAttribute("data-tag");
            filterPostsByHashtag(clickedHashtag);
        }
    });


    //go


    // Hashtaga göre filtrelemek
function filterPostsByHashtag(hashtag) {
    const posts = document.querySelectorAll(".post");
    let isFiltered = false;
    
    posts.forEach(post => {
        const postHashtags = post.querySelectorAll(".hashtags a");
        let hasMatchingHashtag = false;
        
        postHashtags.forEach(tag => {
            if (tag.textContent.includes(hashtag)) {
                hasMatchingHashtag = true;
            }
        });
        
        if (hasMatchingHashtag) {
            post.style.display = "block";
            isFiltered = true;
        } else {
            post.style.display = "none";
        }
    });

    if (isFiltered) {
        resetFilterButton.style.display = "block"; // Reset butonunu göster
    }
}

// Butun gönderileri göster butonu
resetFilterButton.addEventListener("click", function() {
    const posts = document.querySelectorAll(".post");
    posts.forEach(post => {
        post.style.display = "block";
    });
    resetFilterButton.style.display = "none"; // Reset butonunu gizle
});

// İlk başta reset butonunu gizle
resetFilterButton.style.display = "none";


    //end


});
