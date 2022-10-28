const { createApp } = Vue;

createApp({
    data() {
        return {            
            urlApi: "https://apipetshop.herokuapp.com/api/articulos",
            articulos: [],
            articulosCarrito: [],
            totalCarrito:[],
            carrito:[],
            backUpArticulos:[],
            textoBuscar: "",
            articulosCheck: [],
            articulo: {},
            textoBuscar: "",
            ArtCarrito: [],
            inputDrop: "",
            array1: [],
            total: "",
            modals:""          
        };
    },
    created() {
        this.traerDatos();
        if(JSON.parse(localStorage.getItem('favorito'))){
            this.articulosCarrito = JSON.parse(localStorage.getItem('favorito'))
        }
    },
    mounted() {
        /*
        this.modals = document.querySelectorAll("[data-modal]");
        this.modals.forEach(function (trigger) {
            trigger.addEventListener("click", function (event) {
              event.preventDefault();
              const modal = document.getElementById(trigger.dataset.modal);
              modal.classList.add("open");
              const exits = modal.querySelectorAll(".modal-exit");
              exits.forEach(function (exit) {
                exit.addEventListener("click", function (event) {
                  event.preventDefault();
                  modal.classList.remove("open");
                });
              });
            });
          });
*/
    },
    methods: {

        traerDatos() {
            fetch(this.urlApi)
                .then((response) => response.json())
                .then((data) => {   
                    if (document.title == "Inicio") {
                        this.articulos = data.response;
                    }else if (document.title == "Farmacia") {

                        data.response.forEach(articulo =>{
                            if(articulo.tipo=='Medicamento'){
                                this.backUpArticulos.push(articulo)

                            }
                        })
                       
                        
                    }else if (document.title == "Juguetes") {
                        data.response.forEach(articulo =>{
                            if(articulo.tipo=='Juguete'){
                                this.backUpArticulos.push(articulo)
                            }
                        })

                        console.log(this.carrito);
                    }else if (document.title == "Contacto") {

                    }

                    });
                    },
                    agregarCarrito(articulo) {
                        if(!this.articulosCarrito.includes(articulo)){
                          this.articulosCarrito.push(articulo,)                    
                        
                        }           
                        localStorage.setItem('favorito', JSON.stringify(this.articulosCarrito))                  
                        this.totalCarrito += articulo.precio 
                      },                  
                      eliminarCarrito(articulo) {
                        this.articulosCarrito = this.articulosCarrito.filter(articuloC => articuloC != articulo) 
                     
                        
                        localStorage.setItem('favorito', JSON.stringify(this.articulosCarrito))
                        this.totalCarrito -= articulo.precio 
                      },
                     
                      

                      enviarForm(){      
                        new swal("¡Gracias por contactarnos!", "Su solicitud ha sido procesada correctamente.", "success");       
                    },
                    graciasPorSuCompra(){      
                        new swal("¡Gracias por su compra!", "Su solicitud ha sido procesada correctamente.", "success");       
                    },
                   
                   
             },
    computed: {
        filtro(){
            if(this.textoBuscar==''){
                this.articulos = this.backUpArticulos
            }else{
                this.articulos = this.backUpArticulos.filter(articulo => articulo.nombre.toLowerCase().includes(this.textoBuscar.toLowerCase()))
            }
        },

        
    },
}).mount("#app");

