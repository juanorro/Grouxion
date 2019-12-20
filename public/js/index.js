function like(event) {
    const button = event.target
    const id = button.getAttribute('data-id')
    axios.post(`/users/content/${id}/like`, { method: "post", withCredentials: true })
        .then(response => {
            console.log(response)
            const likesContainer = button.querySelector('.likes-count')
            likesContainer.innerText = Number(likesContainer.innerText) + response.data.likes
        })
        .catch(console.error);
}

function follow(event) {
    const button = event.target
    const id = button.getAttribute('data-id')
    console.log(id)
    axios.post(`/users/${id}/follow`, { method: "post", withCredentials: true })
        .then(response => {
            console.log(response)
            // const followsContainer = button.querySelector('.follows-count')
            // followsContainer.innerText = Number(followsContainer.innerText) + response.data.follows
        })
        .catch(console.error);
}

