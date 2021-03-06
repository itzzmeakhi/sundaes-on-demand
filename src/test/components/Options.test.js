import { render, screen } from '@testing-library/react';

import Options from '../../components/Options/Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType={"scoops"}/>);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map(elem => elem.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Displays image for each toppings option from server', async () => {
  render(<Options optionType="toppings" />);

  const images = await screen.findAllByRole('img', { name: /topping$/i });
  expect(images).toHaveLength(3);

  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});