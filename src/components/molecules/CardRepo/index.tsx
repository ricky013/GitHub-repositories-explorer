import { ReactElement, useState } from 'react'

function CardRepo(): ReactElement {
  return (
    <>
      <div className="columns-2 font-bold">
        <h1 className="w-1/2">Repository Title</h1>
        <span className="flex items-center justify-end">
          <h1 className="m-2">Rating</h1>
          <i className="pi pi-star-fill"></i>
        </span>
      </div>
      <div className="description">Descrip</div>
    </>
  )
}
export default CardRepo
