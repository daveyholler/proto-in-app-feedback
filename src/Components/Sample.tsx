import React from 'react';

import { EuiText } from '@elastic/eui';

const styles = {
  padding: '4rem'
}

export function Sample() {
  return (
    <div style={styles}>
      <EuiText>
        <h1>This is a sample component.</h1>
        <p>
          You can replace this component with anything you'd like.
        </p>
      </EuiText>
    </div>
  )
}
