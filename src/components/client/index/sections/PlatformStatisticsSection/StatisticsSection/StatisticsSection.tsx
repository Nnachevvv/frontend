import React from 'react'
import { useTranslation } from 'next-i18next'
import { Divider, Grid } from '@mui/material'

import { fromMoney, numberWithSpacesBetween } from 'common/util/money'
import { getAllDonatedMoney } from 'common/hooks/vaults'
import { useCampaignDonationHistory, useCampaignList } from 'common/hooks/campaigns'
import { useDonatedUsersCount } from 'common/hooks/donation'
import { SubtitleSectionNumber, SubtitleSectionText } from './StatisticsSection.styled'

export default function StatisticsSection() {
  const { t } = useTranslation('index')
  const { data: campaigns } = useCampaignList()
  const { data: totalDonations } = useCampaignDonationHistory()
  const { data: donorsCount } = useDonatedUsersCount()
  const { data: donatedMoney } = getAllDonatedMoney()

  return (
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
  )
}
