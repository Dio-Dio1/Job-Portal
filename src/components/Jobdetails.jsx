import {useParams} from 'react-router-dom'
import jobs from '../data/jobs';

const Jobdetails = () => {
    const {id} = useParams()
    const job = jobs.find((j)=> j.id === Number(id))
    if(!job) return <p>Job not found.</p>
  return (
    <div>
        <h1>You're viewing job no. {id}</h1>
    </div>
  )
}

export default Jobdetails