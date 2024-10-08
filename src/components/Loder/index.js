import Loader from 'react-loader-spinner'

const Spinner = () => (
  <div className="loader-container" testid="loader">
    <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
  </div>
)

export default Spinner
