import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function View() {
    const vehicleDetails=JSON.parse(sessionStorage.getItem("vehicleDetails"))
    const preview=sessionStorage.getItem("preview")
    const componentPdf=useRef()

    const generatePdf=useReactToPrint({
        content:()=>componentPdf.current,
        documentTitle:"Vehicle data",
        onAfterPrint:()=>toast.success("Data saved successfully")
    })

  return (
    <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
       <div ref={componentPdf} className='d-flex justify-content-center align-items-center'>
            <table className='' >
                <tr>
                    <th className='tab'>
                        Name
                    </th>
                    <td className='tab'>
                        {vehicleDetails.name}
                    </td>
                </tr>
                <tr>
                    <th>
                        Model
                    </th>
                    <td>
                        {vehicleDetails.model}
                    </td>
                </tr>
                <tr>
                    <th>
                        Number
                    </th>
                    <td>
                        {vehicleDetails.number}
                    </td>
                </tr>
                <tr>
                    <th>
                        Year
                    </th>
                    <td>
                        {vehicleDetails.year}
                    </td>
                </tr>
                <tr>
                    <th>
                        Type
                    </th>
                    <td>
                        {vehicleDetails.type}
                    </td>
                </tr>
                <tr>
                    <th>
                        Items submitted with vehicle
                    </th>
                    <td>
                        {vehicleDetails.items.map(item=>(
                            <><label> {item} </label> <br /></>
                        ))}
                    </td>
                </tr>
                <tr>
                    <th>
                        Issues
                    </th>
                    <td>
                    {vehicleDetails.issues.map(item=>(
                            <><label> {item} </label> <br /></>
                        ))}
                    </td>
                </tr>
                <tr >
                    <th >
                        Attachement
                    </th>
                    <td >
                        <img width={"200px"} height={"100px"} src={preview} alt="image" />
                    </td>

                </tr>
                <tr>
                    <th>
                        Date
                    </th>
                    <td>
                        {vehicleDetails.date}
                    </td>
                </tr>
                <tr>
                    <th style={{paddingBottom:"50px"}}>
                        Time
                    </th>
                    <td style={{paddingBottom:"50px"}}>
                        {vehicleDetails.time}
                    </td>
                </tr>
    
    
            </table>
       </div>
        <div className='mt-4'>
            <button onClick={generatePdf} className='btn btn-dark'>Download and Print</button>
        </div>
        < ToastContainer position='top-right' theme='colored'/>

    </div>
  )
}

export default View