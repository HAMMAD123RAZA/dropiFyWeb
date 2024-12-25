import axios from 'axios'
import React, { useState } from 'react'

const Create = () => {
  const [name, setname] = useState<string>('')
  const [Category, setCategory] = useState<string>('')
  const [Price, setPrice] = useState<number>(0)
  const [Img, setImg] = useState<string>()

  const handleCreate = async () => {
    try {
      const api = await axios.post('http://localhost:8080/create', {
        name,
        category: Category,
        price: Price,
        image: Img,
      })
      console.log(api.data)
      alert('added the data')

    } catch (error) {
            console.log("error in creating ",error)
            alert('err in adding')
    }
  }
  return (
    <>
     <form
  onSubmit={(e) => {
    e.preventDefault(); 
    handleCreate();
  }}
  className="flex flex-col items-center py-8 h-screen bg-gray-200"
>

        <div className="bg-white rounded-xl md:p-12 p-4 mx-14  border8 border-blue-300">
          <div className="py-3">
            <label
              htmlFor="text"
              className="text-2xl text-gray-700 font-bold py-2"
            >
              Name
            </label>
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Product Name"
              className="border-2 border-gray-400 rounded-lg px-20 my-3 py-3 "
            />
          </div>
          <div className="py-3">
            <label
              htmlFor="text"
              className="text-2xl text-gray-700 font-bold py-2"
            >
              Category
            </label>
            <br />
            <input
              type="text"
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Product Name"
              className="border-2 border-gray-400 rounded-lg px-20 my-3 py-3 "
            />
          </div>
          <div className="py-3">
            <label
              htmlFor="Price"
              className="text-2xl text-gray-700 font-bold py-2"
            >
              Price
            </label>
            <br />
            <input
              value={Price}
              onChange={(e) => setPrice(Number(e.target.value))}
              type="number"
              placeholder="Product Name"
              className="border-2 border-gray-400 rounded-lg px-20 my-3 py-3 "
            />
          </div>

          <div className="py-3">
            <label
              htmlFor="text"
              className="text-2xl text-gray-700 font-bold py-2"
            >
              Image
            </label>
            <br />
            <input
              value={Img}
              onChange={(e) => setImg(e.target.value)}
              type="text"
              placeholder="Product Name"
              className="border-2 border-gray-400 rounded-lg px-20 my-3 py-3 "
            />
          </div>
          <button
          type='submit'
            className="px-36 py-2 my-2 bg-blue-500 transition duration-200 text-white hover:bg-white hover:text-blue-500 font-bold text-xl border-2 border-blue-500 rounded-lg"
          >
            Done
          </button>
        </div>
      </form>
    </>
  )
}

export default Create