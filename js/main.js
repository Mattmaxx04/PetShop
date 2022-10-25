const { createApp } = Vue;

createApp({
    data() {
        return {
            articulos: [],
            urlApi: "https://apipetshop.herokuapp.com/api/articulos",
            juguetes:{},
            medicamentos:{},
            bajoStock:{}
        };
    },
    created() {
        this.traerDatos();
    },
    mounted() {

    },
    methods: {

        traerDatos() {
            fetch(this.urlApi)
                .then((response) => response.json())
                .then((data) => {
                    this.articulos = data.response;
console.log(this.articulos);
                    if (document.title == "Home") {
                       
                    } else if (document.title == "Farmacia") {
                    } else if (document.title == "Juguetes") {
                    } else if (document.title == "Contacto") {
                    }

                                });
                    },
             },
    computed: {

    },
}).mount("#app");