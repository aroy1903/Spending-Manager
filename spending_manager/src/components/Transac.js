import React from 'react';
import axios from 'axios';

export default function Transac(props) {
  const baseUrl = 'http://localhost:5000/transactions';

  const getTransactions = async () => {
    try {
      const allTransac = await axios(baseUrl);
      console.log(allTransac);
      props.setDatas(allTransac);
      console.log(allTransac);
    } catch (err) {
      alert(err);
    }
  };

  const del = async (id) => {
    await axios
      .delete(baseUrl + '/delete/' + id)
      .catch((err) => console.error(err));
    getTransactions();
  };

  return (
    <div className="transac">
      <h4>Description: {props.arr.description}</h4>
      <h4> Amount: ${props.arr.amount}</h4>
      <h4> Date: {props.arr.date}</h4>
      <button
        onClick={() => {
          del(props.arr._id);
        }}
      >
        Delete
      </button>
    </div>
  );
}
