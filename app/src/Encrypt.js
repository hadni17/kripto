import { useState, useEffect } from 'react';

function Encrypt({current}) {
  const [pubKey, setPubKey] = useState("");
  const [msg, setMsg] = useState("");
  const [cipher, setCipher] = useState("");
  let uri = "http://127.0.0.1:8000/"+ current +"/encrypt"


  async function encrypt(msg, pubKey){
      var body = {
        "message": msg,
        "public_key": pubKey,
      }
      const response = await fetch(uri,{
            method: "POST",
            mode: 'cors',
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
      })
      .then(response => response.json())
      .then(data => {
        setCipher(data.ciphertext)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <div className="encrypt">
      <div className='btn' type="submit" >
        <span>Encrypt</span>
      </div>
        <div className="custom-input">
          <label>Public Key</label>
          <input type="text" className="txtarea" value={pubKey} onChange={(e) => setPubKey(e.target.value)}></input>
        </div>
        <div className="custom-input">
          <label>Message</label>
          <textarea type="text" className="txtarea" rows ="2" value={msg} onChange={(e) => setMsg(e.target.value)}></textarea>
        </div>
        <div className='btn bttn submit' type="submit" onClick={() => encrypt(msg, pubKey)}>
          <span>Encrypt</span>
        </div>
        <div className="custom-input">
          <label>Cipher Text</label>
          <textarea type="text" className="txtarea" rows ="3" readOnly value={cipher} ></textarea>
        </div>
    </div>
  );
  }
  
  export default Encrypt;
  