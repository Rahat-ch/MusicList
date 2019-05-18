import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Template from './components/Template';

render(
  <Template headline="Testing some headline" count="1234" showcount />,
  document.querySelector('#react-app'),
);

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Component headline="Test Headline" count={123456} showcount />
    </AppContainer>,
    document.querySelector('#react-app'),
  );
};

renderApp(Template);

if (module && module.hot) {
  module.hot.accept('./components/Template', () => {
    renderApp(Template);
  });
}
