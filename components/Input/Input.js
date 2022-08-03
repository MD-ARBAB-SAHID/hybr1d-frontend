
const Input = (props)=>{

    const {placeholder,val,setValue} = props
    const onChangeHandler = (event)=>{
        setValue(event.target.value);

    }
   
        return(
            <>
            <input placeholder={placeholder}   onChange={onChangeHandler} value={val}  />
          
            </>
        )
   
}

export default Input;