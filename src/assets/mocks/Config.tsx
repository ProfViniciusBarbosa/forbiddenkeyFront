const Config = {
    API_LOGA_USER: "http://192.168.15.11:8080/oauth/token",
    API_CRIA_USER: "http://192.168.15.11:8080/customers",
    API_PEGA_JOGOS:"http://192.168.15.11:8080/products",
    API_PEGA_JOGUINHO:"http://192.168.15.11:8080/products/",
    TIMEOUT_REQUEST: 5000,
    HEADER_REQUEST: {
        Accept:'application/x-www-form-urlencoded;charset=UTF-8'
    }
}
export default Config;