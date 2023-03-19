// import React, { useState } from 'react';
// import '../App.css';
// import Card from 'react-bootstrap/Card';

// // function CardGenerator() {
// //     const min = 0;
// //     const max = 12;
// //   const [numCards, setNumCards] = useState(0);

// //   const handleNumCardsChange = (event) => {
// //     setNumCards(parseInt(event.target.value));
// //     const numCards = Math.max(min, Math.min(max, Number(event.target.value)));
// //     setNumCards(numCards);
// //   }

// //   const generateCards = () => {
// //     const cards = [];
// //     for (let i = 1; i <= numCards; i++) {
// //       cards.push(

// //         <Card key={i} style={{ width: '16rem'}} className='col bg-success text-white  '>
// //           <Card.Body className='card-body '>
// //             <Card.Title className='text-info'>This is Card {i}.</Card.Title>
// //           <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content</p>
// //             <button  className='btn btn-warning text-success'>Click</button>
// //           </Card.Body>
// //         </Card>

// //       );
// //     }
// //     return cards;
// //   }

// //   return (
// //     <div>
// //       <label>Enter a number:</label>
// //       <input id="numCardsInput" type="number" max={12} value={numCards} onChange={handleNumCardsChange} className="m-2 p-2" />
// //       <div className='row  m-1 ' >

// //       {numCards > 0 && generateCards()}
// //       </div>
// //     </div>
// //   );
// // }




// function CardGenerator() {

//     const min = 0;
//     const max = 12;
//     const [numCards, setNumCards] = useState(0);
  
//     const handleNumCardsChange = (event) => {
//     setNumCards(parseInt(event.target.value));
//     const numCards = Math.max(min, Math.min(max, Number(event.target.value)));
//     setNumCards(numCards);
//     }
  
//     const generateCards = () => {
//       const cardNumbers = Array.from({ length: numCards }, (_, i) => i + 1);
//       return cardNumbers.map((cardNumber) => (
//         <Card key={cardNumber} style={{ width: '16rem'}} className='col bg-success text-white  '>
//           <Card.Body>
//             This is card #{cardNumber}.
//           </Card.Body>
//         </Card>
//       ));
//     }
  
//     return (
//       <div>
//         <label htmlFor="numCardsInput">Enter a number:</label>
//         <input id="numCardsInput" type="number" max={12} value={numCards} onChange={handleNumCardsChange} />

//         <div className='row  m-1 ' >

//         {numCards > 0 && generateCards()}
//         </div>
//       </div>
//     );
//   }

// export default CardGenerator;
