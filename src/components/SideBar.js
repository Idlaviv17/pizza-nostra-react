import { FaRegSave } from 'react-icons/fa'
import { MdCorporateFare } from 'react-icons/md'
import { BsFileEarmarkPerson } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  const navigate = useNavigate() // Used to change the current route 

  return (
    <div className='sidebar'>
      <div className='avatar placeholder justify-center mt-3 mb-3 mx-auto'>
        <div className='ring ring-primary bg-slate-100 text-neutral-content rounded-full w-16'>
          <span className='text-xl text-primary'>AG</span>
        </div>
      </div>
      <ul className='menu w-56 p-2 rounded-box bg-gray-50'>
        <li>
          <a onClick={() => navigate('/nrp')}> {/* Navigate to the NRP section */}
            <BsFileEarmarkPerson className='h-5 w-5' />
            Pagos
          </a>
          <a onClick={() => navigate('/sua')}> {/* Navigate to the SUA section */}
            <FaRegSave className='h-5 w-5' />
            Salarios
          </a>
        </li>
      </ul>
    </div>
  )
}

export default SideBar