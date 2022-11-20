const Config = {
    API_LOGA_USER: "http://192.168.15.11:8080/oauth/token",
    API_CRIA_USER: "http://192.168.15.11:8080/customers",
    API_PEGA_JOGOS:"http://192.168.15.11:8080/products",
    API_PEGA_JOGUINHO:"http://192.168.15.11:8080/products/",
    API_PEGA_FILTROS:"http://192.168.15.11:8080/categories",
    API_PEGA_DESENVOLVEDORES:"http://192.168.15.11:8080/developers",
    API_PEGA_DISTRIBUIDORAS:"http://192.168.15.11:8080/distributors",

    TIMEOUT_REQUEST: 5000,
    HEADER_REQUEST: {
        Accept:'application/x-www-form-urlencoded;charset=UTF-8',
        "Content-Type": "application/json"
    }
}
export default Config;