import React, { useState, useEffect } from 'react'
import Input, { Select, Textarea } from '../../../../common/inputs/index'
import Api from '../../../../config/settings'
// import { ShowNotify } from '../../../../common/popups'


const AddForm = ({ props }) => {
  const [categories, setCategories] = useState([])
  const [subcategories, setSubCategories] = useState([])
  const [productclasses, setProductClasses] = useState([])
  const [product, setProduct] = useState({})

  const getCategories = () => {
    // ApiGet(`${URLS().CATEGORIES}`)
    Api.categories.get()
      .then(res => {
        setCategories(res.data)
      })
  }

  const getSubCategories = (id) => {
    id ? (
      // ApiGet(`${URLS().SUBCATEGORIES}?category=${id}`)
      Api.subcategories.get(`?category=${id}`)
        .then(res => {
          setSubCategories(res.data)
        })
    ) : (
        // ApiGet(`${URLS().SUBCATEGORIES}`)
        Api.subcategories.get()
          .then(res => {
            setSubCategories(res.data)
          })
      )
  }

  const getProductclasses = (id) => {
    id ? (
      // ApiGet(`${URLS().PRODUCTCLASS}?subcategory=${id}`)
      Api.productclass.get(`?subcategory=${id}`)
        .then(res => {
          setProductClasses(res.data)
        })
    ) : (
        // ApiGet(`${URLS().PRODUCTCLASS}`)
        Api.productclass.get()
          .then(res => {
            setProductClasses(res.data)
          })
      )
  }

  useEffect(() => {
    getCategories()
    getSubCategories()
    getProductclasses()
  }, [])

  const handleName = (e) => {
    var np = { ...product }
    np.name = e.target.value
    setProduct(np)
    console.log(e.target.value)
  }

  const handleCategory = (e) => {
    var np = { ...product }
    np.category = e.target.value
    setProduct(np)

    getSubCategories(e.target.value)
  }

  const handleSubCategory = (e) => {
    var np = { ...product }
    np.subcategory = e.target.value
    setProduct(np)

    getProductclasses(e.target.value)
  }

  const handleClass = (e) => {
    var np = { ...product }
    np.productclass = e.target.value
    setProduct(np)
  }

  const handlePrice = (e) => {
    var np = { ...product }
    np.price = e.target.value
    setProduct(np)
  }

  const handleWeight = (e) => {
    var np = { ...product }
    np.weight = e.target.value
    setProduct(np)
  }

  const handleDescription = (e) => {
    var np = { ...product }
    np.description = e.target.value
    setProduct(np)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    var btn = document.getElementById('addBtn')
    btn.innerHTML = "Saving..."

    console.log(product)
    // ApiPost(`${URLS().CATALOG}`, { ...product })
    Api.catalog.post(product)
      .then(res => {
        btn.innerText = "Saved!"
        // ShowNotify(`<b>${res.data.name}</b> was added successfully!`)
        setTimeout(() => {
          window.location.href = `edit/${res.data.id}`
        }, 1000)

      })
  }

  return (
    <>
      <div className="fl-center">
        {/* <Link to="/"><span className="lato-lg">Activity</span></Link> */}
        <span className="lato-lg b">New Product</span>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <Input label="Name" type="text" ph="Item Name" value={product.name} onChange={handleName} />
        <Select label="Category" options={categories} value={product.category} onChange={handleCategory} />
        <Select label="Sub Category" options={subcategories} value={product.subcategory} onChange={handleSubCategory} />
        <Select label="Class" options={productclasses} value={product.productclass} onChange={handleClass} />
        <Input label="Price (Ksh)" type="number" ph="Item Price" value={product.price} onChange={handlePrice} />
        <Input label="Weight (Kgs)" type="number" ph="Item Weight" value={product.weight} onChange={handleWeight} />
        <Textarea label="Description" value={product.description} onChange={handleDescription} />

        <button type="submit" className="btn btn-black btn-full" id="addBtn">Save</button>
      </form>
    </>
  )
}

export default AddForm