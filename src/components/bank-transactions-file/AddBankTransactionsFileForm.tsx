import * as yup from 'yup'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Button, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import FileUpload from 'components/file-upload/FileUpload'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import {
  BankTransactionsFileType,
  FileType,
  UploadBankTransactionsFiles,
} from 'components/bank-transactions-file/types'
import { useUploadBankTransactionsFiles } from 'service/donation'
import BankTransactionsFileList from 'components/file-upload/BankTransactionsFileList'
import { BankImportStatus, BankTransactionsFileFormData } from 'gql/donations'

const validationSchema: yup.SchemaOf<BankTransactionsFileFormData> = yup.object().defined().shape({
  bankTransactionsFileId: yup.string().required(),
})

const defaults: BankTransactionsFileFormData = {
  bankTransactionsFileId: '',
}

export type BankTransactionsFileFormProps = { initialValues?: BankTransactionsFileFormData }

export default function BankTransactionsFileForm({
  initialValues = defaults,
}: BankTransactionsFileFormProps) {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [types, setTypes] = useState<FileType[]>([])
  const { t } = useTranslation()

  const fileUploadMutation = useMutation<
    AxiosResponse<string>,
    AxiosError<ApiErrors>,
    UploadBankTransactionsFiles
  >({
    mutationFn: useUploadBankTransactionsFiles(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: BankTransactionsFileFormData,
    { setFieldError }: FormikHelpers<BankTransactionsFileFormData>,
  ) => {
    try {
      const response = await fileUploadMutation.mutateAsync({
        files,
        types,
        bankTransactionsFileId: values.bankTransactionsFileId,
      })
      console.log('00000000000')
      console.log(response.data)
      console.log('00000000000')
      router.push({ pathname: routes.admin.transactions.index, query: response.data })
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }

  return (
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography
          variant="h5"
          component="h2"
          sx={(theme) => ({
            mb: 5,
            color: theme.palette.primary.dark,
            textAlign: 'center',
          })}>
          {t('transactions:form-heading-bank-transactions-file')}
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label={t('transactions:bankTransactionsFileId')}
              name="bankTransactionsFileId"
              autoComplete="bankTransactionsFileId"
            />
          </Grid>
          <Grid item xs={12}>
            <FileUpload
              onUpload={(newFiles) => {
                setFiles((prevFiles) => [...prevFiles, ...newFiles])
                setTypes((prevTypes) => [
                  ...prevTypes,
                  ...newFiles.map((file) => ({
                    file: file.name,
                    type: BankTransactionsFileType.xml,
                  })),
                ])
              }}
              buttonLabel={t('transactions:addFiles')}
            />
            <BankTransactionsFileList
              filesType={types}
              files={files}
              onDelete={(deletedFile) =>
                setFiles((prevFiles) => prevFiles.filter((file) => file.name !== deletedFile.name))
              }
              onSetFileType={(file, type) => {
                setTypes((prevTypes) => [
                  ...prevTypes.filter((f) => f.file !== file.name),
                  { file: file.name, type },
                ])
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton
              fullWidth
              label="transactions:cta.submit"
              loading={fileUploadMutation.isLoading}
            />
          </Grid>
          <Link href={routes.admin.donations.index} passHref>
            <Button fullWidth={true}>{t('transactions:cta:cancel')}</Button>
          </Link>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
