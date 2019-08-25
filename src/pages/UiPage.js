import React from 'react';
import './Pages.scss';
import config from 'components/ui.config';
import Toast from 'components/toast/Toast';
import TransitionWrapper from 'components/transition-wrapper/TransitionWrapper';

const UiPage = props => {
  const camelize = (str) => {
    const result = str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '').replace(/-/g, '');
    return result;
  }

  const Component = config[camelize(props.match.params.name)]

  return (
    <div className="ui-container">
      <TransitionWrapper title={Component.name} location={props.location}>
        <Component.comp />
        <Toast/>
      </TransitionWrapper>
    </div>
  )
}

export default UiPage;