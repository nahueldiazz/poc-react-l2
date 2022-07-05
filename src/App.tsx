import React, { useEffect, useState } from "react";
import "./App.css";
import { Location } from "./utils/locations";
import Service  from "./service/Service";

function App() {
  const initialLocation = Location[0]
  const service = new Service()
  const [location, setLocation] = useState<any>({})
  const [ip, setIp] = useState('')

  const handleChangeLocation = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(JSON.parse(event.target.value))
  }

  const getGeo = async () => {
    const ipRes = await service.getIp()
    setIp(ipRes)
    console.log('mi IP', ipRes);
    const res = await service.getUserIp(ipRes)
    console.log('res getIp', res);
    
    if (res.data.status >= 400) {
      const post = await service.postUserIp(location, ipRes)
      setLocation(initialLocation)
      console.log('post', post);
    }else{
      console.log('false', res.data.geoId);
      
      setLocation(res.data.geoId)
    }
  }

  const handleChange = async () => {
    const update = await service.update(location,ip)
    console.log('update', update);
  }

  useEffect(() => {
      getGeo()
  }, [])

  return (
    <div className="App">
      <div className="App-header">
        <h4>tu ip es : {ip}</h4>
        <h1>Landing 2</h1>
        <div className="body-form">
          <select className="select" onChange={handleChangeLocation}>
          <option value=''></option>
              {Location.map((loc, index) => (
                <option key={index} value={JSON.stringify(loc)}>
                  {loc.province.toString()} - {loc.locality}
                </option>
              ))}
            </select>
 
          <button className="button-loc" onClick={handleChange}>Cambiar Localidad</button>
          <div className='result-loc'>
              <h3>tu localidad es:</h3>
          <p>pais: {location.country}</p>
          <p>provincia: {location.province}</p>
          <p>departamento: {location.department}</p>
          <p>localidad: {location.locality}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
