const loadAllPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json()
    const post = data.posts;
    // console.log(post);
    displayPost(post);
}

const displayPost = posts =>{
    const divContainer = document.getElementById('post-container')
    divContainer.textContent =''
    posts.forEach(element => {

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="flex gap-3 bg-gray-200 px-4 py-6 rounded-lg mb-4 ">
                        <div class="indicator">
                            <span class="indicator-item badge badge-secondary ${element.isActive ? 'bg-green-700' : 'bg-red-700'} border-none"></span>
                            <div class="grid w-16 h-16 sm:w-24 sm:h-24 bg-base-300 place-items-center">
                                <img class="w-16 sm:w-24 rounded-md" src="${element.image}" alt="" srcset="">
                            </div>
                        </div>
                        <div class="mt-4">
                            <div class="flex justify-between items-center">
                                <p class="text-sm">#${element.category}</p>
                                <p class="text-sm">Author: ${element.author.name}</p>
                            </div>
                            <div class="mt-2">
                                <h1 class="text-lg sm:text-xl">${element.title}</h1>
                                <p class="text-sm">${element.description}</p>
                            </div>
                            <div class="border-t border-dashed mt-2 pt-2 flex justify-between">
                                <div class="flex gap-3 items-center">
                                    <i class="fa-regular fa-message"></i>
                                    <p class="text-sm">${element.comment_count}</p>
                                </div>
                                <div class="flex gap-3 items-center">
                                    <i class="fa-regular fa-eye"></i>
                                    <p class="text-sm">${element.view_count}</p>
                                </div>
                                <div class="flex gap-3 items-center">
                                    <i class="fa-regular fa-clock"></i>
                                    <p class="text-sm">${element.posted_time} min</p>
                                </div>
                                <div onclick="handleClick('${element.title}', ${element.view_count})" class="mt-4 text-right">
                                <img class="w-6 h-6" src="./images/email_1.png" alt="">
                            </div>
                            </div>
                            
                        </div>
                    </div>

        `
        divContainer.appendChild(div);
    });
}
function handleClick(postTitle,postView) {
    console.log(postTitle,postView);
    const titleDiv = document.getElementById('title-container')

    const title = document.createElement('div');
    title.innerHTML = `
    <div class="bg-white p-2 rounded-lg">
        <h1 class="text-base">${postTitle}</h1>
        <div class="flex gap-3 items-center">
            <i class="fa-regular fa-eye"></i>
            <p>${postView}</p>
        </div>
    </div>
        
        `
        title.style.marginBottom = '20px';
        titleDiv.appendChild(title);
}

// const handleSearch = async () => {
//     const searchField = document.getElementById('searchText');
//     const searchText = searchField.value.trim().toLowerCase();

//     if (!searchText) return;

//     const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
//     const data = await res.json();
//     if(data.length <= 0){
//         displayPost(data.posts); 
//     }
//     else{

//     }
   
//     console.log(data);
// };
const handleSearch = async () => {
    const searchField = document.getElementById('searchText');
    const searchText = searchField.value.trim().toLowerCase();

    if (!searchText) return;

    const loaderSpinner = document.getElementById('loader-spinner');
    loaderSpinner.classList.remove('hidden'); // Show loader

    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
        const data = await res.json();

        if (data.posts && data.posts.length > 0) {
            displayPost(data.posts);
        } else {
            
        }

        console.log(data);
    } catch (error) {
       
        console.error('Error fetching data:', error);
    } finally {
        loaderSpinner.classList.add('hidden'); 
    }
};



const loadLatestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json()
    const post = data;
    // console.log(post);

    post.forEach(posts => {
        // console.log(posts);

        const divContainer = document.getElementById('Latest-Post-Container')
        // divContainer.textContent =''

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
                    <figure class="px-5 pt-10">
                        <img src="${posts.cover_image}" />
                    </figure>
                    <div class="card-body">
                        <div class="flex gap-3">
                            <i class="fa-solid fa-calendar-days"></i>
                            <p>${posts.author.posted_date ? posts.author.posted_date : 'No publish date'}</p>
                        </div>

                        <h2 class="text-lg font-bold">${posts.title}
                        </h2>
                        <p>${posts.description}</p>
                            <div class="flex gap-2 items-center">
                                <img class="w-14 rounded-full" src="${posts.profile_image}" alt="" srcset="">
                                <div>
                                    <p class="text-base	">${posts.author.name}</p>
                                    <p class="text-sm	">${posts.author.designation ? posts.author.designation : 'Unknown'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
        divContainer.appendChild(div)
    })
}
loadAllPosts()
loadLatestPost()