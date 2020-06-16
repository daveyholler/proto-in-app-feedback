import React from 'react';

import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiHeaderSectionItemButton,
} from '@elastic/eui';

export default ({ theme }: { theme: any }) => (
  <EuiHeader
    theme="dark"
    sections={[
      {
        items: [
          <EuiHeaderLogo
            iconType='logoEnterpriseSearch'
            href="/">
            Enterprise Search
          </EuiHeaderLogo>,
          <EuiHeaderLinks>
            <EuiHeaderLink isActive>Home</EuiHeaderLink>
            <EuiHeaderLink >Engines</EuiHeaderLink>
            <EuiHeaderLink >Settings</EuiHeaderLink>
          </EuiHeaderLinks>
        ]
      }
    ]}
  />
)
