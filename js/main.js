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
      total: ""
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
      const itemArtCar = this.articulosCarrito.filter(item => item._id == articulo._id)[0];
       if(itemArtCar != undefined){
         itemArtCar.cant++;
         } else {
           const itemArtCar = {
             _id: articulo._id,
             imagen: articulo.imagen,
             nombre: articulo.nombre,
             precio: articulo.precio,
             cant: 1,
           }
           this.articulosCarrito.push(itemArtCar)
         }
         articulo.stock --;
         localStorage.setItem("favorito", JSON.stringify(this.articulosCarrito));
 
     },
     eliminarCarrito(articulo) {
       const itemArtCar = this.articulos.filter((item) => item._id == articulo._id)[0];
     
       itemArtCar.stock += articulo.cant;
       let indice = 0;
       this.articulosCarrito.forEach((item, i) => item._id == articulo._id ? (indice = i): null)
       this.articulosCarrito.splice(indice, 1);
       localStorage.setItem("favorito", JSON.stringify(this.articulosCarrito));
 
     },
    // agregarCarrito(articulo) {
    //   if (!this.articulosCarrito.includes(articulo)) {
    //     this.articulosCarrito.push(articulo);
    //   }
    //   localStorage.setItem("favorito", JSON.stringify(this.articulosCarrito));
    // },
    // eliminarCarrito(articulo) {
    //   this.articulosCarrito = this.articulosCarrito.filter(
    //     (articuloC) => articuloC != articulo
    //   );

    //   localStorage.setItem("favorito", JSON.stringify(this.articulosCarrito));
    // },
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
      document.getElementById("inputnombrecontact").value = ""
      document.getElementById("inputtelcontact").value = ""
      document.getElementById("selectcontact").value = ""
      document.getElementById("inputcomentarioscontact").value = ""
    },    
    limpiaCarrito(){
      this.articulosCarrito = []
      console.log(this.articulosCarrito)
      document.getElementById("nombre").value=""
      document.getElementById("direccion").value=""
      document.getElementById("mail").value=""
      document.getElementById("number").value=""
      document.getElementById("provincia").value="Provincia"
      document.getElementById("ciudad").value=""
      document.getElementById("tarjeta").value=""
      document.getElementById("titular").value=""
      document.getElementById("mes").value=""
      document.getElementById("codigoS").value=""
      setTimeout(function(){window.location.href="/index.html"},3000)
    },

    graciasPorSuCompra() {
      
        new swal(
          "¡Gracias por su compra!",
          "Su solicitud ha sido procesada correctamente.",
          "success"
        );

        this.articulosCarrito = []
        this.totalCarrito = 0
      
    },
  },
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
        if(this.inputDrop == 'def'){
          this.articulos = this.backUpArticulos.filter((articulo) =>
          articulo.nombre.toLowerCase().includes(this.textoBuscar.toLowerCase())
          )
        }
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
        if(this.inputDrop == 'def'){
          this.articulos = this.backUpArticulos;
        }
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
    cantidadEProducto() {
      return this.articulosCarrito.reduce((acumulador, item) => acumulador + item.cant, 0)
    },
    totalPrecio() {
      return this.articulosCarrito.reduce((acumulador, item) => acumulador + (item.cant * item.precio), 0)
    }
    // pintarSuma() {
    //   if (this.articulosCarrito.length !== 0) {
    //     console.log(this.articulosCarrito);
    //     let array1 = [];
    //     this.articulosCarrito.forEach((articulo) =>
    //       array1.push(articulo.precio)
    //     );
    //     let array2 = array1.reduce((precio1, precio2) => {
    //       return precio1 + precio2;
    //     });
    //     this.totalCarrito = array2;
    //   }else if(this.articulosCarrito.length == 0){
    //     this.totalCarrito = 0;
    //   }
    // },
  },
}).mount("#app");
