import React, { useState } from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import ReactJson from 'react-json-view';

import { ContextualFeedback } from '../ContextualFeedback/ContextualFeedback';

const styles = {
  padding: '2rem'
}

export function Home() {
  const [ state, setComplete ] = useState({
    complete: false,
    responseOne: {},
    responseTwo: {}
  });

  const handleClick = () => {
    setComplete({...state, complete: true})
  }

  const handleFeedbackResponse = (response: any, questionNum: number) => {
    console.log(response);
    if (questionNum === 1) {
      setComplete({...state, responseOne: response})
    } else if (questionNum === 2) {
      setComplete({...state, responseTwo: response})
    }
  }

  return (
    <EuiFlexGroup style={styles}>
      <EuiFlexItem style={{border: '1px solid gray'}}>
        <div style={{padding: '2rem'}}>
          <EuiText>
            <h2>This is a workflow</h2>
            <p>Users can work through this workflow to complete it and when they do, we'll prompt them with a callout that asks for their feedback.</p>
          </EuiText>
          <EuiSpacer size="xl" />
          <EuiButton fill onClick={() => handleClick()}>Complete workflow</EuiButton>
        </div>
        <EuiSpacer size="l" />
        {
          state.complete ? (
            <ContextualFeedback
              question="Do you feel like you were able to build your curation successfully?"
              position='inline'
              feedbackType='boolean'
              desiredResponse={true}
              locationDescription='In that one spot'
              appName='app_search'
              sentiment="positive"
              handleResponseCallback={(response: any) => handleFeedbackResponse(response, 1)}
            />
          ) : null
        }
        {
          state.complete ? (
            <ContextualFeedback
              question="Was it difficult to setup a Minecraft server?"
              position='toast'
              feedbackType='boolean'
              desiredResponse={false}
              locationDescription='In that one spot'
              appName='app_search'
              sentiment="negative"
              handleResponseCallback={(response: any) => handleFeedbackResponse(response, 2)}
            />
          ) : null
        }
      </EuiFlexItem>
      <EuiFlexItem style={{minWidth: '300px'}}>
        <EuiTitle size="s"><h3>Response from Inline</h3></EuiTitle>
        <EuiSpacer size="m" />
        <ReactJson src={state.responseOne} />
      </EuiFlexItem>
      <EuiFlexItem style={{minWidth: '300px'}}>
        <EuiTitle size="s"><h3>Response from Toast</h3></EuiTitle>
        <EuiSpacer size="m" />
        <ReactJson src={state.responseTwo} />
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}
