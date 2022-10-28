const { createApp } = Vue;

createApp({
  data() {
    return {
      urlApi: "https://apipetshop.herokuapp.com/api/articulos",
      articulos: [],
      articulosCarrito: [],
      totalCarrito: 0,
      carrito: [],
      backUpArticulos: [],
      textoBuscar: "",
      articulosCheck: [],
      articulo: {},
      modal: [],
      textoBuscar: "",
      ArtCarrito: [],
      inputDrop: "",
      array1: [],
      total: "",
    };
  },
  created() {
    this.traerDatos();
    if (JSON.parse(localStorage.getItem("favorito"))) {
      this.articulosCarrito = JSON.parse(localStorage.getItem("favorito"));
    }
  },
  mounted() {},
  methods: {
    traerDatos() {
      fetch(this.urlApi)
        .then((response) => response.json())
        .then((data) => {
          if (document.title == "Inicio") {
            this.articulos = data.response;
          } else if (document.title == "Farmacia") {
            data.response.forEach((articulo) => {
              if (articulo.tipo == "Medicamento") {
                this.backUpArticulos.push(articulo);
              }
            });
          } else if (document.title == "Juguetes") {
            data.response.forEach((articulo) => {
              if (articulo.tipo == "Juguete") {
                this.backUpArticulos.push(articulo);
              }
            });

          } else if (document.title == "Contacto") {
          }
        });
    },


    agregarCarrito(articulo) {
      if(!this.articulosCarrito.includes(articulo)){
        this.articulosCarrito.push(articulo)             
      }           
      localStorage.setItem('favorito', JSON.stringify(this.articulosCarrito))
      this.totalCarrito += articulo.precio                        
    },                  
    eliminarCarrito(articulo) {
      this.articulosCarrito = this.articulosCarrito.filter(articuloC => articuloC != articulo)                        
      localStorage.setItem('favorito', JSON.stringify(this.articulosCarrito))
      this.totalCarrito -= articulo.precio                       
    },


    agregarModal(articulo) {
      if (this.modal.length === 0) {
        array = Object.values(articulo);
        this.modal = {
          nombre: array[1],
          descripcion: array[2],
          imagen: array[5],
          stock: array[4],
        };
      }
    },
    quitarModal() {
      this.modal = [];
    },

    enviarForm() {
      new swal(
        "¡Gracias por contactarnos!",
        "Su solicitud ha sido procesada correctamente.",
        "success"
      );
    },
  
  graciasPorSuCompra(){      
    new swal("¡Gracias por su compra!", "Su solicitud ha sido procesada correctamente.", "success");       
},},
  computed: {
    filtro() {
      if (this.textoBuscar == "" && this.inputDrop.length == 0) {
        this.articulos = this.backUpArticulos;
      }
      if (this.textoBuscar != "" && this.inputDrop.length == 0) {
        this.articulos = this.backUpArticulos.filter((articulo) =>
          articulo.nombre.toLowerCase().includes(this.textoBuscar.toLowerCase())
        );
      }
      if (this.textoBuscar != "" && this.inputDrop.length != 0) {
        if (this.inputDrop == "Max") {
          this.articulos = this.backUpArticulos
            .filter((articulo) =>
              articulo.nombre
                .toLowerCase()
                .includes(this.textoBuscar.toLowerCase())
            )
            .sort((a, b) => b.precio - a.precio);
        }
        if (this.inputDrop == "Min") {
          this.articulos = this.backUpArticulos
            .filter((articulo) =>
              articulo.nombre
                .toLowerCase()
                .includes(this.textoBuscar.toLowerCase())
            )
            .sort((a, b) => a.precio - b.precio);
        }
      }
      if (this.textoBuscar == "" && this.inputDrop.length != 0) {
        if (this.inputDrop == "Max") {
          this.articulos = this.backUpArticulos
            .filter((articulo) =>
              articulo.nombre
                .toLowerCase()
                .includes(this.textoBuscar.toLowerCase())
            )
            .sort((a, b) => b.precio - a.precio);
        }
        if (this.inputDrop == "Min") {
          this.articulos = this.backUpArticulos
            .filter((articulo) =>
              articulo.nombre
                .toLowerCase()
                .includes(this.textoBuscar.toLowerCase())
            )
            .sort((a, b) => a.precio - b.precio);
        }
      }
    },    
  },
}).mount("#app");
