import React, { useEffect, useState } from 'react'
import './Register.css'
import Select from 'react-select';
import { addVehicleApi } from '../Service/allAPI';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [vehicleDetails,setVehicleDetails]=useState({
        name:"",
        model:"",
        number:"",
        year:"",
        type:"",
        items:[],
        issues:[],
        photos:"",
        date:new Date().toLocaleDateString(),
        time:new Date().toLocaleTimeString()
    })

    const [selectedIssueValues, setSelectedIssueValues] = useState([]);
    const [preview,setPreview]=useState("")
    const [isNameValid,setIsnameValid]=useState(true)
    const [isModelValid,setIsModelValid]=useState(true)
    const [isNumberValid,setIsnumberValid]=useState(true)


    const navigate=useNavigate()
    
    const handleSelectChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        setVehicleDetails({...vehicleDetails,issues:selectedValues});
      };


    const workOptions = [
        { value: 'Engine failure', label: 'Engine failure' },
        { value: 'Engine oil', label: 'Engine oil' },
        { value: 'Tyre change', label: 'Tyre change' },
        { value: 'Scratch and bent', label: 'Scratch and bent' },
        { value: 'Full service', label: 'Full service' },
        { value: 'Water service', label: 'Water service' },
        { value: 'Others', label: 'Others ' }
      ]

      const handleChange=(e)=>{
        const {value,name}=e.target
        if(name=="name"){
          if(!!value.match(/^[a-zA-Z0-9 ]+$/)){
            setVehicleDetails({...vehicleDetails,name:value})
            setIsnameValid(true)
          }
          else{
            setVehicleDetails({...vehicleDetails,name:value})
            setIsnameValid(false)
          }
        }
        else if(name=="model"){
          if(!!value.match(/^[a-zA-Z0-9- ]+$/)){
            setVehicleDetails({...vehicleDetails,model:value})
            setIsModelValid(true)
          }
          else{
            setVehicleDetails({...vehicleDetails,model:value})
            setIsModelValid(false)
          }
        }
        else if(name=="number"){
          if(!!value.match(/^[a-zA-Z0-9- ]+$/)){
            setVehicleDetails({...vehicleDetails,number:value})
            setIsnumberValid(true)
          }
          else{
            setVehicleDetails({...vehicleDetails,number:value})
            setIsnumberValid(false)
          }
        }
        else if(name=="year"){
            setVehicleDetails({...vehicleDetails,year:value})
        }
        else if(name=="car"){
            setVehicleDetails({...vehicleDetails,type:value})
        }
        else if(name=="bike"){
            setVehicleDetails({...vehicleDetails,type:value})
        }
        else if(name=="key"){
            if (vehicleDetails.items.includes(value)) {
                setVehicleDetails({...vehicleDetails,items:vehicleDetails.items.filter(item => item !== value)});
              } else {
                setVehicleDetails({...vehicleDetails,items:[...vehicleDetails.items,value]});
              }
        }
        else if(name=="issues"){
            if (vehicleDetails.issues.includes(value)) {
                setVehicleDetails({...vehicleDetails,issues:vehicleDetails.issues.filter(item => item !== value)});
              } else {
                setVehicleDetails({...vehicleDetails,issues:[...vehicleDetails.issues,value]});
              }
        }
        else if(name=="photos"){
          setVehicleDetails({...vehicleDetails,photos:e.target.files[0]})
        }
        
      }
      useEffect(()=>{
        if(vehicleDetails.photos){
          setPreview(URL.createObjectURL(vehicleDetails.photos))
        }
      },[vehicleDetails.photos])

      const handleAdd=async(e)=>{
        e.preventDefault()
        const {name,model,number,year,type,items,issues,photos,date,time}=vehicleDetails
        if(!name || !model || !number || !type || !year || !items || !issues || !photos){
          toast.warning("Please fill the form completely")
      }
      else{
        const reqBody=new FormData()
        reqBody.append("name",name)
        reqBody.append("model",model)
        reqBody.append("number",number)
        reqBody.append("year",year)
        reqBody.append("type",type)
        reqBody.append("items",items)
        reqBody.append("issues",issues)
        reqBody.append("photos",photos)
        reqBody.append("date",date)
        reqBody.append("time",time)

        const reqHeader={
           "Content-Type":"multipart/form-data"
        }

         const result=await addVehicleApi(reqBody,reqHeader)
         if(result.status===200){
              sessionStorage.setItem("vehicleDetails",JSON.stringify(vehicleDetails))
              sessionStorage.setItem("preview",preview)


              setVehicleDetails({
                name:"",
                model:"",
                number:"",
                year:"",
                type:"",
                items:[],
                issues:[],
                photos:""
              })      
              setPreview("")  
              setSelectedIssueValues([])  
              navigate('./details')
         }
         else{
              console.log(result);
              
         }
  
      }

    }
    const reset=()=>{
      window.location.reload();
    }
    
  return (
    <div id="register" className="register">
      <h1 className="anta-regular">
        Register your <span>Vehicle</span>
      </h1>
<div className='justify-content-center d-flex align-items-center'>
  
        <div className="d-flex justify-content-center gap-4 mt-5 reg">
          <div className="register-form">
            <form onSubmit={handleAdd} action="">
              <div className="d-flex flex-column">
                <input
                  onChange={handleChange}
                  name="name"
                  className="reg-inp form-control mt-3 "
                  type="text"
                  placeholder="Vehicle name"
                  value={vehicleDetails.name}
                />
                {!isNameValid&&
                <div className='text-danger'>
                    invalid input
                </div>
                }
                <input
                  onChange={handleChange}
                  name="model"
                  className="reg-inp form-control mt-3"
                  type="text"
                  placeholder="Vehicle model"
                  value={vehicleDetails.model}
                />
                {!isModelValid&&
                <div className='text-danger'>
                    invalid input
                </div>
                }
                <input
                  onChange={handleChange}
                  name="number"
                  className="reg-inp form-control mt-3"
                  type="text"
                  placeholder="Vehicle number"
                  value={vehicleDetails.number}
                />
                {!isNumberValid&&
                <div className='text-danger'>
                    invalid input
                </div>
                }
                <select
                  name="year"
                  id=""
                  onChange={handleChange}
                  className="form-control mt-3"
                  value={vehicleDetails.year}
                >
                  <option value="" disabled="disabled" selected>
                    Select year
                  </option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
                <div className="d-flex mt-3">
                  <label htmlFor="">Vehicle type</label>
                  <div className="d-flex ms-5">
                    <div class="form-check">
                      <input
                        class="form-check-input  "
                        type="radio"
                        name="car"
                        onChange={handleChange}
                        value="car"
                        id="flexRadioDefault1"
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Car
                      </label>
                    </div>
                    <div class="form-check ms-4">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="car"
                        onChange={handleChange}
                        value="bike"
                        id="flexRadioDefault2"
                      />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Bike
                      </label>
                    </div>
                  </div>
                </div>
              </div>
  <div className='d-flex align-items-center'>
    <label className='mt-2'>Submitted items : </label>
    
                <div
                  class="btn-group mt-3 ms-3"
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <input
                    type="checkbox"
                    class="btn-check"
                    id="btncheck1"
                    value="Key"
                    name="key"
                    onChange={handleChange}
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-dark" for="btncheck1">
                    Key
                  </label>
    
                  <input
                    type="checkbox"
                    class="btn-check"
                    id="btncheck2"
                    value="Helmet"
                    name="key"
                    onChange={handleChange}
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-dark" for="btncheck2">
                    Helmet
                  </label>
    
                  <input
                    type="checkbox"
                    class="btn-check"
                    id="btncheck3"
                    value="Petrol"
                    name="key"
                    onChange={handleChange}
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-dark" for="btncheck3">
                    Petrol
                  </label>
                </div>
                
  </div>
              <div>
                <Select
                  isMulti
                  name="issues"
                  options={workOptions}
                  className="basic-multi-select mt-3 mult "
                  classNamePrefix="select"
                  placeholder="Select the issues"
                  onChange={handleSelectChange}
                />
              </div>
  
              <div className="mt-3 d-flex">
                <label htmlFor="">Attachment: </label>
  
                <div className="mt-2 ms-4">
                  <div className="">
                  <label >
                          <input name='photos'  onChange={handleChange}  id='project' type="file" style={{display:"none"}} />
                          <img height={"100px"} width={"200px"} src={preview?preview:"https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"} alt="" />
      
                      </label>
                  </div>
                </div>
                
              </div>
              <div className="mt-3"></div>
              <div>
                <input disabled={(isModelValid && isNameValid && isNumberValid)?false:true} 
                type="submit" 
                className="btn btn-dark" 
                value="Submit" />
                <input
                  type="button"
                  className="btn btn-secondary"
                  value="Reset"
                  onClick={reset}
                />
              </div>
            </form>
          </div>
          <div className="register-img">
            <img
              src="https://st4.depositphotos.com/1008239/38056/i/450/depositphotos_380563898-stock-photo-car-service-worker-polishing-car.jpg"
              alt=""
            />
          </div>
        </div>
        
</div>
< ToastContainer position='top-right' theme='colored'/>

    </div>
    
  );
}

export default Register