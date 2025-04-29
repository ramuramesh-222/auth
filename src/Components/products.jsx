import React, { useEffect, useState } from "react"
import './products.css'
import LOGO from '../assets/logo.png'

function ProductAdmin() {
    const [dishover, setDishover] = useState(false)
    const [edidHover, setEdidHover] = useState(false)

    const [addval, setAddval] = useState({ title: '', price: '', category: '', image: '' })
    const [editval, setEditval] = useState({ id: '', title: '', price: '', category: '', image: '' })



    // GET all Products:
    const [Products, setProducts] = useState([])
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(json => setProducts(json))
    }, [])

    //DELETE
    const handleDelete = async (prodId) => {
        alert('Are You Sure to Delete')
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${prodId}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            const deletedProd = Products.filter((val) => val.id !== prodId);
            setProducts(deletedProd)
        } catch (err) {
            console.error(err)
        }
    }
    // ADD
    const handleInput = (e) => {
        let name = e.target.name
        let value = e.target.value
        setAddval({ ...addval, [name]: value })
    };
    const inputSubmit = () => {
        fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addval)
        })
            .then(res => res.json())
            .then(json => setProducts((pre) => [...pre, json]))
        setDishover(false)
    };

    // UPDATE
    const handleEdit = (id, title, price, category, img) => {
        setEdidHover(true);
        setEditval({ id: id, title: title, price: price, category: category, image: img })
    }
    const edithandleInput = (e) => {
        const { name, value } = e.target
        setEditval({ ...editval, [name]: value })

    }
    const editSubmit = () => {
        const id = editval.id
        fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editval)
        })
            .then(res => res.json())
            .then(data => {
                const newupdate = Products.map((prod) => {
                    return prod.id === editval.id ? { ...prod, title: data.title, price: data.price, image: data.image, category: data.category } : prod
                })
                setProducts(newupdate);
                setEdidHover(false);
            })


        // console.log(editval);
    }
    return (

        <div className="p-3 ">
            <div className='d-flex justify-content-between align-items-center header my-2'>
                <img src={LOGO} alt='log_img' />

                <input type='serch' placeholder='Search the products' />

                <div className='d-flex'>
                    <div className='px-3 headdet' ><i className="fa-solid fa-house px-2"></i>Home</div>
                    <div className='px-3 headdet' ><i className="fa-solid fa-right-to-bracket px-2"></i>Login</div>
                    <div className='px-3 headdet' ><i className="fa-solid fa-user-plus px-2"></i>SignUp</div>
                    <div className='px-3 headdet' ><i className="fa-solid fa-user-plus px-2"></i>Products</div>
                    <div className='px-3 headdet' ><i className="fa-solid fa-cart-shopping px-2"></i>Cart</div>
                </div>
            </div>

            {Products.length > 0 ?
                <>
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">TITLE</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">CATEGORY</th>
                                <th scope="col">IMAGE</th>
                                <th scope="col">EDIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Products.map((value, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <th>{value.title}</th>
                                    <th>{value.price}</th>
                                    <th>{value.category}</th>
                                    <th>{value.image}</th>
                                    <th>
                                        <button className="btn btn-success" onClick={() => handleEdit(value.id, value.title, value.price, value.category, value.image)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(value.id)}>Delete</button>
                                    </th>
                                </tr>)}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center my-4">
                        <button className="btn btn-primary" onClick={() => setDishover(true)}>Add Products</button>
                    </div>
                </>
                : <h1>Loading...</h1>
            }
            {/* ADD */}
            {dishover ? <div className="hoverdisplay">
                <div>
                    <input type="text" name="title" placeholder="Enter The Title" onChange={handleInput} /><br />
                    <input type="number" name="price" placeholder="Enter The Price" onChange={handleInput} /><br />
                    <input type="text" name="category" placeholder="Enter The Category" onChange={handleInput} /><br />
                    <input type="text" name="image" placeholder="Enter The Image URL" onChange={handleInput} /><br />
                    <span>
                        <button className="btn btn-success mx-2" onClick={inputSubmit}>Submit</button>
                        <button className="btn btn-danger mx-2" onClick={() => setDishover(false)}>Close</button>
                    </span>
                </div>
            </div> : <></>}
            {/* EDIT */}
            {edidHover ? <div className="hoverdisplay">
                <div>
                    <input type="text" name="title" placeholder="Enter The Title" value={editval.title} onChange={edithandleInput} /><br />
                    <input type="number" name="price" placeholder="Enter The Price" value={editval.price} onChange={edithandleInput} /><br />
                    <input type="text" name="category" placeholder="Enter The Category" value={editval.category} onChange={edithandleInput} /><br />
                    <input type="text" name="image" placeholder="Enter The Image URL" value={editval.image} onChange={edithandleInput} /><br />
                    <span>
                        <button className="btn btn-success mx-2" onClick={editSubmit}>Submit</button>
                        <button className="btn btn-danger mx-2" onClick={() => setEdidHover(false)}>Close</button>
                    </span>
                </div>
            </div> : <></>}
        </div>
    )
}
export default ProductAdmin