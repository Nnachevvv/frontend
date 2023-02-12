import AddBankTransactionsFile from 'components/bank-transactions-file/AddBankTransactionsFile'
import { securedAdminProps } from 'middleware/auth/securedProps'

export const getServerSideProps = securedAdminProps([
  'common',
  'auth',
  'validation',
  'transactions',
  'admin',
])

export default AddBankTransactionsFile
