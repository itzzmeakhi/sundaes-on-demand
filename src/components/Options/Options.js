import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';

import ScoopOption from './../ScoopOption/ScoopOption';
import ToppingOption from '../ToppingOption/ToppingOption';
import AlertBanner from '../AlertBanner/AlertBanner';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        setError(true);
      });
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  if(error) {
    <AlertBanner />
  }

  return <Row>{optionItems}</Row>;
}

export default Options;