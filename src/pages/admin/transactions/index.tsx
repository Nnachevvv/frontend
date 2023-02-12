import BankImporsTable from 'components/auth/profile/BankImportTable'
import { securedAdminProps } from 'middleware/auth/securedProps'

export const getServerSideProps = securedAdminProps([
  'common',
  'auth',
  'validation',
  'transactions',
  'admin',
])

export default BankImporsTable
