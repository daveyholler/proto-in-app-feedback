import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';

import {
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '@elastic/eui';

type Position = 'inline' | 'toast';
type FeedbackType = 'boolean' | 'rating';
type DesiredResponse = boolean | string;
type Sentiment = 'positive' | 'negative';

export type ContextualFeedbackProps = {
  question: string;
  feedbackType: FeedbackType,
  position: Position,
  desiredResponse: DesiredResponse,
  sentiment?: Sentiment,
  locationDescription: string,
  appName: string,
  className?: string,
  comment?: string,
  handleResponseCallback: Function
}

const positionToClassName : { [position in Position]: string} = {
  inline: 'euiContextualFeedback__inline',
  toast: 'euiContextualFeedback__toast'
}

export const ContextualFeedback: FunctionComponent<ContextualFeedbackProps> = ({
  question,
  feedbackType = 'boolean',
  position = 'inline',
  desiredResponse,
  sentiment = 'positive',
  locationDescription,
  appName,
  className,
  handleResponseCallback,
}) => {

  const [ state, setState ] = useState({
    submitted: false,
    dismissed: false,
  });

  const handleSubmission = (response: any) => {
    setState({...state, submitted: true})
    const submission = {
      question,
      satisfactory: desiredResponse === response,
      response,
      desiredResponse,
      locationDescription,
      appName,
      sentiment,
    }
    handleResponseCallback(submission);
  }

  const handleDismiss = () => {
    setState({...state, dismissed: true})
  }

  const classes = classNames(
    'euiContextualFeedback',
    positionToClassName[position],
    className
  )

  let buttons;
  if (feedbackType === 'boolean') {
    buttons = (
      <EuiFlexGroup justifyContent="flexEnd" gutterSize="xs">
        <EuiFlexItem grow={false}>
          <EuiButton
            onClick={() => handleSubmission(false)}
            size="s"
            color="danger">
            No
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton
            onClick={() => handleSubmission(true)}
            size="s">
            Yes
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    )
  } else {
    buttons = <EuiButton fill>Submit</EuiButton>
  }

  const dismissButton = (
    <EuiFlexItem grow={false}>
      <EuiButtonIcon onClick={handleDismiss} color="subdued" iconType="cross" />
    </EuiFlexItem>
  )

  if (!state.dismissed) {
    return (
      <div className={classes}>
        <EuiText size="s">
          {
            !state.submitted ? (
              <React.Fragment>
                <EuiFlexGroup>
                  <EuiFlexItem><h4>{question}</h4></EuiFlexItem>
                  {dismissButton}
                </EuiFlexGroup>
                {buttons}
              </React.Fragment>
            ) : (
              <EuiFlexGroup>
                <EuiFlexItem><h4>Thank you for your feedback!</h4></EuiFlexItem>
                {dismissButton}
              </EuiFlexGroup>
            )
          }
        </EuiText>
      </div>
    )
  } else {
    return <React.Fragment></React.Fragment>
  }
}
