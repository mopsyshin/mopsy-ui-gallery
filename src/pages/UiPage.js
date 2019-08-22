import React from 'react';
import './Pages.scss';
import config from 'components/ui.config';
import Toast from 'components/toast/Toast';

const UiPage = props => {

  const camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '').replace('-', '');
  }

  const UiName = config[camelize(props.match.params.name)].comp

  return (
    <div>
      <UiName/>
      <Toast/>
    </div>
  )
}

export default UiPage;