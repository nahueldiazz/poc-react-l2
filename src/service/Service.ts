import axios from 'axios'

export default class Service  {
    async getIp() {
        const res = await axios.get('https://geolocation-db.com/json/')
        return res.data.IPv4
    }

    async getUserIp(ip: any){
        console.log('ipo', ip);
        
        const res = await axios.get(`https://dev-back-landing-ecommerce.test.telecom.com.ar/poc-redis/${ip}`)
        return res
    }
    
    async postUserIp(location: any, ip: any){
        const data = {
            ip: ip,
            geoId: location
        }
        const res = await axios.post('https://dev-back-landing-ecommerce.test.telecom.com.ar/poc-redis/create', data)
        return res 
    }
    async update(location: any, ip: any){
        const data = {
            geoId: location
        }
        const res = await axios.put(`https://dev-back-landing-ecommerce.test.telecom.com.ar/poc-redis/${ip}`, data)
        return res 
    }
}
