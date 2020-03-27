import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
// import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api';

export default function NewIncident(){
  const ongId = localStorage.getItem('ongId');
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [value,setValue] = useState('');
  const history = useHistory();

  if(!ongId) history.push('/');

  async function handleNewIncident(e){
    e.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try{

      await api.post('incidents',data,{
        headers:{
          Authorization: ongId
        }
      });
      history.push('/profile');
    }catch(e){
      console.log(e);
      alert('Erro ao cadastrar caso')
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Heroe"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolvê-lo</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Título do caso"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
          />
          <input 
            placeholder="Valor em reais"
            value={value}
            onChange={(e)=> setValue(e.target.value)}
          />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}