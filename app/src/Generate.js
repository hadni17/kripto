import { useState, useEffect } from 'react';

function Generate({current}) {
  const [pubKey, setpubKey] = useState("");
  const [privKey, setprivKey] = useState("");
  let uri = "http://127.0.0.1:8000/"+ current +"/generate-key"
  useEffect(() => {
    let mounted = true
    return () =>    { mounted = false  }
  }, [pubKey, privKey])
  async function generate(){
      const response = await fetch(uri,{
          method: "POST",
          mode: 'cors',
          headers: {
              'accept': 'application/json'
            },
      })
      .then(response => response.json())
      .then(data => {
        setpubKey(data.keys.public)
        setprivKey(data.keys.private)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <div className="generate">
        <div className='btn' type="submit" id="delimiter" >
          <span>Public and Private Key Generator</span>
        </div>
        <div className='btn bttn submit' type="submit" onClick={() => generate()}>
          <span>Generate</span>
        </div>
        <div className="custom-input">
          <label>Public Key</label>
          <input type="text"  value={pubKey}></input>
        </div>
        <div className="custom-input">
          <label>Private Key</label>
          <input type="text" readOnly value={privKey}></input>
        </div>
    </div>
  );
  }
  
  export default Generate;
  