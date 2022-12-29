import { useState, useEffect } from 'react';

function Decrypt({current}) {
  const [privKey, setPrivKey] = useState("");
  const [cipher, setCipher] = useState("");
  const [msg, setMsg] = useState("");
  let uri = "http://127.0.0.1:8000/"+ current +"/decrypt"

  async function decrypt(cipher, privKey){
      var body = {
        "message": cipher,
        "private_key": privKey,
      }
      const response = await fetch(uri,{
            method: "POST",
            mode: 'cors',
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json; charset=iso-8859-1',
            },
            body: JSON.stringify(body),
      })
      .then(response => response.json())
      .then(data => {
        setMsg(data.plaintext)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  console.log(current)
  return (
    
    <div className="decrypt">
        <div className='btn' type="submit" onClick={() => decrypt(cipher, privKey)}>
          <span>Decrypt</span>
        </div>
        <div className="custom-input">
          <label>Private Key</label>
          <input type="text" value={privKey} onChange={(e) => setPrivKey(e.target.value)}></input>
        </div>
        <div className="custom-input">
          <label>Cipher Text</label>
          <textarea type="text" className="txtarea" rows ="3"  value={cipher} onChange={(e) => setCipher(e.target.value)}></textarea>
        </div>
        <div className='btn bttn submit' type="submit" onClick={() => decrypt(cipher, privKey)}>
          <span>Decrypt</span>
        </div>
        <div className="custom-input">
          <label>Decrypt Result</label>
          <textarea className="txtarea" rows ="3" type="text" readOnly value={msg} ></textarea>
        </div>
    </div>
  );
  }
  
  export default Decrypt;
  