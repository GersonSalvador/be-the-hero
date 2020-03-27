import React, {useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {FiPower, FiTrash2} from 'react-icons/fi'
import api from "../../services/api";

export default function Profile(){
  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();
  
  if(!ongId) history.push('/');

  useEffect(()=>{
    api.get('profile',{
      headers:{
        Authorization: ongId
      }
    }).then(response=>{
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handlerDeleteIncidents(id){
    try{
      await api.delete(`incidents/${id}`,{
        headers:{
          Authorization: ongId
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id))
    }catch(e){
      console.log(e);
      alert('Falha ao remover caso')
    }
  }

  function handleLogout(){
    localStorage.clear();
    history.push('/')
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Heroe"/>
        <span>Bem vinda, APAD</span>
        <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
        <button onClick={handleLogout}>
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>
      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident =>(
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR</strong>
            <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incident.value)}</p>

            <button type="button" onClick={()=> handlerDeleteIncidents(incident.id)}>
              <FiTrash2 size={20} color="#a8a8a8"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}