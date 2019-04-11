new Vue({
    el: "#app",
    data: {
        joke: "",
        userFavJokes: [],
        token: "",
        email: "",
        password: ""
    },
    created() {
        axios
            .get('https://icanhazdadjoke.com/', {
                headers: {
                    Accept: "text/plain"
                }
            })
            .then(({ data }) => {
                console.log(data);
                this.joke = data;
            })
    },
    methods: {
        login() {
            axios
                .post('https://localhost:3000/login')
                .then(data => {
                    this.token = data;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        generateJoke() {
            axios
                .get('https://icanhazdadjoke.com/', {
                    headers: {
                        Accept: "text/plain"
                    }
                })
                .then(({ data }) => {
                    this.joke = data;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        addToFavorites(joke) {
            axios
                .post('https://localhost:3000/favorites', {
                    headers: {
                        token: this.token
                    }
                })
                .then(data => {
                    userFavJokes.push(data);
                })
                .catch(err => {
                    console.log(err);
                })
        },
        removeFav(id) {
            axios
                .delete(`https://localhost:3000/favorites/${id}`, {
                    headers: {
                        token: this.token
                    }
                })
                .then(data => {
                    userFavJokes = userFavJokes.filter(joke => joke._id !== data._id);
                })
                .catch(err => {
                    console.log(err);
                })
        }

    },
    computed: {

    },
    watch: {
        token(val) {

        }
    }
})