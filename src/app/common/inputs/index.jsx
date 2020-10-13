import React from 'react'
import CKEditor from 'ckeditor4-react'

const Input1 = (props) => {
  return (
    <>
      <div className="input1">
        <label>{props.label}:</label>
        <input type={props.type} placeholder={props.ph} id={props.id} value={props.value} onChange={props.onChange} onKeyUp={props.onKeyUp}/>
      </div>
    </>
  )
}

export const Select = (props) => {
  return (
    <>
      <div className="input1">
        {
          props.label ? (
            <label>{props.label}:</label>
          ):(<></>)
        }
        <select value={props.value} onChange={props.onChange}>
          <option value=''>--Please choose one--</option>
          {
            props.options ?
              (
                props.options.map(option => (
                  <option value={option.id}>{option.name}</option>
                ))
              )
              :
              (
                <> <option>No options</option></>
              )
          }
        </select>
      </div>
    </>
  )
}

export const Textarea = (props) => {
  return (
    <>
      <div className="input1">
        <label htmlFor="">{props.label}:</label>
        <textarea value={props.value} id={props.id} onChange={props.onChange} placeholder={props.ph}></textarea>
      </div>
    </>
  )
}

export const Checkbox = (props) => {
  return (
    <>
      <div className="input1">
        <label htmlFor="">{props.label}:</label>
        <input type="checkbox" id="checkbox" checked={props.checked ? 'checked' : ''} onChange={props.onChange} /><span className="lato-sm grey">{props.ph}</span>
      </div>
    </>
  )
}

export const Editor = (props) =>{
  return(
    <>
      <div className="input1">
        <label htmlFor="">{props.label}:</label>
        <CKEditor data={props.value} onChange={props.onChange} />
      </div>
    </>
  )
}

export const Uploader = ({url, onChange}) => {

  return(
      <>  
        <div className="input1">
          <label>Cover Image</label>
          <div id="imgUploaderWrap">
              <div className="imgWrap">
                  <img src={url} alt=""/>
              </div>
              <label htmlFor="cover-img" id="cover-img-label" className="btn-black">Choose file</label>
              <input type="file" id="cover-img" name="cover-image" accept="image/*" hidden onChange={onChange}/>
          </div>
        </div>
      </>
  )
}

export default Input1
