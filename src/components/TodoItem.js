import React from 'react'

const TodoItem = ({ data }) => {
  return (
    <div>
      {data.some} - {data.evita}
    </div>
  )
}

export default TodoItem
