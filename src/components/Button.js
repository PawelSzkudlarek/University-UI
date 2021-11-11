
const Button = ({className, color, text, onClickFunc, width}) => {

  return (
    <button className={className} 
      onClick = {onClickFunc}
      style={{width : {width}}}
    >{text}</button>
  )
}

export default Button
