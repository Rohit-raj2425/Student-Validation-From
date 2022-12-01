import React ,{useState,useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import "./StudentForm.css"
import axios from 'axios'

function StudentForm() {
    // const [Image, setImage] = useState('')
    // const [Signature, setSignature] = useState('')
    // const [Receipt, setReceipt] = useState('')
    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    const setImage = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors["photo"] ) setErrors({
            ...errors,
            "photo": null
        })
    }

    const setSignature = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    const setReceipt = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    const setEmail = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    const setRoll = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    const setBranch = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    const findFormErrors = () => {
        const { name, email, roll, branch } = form
        const newErrors = {}
        // name errors
        if ( !name || name === '' ) newErrors.name = 'cannot be blank!'
        else if ( name.length > 30 ) newErrors.name = 'name is too long!'
        // email errors
        if ( !email || email === '' ) newErrors.email = 'cannot be blank!'
        // roll errors
        if ( !roll) newErrors.roll = 'cannot be blank!'
        // branch errors
        if ( !branch || branch === '' ) newErrors.branch = 'cannot be blank!'
        else if ( branch.length > 100 ) newErrors.branch = 'branch is too long!'
    
        return newErrors
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const newErrors = findFormErrors()
        //console.log("hello")
        let check = true
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors)
            check = false
        }
        
        // else {
        //     // No errors! Put any logic here for the form submission!
        //     alert('Thank you for your response!')
        //   }
        let photo = true
        let sign = true
        let receipt = true
        const data  = new FormData()
        //console.log(form["image"])
        if(form["image"]){
            data.append("photo",form["image"])
        }
        if(form["sign"]){
            
            data.append("sign",form["sign"])
        }
        if(form["receipt"]){
            data.append("receipt",form["receipt"])
        }
        //console.log(data)
        axios
		    .post("/submit", data, { 
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

                }
            })
			.then((res) => {
				console.log("Successfully predict");
                photo=res.data.photo
                sign = res.data.sign
                receipt = res.data.receipt
                console.log(photo)
                console.log(sign)
                console.log(receipt)
                //setAll(items)
                if(check && photo && sign && receipt){
                    alert('Thank you for your response!')
                }
			})
			.catch((err) => {
				console.log(err.response);
            })

            if(receipt === false){
                setErrors({
                    ...errors,
                    "receipt" : "upload correct receipt!"
                })
                console.log(errors.receipt)
            }
            if(!sign){
                setErrors({
                    ...errors,
                    "sign" : "upload correct sign!"
                })
                console.log(errors.sign)

            }
            if(!photo){
                setErrors({
                    ...errors,
                    "photo" : "upload correct image!"
                })
                console.log(errors.photo)
            }
            console.log(errors)
      }

    return (
        <div className='App d-flex flex-column align-items-center'>
        <Form onSubmit={submitHandler} style={{ width: '300px' }}>
            <Form.Group controlId="name" className="mt-2">
                <Form.Label>Name :</Form.Label>
                <Form.Control 
                    type='text'
                    placeholder='Enter your name'
                    //value = {setForm['name']}
                    onChange={ e => setField('name', e.target.value)}
                    isInvalid={ !!errors.name }
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                    { errors.name }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="email" className="mt-2">
                <Form.Label>Email :</Form.Label>
                <Form.Control 
                    type='text'
                    placeholder='Enter your email'
                    //value = {setForm['name']}
                    onChange={ e => setEmail('email', e.target.value)}
                    isInvalid={ !!errors.email }
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                    { errors.email }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="rollno" className="mt-2">
                <Form.Label>Roll Number :</Form.Label>
                <Form.Control 
                    type='number'
                    placeholder='Enter your roll number'
                    //value = {setForm['name']}
                    onChange={ e => setRoll('roll', e.target.value)}
                    isInvalid={ !!errors.roll }
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                    { errors.roll }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="branch" className="mt-2">
                <Form.Label>Branch :</Form.Label>
                <Form.Control 
                    type='text'
                    placeholder='Enter your branch'
                    //value = {setForm['name']}
                    onChange={ e => setBranch('branch', e.target.value)}
                    isInvalid={ !!errors.branch }
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                    { errors.branch }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="image" className="mt-2">
                <Form.Label>Upload Image :</Form.Label>
                <Form.Control
                    type='file'
                    placeholder='Upload Image'
                    // value={Image}
                    onChange={(e) => setImage('image', e.target.files[0])}
                    isInvalid={ !!errors.photo }
                ></Form.Control> 
                <Form.Control.Feedback type='invalid'>
                    { errors.photo }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="signature" className="mt-2">
                <Form.Label>Upload Signature :</Form.Label>
                    <Form.Control
                        type='file'
                        placeholder='Upload Signature'
                        // value={Image}
                        onChange={(e) => setSignature('sign', e.target.files[0])}
                        isInvalid={ !!errors.sign }
                    ></Form.Control> 
                    <Form.Control.Feedback type='invalid'>
                        { errors.sign }
                    </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="receipt" className="mt-2">
                <Form.Label>Upload Receipt :</Form.Label>
                <Form.Control
                    type='file'
                    placeholder='Upload Receipt'
                    // value={Image}
                    onChange={(e) => setReceipt('receipt', e.target.files[0])}
                    isInvalid={ !!errors.receipt }
                ></Form.Control> 
                <Form.Control.Feedback type='invalid'>
                    { errors.receipt }
                </Form.Control.Feedback>
            </Form.Group>  
            <Button variant="primary" type="submit" className="btn mt-5" style={{ marginLeft: "35%" }}>
                Submit
            </Button>
        </Form>
        </div>
    )
}

export default StudentForm
