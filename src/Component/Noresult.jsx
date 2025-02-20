// No Results Found Component
const NoResultsFound = () => {
  return (
   <div style={{backgroundColor:'#fff', height:'70vh'}}>
     <div style={{ transform: 'translateY(50%)' }}>
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <img src={require('../Photos/notfind.png')} alt=''></img>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Result Not Found</h3>
        </div>
        <div>
          <p className="text-gray-500">Whoops... No matching data found</p>
        </div>
      </div>
    </div>
   </div>
  )
}
export default NoResultsFound;