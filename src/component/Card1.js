import React, { useEffect, useState } from 'react';
import './Card.css';

function Card1() {
  const [cardData, setCardData] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const fetchCardData = () => {
    fetch('https://my-json-server.typicode.com/Codeinwp/front-end-internship-api/posts')
      .then((response) => response.json())
      .then((data) => {
        setCardData(data);
      });
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const toggleModal = (data) => {
    
    setSelectedCard(data);
    setModal(!modal); 
  };

  return (
    <div className="container">
      <div className="card-container">
        {cardData.map((data) => (
          <div
            className={`card ${hoveredCard === data.id ? 'hovered' : ''}`}
            key={data.id}
            onMouseEnter={() => handleMouseEnter(data.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-image-container">
              <img src={data.thumbnail.large} alt="CardImage" className="card-image" />
              {hoveredCard === data.id && (
                <button className="learn-more-button" onClick={() => toggleModal(data)}>
                  Learn More
                </button>
              )}
            </div>
            <h2 className="card-title">{data.title}</h2>
            <p className="card-content">{data.content}</p>
            <div className="card-footer">
              <span className="author-name">{data.author.name}</span>
              <span className="card-date">{new Date(data.date * 1000).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>


    

{modal && selectedCard && (
  <div>
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
      <div className="modal-mainimage-container">
              <img src={selectedCard.thumbnail.small} alt="CardImage" className="modal-mainimage" />
            </div>
        <h2>{selectedCard.title}</h2>
        <p className="modal-para">{selectedCard.content}</p>
        <div className="modal-footer">
              <span ><img src={selectedCard.author.avatar} alt="CardImage" className="modal-image" /></span>
              <span>{selectedCard.author.name}</span>
              <span > - {selectedCard.author.role}</span>
            </div>
        <button className="close-modal" onClick={toggleModal}>
          CLOSE
        </button>
      </div>
    </div>
  </div>
)}


        
    </div>



  );
}

export default Card1;

