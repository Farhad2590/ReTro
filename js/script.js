const loadAllPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json()
    const post = data.posts;
    // console.log(post);
    displayPost(post);
}

const displayPost = posts =>{
    posts.forEach(element => {
        // console.log(element);
       
        const divContainer = document.getElementById('post-container')
        // const titleDiv = document.getElementById('title-container')
        // divContainer.textContent =''
       

        const div = document.createElement('div');
        div.innerHTML = `
        <div class=" flex bg-gray-200 px-5 py-10 rounded-2xl gap-5">
                        <div class="indicator">
                            <span class="indicator-item badge badge-secondary ${element.isActive ? 'bg-green-700' : 'bg-red-700'}  border-none" ></span>
                            <div class="grid w-24 h-24 bg-base-300 place-items-center">
                                <img class="w-24 rounded-md" src="${element.image}" alt="" srcset="">
                            </div>
                          </div>
                        <div class="flex flex-col gap-3 ">
                            <div class="flex gap-5">
                                <p> #${element.category}</p>
                                <p>Author : ${element.author.name}</p>
                            </div>
                            <div class="flex flex-col gap-5">
                                <div class="flex flex-col gap-3">
                                    <h1 class="text-xl">${element.title}</h1>
                                    <p>${element.description}</p>
                                </div>
                                <div class="border-dashed border-[2px]"></div>
                                <div class="flex justify-between">
                                    <div class="flex gap-5 justify-start">
                                        <div class="flex gap-3 items-center">
                                            <i class="fa-regular fa-message"></i>
                                            <p>${element.comment_count}</p>
                                        </div>
                                        <div class="flex gap-3 items-center">
                                            <i class="fa-regular fa-eye"></i>
                                            <p>${element.view_count}</p>
                                        </div>
                                        <div class="flex gap-3 items-center">
                                            <i class="fa-regular fa-clock"></i>
                                            <p>${element.posted_time} min</p>
                                        </div>
                                    </div>
                                    <div onclick="handleClick('${element.title}', ${element.view_count})" id="btn" class="justify-end">
                                        <img src="./images/email_1.png" alt="" srcset="">
                                    </div>
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

        <h1 class="text-base">${postTitle}</h1>
                        <div class="flex gap-3 items-center">
                            <i class="fa-regular fa-eye"></i>
                            <p>${postView}</p>
                        </div>
        `
            titleDiv.appendChild(title);
}

const handleSearch = async () => {
    const searchField = document.getElementById('searchText');
    const searchText = searchField.value.trim().toLowerCase();

    if (!searchText) return;

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    loadAllPost(data);
    console.log(data);
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
                            <p>${posts.author.posted_date}</p>
                        </div>

                        <h2 class="text-lg font-bold">${posts.title}
                        </h2>
                        <p>${posts.description}</p>
                            <div class="flex gap-2 items-center">
                                <img class="w-14 rounded-full" src="${posts.profile_image}" alt="" srcset="">
                                <div>
                                    <p class="text-base	">${posts.author.name}</p>
                                    <p class="text-sm	">${posts.author.designation}</p>
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