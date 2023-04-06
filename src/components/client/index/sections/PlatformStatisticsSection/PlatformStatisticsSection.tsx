import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import ArrowForwardSharp from '@mui/icons-material/ArrowForwardSharp'
import { Box, Divider, Grid, Paper, TextField, Typography } from '@mui/material'

import { routes } from 'common/routes'

import { Root } from './PlatformStatisticsSection.styled'
import { DonateButton } from '../Jumbotron/Jumbotron.styled'
import { moneyWithThousandSeperator } from 'common/util/money'
import { getAllDonatedMoney } from 'common/hooks/vaults'
import { useCampaignDonationHistory, useCampaignList } from 'common/hooks/campaigns'
import { useContributorsCount } from 'common/hooks/statistics'

export default function PlatformStatisticsSection() {
  const { t } = useTranslation('index')
  const { data: donatedMoney } = getAllDonatedMoney()
  const { data: numberContributorsFrontEnd } = useContributorsCount()
  const { data: totalDonations } = useCampaignDonationHistory()
  const { data: campaigns } = useCampaignList()
  return (
    <Root>
      <Grid container direction="row" spacing={2} justifyContent="center">
        <Grid
          item
          xs={10}
          sx={(theme) => ({
            display: 'flex',
            [theme.breakpoints.down('md')]: {
              flexWrap: 'wrap',
            },
          })}>
          <Grid item xs={10} md={6} pl={1} textAlign="left">
            <Typography
              variant="h5"
              sx={(theme) => ({
                display: 'inline-block',
                color: theme.palette.primary.dark,
              })}>
              {t('platform-statistics.heading')}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={(theme) => ({
                display: 'inline-block',
                color: theme.palette.primary.dark,
                fontSize: theme.typography.pxToRem(16),
                lineHeight: theme.spacing(3),
              })}>
              {t('platform-statistics.text')}
            </Typography>
            <DonateButton
              href={routes.campaigns.index}
              variant="contained"
              endIcon={<ArrowForwardSharp />}>
              {t('platform-statistics.donate-to-those-in-need')}
            </DonateButton>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              display="inline"
              variant="subtitle1"
              sx={(theme) => ({
                fontSize: theme.typography.pxToRem(40),
                color: theme.palette.primary.light,
                fontWeight: 'bold',
              })}>
              {moneyWithThousandSeperator(campaigns?.length ?? 0)}+
            </Typography>
            <Typography
              display="inline"
              variant="subtitle1"
              sx={() => ({
                textAlign: 'left',
              })}>
              {t('platform-statistics.campaigns')}
            </Typography>
            <Divider />
            <Typography
              display="inline"
              variant="subtitle1"
              sx={(theme) => ({
                fontSize: theme.typography.pxToRem(40),
                textAlign: 'left',
                color: theme.palette.primary.light,
                fontWeight: 'bold',
              })}>
              <>{moneyWithThousandSeperator(totalDonations?.total ?? 0)}</>+
            </Typography>
            <Typography
              display="inline"
              variant="subtitle1"
              sx={() => ({
                textAlign: 'left',
                ml: 1,
              })}>
              {t('platform-statistics.donations')}
            </Typography>
            <Divider />
            <Typography
              display="inline"
              variant="subtitle1"
              sx={(theme) => ({
                fontSize: theme.typography.pxToRem(40),
                textAlign: 'left',
                color: theme.palette.primary.light,
                fontWeight: 'bold',
              })}>
              <>{moneyWithThousandSeperator(numberContributorsFrontEnd ?? 0)}</>+
            </Typography>
            <Typography
              display="inline"
              variant="subtitle1"
              sx={() => ({
                textAlign: 'left',
                ml: 1,
              })}>
              {t('platform-statistics.active-contributors')}
            </Typography>
            <Divider />
            <Typography
              display="inline"
              variant="subtitle1"
              sx={(theme) => ({
                fontSize: theme.typography.pxToRem(40),
                textAlign: 'left',
                color: theme.palette.primary.light,
                fontWeight: 'bold',
              })}>
              <>{moneyWithThousandSeperator(donatedMoney ?? 0)}</>+
            </Typography>
            <Typography
              display="inline"
              variant="subtitle1"
              sx={() => ({
                textAlign: 'left',
                ml: 1,
              })}>
              {t('platform-statistics.donated-leva')}
            </Typography>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
    </Root>
  )
}

