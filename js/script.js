const loadAllPost = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json()
    const post = data;
    // console.log(post.posts);
    const postContainer = post.posts;
    postContainer.forEach(element => {
        // console.log(element);

        const divContainer = document.getElementById('post-container')
        // divContainer.textContent =''

        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class=" flex bg-gray-200 px-5 py-10 rounded-2xl gap-5">
                        <div>
                            <img class="w-14 rounded-md" src="${element.image}" alt="" srcset="">
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
                                <div class="flex gap-5">
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
                            </div>
                        </div>
                    </div>
        `
        divContainer.appendChild(div)
    });
}
const loadLatestPost =async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json()
    const post = data;
    console.log(post);

    post.forEach(posts => {
        console.log(posts);

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
loadAllPost()
loadLatestPost()