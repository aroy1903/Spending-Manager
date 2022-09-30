import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Transac from './components/Transac';

const App = () => {
  const [transactions, setData] = useState([]);

  const [newTransac, setTransac] = useState({
    description: '',
    amount: '',
  });

  const [popup, setPopup] = useState(false);

  const [amount, setAmount] = useState(0);

  let temp = 0;
  const baseUrl = 'http://localhost:5000/transactions';

  const getTotal = (x) => {
    x.forEach((e) => {
      temp += e.amount;
    });

    return setAmount(temp);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    transactions.data && getTotal(transactions.data);
  });

  const getTransactions = async () => {
    try {
      const allTransac = await axios(baseUrl);

      setData(allTransac);
    } catch {
      alert('Failed to fetch transactions');
    }
  };

  const addT = () => {
    setPopup(true);
  };

  const newT = async () => {
    await axios
      .post(baseUrl + '/new', {
        text: newTransac.description,
        num: parseInt(newTransac.amount),
      })
      .catch((err) => console.error(err));
    await getTransactions();
  };

  const hangleChange = (e) => {
    const { name, value } = e.target;
    setTransac({ ...newTransac, [name]: value });
  };

  return (
    <div className="App">
      <h1 id="mainHeader">Budget Manager</h1>

      <div id="mainCont">
        <h3>Total Spent: ${amount}</h3>
        <div id="childCont">
          {transactions.data &&
            transactions.data.map((trn) => {
              return <Transac key={trn._id} arr={trn} setDatas={setData} />;
            })}
          <button
            onClick={() => {
              addT();
              setTransac({
                description: '',
                amount: '',
              });
            }}
          >
            Add a Transaction
          </button>
        </div>

        {popup ? (
          <div className="popup">
            <button
              onClick={() => {
                setPopup(false);
                setTransac({
                  description: '',
                  amount: '',
                });
              }}
            >
              X
            </button>
            <h1>Add a Transaction</h1>
            <div className="inputCont">
              <label>Description:</label>
              <input
                type="text"
                placeholder="Enter a description"
                value={newTransac.description}
                onChange={hangleChange}
                name="description"
              />
            </div>
            <div className="inputCont">
              <label>Amount:</label>
              <input
                type="text"
                placeholder="Enter the amount"
                value={newTransac.amount}
                name="amount"
                onChange={hangleChange}
              />
            </div>
            <button
              id="addButt"
              onClick={async () => {
                console.log(`${newTransac.amount} + ${newTransac.description}`);
                newT();
                setPopup(false);
              }}
            >
              Add
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
