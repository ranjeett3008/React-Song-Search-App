import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SongsComponent.css';
import axios from 'axios';
import Highlighter from "react-highlight-words";
import Loader from "react-loader-spinner";

const SongsComponent = () => {

  const [songList, setSongsList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoad, setLoader] = useState(false);

  // Searches songs
  const searchSong = async () => {
   
    setLoader(true);
    setSongsList([]);
    let url = 'https://www.songsterr.com/a/ra/songs.json?pattern='+searchText;
    // Api call
    await axios.get(url).then(res => {  
      setSongsList(res.data);
      setLoader(false);
    }).catch(err => {
      console.log(err);
    })
    ;
  }

  // Sets search text value
  const searchTextValue = (evt) => {
    setSearchText(evt.target.value);
  }

  return (
  <div className="SongsComponent" data-testid="SongsComponent">
    <h3>Songs App</h3>
    <div className="container">
   
      <div className="row centeredItems">
        <div className="col-md-4">
          <div className="form-group">
            <input type="text" className="form-control"  onKeyUp={(e) => searchTextValue(e)} placeholder="Search here" name="email"/>
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={searchSong}>Submit</button>
          </div>
        </div>
        
      </div>
     {isLoad &&
      <Loader
      type="Puff"
      color="#00BFFF"
      height={80}
      width={100}
     
    />
     
     } 
      <div className="row centeredItems">
      <ul className="list-group col-md-6">
        {
          
          songList.map((v) =>{
            let textString = `${v.id}Title: ${v.title}, Artist: ${v.artist.name}`
            // textString= textString.replace(searchText, '<span style="color:Yellow">searchText</span>')
            return <li className="list-group-item" key={v.id}>
             <Highlighter
              highlightClassName="highlight"
              searchWords={[searchText]}
              autoEscape={true}
              textToHighlight={textString}
            />
            
            </li>
          }
 
            )
        }
       </ul>
      </div>
      
    </div>
     
  </div>
  )
  
  
}

SongsComponent.propTypes = {};

SongsComponent.defaultProps = {};

export default SongsComponent;
