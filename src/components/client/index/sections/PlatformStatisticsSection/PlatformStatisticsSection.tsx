import React from 'react'
import { useTranslation } from 'next-i18next'
import ArrowForwardSharp from '@mui/icons-material/ArrowForwardSharp'
import { Divider, Grid } from '@mui/material'

import { routes } from 'common/routes'

import {
  DonateButton,
  Heading,
  Root,
  Subtitle,
  SubtitleSectionNumber,
  SubtitleSectionText,
} from './PlatformStatisticsSection.styled'
import { fromMoney, numberWithSpacesBetween } from 'common/util/money'
import { getAllDonatedMoney } from 'common/hooks/vaults'
import { useCampaignDonationHistory, useCampaignList } from 'common/hooks/campaigns'
import { useDonorsCount } from 'common/hooks/donation'

export default function PlatformStatisticsSection() {
  const { t } = useTranslation('index')
  const { data: campaigns } = useCampaignList()
  const { data: totalDonations } = useCampaignDonationHistory()
  const { data: donorsCount } = useDonorsCount()
  const { data: donatedMoney } = getAllDonatedMoney()

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
            <Heading variant="h5">{t('platform-statistics.heading')}</Heading>
            <Subtitle variant="subtitle1">{t('platform-statistics.text')}</Subtitle>
            <DonateButton
              href={routes.campaigns.index}
              variant="contained"
              endIcon={<ArrowForwardSharp />}>
              {t('platform-statistics.donate-to-those-in-need')}
            </DonateButton>
          </Grid>
          <Grid item xs={12} md={4}>
            <SubtitleSectionNumber variant="subtitle1">
              {numberWithSpacesBetween(campaigns?.length)}+
            </SubtitleSectionNumber>
            <SubtitleSectionText variant="subtitle1">
              {t('platform-statistics.campaigns')}
            </SubtitleSectionText>
            <Divider />
            <SubtitleSectionNumber variant="subtitle1">
              <>{numberWithSpacesBetween(totalDonations?.total)}</>+
            </SubtitleSectionNumber>
            <SubtitleSectionText variant="subtitle1">
              {t('platform-statistics.donations')}
            </SubtitleSectionText>
            <Divider />
            <SubtitleSectionNumber variant="subtitle1">
              <>{numberWithSpacesBetween(donorsCount?.count)}</>+
            </SubtitleSectionNumber>
            <SubtitleSectionText variant="subtitle1">
              {t('platform-statistics.active-contributors')}
            </SubtitleSectionText>
            <Divider />
            <SubtitleSectionNumber variant="subtitle1">
              <>{numberWithSpacesBetween(fromMoney(donatedMoney?.money ?? 0))}</>+
            </SubtitleSectionNumber>
            <SubtitleSectionText variant="subtitle1">
              {t('platform-statistics.donated-leva')}
            </SubtitleSectionText>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
    </Root>
  )
}