/*


    <Grid
        item
        xs={2}
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'center',
          [theme.breakpoints.down('md')]: {
            flexWrap: 'wrap',
          },
        })}>
        <Grid maxWidth="md" pl={1} textAlign="left">
          <Typography
            variant="h5"
            sx={(theme) => ({
              display: 'inline-block',
              color: theme.palette.primary.dark,
            })}>
            Какво постигнахме досега?
          </Typography>
          <Typography
            variant="subtitle1"
            sx={(theme) => ({
              display: 'inline-block',
              color: theme.palette.primary.dark,
              fontSize: theme.typography.pxToRem(16),
              lineHeight: theme.spacing(3),
            })}>
            Проучваме обстойно всяка една кампания преди тя да стане активна на нашата платформа,
            изплащаме до последния лев събраните средрства без да удържаме и стотинка за нашия труд.
            Вярваме, че така пелеим вашето доверие и това ще направи дарителството в България една
            истинска прозрачна инициатива.
          </Typography>
          <DonateButton
            href={routes.campaigns.index}
            variant="contained"
            endIcon={<ArrowForwardSharp />}>
            {'Помогнете на нуждаещите се'}
          </DonateButton>
        </Grid>
        <Grid maxWidth="md">
          <Typography
            display="inline"
            variant="subtitle1"
            sx={(theme) => ({
              fontSize: theme.typography.pxToRem(46),
              color: theme.palette.primary.light,
              fontWeight: 'bold',
            })}>
            {moneyWithThousandSeperator(campaigns?.length ?? 0)}+
          </Typography>
          <Typography
            display="inline"
            variant="subtitle1"
            sx={() => ({
              textAlign: 'left',
            })}>
            кампании
          </Typography>
          <Divider />
          <Typography
            display="inline"
            variant="subtitle1"
            sx={(theme) => ({
              fontSize: theme.typography.pxToRem(46),
              textAlign: 'left',
              color: theme.palette.primary.light,
              fontWeight: 'bold',
            })}>
            <>{moneyWithThousandSeperator(totalDonations?.total ?? 0)}</>+
          </Typography>
          <Typography
            display="inline"
            variant="subtitle1"
            sx={() => ({
              textAlign: 'left',
              ml: 1,
            })}>
            дарения
          </Typography>
          <Divider />
          <Typography
            display="inline"
            variant="subtitle1"
            sx={(theme) => ({
              fontSize: theme.typography.pxToRem(46),
              textAlign: 'left',
              color: theme.palette.primary.light,
              fontWeight: 'bold',
            })}>
            70+
          </Typography>
          <Typography
            display="inline"
            variant="subtitle1"
            sx={() => ({
              textAlign: 'left',
              ml: 1,
            })}>
            активни доброволци
          </Typography>
          <Divider />
          <Typography
            display="inline"
            variant="subtitle1"
            sx={(theme) => ({
              fontSize: theme.typography.pxToRem(46),
              textAlign: 'left',
              color: theme.palette.primary.light,
              fontWeight: 'bold',
            })}>
            <>{moneyWithThousandSeperator(donatedMoney ?? 0)}</>+
          </Typography>
          <Typography
            display="inline"
            variant="subtitle1"
            sx={() => ({
              textAlign: 'left',
              ml: 1,
            })}>
            дарени лева
          </Typography>
          <Divider />
        </Grid>
      </Grid>

      */
