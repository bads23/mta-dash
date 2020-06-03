import React, { useState, useEffect } from 'react'
import Input, { Select, Textarea, Editor } from '../../../../common/inputs/index'
import Api from '../../../../config/settings'
import { ShowNotify } from '../../../../common/popups'

const EditForm = ({ props }) => {
  const [categories, setCategories] = useState([])
  const [subcategories, setSubCategories] = useState([])
  const [productclasses, setProductClasses] = useState([])
  const [product, setProduct] = useState({})
  const [image, setImage] = useState([])

  const getCategories = () => {
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

  const getProduct = (id) => {
    // ApiGet(`${URLS().CATALOG}${id}/`)
    Api.catalog.get(id+'/')
      .then(res => (
        setProduct(res.data)
      ))
  }

  useEffect(() => {
    getCategories()
    getSubCategories()
    getProductclasses()
    getProduct(props.match.params.id)
    // getImages(props.match.params.id)
  }, [])

  const handleName = (e) => {
    var np = { ...product }
    np.name = e.target.value
    setProduct(np)
    
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
    np.description = e.editor.getData()
    setProduct(np)
  }

  const handleFeatures = (e) => {
    var np = { ...product }
    np.features = e.target.value
    setProduct(np)
  }

  const handleImage = (e) => {
    var np = []
    np = [...e.target.files]
    setImage(np)

    var imgWrap = document.getElementById('itemImgs')
    var newImgWrap = document.createElement("div")
    var newImg = document.createElement("img")

    const reader = new FileReader();

    reader.onloadend = () => {
      var imgUrl = reader.result
      newImg.setAttribute("src", imgUrl)
      newImg.setAttribute("alt", "uploading...")
      newImgWrap.classList.add("imgContainer")
      newImgWrap.classList.add("isImg")
      newImgWrap.appendChild(newImg)
      imgWrap.prepend(newImgWrap)
    }

    reader.readAsDataURL(e.target.files[0]);

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    var btn = document.getElementById('editBtn')
    btn.innerText = 'Saving...'
    btn.disabled = 'disabled'

    // ApiPut(`${URLS().CATALOG}${props.match.params.id}/`, { ...product })
    Api.catalog.put(props.match.params.id, product)
      .then(res => {
        setProduct(res.data)

        if (image.length > 0) {
          var payload = new FormData()
          payload.append('catalogue_id', props.match.params.id)
          payload.append('image', image[0])
          payload.append('category', 'products')

          // ApiPost(`${URLS().IMAGES}`, payload)
          Api.images.post(payload)
            .then(res => {
              btn.innerText = "Saved!"
            })
            .catch(error => {
              // btn.innerText = "Unable to upload! Try again!"
              btn.disabled = ''
              console.log(error)
            //   setTimeout(() => {
            //     window.location.reload()
            // }, 2000)
            })
        } else {
          btn.innerText = "Saved!"
          // setTimeout(() => {
          //   window.location.reload()
          // }, 2000)
        }

      })

  }

  const thanosSnap = (e) => {
    e.preventDefault()
    Api.catalog.delete(props.match.params.id)
      .then(res => {
        console.log(res.data)
        ShowNotify(`Item has been deleted!`)
        setTimeout(() => {
          window.location.href = '/dashboard/products'
        }, 1000)
      })
  }

  const deleteImage = (id) => {
    // ApiDelete(`${URLS().IMAGES_URL}${id}/`)
    Api.images_url.delete(id)
    .then(res =>{
      ShowNotify("Image Deleted!")
      getProduct(props.match.params.id)
    })
  }

  return (
    product.name ? (
      <div>
        <div className="fl-center">
          <span className="lato-lg b">Edit Product</span>
        </div>

        <form className="form" onSubmit={handleSubmit} id="editForm_products">

          <div className="editForm_left">
            <Input label="Name" type="text" ph="Item Name" value={product.name} onChange={handleName} />
            <Select label="Category" options={categories} value={product.category} onChange={handleCategory} />
            <Select label="Sub Category" options={subcategories} value={product.subcategory} onChange={handleSubCategory} />
            <Select label="Class" options={productclasses} value={product.productclass} onChange={handleClass} />
            <Input label="Price (Ksh)" type="number" ph="Item Price" value={product.price} onChange={handlePrice} />
            <Input label="Weight (Kgs)" type="number" ph="Item Weight" value={product.weight} onChange={handleWeight} />
            {/* <Textarea label="Description" value={product.description} onChange={handleDescription} /> */}
            <Editor label="Description" value={product.description} onChange={handleDescription}  />
            <Textarea label="Features (Separate with a comma)" value={product.features} onChange={handleFeatures} ph="feature1,feature2,feature3" />
            {/* <Checkbox label="Visibility" ph="Hide this item" /> */}
          </div>

          <div className="editForm_right">
            <div id="images_upload">
              <label className="lato-m b mg-v-10">Images:</label>

              <div className="fl-btw fl-wrap mg-v-20" id="itemImgs">
                {
                  product.images ?
                  (
                    product.images.map(img => (
                        <div className="imgContainer isImg">
                          <img src={`${Api.images.imgUrl}`+img.path} alt="" />
                          <span className="delBtn" onClick={() => {deleteImage(img.id)}}><i className="fas fa-trash-alt"></i></span>
                        </div>
                      ))
                    )
                    :
                    (
                      <></>
                      )
                    }
                <div className="imgContainer isNewImg">
                  <label htmlFor="newImg" className="lato-m b grey"><span>Add an image</span></label>
                  <input type="file" accept="image/*" name="image" id="newImg" onChange={handleImage} />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-black btn-full" id="editBtn">Save</button>
            <div id="ThanosDiv" className="mg-v-20">
              <span className="lato-xsm i">Use this button to permanently delete this item. This Action is irreversible!</span>
              <button type="button" className="btn btn-red btn-full" id="thanosBtn" onClick={thanosSnap}>Delete This Item</button>
            </div>
          </div>
        </form>



      </div>
    ) : (
        <>
          <i className="fas fa-circle-notch"></i>
        </>
      )
  )
}

export default EditForm