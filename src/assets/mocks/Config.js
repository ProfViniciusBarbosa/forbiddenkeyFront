const Config = {
    API_LOGA_USER: "http://192.168.0.105:8080/oauth/token",
    API_CRIA_USER: "http://192.168.0.105:8080/customers",
    API_PEGA_USER:"http://192.168.0.105:8080/customers/details", 
    API_PEGA_ADM:"http://192.168.0.105:8080/admins/details", 
    API_PEGA_JOGOS:"http://192.168.0.105:8080/products/avaible",
    API_PEGA_JOGOS_ADM:"http://192.168.0.105:8080/products/all",
    API_PEGA_JOGUINHO:"http://192.168.0.105:8080/products/",
    API_PEGA_FILTROS:"http://192.168.0.105:8080/categories/getAll",
    API_PEGA_DESENVOLVEDORES:"http://192.168.0.105:8080/developers/getAll",
    API_PEGA_DISTRIBUIDORAS:"http://192.168.0.105:8080/distributors/getAll",
    API_CURRENT_CART:"http://192.168.0.105:8080/carts",
    API_BASE_URL_CART:"http://192.168.0.105:8080/carts/",
    API_BASE_URL_CARD: "http://192.168.0.105:8080/cards",
    API_UPDATE_CUSTOMER: "http://192.168.0.105:8080/customers",
    API_BANNER_PRODUCTS:  "http://192.168.0.105:8080/products/mostSelled",
    API_PEGA_BANDEIRAS_CARTAO: "http://192.168.0.105:8080/banners",
    API_FINALIZA_COMPRA: "http://192.168.0.105:8080/orders",
    API_ATUALZA_ORDER_STATUS: "http://192.168.0.105:8080/orders/",
    API_GET_ORDER_ADM: "http://192.168.0.105:8080/orders/allCustomers",
    API_GET_GAMES_COSTUMER: "http://192.168.0.105:8080/customerGames",
    API_GET_ORDERS_CUSTOMERS:"http://192.168.0.105:8080/customerGames/all",
    API_SEE_GAME_KEY:"http://192.168.0.105:8080/customerGames/",
    API_CRIA_JOGOS:"http://192.168.0.105:8080/products",
    API_ATUALIZA_JOGOS:"http://192.168.0.105:8080/products/",

    TIMEOUT_REQUEST: 5000,
    HEADER_REQUEST: {
        Accept:'application/x-www-form-urlencoded;charset=UTF-8',
        "Content-Type": "application/json"
    },
}
export default Config;

// const Config = {
//     API_LOGA_USER: "http://192.168.45.25:8080/oauth/token",
//     API_CRIA_USER: "http://192.168.45.25:8080/customers",
//     API_PEGA_USER:"http://192.168.45.25:8080/customers/details", 
//     API_PEGA_ADM:"http://192.168.45.25:8080/admins/details", 
//     API_PEGA_JOGOS:"http://192.168.45.25:8080/products/all",
//     API_PEGA_JOGUINHO:"http://192.168.45.25:8080/products/",
//     API_PEGA_FILTROS:"http://192.168.45.25:8080/categories/getAll",
//     API_PEGA_DESENVOLVEDORES:"http://192.168.45.25:8080/developers/getAll",
//     API_PEGA_DISTRIBUIDORAS:"http://192.168.45.25:8080/distributors/getAll",
//     API_CURRENT_CART:"http://192.168.45.25:8080/carts",
//     API_BASE_URL_CART:"http://192.168.45.25:8080/carts/",
//     API_BASE_URL_CARD: "http://192.168.45.25:8080/cards",
//     API_UPDATE_CUSTOMER: "http://192.168.45.25:8080/customers",
//     API_BANNER_PRODUCTS:  "http://192.168.45.25:8080/products/mostSelled",
//     API_PEGA_BANDEIRAS_CARTAO: "http://192.168.45.25:8080/banners",

//     TIMEOUT_REQUEST: 5000,
//     HEADER_REQUEST: {
//         Accept:'application/x-www-form-urlencoded;charset=UTF-8',
//         "Content-Type": "application/json"
//     },
// }
// export default Config;