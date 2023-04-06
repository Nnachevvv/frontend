import React, { useEffect } from 'react'

import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { Box, Button, Collapse, Container, Grid } from '@mui/material'

import { baseUrl } from 'common/routes'
import type { RegisterPageProps } from 'pages/register'
import Layout from 'components/client/layout/Layout'
import * as yup from 'yup'

import RegisterForm from './RegisterForm'
import RadioButtonGroup from 'components/common/form/RadioButtonGroup'
import theme from 'common/theme'
import { useField } from 'formik'

export default function RegisterPage({ providers }: RegisterPageProps) {
  const [profileField] = useField('providers')

  const profiles = [
    { value: 'personl', label: 'Personal' },
    { value: 'organisation', label: 'PayPal' },
  ]

  return (
    <Layout
      title={t('auth:cta.create-new-profile')}
      metaDescription={t('auth:cta.create-new-profile')}>
      <Container maxWidth="sm">
        <Box marginTop={theme.spacing(4)}>
          <RadioButtonGroup name="profile" columns={profiles.length} options={profiles} />
        </Box>
        <Collapse unmountOnExit in={profileField.value === 'personl'} timeout="auto">
          <RegisterForm />
        </Collapse>
        <Box mt={4}>
          <Grid container direction="column" spacing={1}>
            {providers &&
              Object.values(providers)
                .filter((p) => p.id !== 'credentials')
                .map((provider) => (
                  <Grid item key={provider.name}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => signIn(provider.id, { callbackUrl: baseUrl })}>
                      {t('nav.login-with')} {provider.name}
                    </Button>
                  </Grid>
                ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}
