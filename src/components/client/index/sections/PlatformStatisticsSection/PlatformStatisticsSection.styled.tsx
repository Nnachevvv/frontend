import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Root = styled('section')(() => ({
  backgroundColor: theme.palette.secondary.light,
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0),
  },
}))
